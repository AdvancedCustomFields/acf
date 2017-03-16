(function($){
	
	acf.fields.radio = acf.field.extend({
		
		type: 'radio',
		
		$ul: null,
		
		actions: {
			'ready':	'initialize',
			'append':	'initialize'
		},
		
		events: {
			'click input[type="radio"]': 'click'
		},
		
		focus: function(){
			
			// focus on $select
			this.$ul = this.$field.find('.acf-radio-list');
			
			
			// get options
			this.o = acf.get_data( this.$ul );
			
		},
		
		
		/*
		*  initialize
		*
		*  This function will fix a bug found in Chrome.
		*  A radio input (for a given name) may only have 1 selected value. When used within a fc layout 
		*  multiple times (clone field), the selected value (default value) will not be checked. 
		*  This simply re-checks it.
		*
		*  @type	function
		*  @date	30/08/2016
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		initialize: function(){
			
			// find selected input and check it
			this.$ul.find('.selected input').prop('checked', true);	
			
		},
		
		click: function(e){
			
			// vars
			var $radio = e.$el,
				$label = $radio.parent('label'),
				selected = $label.hasClass('selected'),
				val = $radio.val();
				
				
			// remove previous selected
			this.$ul.find('.selected').removeClass('selected');
				
			
			// add active class
			$label.addClass('selected');
			
			
			// allow null
			if( this.o.allow_null && selected ) {
				
				// unselect
				e.$el.prop('checked', false);
				$label.removeClass('selected');
				val = false;
				
				
				// trigger change
				e.$el.trigger('change');
				
			}
			
			
			// other
			if( this.o.other_choice ) {
				
				// vars
				var $other = this.$ul.find('input[type="text"]');
				
				
				// show
				if( val === 'other' ) {
			
					$other.prop('disabled', false).attr('name', $radio.attr('name'));
				
				// hide
				} else {
					
					$other.prop('disabled', true).attr('name', '');
					
				}
					
			}
			
		}
		
	});	

})(jQuery);