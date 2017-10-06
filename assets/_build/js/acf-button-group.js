(function($){
	
	acf.fields.button_group = acf.field.extend({
		
		type: 'button_group',
		$div: null,
		
		events: {
			'click input[type="radio"]': 'click'
		},
		
		focus: function(){
			
			// focus on $select
			this.$div = this.$field.find('.acf-button-group');
			
			
			// get options
			this.o = acf.get_data(this.$div, {
				allow_null: 0
			});
			
		},
		
		click: function( e ){
			
			// vars
			var $radio = e.$el;
			var $label = $radio.parent('label');
			var selected = $label.hasClass('selected');
				
				
			// remove previous selected
			this.$div.find('.selected').removeClass('selected');
				
			
			// add active class
			$label.addClass('selected');
			
			
			// allow null
			if( this.o.allow_null && selected ) {
				
				// unselect
				e.$el.prop('checked', false);
				$label.removeClass('selected');
				
				
				// trigger change
				e.$el.trigger('change');
				
			}
			
		}
		
	});	

})(jQuery);