(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'button_group',
		
		events: {
			'click input[type="radio"]': 'onClick'
		},
		
		$control: function(){
			return this.$('.acf-button-group');
		},
		
		$input: function(){
			return this.$('input:checked');
		},
		
		setValue: function( val ){
			this.$('input[value="' + val + '"]').prop('checked', true).trigger('change');
		},
		
		onClick: function( e, $el ){
			
			// vars
			var $label = $el.parent('label');
			var selected = $label.hasClass('selected');
			
			// remove previous selected
			this.$('.selected').removeClass('selected');
			
			// add active class
			$label.addClass('selected');
			
			// allow null
			if( this.get('allow_null') && selected ) {
				$label.removeClass('selected');
				$el.prop('checked', false).trigger('change');
			}
		}
	});
	
	acf.registerFieldType( Field );

})(jQuery);