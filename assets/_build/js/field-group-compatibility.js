(function($, undefined){
	
	var _acf = acf.getCompatibility( acf );
	
	/**
	*  fieldGroupCompatibility
	*
	*  Compatibility layer for extinct acf.field_group 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	_acf.field_group = {
		
		save_field: function( $field, type ){
			type = (type !== undefined) ? type : 'settings';
			acf.getFieldObject( $field ).save( type );
		},
		
		delete_field: function( $field, animate ){
			animate = (animate !== undefined) ? animate : true;
			acf.getFieldObject( $field ).delete({
				animate: animate
			});
		},
		
		update_field_meta: function( $field, name, value ){
			acf.getFieldObject( $field ).prop( name, value );
		},
		
		delete_field_meta: function( $field, name ){
			acf.getFieldObject( $field ).prop( name, null );
		}
	};
	
	/**
	*  fieldGroupCompatibility.field_object
	*
	*  Compatibility layer for extinct acf.field_group.field_object
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	_acf.field_group.field_object = acf.model.extend({
		
		// vars
		type:		'',
		o:			{},
		$field:		null,
		$settings:	null,
		
		tag: function( tag ) {
			
			// vars
			var type = this.type;
			
			
			// explode, add 'field' and implode
			// - open 			=> open_field
			// - change_type	=> change_field_type
			var tags = tag.split('_');
			tags.splice(1, 0, 'field');
			tag = tags.join('_');
			
			
			// add type
			if( type ) {
				tag += '/type=' + type;
			}
			
			
			// return
			return tag;
						
		},
		
		selector: function(){
			
			// vars
			var selector = '.acf-field-object';
			var type = this.type;
			

			// add type
			if( type ) {
				selector += '-' + type;
				selector = acf.str_replace('_', '-', selector);
			}
			
			
			// return
			return selector;
			
		},
		
		_add_action: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// add action
			acf.add_action( this.tag(name), function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_filter: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// add action
			acf.add_filter( this.tag(name), function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this;
			var event = name.substr(0,name.indexOf(' '));
			var selector = name.substr(name.indexOf(' ')+1);
			var context = this.selector();
			
			
			// add event
			$(document).on(event, context + ' ' + selector, function( e ){
				
				// append $el to event object
				e.$el = $(this);
				e.$field = e.$el.closest('.acf-field-object');
				
				
				// focus
				model.set('$field', e.$field);
				
				
				// callback
				model[ callback ].apply(model, [e]);
				
			});
			
		},
		
		_set_$field: function(){
			
			// vars
			this.o = this.$field.data();
			
			
			// els
			this.$settings = this.$field.find('> .settings > table > tbody');
			
			
			// focus
			this.focus();
			
		},
		
		focus: function(){
			
			// do nothing
			
		},
		
		setting: function( name ) {
			
			return this.$settings.find('> .acf-field-setting-' + name);
			
		}
		
	});
	
	
	/*
	*  field
	*
	*  This model fires actions and filters for registered fields
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var actionManager = new acf.Model({
		
		actions: {
			'open_field_object': 			'onOpenFieldObject',
			'close_field_object': 			'onCloseFieldObject',
			'add_field_object': 			'onAddFieldObject',
			'duplicate_field_object': 		'onDuplicateFieldObject',
			'delete_field_object': 			'onDeleteFieldObject',
			'change_field_object_type': 	'onChangeFieldObjectType',
			'change_field_object_label': 	'onChangeFieldObjectLabel',
			'change_field_object_name': 	'onChangeFieldObjectName',
			'change_field_object_parent': 	'onChangeFieldObjectParent',
			'sortstop_field_object':		'onChangeFieldObjectParent'
		},
		
		onOpenFieldObject: function( field ){
			acf.doAction('open_field', field.$el);
			acf.doAction('open_field/type=' + field.get('type'), field.$el);
			
			acf.doAction('render_field_settings', field.$el);
			acf.doAction('render_field_settings/type=' + field.get('type'), field.$el);
		},
		
		onCloseFieldObject: function( field ){
			acf.doAction('close_field', field.$el);
			acf.doAction('close_field/type=' + field.get('type'), field.$el);
		},
		
		onAddFieldObject: function( field ){
			acf.doAction('add_field', field.$el);
			acf.doAction('add_field/type=' + field.get('type'), field.$el);
		},
		
		onDuplicateFieldObject: function( field ){
			acf.doAction('duplicate_field', field.$el);
			acf.doAction('duplicate_field/type=' + field.get('type'), field.$el);
		},
		
		onDeleteFieldObject: function( field ){
			acf.doAction('delete_field', field.$el);
			acf.doAction('delete_field/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectType: function( field ){
			acf.doAction('change_field_type', field.$el);
			acf.doAction('change_field_type/type=' + field.get('type'), field.$el);
			
			acf.doAction('render_field_settings', field.$el);
			acf.doAction('render_field_settings/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectLabel: function( field ){
			acf.doAction('change_field_label', field.$el);
			acf.doAction('change_field_label/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectName: function( field ){
			acf.doAction('change_field_name', field.$el);
			acf.doAction('change_field_name/type=' + field.get('type'), field.$el);
		},
		
		onChangeFieldObjectParent: function( field ){
			acf.doAction('update_field_parent', field.$el);
		}
	});
	
})(jQuery);