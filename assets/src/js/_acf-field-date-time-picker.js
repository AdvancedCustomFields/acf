( function ( $, undefined ) {
	var Field = acf.models.DatePickerField.extend( {
		type: 'date_time_picker',

		$control: function () {
			return this.$( '.acf-date-time-picker' );
		},

		setValue: function ( val ) {
			// Update the hidden input with the save format value (yy-mm-dd HH:mm:ss).
			acf.val( this.$input(), val );

			// Update the visible text input.
			const $inputText = this.$inputText();
			if ( val && $inputText.length ) {
				try {
					// Split into date and time parts.
					const parts = val.split( ' ' );
					const datePart = parts[ 0 ] || '';
					const timePart = parts[ 1 ] || '';

					const date = $.datepicker.parseDate( 'yy-mm-dd', datePart );
					const dateFormat = this.get( 'date_format' ) || $inputText.datetimepicker( 'option', 'dateFormat' );
					const timeFormat = this.get( 'time_format' ) || $inputText.datetimepicker( 'option', 'timeFormat' );

					const displayDate = $.datepicker.formatDate( dateFormat, date );
					let displayTime = timePart;
					const timeMatch = timePart.match( /^(\d{2}):(\d{2}):(\d{2})$/ );
					if ( timeMatch && $.datepicker.formatTime ) {
						displayTime = $.datepicker.formatTime( timeFormat, {
							hour: parseInt( timeMatch[ 1 ], 10 ),
							minute: parseInt( timeMatch[ 2 ], 10 ),
							second: parseInt( timeMatch[ 3 ], 10 ),
						} );
					}

					$inputText.val( displayDate + ' ' + displayTime );
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
				dateFormat: this.get( 'date_format' ),
				timeFormat: this.get( 'time_format' ),
				altField: $input,
				altFieldTimeOnly: false,
				altFormat: 'yy-mm-dd',
				altTimeFormat: 'HH:mm:ss',
				changeYear: true,
				yearRange: '-100:+100',
				changeMonth: true,
				showButtonPanel: true,
				firstDay: this.get( 'first_day' ),
				controlType: 'select',
				oneLine: true,
			};

			// filter
			args = acf.applyFilters( 'date_time_picker_args', args, this );

			// add date time picker
			acf.newDateTimePicker( $inputText, args );

			if ( 1 === $inputText.data( 'default-to-today' ) && ! $input.val() ) {
				const now = new Date();
				const formattedDateForHuman = $.datepicker.formatDate(args.dateFormat, now);
				const formattedTimeForHuman = $.datepicker.formatTime(args.timeFormat, {
					hour: now.getHours(),
					minute: now.getMinutes(),
					second: now.getSeconds(),
				});

				$inputText.val( `${formattedDateForHuman} ${formattedTimeForHuman}` );

				const formattedDateForSave = $.datepicker.formatDate('yy-mm-dd', now);
				const formattedTimeForSave = $.datepicker.formatTime('hh:mm:ss', {
					hour: now.getHours(),
					minute: now.getMinutes(),
					second: now.getSeconds(),
				});
				
				$input.val( `${formattedDateForSave} ${formattedTimeForSave}` );
			}

			// action
			acf.doAction( 'date_time_picker_init', $inputText, args, this );

		},
	} );

	acf.registerFieldType( Field );

	// manager
	var dateTimePickerManager = new acf.Model( {
		priority: 5,
		wait: 'ready',
		initialize: function () {
			// vars
			var locale = acf.get( 'locale' );
			var rtl = acf.get( 'rtl' );
			var l10n = acf.get( 'dateTimePickerL10n' );

			// bail early if no l10n
			if ( ! l10n ) {
				return false;
			}

			// bail early if no datepicker library
			if ( typeof $.timepicker === 'undefined' ) {
				return false;
			}

			// rtl
			l10n.isRTL = rtl;

			// append
			$.timepicker.regional[ locale ] = l10n;
			$.timepicker.setDefaults( l10n );
		},
	} );

	// add
	acf.newDateTimePicker = function ( $input, args ) {
		// bail early if no datepicker library
		if ( typeof $.timepicker === 'undefined' ) {
			return false;
		}

		// defaults
		args = args || {};

		// initialize
		$input.datetimepicker( args );

		// wrap the datepicker (only if it hasn't already been wrapped)
		if ( $( 'body > #ui-datepicker-div' ).exists() ) {
			$( 'body > #ui-datepicker-div' ).wrap(
				'<div class="acf-ui-datepicker" />'
			);
		}
	};
} )( jQuery );
