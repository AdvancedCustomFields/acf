(function($){
	
	acf.fields.checkbox = acf.field.extend({
		
		type: 'checkbox',
		
		events: {
			'change input':				'_change',
			'click .acf-add-checkbox':	'_add'
		},
		
		
		/*
		*  focus
		*
		*  This function will setup variables when focused on a field
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		focus: function(){
			
			// get elements
			this.$ul = this.$field.find('ul');
			this.$input = this.$field.find('input[type="hidden"]');
			
		},
		
		
		add: function(){
			
			// vars
			var name = this.$input.attr('name') + '[]';
			
			
			// vars
			var html = '<li><input class="acf-checkbox-custom" type="checkbox" checked="checked" /><input type="text" name="'+name+'" /></li>';
			
			
			// append
			this.$ul.find('.acf-add-checkbox').parent('li').before( html );	
			
		},
		
		_change: function( e ){
			
			// vars
			var $ul = this.$ul,
				$inputs = $ul.find('input[type="checkbox"]').not('.acf-checkbox-toggle'),
				checked = e.$el.is(':checked');
			
			
			// is toggle?
			if( e.$el.hasClass('acf-checkbox-toggle') ) {
				
				// toggle all
				$inputs.prop('checked', checked).trigger('change');
				
				
				// return
				return;
				
			}
			
			
			// is custom
			if( e.$el.hasClass('acf-checkbox-custom') ) {
				
				// vars
				var $text = e.$el.next('input[type="text"]');
				
				
				// toggle disabled
				e.$el.next('input[type="text"]').prop('disabled', !checked);
				
				
				// remove complelety if no value
				if( !checked && $text.val() == '' ) {
					
					e.$el.parent('li').remove();
				
				}
			}
			
			
			// bail early if no toggle
			if( !$ul.find('.acf-checkbox-toggle').exists() ) {
				
				return;
				
			}
			
			
			// determine if all inputs are checked
			var checked = ( $inputs.not(':checked').length == 0 );
			
			
			// update toggle
			$ul.find('.acf-checkbox-toggle').prop('checked', checked);
			
		},
		
		_add: function( e ){
			
			this.add();
			
		}
		
	});
	
})(jQuery);