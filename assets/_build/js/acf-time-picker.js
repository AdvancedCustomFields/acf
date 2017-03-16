(function($){
	
	acf.fields.time_picker = acf.field.extend({
		
		type: 'time_picker',
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
			this.$el = this.$field.find('.acf-time-picker');
			this.$input = this.$el.find('input[type="text"]');
			this.$hidden = this.$el.find('input[type="hidden"]');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			
		},
		
		initialize: function(){
			
			// bail ealry if no timepicker library
			if( typeof $.timepicker === 'undefined' ) return;
			
			
			// create options
			var args = {
				timeFormat:			this.o.time_format,
				altField:			this.$hidden,
				altFieldTimeOnly:	false,
				altTimeFormat:		'HH:mm:ss',
				showButtonPanel:	true,
				controlType: 		'select',
				oneLine:			true,
				closeText:			acf._e('date_time_picker', 'selectText')
			};
			
			
			// add custom 'Close = Select' functionality
			args.onClose = function( value, instance ){
				
				// vars
				var $div = instance.dpDiv,
					$close = $div.find('.ui-datepicker-close');
				
				
				// if clicking close button
				if( !value && $close.is(':hover') ) {
					
					// attempt to find new value
					value = acf.maybe_get(instance, 'settings.timepicker.formattedTime');
					
					
					// bail early if no value
					if( !value ) return;
					
					
					// update value
					$.datepicker._setTime(instance);
					
				}
									
			};
			
			
			// filter for 3rd party customization
			args = acf.apply_filters('time_picker_args', args, this.$field);
			
			
			// add date picker
			this.$input.timepicker( args );
			
			
			// wrap the datepicker (only if it hasn't already been wrapped)
			if( $('body > #ui-datepicker-div').exists() ) {
			
				$('body > #ui-datepicker-div').wrap('<div class="acf-ui-datepicker" />');
				
			}
			
			
			// action for 3rd party customization
			acf.do_action('time_picker_init', this.$input, args, this.$field);
			
		},
		
		blur: function(){
			
			if( !this.$input.val() ) {
			
				this.$hidden.val('');
				
			}
			
		}
		
	});
	
})(jQuery);