(function($){
	
	// taxonomy
	acf.fields.taxonomy = acf.field.extend({
		
		type: 'taxonomy',
		$el: null,
		
		actions: {
			'ready':	'render',
			'append':	'render',
			'remove':	'remove'
		},
		events: {
			'click a[data-name="add"]': 	'add_term'
		},
		
		focus: function(){
			
			// $el
			this.$el = this.$field.find('.acf-taxonomy-field');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			
			
			// extra
			this.o.key = this.$field.data('key');
			
		},
		
		render: function(){
			
			// attempt select2
			var $select = this.$field.find('select');
			
			
			// bail early if no select field
			if( !$select.exists() ) return;
			
			
			// select2 options
			var args = acf.get_data( $select );
			
			
			// customize args
			args = acf.parse_args(args, {
				'pagination':	true,
				'ajax_action':	'acf/fields/taxonomy/query',
				'key':			this.o.key
			});
						
			
			// add select2
			acf.select2.init( $select, args );
			
		},
		
		remove: function(){
			
			// attempt select2
			var $select = this.$field.find('select');
			
			
			// validate ui
			if( !$select.exists() ) return false;
			
			
			// remove select2
			acf.select2.destroy( $select );
			
		},
		
		add_term: function( e ){
			
			// reference
			var self = this;
			
			
			// open popup
			acf.open_popup({
				title:		e.$el.attr('title') || e.$el.data('title'),
				loading:	true,
				height:		220
			});
			
			
			
			// AJAX data
			var ajax_data = acf.prepare_for_ajax({
				action:		'acf/fields/taxonomy/add_term',
				field_key:	this.o.key
			});
			
			
			
			// get HTML
			$.ajax({
				url:		acf.get('ajaxurl'),
				data:		ajax_data,
				type:		'post',
				dataType:	'html',
				success:	function(html){
				
					self.add_term_confirm( html );
					
				}
			});
			
			
		},
		
		add_term_confirm: function( html ){
			
			// reference
			var self = this;
			
			
			// update popup
			acf.update_popup({
				content : html
			});
			
			
			// focus
			$('#acf-popup input[name="term_name"]').focus();
			
			
			// events
			$('#acf-popup form').on('submit', function( e ){
				
				// prevent default
				e.preventDefault();
				
				
				// submit
				self.add_term_submit( $(this ));
				
			});
			
		},
		
		add_term_submit: function( $form ){
			
			// reference
			var self = this;
			
			
			// vars
			var $submit = $form.find('.acf-submit'),
				$name = $form.find('input[name="term_name"]'),
				$parent = $form.find('select[name="term_parent"]');
			
			
			// basic validation
			if( $name.val() === '' ) {
				
				$name.focus();
				return false;
				
			}
			
			
			// show loading
			$submit.find('button').attr('disabled', 'disabled');
			$submit.find('.acf-spinner').addClass('is-active');
			
			
			// vars
			var ajax_data = acf.prepare_for_ajax({
				action:			'acf/fields/taxonomy/add_term',
				field_key:		this.o.key,
				term_name:		$name.val(),
				term_parent:	$parent.exists() ? $parent.val() : 0
			});
			
			
			// save term
			$.ajax({
				url:		acf.get('ajaxurl'),
				data:		ajax_data,
				type:		'post',
				dataType:	'json',
				success:	function( json ){
					
					// vars
					var message = acf.get_ajax_message(json);
					
					
					// success
					if( acf.is_ajax_success(json) ) {
						
						// clear name
						$name.val('');
						
						
						// update term lists
						self.append_new_term( json.data );

					}
					
					
					// message
					if( message.text ) {
						
						$submit.find('span').html( message.text );
						
					}
					
				},
				complete: function(){
					
					// reset button
					$submit.find('button').removeAttr('disabled');
					
					
					// hide loading
					$submit.find('.acf-spinner').removeClass('is-active');
					
					
					// remove message
					$submit.find('span').delay(1500).fadeOut(250, function(){
						
						$(this).html('');
						$(this).show();
						
					});
					
					
					// focus
					$name.focus();
					
				}
			});
			
		},
		
		append_new_term: function( term ){
			
			// vars
			var item = {
				id:		term.term_id,
				text:	term.term_label
			}; 
			
			
			// append to all taxonomy lists
			$('.acf-taxonomy-field[data-taxonomy="' + this.o.taxonomy + '"]').each(function(){
				
				// vars
				var type = $(this).data('type');
				
				
				// bail early if not checkbox/radio
				if( type == 'radio' || type == 'checkbox' ) {
					
					// allow
					
				} else {
					
					return;
					
				}
				
				
				// vars
				var $hidden = $(this).children('input[type="hidden"]'),
					$ul = $(this).find('ul:first'),
					name = $hidden.attr('name');
				
				
				// allow multiple selection
				if( type == 'checkbox' ) {
					
					name += '[]';
						
				}
				
				
				// create new li
				var $li = $([
					'<li data-id="' + term.term_id + '">',
						'<label>',
							'<input type="' + type + '" value="' + term.term_id + '" name="' + name + '" /> ',
							'<span>' + term.term_label + '</span>',
						'</label>',
					'</li>'
				].join(''));
				
				
				// find parent
				if( term.term_parent ) {
					
					// vars
					var $parent = $ul.find('li[data-id="' + term.term_parent + '"]');
				
					
					// update vars
					$ul = $parent.children('ul');
					
					
					// create ul
					if( !$ul.exists() ) {
						
						$ul = $('<ul class="children acf-bl"></ul>');
						
						$parent.append( $ul );
						
					}
					
				}
				
				
				// append
				$ul.append( $li );

			});
			
			
			// append to select
			$('#acf-popup #term_parent').each(function(){
				
				// vars
				var $option = $('<option value="' + term.term_id + '">' + term.term_label + '</option>');
				
				if( term.term_parent ) {
					
					$(this).children('option[value="' + term.term_parent + '"]').after( $option );
					
				} else {
					
					$(this).append( $option );
					
				}
				
			});
			
			
			// set value
			switch( this.o.type ) {
				
				// select
				case 'select':
					
					//this.$el.children('input').select2('data', item);
					
					
					// vars
					var $select = this.$el.children('select');
					acf.select2.add_value($select, term.term_id, term.term_label);
					
					
					break;
				
				case 'multi_select':
					
/*
					// vars
					var $input = this.$el.children('input'),
						value = $input.select2('data') || [];
					
					
					// append
					value.push( item );
					
					
					// update
					$input.select2('data', value);
					
					
*/
					// vars
					var $select = this.$el.children('select');
					acf.select2.add_value($select, term.term_id, term.term_label);
					
					
					break;
				
				case 'checkbox':
				case 'radio':
					
					// scroll to view
					var $holder = this.$el.find('.categorychecklist-holder'),
						$li = $holder.find('li[data-id="' + term.term_id + '"]'),
						offet = $holder.get(0).scrollTop + ( $li.offset().top - $holder.offset().top );
					
					
					// check input
					$li.find('input').prop('checked', true);
					
					
					// scroll to bottom
					$holder.animate({scrollTop: offet}, '250');
					break;
				
			}
			
			
		}
	
	});
	
})(jQuery);