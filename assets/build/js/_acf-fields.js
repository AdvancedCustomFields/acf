(function($, undefined){
	
	/**
	*  findFields
	*
	*  Returns a jQuery selection object of acf fields.
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	object $args {
	*		Optional. Arguments to find fields.
	*
	*		@type string			key			The field's key (data-attribute).
	*		@type string			name		The field's name (data-attribute).
	*		@type string			type		The field's type (data-attribute).
	*		@type string			is			jQuery selector to compare against.
	*		@type jQuery			parent		jQuery element to search within.
	*		@type jQuery			sibling		jQuery element to search alongside.
	*		@type limit				int			The number of fields to find.
	*		@type suppressFilters	bool		Whether to allow filters to add/remove results. Default behaviour will ignore clone fields.
	*  }
	*  @return	jQuery
	*/
	
	acf.findFields = function( args ){
		
		// vars
		var selector = '.acf-field';
		var $fields = false;
		
		// args
		args = acf.parseArgs(args, {
			key: '',
			name: '',
			type: '',
			is: '',
			parent: false,
			sibling: false,
			limit: false,
			visible: false,
			suppressFilters: false,
		});
		
		// filter args
		if( !args.suppressFilters ) {
			args = acf.applyFilters('find_fields_args', args);
		}
		
		// key
		if( args.key ) {
			selector += '[data-key="' + args.key + '"]';
		}
		
		// type
		if( args.type ) {
			selector += '[data-type="' + args.type + '"]';
		}
		
		// name
		if( args.name ) {
			selector += '[data-name="' + args.name + '"]';
		}
		
		// is
		if( args.is ) {
			selector += args.is;
		}
		
		// visibility
		if( args.visible ) {
			selector += ':visible';
		}
		
		// query
		if( args.parent ) {
			$fields = args.parent.find( selector );
		} else if( args.sibling ) {
			$fields = args.sibling.siblings( selector );
		} else {
			$fields = $( selector );
		}
		
		// filter
		if( !args.suppressFilters ) {
			$fields = $fields.not('.acf-clone .acf-field');
			$fields = acf.applyFilters('find_fields', $fields);
		}
		
		// limit
		if( args.limit ) {
			$fields = $fields.slice( 0, args.limit );
		}
		
		// return
		return $fields;
		
	};
	
	/**
	*  findField
	*
	*  Finds a specific field with jQuery
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	string key 		The field's key.
	*  @param	jQuery $parent	jQuery element to search within.
	*  @return	jQuery
	*/
	
	acf.findField = function( key, $parent ){
		return acf.findFields({
			key: key,
			limit: 1,
			parent: $parent,
			suppressFilters: true
		});
	};
	
	/**
	*  getField
	*
	*  Returns a field instance
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	jQuery|string $field	jQuery element or field key.
	*  @return	object
	*/
	
	acf.getField = function( $field ){
		
		// allow jQuery
		if( $field instanceof jQuery ) {
		
		// find fields
		} else {
			$field = acf.findField( $field );
		}
		
		// instantiate
		var field = $field.data('acf');
		if( !field ) {
			field = acf.newField( $field );
		}
		
		// return
		return field;
	};
	
	/**
	*  getFields
	*
	*  Returns multiple field instances
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	jQuery|object $fields	jQuery elements or query args.
	*  @return	array
	*/
	
	acf.getFields = function( $fields ){
		
		// allow jQuery
		if( $fields instanceof jQuery ) {
		
		// find fields	
		} else {
			$fields = acf.findFields( $fields );
		}
		
		// loop
		var fields = [];
		$fields.each(function(){
			var field = acf.getField( $(this) );
			fields.push( field );
		});
		
		// return
		return fields;
	};
	
	/**
	*  findClosestField
	*
	*  Returns the closest jQuery field element
	*
	*  @date	9/4/18
	*  @since	5.6.9
	*
	*  @param	jQuery $el
	*  @return	jQuery
	*/
	
	acf.findClosestField = function( $el ){
		return $el.closest('.acf-field');
	};
	
	/**
	*  getClosestField
	*
	*  Returns the closest field instance
	*
	*  @date	22/1/18
	*  @since	5.6.5
	*
	*  @param	jQuery $el
	*  @return	object
	*/
	
	acf.getClosestField = function( $el ){
		var $field = acf.findClosestField( $el );
		return this.getField( $field );
	};
	
	/**
	*  addGlobalFieldAction
	*
	*  Sets up callback logic for global field actions
	*
	*  @date	15/6/18
	*  @since	5.6.9
	*
	*  @param	string action
	*  @return	void
	*/
	
	var addGlobalFieldAction = function( action ){
		
		// vars
		var globalAction = action;
		var pluralAction = action + '_fields';	// ready_fields
		var singleAction = action + '_field';	// ready_field
		
		// global action
		var globalCallback = function( $el /*, arg1, arg2, etc*/ ){
			//console.log( action, arguments );
			
			// get args [$el, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// find fields
			var fields = acf.getFields({ parent: $el });
			
			// check
			if( fields.length ) {
				
				// pluralAction
				var pluralArgs = [ pluralAction, fields ].concat( extraArgs );
				acf.doAction.apply(null, pluralArgs);
			}
		};
		
		// plural action
		var pluralCallback = function( fields /*, arg1, arg2, etc*/ ){
			//console.log( pluralAction, arguments );
			
			// get args [fields, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// loop
			fields.map(function( field, i ){
				//setTimeout(function(){
				// singleAction
				var singleArgs = [ singleAction, field ].concat( extraArgs );
				acf.doAction.apply(null, singleArgs);
				//}, i * 100);
			});
		};
		
		// add actions
		acf.addAction(globalAction, globalCallback);
		acf.addAction(pluralAction, pluralCallback);
		
		// also add single action
		addSingleFieldAction( action );
	}
	
	/**
	*  addSingleFieldAction
	*
	*  Sets up callback logic for single field actions
	*
	*  @date	15/6/18
	*  @since	5.6.9
	*
	*  @param	string action
	*  @return	void
	*/
	
	var addSingleFieldAction = function( action ){
		
		// vars
		var singleAction = action + '_field';	// ready_field
		var singleEvent = action + 'Field';		// readyField
		
		// single action
		var singleCallback = function( field /*, arg1, arg2, etc*/ ){
			//console.log( singleAction, arguments );
			
			// get args [field, ...]
			var args = acf.arrayArgs( arguments );
			var extraArgs = args.slice(1);
			
			// action variations (ready_field/type=image)
			var variations = ['type', 'name', 'key'];
			variations.map(function( variation ){
				
				// vars
				var prefix = '/' + variation + '=' + field.get(variation);
				
				// singleAction
				args = [ singleAction + prefix , field ].concat( extraArgs );
				acf.doAction.apply(null, args);
			});
			
			// event
			if( singleFieldEvents.indexOf(action) > -1 ) {
				field.trigger(singleEvent, extraArgs);
			}
		};
		
		// add actions
		acf.addAction(singleAction, singleCallback);	
	}
	
	// vars
	var globalFieldActions = [ 'prepare', 'ready', 'load', 'append', 'remove', 'unmount', 'remount', 'sortstart', 'sortstop', 'show', 'hide', 'unload' ];
	var singleFieldActions = [ 'valid', 'invalid', 'enable', 'disable', 'new' ];
	var singleFieldEvents = [ 'remove', 'unmount', 'remount', 'sortstart', 'sortstop', 'show', 'hide', 'unload', 'valid', 'invalid', 'enable', 'disable' ];
	
	// add
	globalFieldActions.map( addGlobalFieldAction );
	singleFieldActions.map( addSingleFieldAction );
	
	/**
	*  fieldsEventManager
	*
	*  Manages field actions and events
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	void
	*  @param	void
	*/
	
	var fieldsEventManager = new acf.Model({
		id: 'fieldsEventManager',
		events: {
			'click .acf-field a[href="#"]':	'onClick',
			'change .acf-field':			'onChange'
		},
		onClick: function( e ){
			
			// prevent default of any link with an href of #
			e.preventDefault();
		},
		onChange: function(){
			
			// preview hack allows post to save with no title or content
			$('#_acf_changed').val(1);
		}
	});
	
})(jQuery);