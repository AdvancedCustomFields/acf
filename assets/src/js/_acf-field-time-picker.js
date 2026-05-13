( function ( $, undefined ) {
	var Field = acf.models.DatePickerField.extend( {
		type: 'time_picker',

		$control: function () {
			return this.$( '.acf-time-picker' );
		},

		setValue: function ( val ) {
			// Update the hidden input with the save format value (HH:mm:ss).
			acf.val( this.$input(), val );

			// Update the visible text input.
			const $inputText = this.$inputText();
			if ( val && $inputText.length ) {
				try {
					const timeFormat = this.get( 'time_format' ) || $inputText.timepicker( 'option', 'timeFormat' );
					const timeMatch = val.match( /^(\d{2}):(\d{2}):(\d{2})$/ );
					if ( timeMatch && $.datepicker && $.datepicker.formatTime ) {
						const displayTime = $.datepicker.formatTime( timeFormat, {
							hour: parseInt( timeMatch[ 1 ], 10 ),
							minute: parseInt( timeMatch[ 2 ], 10 ),
							second: parseInt( timeMatch[ 3 ], 10 ),
						} );
						$inputText.val( displayTime );
					} else {
						$inputText.val( val );
					}
				} catch ( e ) {
					$inputText.val( val );
				}
			} else {
				$inputText.val( '' );
			}
		},

		initialize: function () {
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();

			// args
			var args = {
				timeFormat: this.get( 'time_format' ),
				altField: $input,
				altFieldTimeOnly: false,
				altTimeFormat: 'HH:mm:ss',
				showButtonPanel: true,
				controlType: 'select',
				oneLine: true,
				closeText: acf.get( 'dateTimePickerL10n' ).selectText,
				timeOnly: true,
			};

			// add custom 'Close = Select' functionality
			args.onClose = function ( value, dp_instance, t_instance ) {
				// vars
				var $close = dp_instance.dpDiv.find( '.ui-datepicker-close' );

				// if clicking close button
				if ( ! value && $close.is( ':hover' ) ) {
					t_instance._updateDateTime();
				}
			};

			// filter
			args = acf.applyFilters( 'time_picker_args', args, this );

			// add date time picker
			acf.newTimePicker( $inputText, args );

			// action
			acf.doAction( 'time_picker_init', $inputText, args, this );
		},
	} );

	acf.registerFieldType( Field );

	// add
	acf.newTimePicker = function ( $input, args ) {
		// bail early if no datepicker library
		if ( typeof $.timepicker === 'undefined' ) {
			return false;
		}

		// defaults
		args = args || {};

		// initialize
		$input.timepicker( args );

		// wrap the datepicker (only if it hasn't already been wrapped)
		if ( $( 'body > #ui-datepicker-div' ).exists() ) {
			$( 'body > #ui-datepicker-div' ).wrap(
				'<div class="acf-ui-datepicker" />'
			);
		}
	};
} )( jQuery );
