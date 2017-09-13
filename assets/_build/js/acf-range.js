(function($){
	
	acf.fields.range = acf.field.extend({
		
		type: 'range',
		$el: null,
		$range: null,
		$input: null,
		
		events: {
			'input input': '_change',
			'change input': '_change'
		},
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.acf-range-wrap');
			this.$range = this.$el.children('input[type="range"]');
			this.$input = this.$el.children('input[type="number"]');
			
		},
		
		_change: function( e ){
			
			// get value from changed element
			var val = e.$el.val();
			var type = e.$el.attr('type');
			
			
			// allow for cleared value
			val = val || 0;
			
			
			// update sibling
			if( type === 'range' ) {
				
				this.$input.val( val );
				
			} else {
				
				this.$range.val( val );
				
			}
						
		}
		
	});
	
})(jQuery);