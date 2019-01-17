(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'date_picker',
		
		events: {
			'blur input[type="text"]': 'onBlur'
		},
		
		$control: function(){
			return this.$('.acf-date-picker');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		$inputText: function(){
			return this.$('input[type="text"]');
		},
				
		initialize: function(){
			
			// save_format: compatibility with ACF < 5.0.0
			if( this.has('save_format') ) {
				return this.initializeCompatibility();
			}
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// args
			var args = { 
				dateFormat:			this.get('date_format'),
				altField:			$input,
				altFormat:			'yymmdd',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day')
			};
			
			// filter
			args = acf.applyFilters('date_picker_args', args, this);
			
			// add date picker
			acf.newDatePicker( $inputText, args );
			
			// action
			acf.doAction('date_picker_init', $inputText, args, this);
			
		},
		
		initializeCompatibility: function(){
			
			// vars
			var $input = this.$input();
			var $inputText = this.$inputText();
			
			// get and set value from alt field
			$inputText.val( $input.val() );
			
			// args
			var args =  { 
				dateFormat:			this.get('date_format'),
				altField:			$input,
				altFormat:			this.get('save_format'),
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.get('first_day')
			};
			
			// filter for 3rd party customization
			args = acf.applyFilters('date_picker_args', args, this);
			
			// backup
			var dateFormat = args.dateFormat;
			
			// change args.dateFormat
			args.dateFormat = this.get('save_format');
				
			// add date picker
			acf.newDatePicker( $inputText, args );
			
			// now change the format back to how it should be.
			$inputText.datepicker( 'option', 'dateFormat', dateFormat );
			
			// action for 3rd party customization
			acf.doAction('date_picker_init', $inputText, args, this);
		},
		
		onBlur: function(){
			if( !this.$inputText().val() ) {
				acf.val( this.$input(), '' );
			}
		}
	});
	
	acf.registerFieldType( Field );
	
	
	// manager
	var datePickerManager = new acf.Model({
		priority: 5,
		wait: 'ready',
		initialize: function(){
			
			// vars
			var locale = acf.get('locale');
			var rtl = acf.get('rtl');
			var l10n = acf.get('datePickerL10n');
			
			// bail ealry if no l10n
			if( !l10n ) {
				return false;
			}
			
			// bail ealry if no datepicker library
			if( typeof $.datepicker === 'undefined' ) {
				return false;
			}
			
			// rtl
			l10n.isRTL = rtl;
			
			// append
			$.datepicker.regional[ locale ] = l10n;
			$.datepicker.setDefaults(l10n);
		}
	});
	
	// add
	acf.newDatePicker = function( $input, args ){
		
		// bail ealry if no datepicker library
		if( typeof $.datepicker === 'undefined' ) {
			return false;
		}
		
		// defaults
		args = args || {};
		
		// initialize
		$input.datepicker( args );
		
		// wrap the datepicker (only if it hasn't already been wrapped)
		if( $('body > #ui-datepicker-div').exists() ) {
			$('body > #ui-datepicker-div').wrap('<div class="acf-ui-datepicker" />');
		}
	};
	
})(jQuery);