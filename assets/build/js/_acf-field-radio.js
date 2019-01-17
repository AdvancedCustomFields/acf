(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'radio',
		
		events: {
			'click input[type="radio"]': 'onClick',
		},
		
		$control: function(){
			return this.$('.acf-radio-list');
		},
		
		$input: function(){
			return this.$('input:checked');
		},
		
		$inputText: function(){
			return this.$('input[type="text"]');
		},
		
		getValue: function(){
			var val = this.$input().val();
			if( val === 'other' && this.get('other_choice') ) {
				val = this.$inputText().val();
			}
			return val;
		},
		
		onClick: function( e, $el ){
			
			// vars
			var $label = $el.parent('label');
			var selected = $label.hasClass('selected');
			var val = $el.val();
			
			// remove previous selected
			this.$('.selected').removeClass('selected');
			
			// add active class
			$label.addClass('selected');
			
			// allow null
			if( this.get('allow_null') && selected ) {
				$label.removeClass('selected');
				$el.prop('checked', false).trigger('change');
				val = false;
			}
			
			// other
			if( this.get('other_choice') ) {
				
				// enable
				if( val === 'other' ) {
					this.$inputText().prop('disabled', false);
					
				// disable
				} else {
					this.$inputText().prop('disabled', true);
				}
			}
		}
	});
	
	acf.registerFieldType( Field );

})(jQuery);