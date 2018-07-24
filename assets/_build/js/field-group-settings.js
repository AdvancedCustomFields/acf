(function($, undefined){
	
	/**
	*  mid
	*
	*  Calculates the model ID for a field type
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	string type
	*  @return	string
	*/
	
	var modelId = function( type ) {
		return acf.strPascalCase( type || '' ) + 'FieldSetting';
	};
	
	/**
	*  registerFieldType
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerFieldSetting = function( model ){
		var proto = model.prototype;
		var mid = modelId(proto.type + ' ' + proto.name);
		this.models[ mid ] = model;
	};
	
	/**
	*  newField
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newFieldSetting = function( field ){
		
		// vars
		var type = field.get('setting') || '';
		var name = field.get('name') || '';
		var mid = modelId( type + ' ' + name );
		var model = acf.models[ mid ] || null;
		
		// bail ealry if no setting
		if( model === null ) return false;
		
		// instantiate
		var setting = new model( field );
		
		// return
		return setting;
	};
	
	/**
	*  acf.getFieldSetting
	*
	*  description
	*
	*  @date	19/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldSetting = function( field ) {
		
		// allow jQuery
		if( field instanceof jQuery ) {
			field = acf.getField(field);
		}
		
		// return
		return field.setting;
	};
	
	/**
	*  settingsManager
	*
	*  description
	*
	*  @date	6/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var settingsManager = new acf.Model({
		actions: {
			'new_field': 'onNewField'
		},
		onNewField: function( field ){
			field.setting = acf.newFieldSetting( field );
		}
	});
	
	/**
	*  acf.FieldSetting
	*
	*  description
	*
	*  @date	6/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.FieldSetting = acf.Model.extend({

		field: false,
		type: '',
		name: '',
		wait: 'ready',
		eventScope: '.acf-field',
		
		events: {
			'change': 'render'
		},
		
		setup: function( field ){
			
			// vars
			var $field = field.$el;
			
			// set props
			this.$el = $field;
			this.field = field;
			this.$fieldObject = $field.closest('.acf-field-object');
			this.fieldObject = acf.getFieldObject( this.$fieldObject );
			
			// inherit data
			$.extend(this.data, field.data);
		},
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			// do nothing
		}
	});
	
	/*
	*  Date Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var DisplayFormatFieldSetting = acf.FieldSetting.extend({
		type: '',
		name: '',
		render: function(){
			var $input = this.$('input[type="radio"]:checked');
			if( $input.val() != 'other' ) {
				this.$('input[type="text"]').val( $input.val() );
			}
		}
	});
	
	var DatePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_picker',
		name: 'display_format'
	});
	
	var DatePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( DatePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DatePickerReturnFormatFieldSetting );
	
	/*
	*  Date Time Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var DateTimePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_time_picker',
		name: 'display_format'
	});
	
	var DateTimePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'date_time_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( DateTimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DateTimePickerReturnFormatFieldSetting );
	
	/*
	*  Time Picker
	*
	*  This field type requires some extra logic for its settings
	*
	*  @type	function
	*  @date	24/10/13
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var TimePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend({
		type: 'time_picker',
		name: 'display_format'
	});
	
	var TimePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend({
		name: 'time_picker',
		name: 'return_format'
	});
	
	acf.registerFieldSetting( TimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( TimePickerReturnFormatFieldSetting );
	
})(jQuery);