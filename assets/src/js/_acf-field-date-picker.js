( function ( $, undefined ) {
	var Field = acf.Field.extend( {
		type: 'date_picker',

		events: {
			'blur input[type="text"]': 'onBlur',
			duplicateField: 'onDuplicate',
		},

		$control: function () {
			return this.$( '.acf-date-picker' );
		},

		$input: function () {
			return this.$( 'input[type="hidden"]' );
		},

		$inputText: function () {
			return this.$( 'input[type="text"]' );
		},

		initialize: function () {
			// save_format: compatibility with ACF < 5.0.0
			if ( this.has( 'save_format' ) ) {
				return this.initializeCompatibility();
			}

			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();

			// args
			var args = {
				dateFormat: this.get( 'date_format' ),
				altField: $input,
				altFormat: 'yymmdd',
				changeYear: true,
				yearRange: '-100:+100',
				changeMonth: true,
				showButtonPanel: true,
				firstDay: this.get( 'first_day' ),
			};

			// filter
			args = acf.applyFilters( 'date_picker_args', args, this );

			// add date picker
			acf.newDatePicker( $inputText, args );

			if ( 1 === $inputText.data( 'default-to-today' ) && ! $input.val() ) {
				const now = new Date();

				const formattedDateForHuman = $.datepicker.formatDate(args.dateFormat, now);
				$inputText.val( `${formattedDateForHuman}` );

				const formattedForSave = $.datepicker.formatDate('yymmdd', now);
				$input.val( `${formattedForSave}` );
			}

			// action
			acf.doAction( 'date_picker_init', $inputText, args, this );
		},

		initializeCompatibility: function () {
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();

			// get and set value from alt field
			$inputText.val( $input.val() );

			// args
			var args = {
				dateFormat: this.get( 'date_format' ),
				altField: $input,
				altFormat: this.get( 'save_format' ),
				changeYear: true,
				yearRange: '-100:+100',
				changeMonth: true,
				showButtonPanel: true,
				firstDay: this.get( 'first_day' ),
			};

			// filter for 3rd party customization
			args = acf.applyFilters( 'date_picker_args', args, this );


			// backup
			var dateFormat = args.dateFormat;

			// change args.dateFormat
			args.dateFormat = this.get( 'save_format' );

			// add date picker
			acf.newDatePicker( $inputText, args );

			// now change the format back to how it should be.
			$inputText.datepicker( 'option', 'dateFormat', dateFormat );

			// action for 3rd party customization
			acf.doAction( 'date_picker_init', $inputText, args, this );
		},

		setValue: function ( val ) {
			// Update the hidden input with the save format value.
			acf.val( this.$input(), val );

			// Update the visible text input.
			const $inputText = this.$inputText();
			if ( val && $inputText.length ) {
				try {
					// Parse the save format (yymmdd) and format for display.
					const date = $.datepicker.parseDate( 'yymmdd', val );
					const displayFormat = this.get( 'date_format' ) || $inputText.datepicker( 'option', 'dateFormat' );
					$inputText.val( $.datepicker.formatDate( displayFormat, date ) );
				} catch ( e ) {
					$inputText.val( val );
				}
			} else {
				$inputText.val( '' );
			}
		},

		onBlur: function () {
			if ( ! this.$inputText().val() ) {
				acf.val( this.$input(), '' );
			}
		},

		onDuplicate: function ( e, $el, $duplicate ) {
			$duplicate
				.find( 'input[type="text"]' )
				.removeClass( 'hasDatepicker' )
				.removeAttr( 'id' );
		},
	} );

	acf.registerFieldType( Field );

	// manager
	var datePickerManager = new acf.Model( {
		priority: 5,
		wait: 'ready',
		initialize: function () {
			// vars
			var locale = acf.get( 'locale' );
			var rtl = acf.get( 'rtl' );
			var l10n = acf.get( 'datePickerL10n' );

			// bail early if no l10n
			if ( ! l10n ) {
				return false;
			}

			// bail early if no datepicker library
			if ( typeof $.datepicker === 'undefined' ) {
				return false;
			}

			// rtl
			l10n.isRTL = rtl;

			// append
			$.datepicker.regional[ locale ] = l10n;
			$.datepicker.setDefaults( l10n );
		},
	} );

	// add
	acf.newDatePicker = function ( $input, args ) {
		// bail early if no datepicker library
		if ( typeof $.datepicker === 'undefined' ) {
			return false;
		}

		// defaults
		args = args || {};

		// initialize
		$input.datepicker( args );

		// wrap the datepicker (only if it hasn't already been wrapped)
		if ( $( 'body > #ui-datepicker-div' ).exists() ) {
			$( 'body > #ui-datepicker-div' ).wrap(
				'<div class="acf-ui-datepicker" />'
			);
		}
	};
} )( jQuery );
