(function($, undefined){
	
	/**
	*  acf.validation
	*
	*  Global validation logic
	*
	*  @date	4/4/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	acf.validation = new acf.Model({
		
		// enable / disable validation logic
		active: true,
			
		// temp ignore flag allowing bypass of validation
		ignore: false,
		
		// errors
		errors: [],
		
		// active form
		form: false,
		
		// wait
		wait: 'prepare',
		
		actions: {
			'ready':	'addInputEvents',
			'append':	'addInputEvents'
		},
		
		events: {
			'click input[type="submit"]':	'onClickSubmit',
			'click button[type="submit"]':	'onClickSubmit',
			'click #save-post':				'onClickSave',
			'submit form':					'onSubmit',
		},
		
		initialize: function(){
			
			// load global setting
			if( !acf.get('validation') ) {
				this.disable();
				this.actions = {};
				this.events = {};
			}
		},
		
		getForm: function( $form ){
			
			// instantiate
			var form = $form.data('acf');
			if( !form ) {
				form = new Form( $form );
			}
			
			// store
			this.form = form;
			
			// return
			return form;
		},
		
		enable: function(){
			this.active = true;
		},
		
		disable: function(){
			this.active = false;
		},
		
		pass: function(){
			this.ignore = true;
			this.setTimeout(function(){
				this.ignore = false;
			}, 100);
		},
		
		reset: function(){
			this.ignore = false;
			this.errors = [];
			this.form = false;
		},
		
		getErrors: function(){
			return this.errors;
		},
		
		hasErrors: function(){
			return this.errors.length;
		},
		
		addErrors: function( errors ){
			errors.map( this.addError, this );
		},
		
		addError: function( error ){
			this.errors.push( error );
		},
		
		getFieldErrors: function(){
			
			// vars
			var errors = [];
			var inputs = [];
			
			// loop
			this.getErrors().map(function(error){
				
				// bail early if global
				if( !error.input ) return;
				
				// update if exists
				var i = inputs.indexOf(error.input);
				if( i > -1 ) {
					errors[ i ] = error;
				
				// update
				} else {
					errors.push( error );
					inputs.push( error.input );
				}
			});
			
			// return
			return errors;
		},
		
		getGlobalErrors: function(){
			
			// return array of errors that contain no input
			return this.getErrors().filter(function(error){
				return !error.input;
			});
		},
		
		showErrors: function( $form ){
			
			// bail early if no errors
			if( !this.hasErrors() ) {
				return;
			}
			
			// vars
			var form = this.getForm( $form );
			var fieldErrors = this.getFieldErrors();
			var globalErrors = this.getGlobalErrors();
			
			// vars
			var errorCount = 0;
			var $scrollTo = false;
			
			// loop
			fieldErrors.map(function( error ){
				
				// get input
				var $input = $form.find('[name="' + error.input + '"]').first();
				
				// if $_POST value was an array, this $input may not exist
				if( !$input.exists() ) {
					$input = $form.find('[name^="' + error.input + '"]').first();
				}
				
				// bail early if input doesn't exist
				if( !$input.exists() ) {
					return;
				}
				
				// increase
				errorCount++;
				
				// get field
				var field = acf.getClosestField( $input );
				
				// show error
				field.showError( error.message );
				
				// set $scrollTo
				if( !$scrollTo ) {
					$scrollTo = field.$el;
				}
			}, this);
			
			// errorMessage
			var errorMessage = acf.__('Validation failed');
			if( errorCount == 1 ) {
				errorMessage += '. ' + acf.__('1 field requires attention');
			} else if( errorCount > 1 ) {
				errorMessage += '. ' + acf.__('%d fields require attention').replace('%d', errorCount);
			}
			
			// notice
			if( form.notice ) {
				form.notice.update({
					type: 'error',
					text: errorMessage
				});
			} else {
				form.notice = acf.newNotice({
					type: 'error',
					text: errorMessage,
					target: $form
				});
			}
			
			// if no $scrollTo, set to message
			if( !$scrollTo ) {
				$scrollTo = form.notice.$el;
			}
			
			// timeout
			setTimeout(function(){
				$("html, body").animate({ scrollTop: $scrollTo.offset().top - ( $(window).height() / 2 ) }, 500);
			}, 10);
		},
		
		fetch: function( args ){
			
			// bail early if busy
			if( this.busy ) {
				return;
			}
			
			// set busy
			this.busy = 1;

			// vars
			args = acf.parseArgs(args, {
				
				// form element
				form: false,
				
				// trigger event
				event: false,
				
				// lock form on success
				lock: true,
				
				// loading callback
				loading: function(){},
				
				// complete callback
				complete: function(){},
				
				// failure callback
				failure: function(){},
				
				// success callback
				success: function( $form ){
					$form.submit();
				}
			});
			
			// vars
			var $form = args.form;
			var form = this.getForm( $form );
			
			// create event specific success callback
			if( args.event ) {
				
				// create new event to avoid conflicts with prevenDefault (as used in taxonomy form)
				var event = $.Event(null, args.event);
				args.success = function(){
					$(event.target).trigger( event );
				}
			}
			
			// action for 3rd party
			acf.doAction('validation_begin', $form);
			
			// data
			var data = acf.serialize( $form );	
			data.action = 'acf/validate_save_post';
			
			// lock form
			this.lockForm( $form );
			
			// loading callback
			args.loading( $form );
			
			// success
			var onSuccess = function( json ){
				
				// validate
				if( !acf.isAjaxSuccess(json) ) {
					return;
				}
				
				// filter
				data = acf.applyFilters('validation_complete', json.data, $form);
				
				// add errors
				if( !data.valid ) {
					this.addErrors( data.errors );
				}
			};
			
			// complete
			var onComplete = function(){
				
				// set busy
				this.busy = 0;
				
				// unlock form
				this.unlockForm( $form );
				
				// failure
				if( this.hasErrors() ) {
					
					// action
					acf.doAction('validation_failure', $form);
					
					// display errors
					this.showErrors( $form );
					
					// failure callback
					args.failure( $form );
				
				// success
				} else {
					
					// allow for to pass
					this.pass();
					
					// remove previous error message
					if( form.notice ) {
						form.notice.update({
							type: 'success',
							text: acf.__('Validation successful'),
							timeout: 1000
						});
					}
					
					// action
					acf.doAction('validation_success', $form);
					acf.doAction('submit', $form);
					
					// success callback (submit form)
					args.success( $form );
					
					// lock form
					if( args.lock ) {
						this.lockForm( $form );
					}
				}
				
				// reset
				this.reset();
				
				// complete callback
				args.complete( $form );
			};
			
			// ajax
			$.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax(data),
				type: 'post',
				dataType: 'json',
				context: this,
				success: onSuccess,
				complete: onComplete
			});
		},
		
		addInputEvents: function( $el ){
			
			// vars
			var $inputs = $('.acf-field [name]', $el);
			
			// check
			if( $inputs.length ) {
				this.on( $inputs, 'invalid', 'onInvalid' );
			}
		},
		
		onInvalid: function( e, $el ){
			
			// vars
			var $form = $el.closest('form');
			
			// add error
			this.addError({
				input: $el.attr('name'),
				message: e.target.validationMessage
			});
			
			// prevent default
			// - prevents browser error message
			// - also fixes chrome bug where 'hidden-by-tab' field throws focus error
			e.preventDefault();
			
			// trigger submit on $form
			// - allows for "save", "preview" and "publish" to work
			$form.submit();
		},
		
		onClickSubmit: function( e, $el ){
			
			// store the "click event" for later use in this.onSubmit()
			this.set('originalEvent', e);
		},
		
		onClickSave: function( e, $el ) {
			
			// ignore errors when saving
			this.pass();
		},
		
		onSubmit: function( e, $form ){
			
			// validate
			var valid = acf.validateForm({
				form: $form,
				event: this.get('originalEvent')
			});
			
			// if not valid, stop event and allow validation to continue
			if( !valid ) {
				e.preventDefault();
			}
		},
		
		showSpinner: function( $spinner ){
			$spinner.addClass('is-active');				// add class (WP > 4.2)
			$spinner.css('display', 'inline-block');	// css (WP < 4.2)
		},
		
		hideSpinner: function( $spinner ){
			$spinner.removeClass('is-active');			// add class (WP > 4.2)
			$spinner.css('display', 'none');			// css (WP < 4.2)
		},
		
		disableSubmit: function( $submit ){
			$submit.prop('disabled', true).addClass('disabled');
		},
		
		enableSubmit: function( $submit ){
			$submit.prop('disabled', false).removeClass('disabled');
		},
		
		findSubmitWrap: function( $form ){
			
			// default post submit div
			var $wrap = $('#submitdiv');
			if( $wrap.length ) {
				return $wrap;
			}
			
			// 3rd party publish box
			var $wrap = $('#submitpost');
			if( $wrap.length ) {
				return $wrap;
			}
			
			// term, user
			var $wrap = $form.find('p.submit').last();
			if( $wrap.length ) {
				return $wrap;
			}
			
			// front end form
			var $wrap = $form.find('.acf-form-submit');
			if( $wrap.length ) {
				return $wrap;
			}
			
			// default
			return $form;
		},
		
		lockForm: function( $form ){
			
			// vars
			var $wrap = this.findSubmitWrap( $form );
			var $submit = $wrap.find('.button, [type="submit"]');
			var $spinner = $wrap.find('.spinner, .acf-spinner');
			
			// hide all spinners (hides the preview spinner)
			this.hideSpinner( $spinner );
			
			// lock
			this.disableSubmit( $submit );
			this.showSpinner( $spinner.last() );
		},
		
		unlockForm: function( $form ){
			
			// vars
			var $wrap = this.findSubmitWrap( $form );
			var $submit = $wrap.find('.button, [type="submit"]');
			var $spinner = $wrap.find('.spinner, .acf-spinner');
			
			// unlock
			this.enableSubmit( $submit );
			this.hideSpinner( $spinner );
		}
		
	});
	
	/**
	*  Form
	*
	*  description
	*
	*  @date	5/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var Form = acf.Model.extend({
		notice: false,
		setup: function( $form ){
			this.$el = $form;
		},
		lock: function(){
			acf.validation.lockForm( this.$el );
		},
		unlock: function(){
			acf.validation.unlockForm( this.$el );
		}
	});
	
	/**
	*  acf.validateForm
	*
	*  description
	*
	*  @date	4/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.validateForm = function( args ){
		
		// bail early if no form
		// - return true allowing form submit
		if( !args.form ) {
			return true;
		}
		
		// get form
		var form = acf.validation.getForm( args.form );
		
		// bail early if not active
		// - return true allowing form submit
		if( !acf.validation.active ) {
			return true;
		}
		
		// bail early if ignore
		// - return true allowing form submit
		if( acf.validation.ignore ) {
			return true;
		}
		
		// bail early if is preview
		// - return true allowing form submit
		if( form.$('#wp-preview').val() ) {
			form.unlock();
			return true;
		}
		
		// bail early if this form does not contain ACF data
		// - return true allowing form submit
		if( !form.$('#acf-form-data').length ) {
			return true;
		}
		
		// validate
		acf.validation.fetch( args );
		
		// return false preventing form submit
		return false;
	};
	
})(jQuery);