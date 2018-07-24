(function($, undefined){
	
	/**
	*  acf.findFieldObject
	*
	*  Returns a single fieldObject $el for a given field key
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	string key The field key
	*  @return	jQuery
	*/
	
	acf.findFieldObject = function( key ){
		return acf.findFieldObjects({
			key: key,
			limit: 1
		});
	};
	
	/**
	*  acf.findFieldObjects
	*
	*  Returns an array of fieldObject $el for the given args
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	object args
	*  @return	jQuery
	*/
	
	acf.findFieldObjects = function( args ){
		
		// vars
		args = args || {};
		var selector = '.acf-field-object';
		var $fields = false;
		
		// args
		args = acf.parseArgs(args, {
			id: '',
			key: '',
			type: '',
			limit: false,
			list: null,
			parent: false,
			sibling: false,
			child: false,
		});
		
		// id
		if( args.id ) {
			selector += '[data-id="' + args.id + '"]';
		}
		
		// key
		if( args.key ) {
			selector += '[data-key="' + args.key + '"]';
		}
		
		// type
		if( args.type ) {
			selector += '[data-type="' + args.type + '"]';
		}
		
		// query
		if( args.list ) {
			$fields = args.list.children( selector );
		} else if( args.parent ) {
			$fields = args.parent.find( selector );
		} else if( args.sibling ) {
			$fields = args.sibling.siblings( selector );
		} else if( args.child ) {
			$fields = args.child.parents( selector );
		} else {
			$fields = $( selector );
		}
		
		// limit
		if( args.limit ) {
			$fields = $fields.slice( 0, args.limit );
		}
		
		// return
		return $fields;
	};
	
	/**
	*  acf.getFieldObject
	*
	*  Returns a single fieldObject instance for a given $el|key
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	string|jQuery $field The field $el or key
	*  @return	jQuery
	*/
	
	acf.getFieldObject = function( $field ){
		
		// allow key
		if( typeof $field === 'string' ) {
			$field = acf.findFieldObject( $field );
		}
		
		// instantiate
		var field = $field.data('acf');
		if( !field ) {
			field = acf.newFieldObject( $field );
		}
		
		// return
		return field;
	};
	
	/**
	*  acf.getFieldObjects
	*
	*  Returns an array of fieldObject instances for the given args
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	object args
	*  @return	array
	*/
	
	acf.getFieldObjects = function( args ){
		
		// query
		var $fields = acf.findFieldObjects( args );
		
		// loop
		var fields = [];
		$fields.each(function(){
			var field = acf.getFieldObject( $(this) );
			fields.push( field );
		});
		
		// return
		return fields;
	};
	
	/**
	*  acf.newFieldObject
	*
	*  Initializes and returns a new FieldObject instance
	*
	*  @date	1/2/18
	*  @since	5.7.0
	*
	*  @param	jQuery $field The field $el
	*  @return	object
	*/
	
	acf.newFieldObject = function( $field ){
		
		// instantiate
		var field = new acf.FieldObject( $field );
		
		// action
		acf.doAction('new_field_object', field);
		
		// return
		return field;
	};
	
	/**
	*  actionManager
	*
	*  description
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var eventManager = new acf.Model({
		
		priority: 5,
		
		initialize: function(){
			
			// actions
			var actions = [
				'prepare',
				'ready',
				'append',
				'remove'
			];
			
			// loop
			actions.map(function( action ){
				this.addFieldActions( action );
			}, this);
		},
		
		addFieldActions: function( action ){
			
			// vars
			var pluralAction = action + '_field_objects';	// ready_field_objects
			var singleAction = action + '_field_object';	// ready_field_object
			var singleEvent = action + 'FieldObject';		// readyFieldObject
			
			// global action
			var callback = function( $el /*, arg1, arg2, etc*/ ){
				
				// vars
				var fieldObjects = acf.getFieldObjects({ parent: $el });
				
				// call plural
				if( fieldObjects.length ) {
					
					/// get args [$el, arg1]
					var args = acf.arrayArgs( arguments );
					
					// modify args [pluralAction, fields, arg1]
					args.splice(0, 1, pluralAction, fieldObjects);
					acf.doAction.apply(null, args);
				}
			};
			
			// plural action
			var pluralCallback = function( fieldObjects /*, arg1, arg2, etc*/ ){
				
				/// get args [fields, arg1]
				var args = acf.arrayArgs( arguments );
				
				// modify args [singleAction, fields, arg1]
				args.unshift(singleAction);
					
				// loop
				fieldObjects.map(function( fieldObject ){
					
					// modify args [singleAction, field, arg1]
					args[1] = fieldObject;
					acf.doAction.apply(null, args);
				});
			};
			
			// single action
			var singleCallback = function( fieldObject /*, arg1, arg2, etc*/ ){
				
				/// get args [$field, arg1]
				var args = acf.arrayArgs( arguments );
				
				// modify args [singleAction, $field, arg1]
				args.unshift(singleAction);
				
				// action variations (ready_field/type=image)
				var variations = ['type', 'name', 'key'];
				variations.map(function( variation ){
					args[0] = singleAction + '/' + variation + '=' + fieldObject.get(variation);
					acf.doAction.apply(null, args);
				});
				
				// modify args [arg1]
				args.splice(0, 2);

				// event
				fieldObject.trigger(singleEvent, args);
			};
			
			// add actions
			acf.addAction(action, callback, 5);
			acf.addAction(pluralAction, pluralCallback, 5);
			acf.addAction(singleAction, singleCallback, 5);
			
		}
	});		
	
	/**
	*  fieldManager
	*
	*  description
	*
	*  @date	4/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var fieldManager = new acf.Model({
		
		id: 'fieldManager',
		
		events: {
			'submit #post':					'onSubmit',
			'mouseenter .acf-field-list': 	'onHoverSortable',
			'click .add-field':				'onClickAdd',
		},
		
		actions: {
			'removed_field_object':			'onRemovedField',
			'sortstop_field_object':		'onReorderField',
			'delete_field_object':			'onDeleteField',
			'change_field_object_type':		'onChangeFieldType',
			'duplicate_field_object':		'onDuplicateField'
		},
		
		onSubmit: function( e, $el ){
			
			// vars
			var fields = acf.getFieldObjects();
			
			// loop
			fields.map(function( field ){
				field.submit();
			});
		},
		
		setFieldMenuOrder: function( field ){
			this.renderFields( field.$el.parent() );
		},
		
		onHoverSortable: function( e, $el ){
			
			// bail early if already sortable
			if( $el.hasClass('ui-sortable') ) return;
			
			// sortable
			$el.sortable({
				handle: '.acf-sortable-handle',
				connectWith: '.acf-field-list',
				start: function( e, ui ){
					var field = acf.getFieldObject( ui.item );
			        ui.placeholder.height( ui.item.height() );
			        acf.doAction('sortstart_field_object', field, $el);
			    },
				update: function( e, ui ){
					var field = acf.getFieldObject( ui.item );
					acf.doAction('sortstop_field_object', field, $el);
				}
			});
		},
		
		onRemovedField: function( field, $list ){
			this.renderFields( $list );
		},
		
		onReorderField: function( field, $list ){
			field.updateParent();
			this.renderFields( $list );
		},
		
		onDeleteField: function( field ){
			
			// delete children
			field.getFields().map(function( child ){
				child.delete({ animate: false });
			});
		},
		
		onChangeFieldType: function( field ){
			// this caused sub fields to disapear if changing type back...
			//this.onDeleteField( field );	
		},
		
		onDuplicateField: function( field, newField ){
			
			// check for children
			var children = newField.getFields();
			if( children.length ) {
				
				// loop
				children.map(function( child ){
					
					// wipe field
					child.wipe();
					
					// update parent
					child.updateParent();
				});
			
				// action
				acf.doAction('duplicate_field_objects', children, newField, field);
			}
			
			// set menu order
			this.setFieldMenuOrder( newField );
		},
		
		renderFields: function( $list ){
			
			// vars
			var fields = acf.getFieldObjects({
				list: $list
			});
			
			// no fields
			if( !fields.length ) {
				$list.addClass('-empty');
				return;
			}
			
			// has fields
			$list.removeClass('-empty');
			
			// prop
			fields.map(function( field, i ){
				field.prop('menu_order', i);
			});
		},
		
		onClickAdd: function( e, $el ){
			var $list = $el.closest('.acf-tfoot').siblings('.acf-field-list');
			this.addField( $list );
		},
		
		addField: function( $list ){
			
			// vars
			var html = $('#tmpl-acf-field').html();
			var $el = $(html);
			var prevId = $el.data('id');
			var newKey = acf.uniqid('field_');
			
			// duplicate
			var $newField = acf.duplicate({
				target: $el,
				search: prevId,
				replace: newKey,
				append: function( $el, $el2 ){ 
					$list.append( $el2 );
				}
			});
			
			// get instance
			var newField = acf.getFieldObject( $newField );
			
			// props
			newField.prop('key', newKey);
			newField.prop('ID', 0);
			newField.prop('label', '');
			newField.prop('name', '');
			
			// attr
			$newField.attr('data-key', newKey);
			$newField.attr('data-id', newKey);
			
			// update parent prop
			newField.updateParent();
			
			// focus label
			var $label = newField.$input('label');
			setTimeout(function(){
	        	$label.focus();
	        }, 251);
	        
	        // open
			newField.open();
			
			// set menu order
			this.renderFields( $list );
			
			// action
			acf.doAction('add_field_object', newField);
			acf.doAction('append_field_object', newField);
		}
	});
	
})(jQuery);