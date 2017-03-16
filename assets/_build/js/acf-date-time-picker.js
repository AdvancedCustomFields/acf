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
	
	acf.datetimepicker = acf.model.extend({
		
		actions: {
			'ready 1': 'ready'
		},
		
		ready: function(){
			
			// vars
			var locale = acf.get('locale'),
				rtl = acf.get('rtl')
				l10n = acf._e('date_time_picker');
			
			
			// bail ealry if no l10n (fiedl groups admin page)
			if( !l10n ) return;
			
			
			// bail ealry if no timepicker library
			if( typeof $.timepicker === 'undefined' ) return;
			
			
			// rtl
			l10n.isRTL = rtl;
			
			
			// append
			$.timepicker.regional[ locale ] = l10n;
			$.timepicker.setDefaults(l10n);
			
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
			
			// bail ealry if no timepicker library
			if( typeof $.timepicker === 'undefined' ) return;
			
			
			// defaults
			args = args || {};
			
			
			// add date picker
			$input.datetimepicker( args );
			
			
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
	
	
	acf.fields.date_time_picker = acf.field.extend({
		
		type: 'date_time_picker',
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
			this.$el = this.$field.find('.acf-date-time-picker');
			this.$input = this.$el.find('input[type="text"]');
			this.$hidden = this.$el.find('input[type="hidden"]');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			
		},
		
		initialize: function(){
			
			// create options
			var args = {
				dateFormat:			this.o.date_format,
				timeFormat:			this.o.time_format,
				altField:			this.$hidden,
				altFieldTimeOnly:	false,
				altFormat:			'yy-mm-dd',
				altTimeFormat:		'HH:mm:ss',
				changeYear:			true,
				yearRange:			"-100:+100",
				changeMonth:		true,
				showButtonPanel:	true,
				firstDay:			this.o.first_day,
				controlType: 		'select',
				oneLine:			true
			};
			
			
			// filter for 3rd party customization
			args = acf.apply_filters('date_time_picker_args', args, this.$field);
			
			
			// add date time picker
			acf.datetimepicker.init( this.$input, args );
			
			
			// action for 3rd party customization
			acf.do_action('date_time_picker_init', this.$input, args, this.$field);
			
		},
		
		blur: function(){
			
			if( !this.$input.val() ) {
			
				this.$hidden.val('');
				
			}
			
		}
		
	});	
	
})(jQuery);