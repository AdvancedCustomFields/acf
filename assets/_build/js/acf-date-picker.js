(function($){
	
	/*
	*  acf.datepicker
	*
	*  description
	*
	*  @type	function
	*  @date	16/12/2015
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	acf.datepicker = acf.model.extend({
		
		actions: {
			'ready 1': 'ready'
		},
		
		ready: function(){
			
			// vars
			var locale = acf.get('locale'),
				rtl = acf.get('rtl')
				l10n = acf._e('date_picker');
			
			
			// bail ealry if no l10n (fiedl groups admin page)
			if( !l10n ) return;
			
			
			// bail ealry if no datepicker library
			if( typeof $.datepicker === 'undefined' ) return;
			
			
			// rtl
			l10n.isRTL = rtl;
			
			
			// append
			$.datepicker.regional[ locale ] = l10n;
			$.datepicker.setDefaults(l10n);
			
		},
		
		
		/*
		*  init
		*
		*  This function will initialize JS
		*
		*  @type	function
		*  @date	2/06/2016
		*  @since	5.3.8
		*
		*  @param	$input (jQuery selector)
		*  @param	args (object)
		*  @return	n/a
		*/
		
		init: function( $input, args ){
			
			// bail ealry if no datepicker library
			if( typeof $.datepicker === 'undefined' ) return;
			
			
			// defaults
			args = args || {};
			
			
			// add date picker
			$input.datepicker( args );
			
			
			// wrap the datepicker (only if it hasn't already been wrapped)
			if( $('body > #ui-datepicker-div').exists() ) {
			
				$('body > #ui-datepicker-div').wrap('<div class="acf-ui-datepicker" />');
				
			}
		
		},
		
		
		/*
		*  init
		*
		*  This function will remove JS
		*
		*  @type	function
		*  @date	2/06/2016
		*  @since	5.3.8
		*
		*  @param	$input (jQuery selector)
		*  @return	n/a
		*/
		
		destroy: function( $input ){
			
			// do nothing
			
		}
		
	});
		
	acf.fields.date_picker = acf.field.extend({
		
		type: 'date_picker',
		$el: null,
		$input: null,
		$hidden: null,
		
		o: {},
		
		actions: {
			'ready':	'initialize',
			'append':	'initialize'
		},
		
		events: {
			'blur input[type="text"]': 'blur'
		},
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.acf-date-picker');
			this.$input = this.$el.find('input[type="text"]');
			this.$hidden = this.$el.find('input[type="hidden"]');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			
		},
		
		initialize: function(){
			
			// save_format - compatibility with ACF < 5.0.0
			if( this.o.save_format ) {
				
				return this.initialize2();
				
			}
			
			
			// create options
			var args = { 
				dateFormat:			this.o.date_format,
				altField:			this.$hidden,
				altFormat:			'yymmdd',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.o.first_day
			};
			
			
			// filter for 3rd party customization
			args = acf.apply_filters('date_picker_args', args, this.$field);
			
			
			// add date picker
			acf.datepicker.init( this.$input, args );
			
			
			// action for 3rd party customization
			acf.do_action('date_picker_init', this.$input, args, this.$field);
			
		},
		
		initialize2: function(){
			
			// get and set value from alt field
			this.$input.val( this.$hidden.val() );
			
			
			// create options
			var args =  { 
				dateFormat:			this.o.date_format,
				altField:			this.$hidden,
				altFormat:			this.o.save_format,
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.o.first_day
			};
			
			
			// filter for 3rd party customization
			args = acf.apply_filters('date_picker_args', args, this.$field);
			
			
			// backup
			var dateFormat = args.dateFormat;
			
			
			// change args.dateFormat
			args.dateFormat = this.o.save_format;
				
			
			// add date picker
			acf.datepicker.init( this.$input, args );
			
			
			// now change the format back to how it should be.
			this.$input.datepicker( 'option', 'dateFormat', dateFormat );
			
			
			// action for 3rd party customization
			acf.do_action('date_picker_init', this.$input, args, this.$field);
			
		},
		
		blur: function(){
			
			if( !this.$input.val() ) {
			
				this.$hidden.val('');
				
			}
			
		}
		
	});
	
})(jQuery);