(function($, undefined){
	
	/**
	*  acf.newCompatibility
	*
	*  Inserts a new __proto__ object compatibility layer
	*
	*  @date	15/2/18
	*  @since	5.6.9
	*
	*  @param	object instance The object to modify.
	*  @param	object compatibilty Optional. The compatibilty layer.
	*  @return	object compatibilty
	*/
	
	acf.newCompatibility = function( instance, compatibilty ){
		
		// defaults
		compatibilty = compatibilty || {};
		
		// inherit __proto_-
		compatibilty.__proto__ = instance.__proto__;
		
		// inject
		instance.__proto__ = compatibilty;
		
		// reference
		instance.compatibility = compatibilty;
		
		// return
		return compatibilty;
	};
	
	/**
	*  acf.getCompatibility
	*
	*  Returns the compatibility layer for a given instance
	*
	*  @date	13/3/18
	*  @since	5.6.9
	*
	*  @param	object		instance		The object to look in.
	*  @return	object|null	compatibility	The compatibility object or null on failure.
	*/
	
	acf.getCompatibility = function( instance ) {
		return instance.compatibility || null;
	};
	
	/**
	*  acf (compatibility)
	*
	*  Compatibility layer for the acf object
	*
	*  @date	15/2/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	var _acf = acf.newCompatibility(acf, {
		
		// storage
		l10n:	{},
		o:		{},
		fields: {},
		
		// changed function names
		update:					acf.set,
		add_action:				acf.addAction,
		remove_action:			acf.removeAction,
		do_action:				acf.doAction,
		add_filter:				acf.addFilter,
		remove_filter:			acf.removeFilter,
		apply_filters:			acf.applyFilters,
		parse_args:				acf.parseArgs,
		disable_el:				acf.disable,
		disable_form:			acf.disable,
		enable_el:				acf.enable,
		enable_form:			acf.enable,
		update_user_setting:	acf.updateUserSetting,
		prepare_for_ajax:		acf.prepareForAjax,
		is_ajax_success:		acf.isAjaxSuccess,
		remove_el:				acf.remove,
		remove_tr:				acf.remove,
		str_replace:			acf.strReplace,
		render_select:			acf.renderSelect,
		get_uniqid:				acf.uniqid,
		serialize_form:			acf.serialize,
		esc_html:				acf.strEscape,
		str_sanitize:			acf.strSanitize,
	
	});
	
	_acf._e = function( k1, k2 ){
		
		// defaults
		k1 = k1 || '';
		k2 = k2 || '';
		
		// compability
		var compatKey = k2 ? k1 + '.' + k2 : k1;
		var compats = {
			'image.select': 'Select Image',
			'image.edit': 	'Edit Image',
			'image.update': 'Update Image'
		};
		if( compats[compatKey] ) {
			return acf.__(compats[compatKey]);
		}
		
		// try k1
		var string = this.l10n[ k1 ] || '';
		
		// try k2
		if( k2 ) {
			string = string[ k2 ] || '';
		}
		
		// return
		return string;
	};
	
	_acf.get_selector = function( s ) {
			
		// vars
		var selector = '.acf-field';
		
		// bail early if no search
		if( !s ) {
			return selector;
		}
		
		// compatibility with object
		if( $.isPlainObject(s) ) {
			if( $.isEmptyObject(s) ) {
				return selector;
			} else {
				for( var k in s ) { s = s[k]; break; }
			}
		}

		// append
		selector += '-' + s;
			
		// replace underscores (split/join replaces all and is faster than regex!)
		selector = acf.strReplace('_', '-', selector);
		
		// remove potential double up
		selector = acf.strReplace('field-field-', 'field-', selector);
		
		// return
		return selector;
	};
	
	_acf.get_fields = function( s, $el, all ){
		
		// args
		var args = {
			is: s || '',
			parent: $el || false,
			suppressFilters: all || false,
		};
		
		// change 'field_123' to '.acf-field-123'
		if( args.is ) {
			args.is = this.get_selector( args.is );
		}
		
		// return
		return acf.findFields(args);			
	};
	
	_acf.get_field = function( s, $el ){
		
		// get fields
		var $fields = this.get_fields.apply(this, arguments);
		
		// return
		if( $fields.length ) {
			return $fields.first();
		} else {
			return false;
		}
	};
		
	_acf.get_closest_field = function( $el, s ){
		return $el.closest( this.get_selector(s) );
	};
	
	_acf.get_field_wrap = function( $el ){
		return $el.closest( this.get_selector() );
	};
	
	_acf.get_field_key = function( $field ){
		return $field.data('key');
	};
	
	_acf.get_field_type = function( $field ){
		return $field.data('type');
	};
		
	_acf.get_data = function( $el, defaults ){
		return acf.parseArgs( $el.data(), defaults );			
	};
				
	_acf.maybe_get = function( obj, key, value ){
			
		// default
		if( value === undefined ) {
			value = null;
		}
		
		// get keys
		keys = String(key).split('.');
		
		// acf.isget
		for( var i = 0; i < keys.length; i++ ) {
			if( !obj.hasOwnProperty(keys[i]) ) {
				return value;
			}
			obj = obj[ keys[i] ];
		}
		return obj;
	};
	
	
	/**
	*  hooks
	*
	*  Modify add_action and add_filter functions to add compatibility with changed $field parameter
	*  Using the acf.add_action() or acf.add_filter() functions will interpret new field parameters as jQuery $field
	*
	*  @date	12/5/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	var compatibleArgument = function( arg ){
		return ( arg instanceof acf.Field ) ? arg.$el : arg;
	};
	
	var compatibleArguments = function( args ){
		return acf.arrayArgs( args ).map( compatibleArgument );
	}
	
	var compatibleCallback = function( origCallback ){
		return function(){
			
			// convert to compatible arguments
			if( arguments.length ) {
				var args = compatibleArguments(arguments);
			
			// add default argument for 'ready', 'append' and 'load' events
			} else {
				var args = [ $(document) ];
			}
			
			// return
			return origCallback.apply(this, args);
		}
	}
	
	_acf.add_action = function( action, callback, priority, context ){
		
		// handle multiple actions
		var actions = action.split(' ');
		var length = actions.length;
		if( length > 1 ) {
			for( var i = 0; i < length; i++) {
				action = actions[i];
				_acf.add_action.apply(this, arguments);
			}
			return this;
		}
		
		// single
		var callback = compatibleCallback(callback);
		return acf.addAction.apply(this, arguments);
	};
	
	_acf.add_filter = function( action, callback, priority, context ){
		var callback = compatibleCallback(callback);
		return acf.addFilter.apply(this, arguments);
	};

	/*
	*  acf.model
	*
	*  This model acts as a scafold for action.event driven modules
	*
	*  @type	object
	*  @date	8/09/2014
	*  @since	5.0.0
	*
	*  @param	(object)
	*  @return	(object)
	*/
	
	_acf.model = {
		actions: {},
		filters: {},
		events: {},
		extend: function( args ){
			
			// extend
			var model = $.extend( {}, this, args );
			
			// setup actions
			$.each(model.actions, function( name, callback ){
				model._add_action( name, callback );
			});
			
			// setup filters
			$.each(model.filters, function( name, callback ){
				model._add_filter( name, callback );
			});
			
			// setup events
			$.each(model.events, function( name, callback ){
				model._add_event( name, callback );
			});
			
			// return
			return model;
		},
		
		_add_action: function( name, callback ) {
			
			// split
			var model = this,
				data = name.split(' ');
			
			// add missing priority
			var name = data[0] || '',
				priority = data[1] || 10;
			
			// add action
			acf.add_action(name, model[ callback ], priority, model);
			
		},
		
		_add_filter: function( name, callback ) {
			
			// split
			var model = this,
				data = name.split(' ');
			
			// add missing priority
			var name = data[0] || '',
				priority = data[1] || 10;
			
			// add action
			acf.add_filter(name, model[ callback ], priority, model);
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this,
				i = name.indexOf(' '),
				event = (i > 0) ? name.substr(0,i) : name,
				selector = (i > 0) ? name.substr(i+1) : '';
			
			// event
			var fn = function( e ){
				
				// append $el to event object
				e.$el = $(this);
				
				// append $field to event object (used in field group)
				if( acf.field_group ) {
					e.$field = e.$el.closest('.acf-field-object');
				}
				
				// event
				if( typeof model.event === 'function' ) {
					e = model.event( e );
				}
				
				// callback
				model[ callback ].apply(model, arguments);
				
			};
			
			// add event
			if( selector ) {
				$(document).on(event, selector, fn);
			} else {
				$(document).on(event, fn);
			}
		},
		
		get: function( name, value ){
			
			// defaults
			value = value || null;
			
			// get
			if( typeof this[ name ] !== 'undefined' ) {
				value = this[ name ];
			}
			
			// return
			return value;
		},
		
		set: function( name, value ){
			
			// set
			this[ name ] = value;
			
			// function for 3rd party
			if( typeof this[ '_set_' + name ] === 'function' ) {
				this[ '_set_' + name ].apply(this);
			}
			
			// return for chaining
			return this;
		}
	};
	
	/*
	*  field
	*
	*  This model sets up many of the field's interactions
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	_acf.field = acf.model.extend({
		type:		'',
		o:			{},
		$field:		null,
		_add_action: function( name, callback ) {
			
			// vars
			var model = this;
			
			// update name
			name = name + '_field/type=' + model.type;
			
			// add action
			acf.add_action(name, function( $field ){
				
				// focus
				model.set('$field', $field);
				
				// callback
				model[ callback ].apply(model, arguments);
			});
		},
		
		_add_filter: function( name, callback ) {
			
			// vars
			var model = this;
			
			// update name
			name = name + '_field/type=' + model.type;
			
			// add action
			acf.add_filter(name, function( $field ){
				
				// focus
				model.set('$field', $field);
				
				// callback
				model[ callback ].apply(model, arguments);
			});
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this,
				event = name.substr(0,name.indexOf(' ')),
				selector = name.substr(name.indexOf(' ')+1),
				context = acf.get_selector(model.type);
			
			// add event
			$(document).on(event, context + ' ' + selector, function( e ){
				
				// vars
				var $el = $(this);
				var $field = acf.get_closest_field( $el, model.type );
				
				// bail early if no field
				if( !$field.length ) return;
				
				// focus
				if( !$field.is(model.$field) ) {
					model.set('$field', $field);
				}
				
				// append to event
				e.$el = $el;
				e.$field = $field;
				
				// callback
				model[ callback ].apply(model, [e]);
			});
		},
		
		_set_$field: function(){
			
			// callback
			if( typeof this.focus === 'function' ) {
				this.focus();
			}
		},
		
		// depreciated
		doFocus: function( $field ){
			return this.set('$field', $field);
		}
	});
	
	
	/**
	*  validation
	*
	*  description
	*
	*  @date	15/2/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var _validation = acf.newCompatibility(acf.validation, {
		remove_error: function( $field ){
			acf.getField( $field ).removeError();
		},
		add_warning: function( $field, message ){
			acf.getField( $field ).showNotice({
				text: message,
				type: 'warning',
				timeout: 1000
			});
		},
		fetch:			acf.validateForm,
		enableSubmit: 	acf.enableSubmit,
		disableSubmit: 	acf.disableSubmit,
		showSpinner:	acf.showSpinner,
		hideSpinner:	acf.hideSpinner,
		unlockForm:		acf.unlockForm,
		lockForm:		acf.lockForm
	});
	
	
	/**
	*  tooltip
	*
	*  description
	*
	*  @date	15/2/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	_acf.tooltip = {
		
		tooltip: function( text, $el ){
			
			var tooltip = acf.newTooltip({
				text: text,
				target: $el
			});
			
			// return
			return tooltip.$el;
		},
		
		temp: function( text, $el ){
			
			var tooltip = acf.newTooltip({
				text: text,
				target: $el,
				timeout: 250
			});
		},
		
		confirm: function( $el, callback, text, button_y, button_n ){
			
			var tooltip = acf.newTooltip({
				confirm: true,
				text: text,
				target: $el,
				confirm: function(){
					callback(true);
				},
				cancel: function(){
					callback(false);
				}
			});
		},
		
		confirm_remove: function( $el, callback ){
			
			var tooltip = acf.newTooltip({
				confirmRemove: true,
				target: $el,
				confirm: function(){
					callback(true);
				},
				cancel: function(){
					callback(false);
				}
			});
		},
	};
	
	/**
	*  tooltip
	*
	*  description
	*
	*  @date	15/2/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	_acf.media = new acf.Model({
		activeFrame: false,
		actions: {
			'new_media_popup': 'onNewMediaPopup'
		},
		
		frame: function(){
			return this.activeFrame;
		},
		
		onNewMediaPopup: function( popup ){
			this.activeFrame = popup.frame;
		},
		
		popup: function( props ){
			
			// update props
			if( props.mime_types ) {
				props.allowedTypes = props.mime_types;
			}
			if( props.id ) {
				props.attachment = props.id;
			}
			
			// new
			var popup = acf.newMediaPopup( props );
			
			// append
/*
			if( props.selected ) {
				popup.selected = props.selected;
			}
*/
			
			// return
			return popup.frame;
		}
	});
	
	
	/**
	*  Select2
	*
	*  description
	*
	*  @date	11/6/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	_acf.select2 = {
		init: function( $select, args, $field ){
			
			// compatible args
			if( args.allow_null ) {
				args.allowNull = args.allow_null;
			}
			if( args.ajax_action ) {
				args.ajaxAction = args.ajax_action;
			}
			if( $field ) {
				args.field = acf.getField($field);
			}
			
			// return
			return acf.newSelect2( $select, args );	
		},
		
		destroy: function( $select ){
			return acf.getInstance( $select ).destroy();
			
		},
	};
	
	/**
	*  postbox
	*
	*  description
	*
	*  @date	11/6/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	_acf.postbox = {
		render: function( args ){
			
			// compatible args
			if( args.edit_url ) {
				args.editLink = args.edit_url;
			}
			if( args.edit_title ) {
				args.editTitle = args.edit_title;
			}
			
			// return
			return acf.newPostbox( args );
		}
	};
	
	/**
	*  acf.screen
	*
	*  description
	*
	*  @date	11/6/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newCompatibility(acf.screen, {
		update: function(){
			return this.set.apply(this, arguments);
		},
		fetch: acf.screen.check
	});
	_acf.ajax = acf.screen;
	
})(jQuery);