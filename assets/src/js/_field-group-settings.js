( function ( $, undefined ) {
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

	var modelId = function ( type ) {
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

	acf.registerFieldSetting = function ( model ) {
		var proto = model.prototype;
		var mid = modelId( proto.type + ' ' + proto.name );
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

	acf.newFieldSetting = function ( field ) {
		// vars
		var type = field.get( 'setting' ) || '';
		var name = field.get( 'name' ) || '';
		var mid = modelId( type + ' ' + name );
		var model = acf.models[ mid ] || null;

		// bail early if no setting
		if ( model === null ) return false;

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

	acf.getFieldSetting = function ( field ) {
		// allow jQuery
		if ( field instanceof jQuery ) {
			field = acf.getField( field );
		}

		// return
		return field.setting;
	};

	/**
	 * settingsManager
	 *
	 * @since	5.6.5
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var settingsManager = new acf.Model( {
		actions: {
			new_field: 'onNewField',
		},
		onNewField: function ( field ) {
			field.setting = acf.newFieldSetting( field );
		},
	} );

	/**
	 * acf.FieldSetting
	 *
	 * @since	5.6.5
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	acf.FieldSetting = acf.Model.extend( {
		field: false,
		type: '',
		name: '',
		wait: 'ready',
		eventScope: '.acf-field',

		events: {
			change: 'render',
		},

		setup: function ( field ) {
			// vars
			var $field = field.$el;

			// set props
			this.$el = $field;
			this.field = field;
			this.$fieldObject = $field.closest( '.acf-field-object' );
			this.fieldObject = acf.getFieldObject( this.$fieldObject );

			// inherit data
			$.extend( this.data, field.data );
		},

		initialize: function () {
			this.render();
		},

		render: function () {
			// do nothing
		},
	} );

	/**
	 * Accordion and Tab Endpoint Settings
	 *
	 * The 'endpoint' setting on accordions and tabs requires an additional class on the
	 * field object row when enabled.
	 *
	 * @since	6.0.0
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var EndpointFieldSetting = acf.FieldSetting.extend( {
		type: '',
		name: '',
		render: function () {
			var $endpoint_setting = this.fieldObject.$setting( 'endpoint' );
			var $endpoint_field = $endpoint_setting.find(
				'input[type="checkbox"]:first'
			);
			if ( $endpoint_field.is( ':checked' ) ) {
				this.fieldObject.$el.addClass( 'acf-field-is-endpoint' );
			} else {
				this.fieldObject.$el.removeClass( 'acf-field-is-endpoint' );
			}
		},
	} );

	var AccordionEndpointFieldSetting = EndpointFieldSetting.extend( {
		type: 'accordion',
		name: 'endpoint',
	} );

	var TabEndpointFieldSetting = EndpointFieldSetting.extend( {
		type: 'tab',
		name: 'endpoint',
	} );

	acf.registerFieldSetting( AccordionEndpointFieldSetting );
	acf.registerFieldSetting( TabEndpointFieldSetting );

	/**
	 * Date Picker
	 *
	 * This field type requires some extra logic for its settings
	 *
	 * @since	5.0.0
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var DisplayFormatFieldSetting = acf.FieldSetting.extend( {
		type: '',
		name: '',
		render: function () {
			var $input = this.$( 'input[type="radio"]:checked' );
			if ( $input.val() != 'other' ) {
				this.$( 'input[type="text"]' ).val( $input.val() );
			}
		},
	} );

	var DatePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend(
		{
			type: 'date_picker',
			name: 'display_format',
		}
	);

	var DatePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend( {
		type: 'date_picker',
		name: 'return_format',
	} );

	acf.registerFieldSetting( DatePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DatePickerReturnFormatFieldSetting );

	/**
	 * Date Time Picker
	 *
	 * This field type requires some extra logic for its settings
	 *
	 * @since	5.0.0
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var DateTimePickerDisplayFormatFieldSetting =
		DisplayFormatFieldSetting.extend( {
			type: 'date_time_picker',
			name: 'display_format',
		} );

	var DateTimePickerReturnFormatFieldSetting =
		DisplayFormatFieldSetting.extend( {
			type: 'date_time_picker',
			name: 'return_format',
		} );

	acf.registerFieldSetting( DateTimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( DateTimePickerReturnFormatFieldSetting );

	/**
	 * Time Picker
	 *
	 * This field type requires some extra logic for its settings
	 *
	 * @since	5.0.0
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var TimePickerDisplayFormatFieldSetting = DisplayFormatFieldSetting.extend(
		{
			type: 'time_picker',
			name: 'display_format',
		}
	);

	var TimePickerReturnFormatFieldSetting = DisplayFormatFieldSetting.extend( {
		type: 'time_picker',
		name: 'return_format',
	} );

	acf.registerFieldSetting( TimePickerDisplayFormatFieldSetting );
	acf.registerFieldSetting( TimePickerReturnFormatFieldSetting );

	/**
	 * Color Picker Settings.
	 *
	 * @date	16/12/20
	 * @since	5.9.4
	 *
	 * @param	object The object containing the extended variables and methods.
	 * @return	void
	 */
	var ColorPickerReturnFormat = acf.FieldSetting.extend( {
		type: 'color_picker',
		name: 'enable_opacity',
		render: function () {
			var $return_format_setting =
				this.fieldObject.$setting( 'return_format' );
			var $default_value_setting =
				this.fieldObject.$setting( 'default_value' );
			var $labelText = $return_format_setting
				.find( 'input[type="radio"][value="string"]' )
				.parent( 'label' )
				.contents()
				.last();
			var $defaultPlaceholder =
				$default_value_setting.find( 'input[type="text"]' );
			var l10n = acf.get( 'colorPickerL10n' );

			if ( this.field.val() ) {
				$labelText.replaceWith( l10n.rgba_string );
				$defaultPlaceholder.attr(
					'placeholder',
					'rgba(255,255,255,0.8)'
				);
			} else {
				$labelText.replaceWith( l10n.hex_string );
				$defaultPlaceholder.attr( 'placeholder', '#FFFFFF' );
			}
		},
	} );
	acf.registerFieldSetting( ColorPickerReturnFormat );
} )( jQuery );
