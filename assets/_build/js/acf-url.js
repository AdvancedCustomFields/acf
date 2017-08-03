(function($){
	
	acf.fields.url = acf.field.extend({
		
		type: 'url',
		$input: null,
		
		actions: {
			'ready':	'render',
			'append':	'render'
			
		},
		
		events: {
			'keyup input[type="url"]': 'render'
		},
		
		focus: function(){
			
			this.$input = this.$field.find('input[type="url"]');
			
		},
		
		is_valid: function(){
			
			// vars
			var val = this.$input.val();
			
			
			if( val.indexOf('://') !== -1 ) {
				
				// url
				
			} else if( val.indexOf('//') === 0 ) {
				
				// protocol relative url
				
			} else {
				
				return false;
				
			}
			
			
			// return
			return true;
			
		},
		
		render: function(){
			
			// add class
			if( this.is_valid() ) {
				
				this.$input.parent().addClass('-valid');
			
			// remove class	
			} else {
				
				this.$input.parent().removeClass('-valid');
				
			}
			
			
		}
		
	});

})(jQuery);