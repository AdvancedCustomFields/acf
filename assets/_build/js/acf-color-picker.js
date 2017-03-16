(function($){
	
	acf.fields.color_picker = acf.field.extend({
		
		type: 'color_picker',
		$input: null,
		$hidden: null,
		
		actions: {
			'ready':	'initialize',
			'append':	'initialize'
		},
		
		focus: function(){
			
			this.$input = this.$field.find('input[type="text"]');
			this.$hidden = this.$field.find('input[type="hidden"]');
			
		},
		
		initialize: function(){
			
			// reference
			var $input = this.$input,
				$hidden = this.$hidden;
			
			
			// trigger change function
			var change_hidden = function(){
				
				// timeout is required to ensure the $input val is correct
				setTimeout(function(){ 
					
					acf.val( $hidden, $input.val() );
					
				}, 1);
				
			}
			
			
			// args
			var args = {
				
				defaultColor: false,
				palettes: true,
				hide: true,
				change: change_hidden,
				clear: change_hidden
				
			}
 			
 			
 			// filter
 			var args = acf.apply_filters('color_picker_args', args, this.$field);
        	
        	
 			// iris
			this.$input.wpColorPicker(args);
			
		}
		
	});
	
})(jQuery);