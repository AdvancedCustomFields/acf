(function($, undefined){
	
	// Cached regex to split keys for `addEvent`.
	var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  
	/**
	*  extend
	*
	*  Helper function to correctly set up the prototype chain for subclasses
	*  Heavily inspired by backbone.js
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	object protoProps New properties for this object.
	*  @return	function.
	*/
	
	var extend = function( protoProps ) {
		
		// vars
		var Parent = this;
		var Child;
		
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if( protoProps && protoProps.hasOwnProperty('constructor') ) {
	      Child = protoProps.constructor;
	    } else {
	      Child = function(){ return Parent.apply(this, arguments); };
	    }
	    
		// Add static properties to the constructor function, if supplied.
		$.extend(Child, Parent);
		
		// Set the prototype chain to inherit from `parent`, without calling
		// `parent`'s constructor function and add the prototype properties.
		Child.prototype = Object.create(Parent.prototype);
		$.extend(Child.prototype, protoProps);
		Child.prototype.constructor = Child;
		
		// Set a convenience property in case the parent's prototype is needed later.
	    //Child.prototype.__parent__ = Parent.prototype;

	    // return
		return Child;
		
	};
	

	/**
	*  Model
	*
	*  Base class for all inheritence
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	object props
	*  @return	function.
	*/
	
	var Model = acf.Model = function(){
		
		// generate uique client id
		this.cid = acf.uniqueId('acf');
		
		// set vars to avoid modifying prototype
		this.data = $.extend(true, {}, this.data);
		
		// pass props to setup function
		this.setup.apply(this, arguments);
		
		// store on element (allow this.setup to create this.$el)
		if( this.$el && !this.$el.data('acf') ) {
			this.$el.data('acf', this);
		}
		
		// initialize
		var initialize = function(){
			this.initialize();
			this.addEvents();
			this.addActions();
			this.addFilters();
		};
		
		// initialize on action
		if( this.wait && !acf.didAction(this.wait) ) {
			this.addAction(this.wait, initialize);
		
		// initialize now
		} else {
			initialize.apply(this);
		}
	};
	
	// Attach all inheritable methods to the Model prototype.
	$.extend(Model.prototype, {
		
		// Unique model id
		id: '',
		
		// Unique client id
		cid: '',
		
		// jQuery element
		$el: null,
		
		// Data specific to this instance
		data: {},
		
		// toggle used when changing data
		busy: false,
		changed: false,
		
		// Setup events hooks
		events: {},
		actions: {},
		filters: {},
		
		// class used to avoid nested event triggers
		eventScope: '',
		
		// action to wait until initialize
		wait: false,
		
		// action priority default
		priority: 10,
		
		/**
		*  get
		*
		*  Gets a specific data value
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @return	mixed
		*/
		
		get: function( name ) {
			return this.data[name];
		},
		
		/**
		*  has
		*
		*  Returns `true` if the data exists and is not null
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @return	boolean
		*/
		
		has: function( name ) {
			return this.get(name) != null;
		},
		
		/**
		*  set
		*
		*  Sets a specific data value
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	mixed value
		*  @return	this
		*/
		
		set: function( name, value, silent ) {
			
			// bail if unchanged
			var prevValue = this.get(name);
			if( prevValue == value ) {
				return this;
			}
			
			// set data
			this.data[ name ] = value;
			
			// trigger events
			if( !silent ) {
				this.changed = true;
				this.trigger('changed:' + name, [value, prevValue]);
				this.trigger('changed', [name, value, prevValue]);
			}
			
			// return
			return this;
		},
		
		/**
		*  inherit
		*
		*  Inherits the data from a jQuery element
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	jQuery $el
		*  @return	this
		*/
		
		inherit: function( data ){
			
			// allow jQuery
			if( data instanceof jQuery ) {
				data = data.data();
			}
			
			// extend
			$.extend(this.data, data);
			
			// return
			return this;
		},
		
		/**
		*  prop
		*
		*  mimics the jQuery prop function
		*
		*  @date	4/6/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		prop: function(){
			return this.$el.prop.apply(this.$el, arguments);
		},
		
		/**
		*  setup
		*
		*  Run during constructor function
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		setup: function( props ){
			$.extend(this, props);
		},
		
		/**
		*  initialize
		*
		*  Also run during constructor function
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		initialize: function(){},
		
		/**
		*  addElements
		*
		*  Adds multiple jQuery elements to this object
		*
		*  @date	9/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		addElements: function( elements ){
			elements = elements || this.elements || null;
			if( !elements || !Object.keys(elements).length ) return false;
			for( var i in elements ) {
				this.addElement( i, elements[i] );
			}
		},
		
		/**
		*  addElement
		*
		*  description
		*
		*  @date	9/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		addElement: function( name, selector){
			this[ '$' + name ] = this.$( selector );
		},
		
		/**
		*  addEvents
		*
		*  Adds multiple event handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object events {event1 : callback, event2 : callback, etc }
		*  @return	n/a
		*/
		
		addEvents: function( events ){
			events = events || this.events || null;
			if( !events ) return false;
			for( var key in events ) {
				var match = key.match(delegateEventSplitter);
				this.on(match[1], match[2], events[key]);
			}	
		},
		
		/**
		*  removeEvents
		*
		*  Removes multiple event handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object events {event1 : callback, event2 : callback, etc }
		*  @return	n/a
		*/
		
		removeEvents: function( events ){
			events = events || this.events || null;
			if( !events ) return false;
			for( var key in events ) {
				var match = key.match(delegateEventSplitter);
				this.off(match[1], match[2], events[key]);
			}	
		},
		
		/**
		*  getEventTarget
		*
		*  Returns a jQUery element to tigger an event on
		*
		*  @date	5/6/18
		*  @since	5.6.9
		*
		*  @param	jQuery $el		The default jQuery element. Optional.
		*  @param	string event	The event name. Optional.
		*  @return	jQuery
		*/
		
		getEventTarget: function( $el, event ){
			return $el || this.$el || $(document);
		},
		
		/**
		*  validateEvent
		*
		*  Returns true if the event target's closest $el is the same as this.$el
		*  Requires both this.el and this.$el to be defined
		*
		*  @date	5/6/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		validateEvent: function( e ){
			if( this.eventScope ) {
				return $( e.target ).closest( this.eventScope ).is( this.$el );
			} else {
				return true;
			}
		},
		
		/**
		*  proxyEvent
		*
		*  Returns a new event callback function scoped to this model
		*
		*  @date	29/3/18
		*  @since	5.6.9
		*
		*  @param	function callback
		*  @return	function
		*/
		
		proxyEvent: function( callback ){
			return this.proxy(function(e){
				
				// validate
				if( !this.validateEvent(e) ) {
					return;
				}
				
				// construct args
				var args = acf.arrayArgs( arguments );
				var extraArgs = args.slice(1);
				var eventArgs = [ e, $(e.currentTarget) ].concat( extraArgs );
				
				// callback
				callback.apply(this, eventArgs);
			});
		},
		
		/**
		*  on
		*
		*  Adds an event handler similar to jQuery
		*  Uses the instance 'cid' to namespace event
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		on: function( a1, a2, a3, a4 ){
			
			// vars
			var $el, event, selector, callback, args;
			
			// find args
			if( a1 instanceof jQuery ) {
				
				// 1. args( $el, event, selector, callback )
				if( a4 ) {
					$el = a1; event = a2; selector = a3; callback = a4;
					
				// 2. args( $el, event, callback )
				} else {
					$el = a1; event = a2; callback = a3;
				}
			} else {
				
				// 3. args( event, selector, callback )
				if( a3 ) {
					event = a1; selector = a2; callback = a3;
				
				// 4. args( event, callback )
				} else {
					event = a1; callback = a2;
				}
			}
			
			// element
			$el = this.getEventTarget( $el );
			
			// modify callback
			if( typeof callback === 'string' ) {
				callback = this.proxyEvent( this[callback] );
			}
			
			// modify event
			event = event + '.' + this.cid;
			
			// args
			if( selector ) {
				args = [ event, selector, callback ];
			} else {
				args = [ event, callback ];
			}
			
			// on()
			$el.on.apply($el, args);
		},
				
		/**
		*  off
		*
		*  Removes an event handler similar to jQuery
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		off: function( a1, a2 ,a3 ){
			
			// vars
			var $el, event, selector, args;
						
			// find args
			if( a1 instanceof jQuery ) {
				
				// 1. args( $el, event, selector )
				if( a3 ) {
					$el = a1; event = a2; selector = a3;
				
				// 2. args( $el, event )
				} else {
					$el = a1; event = a2;
				}
			} else {
											
				// 3. args( event, selector )
				if( a2 ) {
					event = a1; selector = a2;
					
				// 4. args( event )
				} else {
					event = a1;
				}
			}
			
			// element
			$el = this.getEventTarget( $el );
			
			// modify event
			event = event + '.' + this.cid;
			
			// args
			if( selector ) {
				args = [ event, selector ];
			} else {
				args = [ event ];
			}
			
			// off()
			$el.off.apply($el, args);			
		},
		
		/**
		*  trigger
		*
		*  Triggers an event similar to jQuery
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		trigger: function( name, args, bubbles ){
			var $el = this.getEventTarget();
			if( bubbles ) {
				$el.trigger.apply( $el, arguments );
			} else {
				$el.triggerHandler.apply( $el, arguments );
			}
			return this;
		},
		
		/**
		*  addActions
		*
		*  Adds multiple action handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object actions {action1 : callback, action2 : callback, etc }
		*  @return	n/a
		*/
		
		addActions: function( actions ){
			actions = actions || this.actions || null;
			if( !actions ) return false;
			for( var i in actions ) {
				this.addAction( i, actions[i] );
			}	
		},
		
		/**
		*  removeActions
		*
		*  Removes multiple action handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object actions {action1 : callback, action2 : callback, etc }
		*  @return	n/a
		*/
		
		removeActions: function( actions ){
			actions = actions || this.actions || null;
			if( !actions ) return false;
			for( var i in actions ) {
				this.removeAction( i, actions[i] );
			}	
		},
		
		/**
		*  addAction
		*
		*  Adds an action using the wp.hooks library
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		addAction: function( name, callback, priority ){
			//console.log('addAction', name, priority);
			// defaults
			priority = priority || this.priority;
			
			// modify callback
			if( typeof callback === 'string' ) {
				callback = this[ callback ];
			}
			
			// add
			acf.addAction(name, callback, priority, this);
			
		},
		
		/**
		*  removeAction
		*
		*  Remove an action using the wp.hooks library
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		removeAction: function( name, callback ){
			acf.removeAction(name, this[ callback ]);
		},
		
		/**
		*  addFilters
		*
		*  Adds multiple filter handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object filters {filter1 : callback, filter2 : callback, etc }
		*  @return	n/a
		*/
		
		addFilters: function( filters ){
			filters = filters || this.filters || null;
			if( !filters ) return false;
			for( var i in filters ) {
				this.addFilter( i, filters[i] );
			}	
		},
		
		/**
		*  addFilter
		*
		*  Adds a filter using the wp.hooks library
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		addFilter: function( name, callback, priority ){
			
			// defaults
			priority = priority || this.priority;
			
			// modify callback
			if( typeof callback === 'string' ) {
				callback = this[ callback ];
			}
			
			// add
			acf.addFilter(name, callback, priority, this);
			
		},
		
		/**
		*  removeFilters
		*
		*  Removes multiple filter handlers
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	object filters {filter1 : callback, filter2 : callback, etc }
		*  @return	n/a
		*/
		
		removeFilters: function( filters ){
			filters = filters || this.filters || null;
			if( !filters ) return false;
			for( var i in filters ) {
				this.removeFilter( i, filters[i] );
			}	
		},
		
		/**
		*  removeFilter
		*
		*  Remove a filter using the wp.hooks library
		*
		*  @date	14/12/17
		*  @since	5.6.5
		*
		*  @param	string name
		*  @param	string callback
		*  @return	n/a
		*/
		
		removeFilter: function( name, callback ){
			acf.removeFilter(name, this[ callback ]);
		},
		
		/**
		*  $
		*
		*  description
		*
		*  @date	16/12/17
		*  @since	5.6.5
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		$: function( selector ){
			return this.$el.find( selector );
		},
		
		/**
		*  remove
		*
		*  Removes the element and listenters
		*
		*  @date	19/12/17
		*  @since	5.6.5
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		remove: function(){
			this.removeEvents();
			this.removeActions();
			this.removeFilters();
			this.$el.remove();
		},
		
		/**
		*  setTimeout
		*
		*  description
		*
		*  @date	16/1/18
		*  @since	5.6.5
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		setTimeout: function( callback, milliseconds ){
			return setTimeout( this.proxy(callback), milliseconds );
		},
		
		/**
		*  time
		*
		*  used for debugging
		*
		*  @date	7/3/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		time: function(){
			console.time( this.id || this.cid );
		},
		
		/**
		*  timeEnd
		*
		*  used for debugging
		*
		*  @date	7/3/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		timeEnd: function(){
			console.timeEnd( this.id || this.cid );
		},
		
		/**
		*  show
		*
		*  description
		*
		*  @date	15/3/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		show: function(){
			acf.show( this.$el );
		},
		
		
		/**
		*  hide
		*
		*  description
		*
		*  @date	15/3/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		hide: function(){
			acf.hide( this.$el );
		},
		
		/**
		*  proxy
		*
		*  Returns a new function scoped to this model
		*
		*  @date	29/3/18
		*  @since	5.6.9
		*
		*  @param	function callback
		*  @return	function
		*/
		
		proxy: function( callback ){
			return $.proxy( callback, this );
		}
		
		
	});
	
	// Set up inheritance for the model
	Model.extend = extend;
	
	// Global model storage
	acf.models = {};
	
	/**
	*  acf.getInstance
	*
	*  This function will get an instance from an element
	*
	*  @date	5/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getInstance = function( $el ){
		return $el.data('acf');	
	};
	
	/**
	*  acf.getInstances
	*
	*  This function will get an array of instances from multiple elements
	*
	*  @date	5/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getInstances = function( $el ){
		var instances = [];
		$el.each(function(){
			instances.push( acf.getInstance( $(this) ) );
		});
		return instances;	
	};
	
})(jQuery);