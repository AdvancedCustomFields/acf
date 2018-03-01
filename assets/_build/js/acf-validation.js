(function($){
  
	acf.validation = acf.model.extend({
		
		actions: {
			'ready':	'ready',
			'append':	'ready'
		},
		
		filters: {
			'validation_complete':	'validation_complete'
		},
		
		events: {
			'click #save-post':				'click_ignore',
			'click [type="submit"]':		'click_publish',
			'submit form':					'submit_form',
			'click .acf-error-message a':	'click_message'
		},
		
		
		// vars
		active: 1,
		ignore: 0,
		busy: 0,
		valid: true,
		errors: [],
		
		
		// classes
		error_class: 'acf-error',
		message_class: 'acf-error-message',
		
		
		// el
		$trigger: null,
		
		
		/*
		*  ready
		*
		*  This function will add 'non bubbling' events
		*
		*  @type	function
		*  @date	26/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		ready: function( $el ){
			
			// vars
			var $inputs = $('.acf-field input, .acf-field textarea, .acf-field select');
			
			
			// bail early if no inputs
			if( !$inputs.length ) return;
			
			
			// reference
			var self = this;
			
			
			// event
			$inputs.on('invalid', function( e ){
				
				// vars
				var $input = $(this);
				var $field = acf.get_field_wrap( $input );
				
				
				// event
				$field.trigger('invalidField');
				
				
				// action
				acf.do_action('invalid', $input);
				acf.do_action('invalid_field', $field);
				
				
				// save draft (ignore validation)
				if( acf.validation.ignore ) return;
				
				
				// prevent default
				// - prevents browser error message
				// - also fixes chrome bug where 'hidden-by-tab' field throws focus error
				e.preventDefault();
				
				
				// append to errors
				acf.validation.errors.push({
					input: $input.attr('name'),
					message: e.target.validationMessage
				});
				
				
				// invalid event has prevented the form from submitting
				// trigger acf validation fetch (safe to call multiple times)
				acf.validation.fetch( $input.closest('form') );
			
			});
			
		},
		
		
		/*
		*  validation_complete
		*
		*  This function will modify the JSON response and add local 'invalid' errors
		*
		*  @type	function
		*  @date	26/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		validation_complete: function( json, $form ) {
			
			// bail early if no local errors
			if( !this.errors.length ) return json;
			
			
			// set valid
			json.valid = 0;
			
			
			// require array
			json.errors = json.errors || [];
			
			
			// vars
			var inputs = [];
			
			
			// populate inputs
			if( json.errors.length ) {
				
				for( i in json.errors ) {
					
					inputs.push( json.errors[ i ].input );
									
				}
				
			}
			
			
			// append
			if( this.errors.length ) {
				
				for( i in this.errors ) {
					
					// vars
					var error = this.errors[ i ];
					
					
					// bail ealry if alreay exists
					if( $.inArray(error.input, inputs) !== -1 ) continue;
					
					
					// append
					json.errors.push( error );
					
				}
				
			}
			
			
			// reset
			this.errors = [];
			
			
			// return
			return json;
			
		},
		
		
		/*
		*  click_message
		*
		*  This function will dismiss the validation message
		*
		*  @type	function
		*  @date	26/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		click_message: function( e ) {
			
			e.preventDefault();
			
			acf.remove_el( e.$el.parent() );
			
		},
		
		
		/*
		*  click_ignore
		*
		*  This event is trigered via submit butons which ignore validation
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		click_ignore: function( e ) {
			
			// reference
			var self = this;
			
			
			// vars
			this.ignore = 1;
			this.$trigger = e.$el;
			this.$form = e.$el.closest('form');
			
			
			// remove error message
			$('.'+this.message_class).each(function(){
				acf.remove_el( $(this) );
			});
			
			
			// ignore required inputs
			this.ignore_required_inputs();
			
			
			// maybe show errors
			setTimeout(function(){
				self.ignore = 0;
			}, 100);
			
		},
		
		
		/**
		*  ignore_required_inputs
		*
		*  This function will temporarily remove the 'required' attribute from all ACF inputs
		*
		*  @date	23/10/17
		*  @since	5.6.3
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		ignore_required_inputs: function(){
			
			// vars
			var $inputs = $('.acf-field input[required], .acf-field textarea[required], .acf-field select[required]');
			
			
			// bail early if no inputs
			if( !$inputs.length ) return;
			
			
			// remove required
			$inputs.prop('required', false);
			
			
			// timeout
			setTimeout(function(){
				$inputs.prop('required', true);
			}, 100);
				
		},
		
		
		/*
		*  click_publish
		*
		*  This event is trigered via submit butons which trigger validation
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		click_publish: function( e ) {
			
			this.$trigger = e.$el;
			
		},
		
		
		/*
		*  submit_form
		*
		*  description
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		submit_form: function( e ){
			
			// bail early if not active
			if( !this.active ) {
			
				return true;
				
			}
			
			
			// ignore validation (only ignore once)
			if( this.ignore ) {
			
				this.ignore = 0;
				return true;
				
			}
			
			
			// bail early if this form does not contain ACF data
			if( !e.$el.find('#acf-form-data').exists() ) {
			
				return true;
				
			}
				
			
			// bail early if is preview
			var $preview = e.$el.find('#wp-preview');
			if( $preview.exists() && $preview.val() ) {
				
				// WP will lock form, unlock it
				this.toggle( e.$el, 'unlock' );
				return true;
				
			}
			
			
			// prevent default
			e.preventDefault();
			
			
			// run validation
			this.fetch( e.$el );
			
		},
		
		
		/*
		*  lock
		*
		*  description
		*
		*  @type	function
		*  @date	7/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		toggle: function( $form, state ){
			
			// defaults
			state = state || 'unlock';
			
			
			// debug
			//console.log('toggle %o, %o %o', this.$trigger, $form, state);
			
			// vars
			var $submit = null,
				$spinner = null,
				$parent = $('#submitdiv');
			
			
			// 3rd party publish box
			if( !$parent.exists() ) {
				
				$parent = $('#submitpost');
				
			}
			
			
			// term, user
			if( !$parent.exists() ) {
				
				$parent = $form.find('p.submit').last();
				
			}
			
			
			// front end form
			if( !$parent.exists() ) {
				
				$parent = $form.find('.acf-form-submit');
				
			}
			
			
			// default
			if( !$parent.exists() ) {
				
				$parent = $form;
					
			}
			
			
			// find elements
			// note: media edit page does not use .button, this is why we need to look for generic input[type="submit"]
			$submit = $parent.find('input[type="submit"], .button');
			$spinner = $parent.find('.spinner, .acf-spinner');
			
			
			// hide all spinners (hides the preview spinner)
			this.hide_spinner( $spinner );
			
			
			// unlock
			if( state == 'unlock' ) {
				
				this.enable_submit( $submit );
				
			// lock
			} else if( state == 'lock' ) {
				
				// show only last spinner (allow all spinners to be hidden - preview spinner + submit spinner)
				this.disable_submit( $submit );
				this.show_spinner( $spinner.last() );
				
			}
			
		},
		
		
		/*
		*  fetch
		*
		*  description
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		fetch: function( $form ){
			
			// bail aelry if already busy
			if( this.busy ) return false;
			
			
			// reference
			var self = this;
			
			
			// action for 3rd party
			acf.do_action('validation_begin');
				
				
			// vars
			var data = acf.serialize($form);
				
			
			// append AJAX action		
			data.action = 'acf/validate_save_post';
			
			
			// prepare
			data = acf.prepare_for_ajax(data);
			
			
			// set busy
			this.busy = 1;
			
			
			// lock form
			this.toggle( $form, 'lock' );
			
			
			// ajax
			$.ajax({
				url: acf.get('ajaxurl'),
				data: data,
				type: 'post',
				dataType: 'json',
				success: function( json ){
					
					// bail early if not json success
					if( !acf.is_ajax_success(json) ) {
						
						return;
						
					}
					
					
					self.fetch_success( $form, json.data );
					
				},
				complete: function(){
					
					self.fetch_complete( $form );
			
				}
			});
			
		},
		
		
		/*
		*  fetch_complete
		*
		*  description
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		fetch_complete: function( $form ){
			
			// set busy
			this.busy = 0;
			
			
			// unlock so WP can publish form
			this.toggle( $form, 'unlock' );
			
			
			// bail early if validationw as not valid
			if( !this.valid ) return;
			
			
			// update ignore (allow form submit to not run validation)
			this.ignore = 1;
				
				
			// remove previous error message
			var $message = $form.children('.acf-error-message');
			
			if( $message.exists() ) {
				
				$message.addClass('-success');
				$message.children('p').html( acf._e('validation_successful') );
				
				
				// remove message
				setTimeout(function(){
					
					acf.remove_el( $message );
					
				}, 2000);
				
			}
			
		
			// remove hidden postboxes (this will stop them from being posted to save)
			$form.find('.acf-postbox.acf-hidden').remove();
			
			
			// action for 3rd party customization
			acf.do_action('submit', $form);
			
			
			// submit form again
			if( this.$trigger ) {
				
				this.$trigger.click();
			
			} else {
				
				$form.submit();
			
			}
			
			
			// lock form
			this.toggle( $form, 'lock' );
			
		},
		
		
		/*
		*  fetch_success
		*
		*  description
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		fetch_success: function( $form, json ){
			
			// filter for 3rd party customization
			json = acf.apply_filters('validation_complete', json, $form);
						
			
			// validate json
			if( !json || json.valid || !json.errors ) {
				
				// set valid (allows fetch_complete to run)
				this.valid = true;
				
				
				// action for 3rd party
				acf.do_action('validation_success');
			
				
				// end function
				return;
				
			}
			
			// set valid (prevents fetch_complete from runing)
			this.valid = false;
			
			
			// reset trigger
			this.$trigger = null;
			
			
			// display errors
			this.display_errors( json.errors, $form );
			
			
			// action
			acf.do_action('validation_failure');
			
		},
		
		
		/**
		*  display_errors
		*
		*  This function will display errors
		*
		*  @date	23/10/17
		*  @since	5.6.3
		*
		*  @param	array errors
		*  @return	n/a
		*/
		
		display_errors: function( errors, $form ){
			
			// bail early if no errors
			if( !errors || !errors.length ) return;
			
			
			// vars
			var $message = $form.children('.acf-error-message');
			var message = acf._e('validation_failed');
			var count = 0;
			var $scrollTo = null;
			
			
			// loop
			for( i = 0; i < errors.length; i++ ) {
				
				// vars
				var error = errors[ i ];
				
				
				// general error
				if( !error.input ) {
					message += '. ' + error.message;
					continue;
				}
				
				
				// get input
				var $input = $form.find('[name="' + error.input + '"]').first();
				
				
				// if $_POST value was an array, this $input may not exist
				if( !$input.exists() ) {
					$input = $form.find('[name^="' + error.input + '"]').first();
				}
				
				
				// bail early if input doesn't exist
				if( !$input.exists() ) continue;
				
				
				// increase
				count++;
				
				
				// now get field
				var $field = acf.get_field_wrap( $input );
				
				
				// add error
				this.add_error( $field, error.message );
				
				
				// set $scrollTo
				if( $scrollTo === null ) {
					$scrollTo = $field;
				}
				
			}
			
			
			// message
			if( count == 1 ) {
				message += '. ' + acf._e('validation_failed_1');
			} else if( count > 1 ) {
				message += '. ' + acf._e('validation_failed_2').replace('%d', count);
			}
			
			
			// maybe create $message
			if( !$message.exists() ) {
				$message = $('<div class="acf-error-message"><p></p><a href="#" class="acf-icon -cancel small"></a></div>');
				$form.prepend( $message );
			}
			
			
			// update message
			$message.children('p').html( message );
			
			
			// if no $scrollTo, set to message
			if( $scrollTo === null ) {
				$scrollTo = $message;
			}
			
			
			// timeout
			setTimeout(function(){
				$("html, body").animate({ scrollTop: $scrollTo.offset().top - ( $(window).height() / 2 ) }, 500);
			}, 10);
			
		},
		
		
		/*
		*  add_error
		*
		*  This function will add error markup to a field
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$field (jQuery)
		*  @param	message (string)
		*  @return	n/a
		*/
		
		add_error: function( $field, message ){
			
			// reference
			var self = this;
			
			
			// add class
			$field.addClass(this.error_class);
			
			
			// add message
			if( message !== undefined ) {
				
				$field.children('.acf-input').children('.' + this.message_class).remove();
				$field.children('.acf-input').prepend('<div class="' + this.message_class + '"><p>' + message + '</p></div>');
			
			}
			
			
			// add event
			var event = function(){
				
				// remove error
				self.remove_error( $field );
			
				
				// remove self
				$field.off('focus change', 'input, textarea, select', event);
				
			}
			
			$field.on('focus change', 'input, textarea, select', event);
			
			
			// event
			$field.trigger('invalidField');
				
				
			// hook for 3rd party customization
			acf.do_action('add_field_error', $field);
			acf.do_action('invalid_field', $field);
			
		},
		
		
		/*
		*  remove_error
		*
		*  This function will remove error markup from a field
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$field (jQuery)
		*  @return	n/a
		*/
		
		remove_error: function( $field ){
			
			// var
			var $message = $field.children('.acf-input').children('.' + this.message_class);
			
			
			// remove class
			$field.removeClass(this.error_class);
			
			
			// remove message
			setTimeout(function(){
				
				acf.remove_el( $message );
				
			}, 250);
			
			
			// hook for 3rd party customization
			acf.do_action('remove_field_error', $field);
			acf.do_action('valid_field', $field);
			
		},
		
		
		/*
		*  add_warning
		*
		*  This functino will add and auto remove an error message to a field
		*
		*  @type	function
		*  @date	4/05/2015
		*  @since	5.2.3
		*
		*  @param	$field (jQuery)
		*  @param	message (string)
		*  @return	n/a
		*/
		
		add_warning: function( $field, message ){
			
			this.add_error( $field, message );
			
			setTimeout(function(){
				
				acf.validation.remove_error( $field )
				
			}, 1000);
			
		},
		
		
		/*
		*  show_spinner
		*
		*  This function will show a spinner element. Logic changed in WP 4.2
		*
		*  @type	function
		*  @date	3/05/2015
		*  @since	5.2.3
		*
		*  @param	$spinner (jQuery)
		*  @return	n/a
		*/
		
		show_spinner: function( $spinner ){
			
			// bail early if no spinner
			if( !$spinner.exists() ) {
				
				return;
				
			}
			
			
			// vars
			var wp_version = acf.get('wp_version');
			
			
			// show
			if( parseFloat(wp_version) >= 4.2 ) {
				
				$spinner.addClass('is-active');
			
			} else {
				
				$spinner.css('display', 'inline-block');
			
			}
			
		},
		
		
		/*
		*  hide_spinner
		*
		*  This function will hide a spinner element. Logic changed in WP 4.2
		*
		*  @type	function
		*  @date	3/05/2015
		*  @since	5.2.3
		*
		*  @param	$spinner (jQuery)
		*  @return	n/a
		*/
		
		hide_spinner: function( $spinner ){
			
			// bail early if no spinner
			if( !$spinner.exists() ) {
				
				return;
				
			}
			
			
			// vars
			var wp_version = acf.get('wp_version');
			
			
			// hide
			if( parseFloat(wp_version) >= 4.2 ) {
				
				$spinner.removeClass('is-active');
			
			} else {
				
				$spinner.css('display', 'none');
			
			}
			
		},
		
		
		/*
		*  disable_submit
		*
		*  This function will disable the $trigger is possible
		*
		*  @type	function
		*  @date	3/05/2015
		*  @since	5.2.3
		*
		*  @param	$spinner (jQuery)
		*  @return	n/a
		*/
		
		disable_submit: function( $submit ){
			
			// bail early if no submit
			if( !$submit.exists() ) {
				
				return;
				
			}
			
			
			// add class
			$submit.addClass('disabled button-disabled button-primary-disabled');
			
		},
		
		
		/*
		*  enable_submit
		*
		*  This function will enable the $trigger is possible
		*
		*  @type	function
		*  @date	3/05/2015
		*  @since	5.2.3
		*
		*  @param	$spinner (jQuery)
		*  @return	n/a
		*/
		
		enable_submit: function( $submit ){
			
			// bail early if no submit
			if( !$submit.exists() ) {
				
				return;
				
			}
			
			
			// remove class
			$submit.removeClass('disabled button-disabled button-primary-disabled');
			
		}
		
	});

})(jQuery);