(function($){
	
	acf.fields.range = acf.field.extend({
		
		type: 'range',
		$el: null,
		$range: null,
		$input: null,
		
		events: {
			'input input': 'onInput',
			'change input': 'onChange'
		},
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.acf-range-wrap');
			this.$range = this.$el.children('input[type="range"]');
			this.$input = this.$el.children('input[type="number"]');
			
		},
		
		setValue: function( val ){
			this.$input.val( val );
			this.$range.val( val );
		},
		
		onInput: function( e ){
			this.setValue( e.$el.val() );
		},
		
		onChange: function( e ){
			this.setValue( e.$el.val() );
			
			if( e.$el.attr('type') == 'number' ) {
				this.$range.trigger('change');
			}
		}
	});
	
})(jQuery);