(function($, undefined){
	
	/**
	*  Validator
	*
	*  The model for validating forms
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	void
	*  @return	void
	*/
	var Validator = acf.Model.extend({
		
		/** @var string The model identifier. */
		id: 'Validator',
		
		/** @var object The model data. */
		data: {
			
			/** @var array The form errors. */
			errors: [],
			
			/** @var object The form notice. */
			notice: null,
			
			/** @var string The form status. loading, invalid, valid */
			status: ''
		},
		
		/** @var object The model events. */
		events: {
			'changed:status': 'onChangeStatus'
		},
		
		/**
		*  addErrors
		*
		*  Adds errors to the form.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	array errors An array of errors.
		*  @return	void
		*/
		addErrors: function( errors ){
			errors.map( this.addError, this );
		},
		
		/**
		*  addError
		*
		*  Adds and error to the form.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object error An error object containing input and message.
		*  @return	void
		*/
		addError: function( error ){
			this.data.errors.push( error );
		},
		
		/**
		*  hasErrors
		*
		*  Returns true if the form has errors.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	bool
		*/
		hasErrors: function(){
			return this.data.errors.length;
		},
		
		/**
		*  clearErrors
		*
		*  Removes any errors.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		clearErrors: function(){
			return this.data.errors = [];
		},
		
		/**
		*  getErrors
		*
		*  Returns the forms errors.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	array
		*/
		getErrors: function(){
			return this.data.errors;
		},
		
		/**
		*  getFieldErrors
		*
		*  Returns the forms field errors.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	array
		*/
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
		
		/**
		*  getGlobalErrors
		*
		*  Returns the forms global errors (errors without a specific input).
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	array
		*/
		getGlobalErrors: function(){
			
			// return array of errors that contain no input
			return this.getErrors().filter(function(error){
				return !error.input;
			});
		},
		
		/**
		*  showErrors
		*
		*  Displays all errors for this form.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		showErrors: function(){
			
			// bail early if no errors
			if( !this.hasErrors() ) {
				return;
			}
			
			// vars
			var fieldErrors = this.getFieldErrors();
			var globalErrors = this.getGlobalErrors();
			
			// vars
			var errorCount = 0;
			var $scrollTo = false;
			
			// loop
			fieldErrors.map(function( error ){
				
				// get input
				var $input = this.$('[name="' + error.input + '"]').first();
				
				// if $_POST value was an array, this $input may not exist
				if( !$input.length ) {
					$input = this.$('[name^="' + error.input + '"]').first();
				}
				
				// bail early if input doesn't exist
				if( !$input.length ) {
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
			globalErrors.map(function( error ){
				errorMessage += '. ' + error.message;
			});
			if( errorCount == 1 ) {
				errorMessage += '. ' + acf.__('1 field requires attention');
			} else if( errorCount > 1 ) {
				errorMessage += '. ' + acf.__('%d fields require attention').replace('%d', errorCount);
			}
			
			// notice
			if( this.has('notice') ) {
				this.get('notice').update({
					type: 'error',
					text: errorMessage
				});
			} else {
				var notice = acf.newNotice({
					type: 'error',
					text: errorMessage,
					target: this.$el
				});
				this.set('notice', notice);
			}
			
			// if no $scrollTo, set to message
			if( !$scrollTo ) {
				$scrollTo = this.get('notice').$el;
			}
			
			// timeout
			setTimeout(function(){
				$("html, body").animate({ scrollTop: $scrollTo.offset().top - ( $(window).height() / 2 ) }, 500);
			}, 10);
		},
		
		/**
		*  onChangeStatus
		*
		*  Update the form class when changing the 'status' data
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The form element.
		*  @param	string value The new status.
		*  @param	string prevValue The old status.
		*  @return	void
		*/
		onChangeStatus: function( e, $el, value, prevValue ){
			this.$el.removeClass('is-'+prevValue).addClass('is-'+value);
		},
		
		/**
		*  validate
		*
		*  Vaildates the form via AJAX.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object args A list of settings to customize the validation process.
		*  @return	bool True if the form is valid.
		*/
		validate: function( args ){
			
			// default args
			args = acf.parseArgs(args, {
				
				// trigger event
				event: false,
				
				// reset the form after submit
				reset: false,
				
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
			
			// return true if is valid - allows form submit
			if( this.get('status') == 'valid' ) {
				return true;
			}
			
			// return false if is currently validating - prevents form submit
			if( this.get('status') == 'validating' ) {
				return false;
			}
			
			// return true if no ACF fields exist (no need to validate)
			if( !this.$('.acf-field').length ) {
				return true;
			}
			
			// if event is provided, create a new success callback.
			if( args.event ) {
				var event = $.Event(null, args.event);
				args.success = function(){
					acf.enableSubmit( $(event.target) ).trigger( event );
				}
			}
			
			// action for 3rd party
			acf.doAction('validation_begin', this.$el);
			
			// lock form
			acf.lockForm( this.$el );
						
			// loading callback
			args.loading( this.$el, this );
			
			// update status
			this.set('status', 'validating');
			
			// success callback
			var onSuccess = function( json ){
				
				// validate
				if( !acf.isAjaxSuccess(json) ) {
					return;
				}
				
				// filter
				var data = acf.applyFilters('validation_complete', json.data, this.$el, this);
				
				// add errors
				if( !data.valid ) {
					this.addErrors( data.errors );
				}
			};
			
			// complete
			var onComplete = function(){
				
				// unlock form
				acf.unlockForm( this.$el );
				
				// failure
				if( this.hasErrors() ) {
					
					// update status
					this.set('status', 'invalid');
			
					// action
					acf.doAction('validation_failure', this.$el, this);
					
					// display errors
					this.showErrors();
					
					// failure callback
					args.failure( this.$el, this );
				
				// success
				} else {
					
					// update status
					this.set('status', 'valid');
					
					// remove previous error message
					if( this.has('notice') ) {
						this.get('notice').update({
							type: 'success',
							text: acf.__('Validation successful'),
							timeout: 1000
						});
					}
					
					// action
					acf.doAction('validation_success', this.$el, this);
					acf.doAction('submit', this.$el);
					
					// success callback (submit form)
					args.success( this.$el, this );
					
					// lock form
					acf.lockForm( this.$el );
					
					// reset
					if( args.reset ) {
						this.reset();	
					}
				}
				
				// complete callback
				args.complete( this.$el, this );
				
				// clear errors
				this.clearErrors();
			};
			
			// serialize form data
			var data = acf.serialize( this.$el );
			data.action = 'acf/validate_save_post';
			
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
			
			// return false to fail validation and allow AJAX
			return false
		},
		
		/**
		*  setup
		*
		*  Called during the constructor function to setup this instance
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	jQuery $form The form element.
		*  @return	void
		*/
		setup: function( $form ){
			
			// set $el
			this.$el = $form;
		},
		
		/**
		*  reset
		*
		*  Rests the validation to be used again.
		*
		*  @date	6/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		reset: function(){
			
			// reset data
			this.set('errors', []);
			this.set('notice', null);
			this.set('status', '');
			
			// unlock form
			acf.unlockForm( this.$el );
		}
	});
	
	/**
	*  getValidator
	*
	*  Returns the instance for a given form element.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $el The form element.
	*  @return	object
	*/
	var getValidator = function( $el ){
		
		// instantiate
		var validator = $el.data('acf');
		if( !validator ) {
			validator = new Validator( $el );
		}
		
		// return
		return validator;
	};
	
	/**
	*  acf.validateForm
	*
	*  A helper function for the Validator.validate() function.
	*  Returns true if form is valid, or fetches a validation request and returns false.
	*
	*  @date	4/4/18
	*  @since	5.6.9
	*
	*  @param	object args A list of settings to customize the validation process.
	*  @return	bool
	*/
	
	acf.validateForm = function( args ){
		return getValidator( args.form ).validate( args );
	};
	
	/**
	*  acf.enableSubmit
	*
	*  Enables a submit button and returns the element.
	*
	*  @date	30/8/18
	*  @since	5.7.4
	*
	*  @param	jQuery $submit The submit button.
	*  @return	jQuery
	*/
	acf.enableSubmit = function( $submit ){
		return $submit.removeClass('disabled');
	};
		
	/**
	*  acf.disableSubmit
	*
	*  Disables a submit button and returns the element.
	*
	*  @date	30/8/18
	*  @since	5.7.4
	*
	*  @param	jQuery $submit The submit button.
	*  @return	jQuery
	*/
	acf.disableSubmit = function( $submit ){
		return $submit.addClass('disabled');
	};
	
	/**
	*  acf.showSpinner
	*
	*  Shows the spinner element.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $spinner The spinner element.
	*  @return	jQuery
	*/
	acf.showSpinner = function( $spinner ){
		$spinner.addClass('is-active');				// add class (WP > 4.2)
		$spinner.css('display', 'inline-block');	// css (WP < 4.2)
		return $spinner;
	};
	
	/**
	*  acf.hideSpinner
	*
	*  Hides the spinner element.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $spinner The spinner element.
	*  @return	jQuery
	*/
	acf.hideSpinner = function( $spinner ){
		$spinner.removeClass('is-active');			// add class (WP > 4.2)
		$spinner.css('display', 'none');			// css (WP < 4.2)
		return $spinner;
	};
	
	/**
	*  acf.lockForm
	*
	*  Locks a form by disabeling its primary inputs and showing a spinner.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $form The form element.
	*  @return	jQuery
	*/
	acf.lockForm = function( $form ){
		
		// vars
		var $wrap = findSubmitWrap( $form );
		var $submit = $wrap.find('.button, [type="submit"]');
		var $spinner = $wrap.find('.spinner, .acf-spinner');
		
		// hide all spinners (hides the preview spinner)
		acf.hideSpinner( $spinner );
		
		// lock
		acf.disableSubmit( $submit );
		acf.showSpinner( $spinner.last() );
		return $form;
	};
	
	/**
	*  acf.unlockForm
	*
	*  Unlocks a form by enabeling its primary inputs and hiding all spinners.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $form The form element.
	*  @return	jQuery
	*/
	acf.unlockForm = function( $form ){
		
		// vars
		var $wrap = findSubmitWrap( $form );
		var $submit = $wrap.find('.button, [type="submit"]');
		var $spinner = $wrap.find('.spinner, .acf-spinner');
		
		// unlock
		acf.enableSubmit( $submit );
		acf.hideSpinner( $spinner );
		return $form;
	};
	
	/**
	*  findSubmitWrap
	*
	*  An internal function to find the 'primary' form submit wrapping element.
	*
	*  @date	4/9/18
	*  @since	5.7.5
	*
	*  @param	jQuery $form The form element.
	*  @return	jQuery
	*/
	var findSubmitWrap = function( $form ){
		
		// default post submit div
		var $wrap = $form.find('#submitdiv');
		if( $wrap.length ) {
			return $wrap;
		}
		
		// 3rd party publish box
		var $wrap = $form.find('#submitpost');
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
	};
	
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
		
		/** @var string The model identifier. */
		id: 'validation',
		
		/** @var bool The active state. Set to false before 'prepare' to prevent validation. */
		active: true,
		
		/** @var string The model initialize time. */
		wait: 'prepare',
		
		/** @var object The model actions. */
		actions: {
			'ready':	'addInputEvents',
			'append':	'addInputEvents'
		},
		
		/** @var object The model events. */
		events: {
			'click input[type="submit"]':	'onClickSubmit',
			'click button[type="submit"]':	'onClickSubmit',
			//'click #editor .editor-post-publish-button': 'onClickSubmitGutenberg',
			'click #save-post':				'onClickSave',
			'submit form#post':				'onSubmitPost',
			'submit form':					'onSubmit',
		},
		
		/**
		*  initialize
		*
		*  Called when initializing the model.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		initialize: function(){
			
			// check 'validation' setting
			if( !acf.get('validation') ) {
				this.active = false;
				this.actions = {};
				this.events = {};
			}
		},
		
		/**
		*  enable
		*
		*  Enables validation.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		enable: function(){
			this.active = true;
		},
		
		/**
		*  disable
		*
		*  Disables validation.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	void
		*  @return	void
		*/
		disable: function(){
			this.active = false;
		},
		
		/**
		*  reset
		*
		*  Rests the form validation to be used again
		*
		*  @date	6/9/18
		*  @since	5.7.5
		*
		*  @param	jQuery $form The form element.
		*  @return	void
		*/
		reset: function( $form ){
			getValidator( $form ).reset();
		},
		
		/**
		*  addInputEvents
		*
		*  Adds 'invalid' event listeners to HTML inputs.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	jQuery $el The element being added / readied.
		*  @return	void
		*/
		addInputEvents: function( $el ){
			
			// vars
			var $inputs = $('.acf-field [name]', $el);
			
			// check
			if( $inputs.length ) {
				this.on( $inputs, 'invalid', 'onInvalid' );
			}
		},
		
		/**
		*  onInvalid
		*
		*  Callback for the 'invalid' event.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The input element.
		*  @return	void
		*/
		onInvalid: function( e, $el ){
			
			// prevent default
			// - prevents browser error message
			// - also fixes chrome bug where 'hidden-by-tab' field throws focus error
			e.preventDefault();
				
			// vars
			var $form = $el.closest('form');
			
			// check form exists
			if( $form.length ) {
				
				// add error to validator
				getValidator( $form ).addError({
					input: $el.attr('name'),
					message: e.target.validationMessage
				});
				
				// trigger submit on $form
				// - allows for "save", "preview" and "publish" to work
				$form.submit();
			}
		},
		
		/**
		*  onClickSubmit
		*
		*  Callback when clicking submit.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The input element.
		*  @return	void
		*/
		onClickSubmit: function( e, $el ){
			
			// store the "click event" for later use in this.onSubmit()
			this.set('originalEvent', e);
		},
		
		/**
		*  onClickSave
		*
		*  Set ignore to true when saving a draft.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The input element.
		*  @return	void
		*/
		onClickSave: function( e, $el ) {
			this.set('ignore', true);
		},
		
		/**
		*  onClickSubmitGutenberg
		*
		*  Custom validation event for the gutenberg editor.
		*
		*  @date	29/10/18
		*  @since	5.8.0
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The input element.
		*  @return	void
		*/
		onClickSubmitGutenberg: function( e, $el ){
			
			// validate
			var valid = acf.validateForm({
				form: $('#editor'),
				event: e,
				reset: true,
				failure: function( $form, validator ){
					var $notice = validator.get('notice').$el;
					$notice.appendTo('.components-notice-list');
					$notice.find('.acf-notice-dismiss').removeClass('small');
				}
			});
			
			// if not valid, stop event and allow validation to continue
			if( !valid ) {
				e.preventDefault();
				e.stopImmediatePropagation();
			}
		},
		
		/**
		 * onSubmitPost
		 *
		 * Callback when the 'post' form is submit.
		 *
		 * @date	5/3/19
		 * @since	5.7.13
		 *
		 * @param	object e The event object.
		 * @param	jQuery $el The input element.
		 * @return	void
		 */
		onSubmitPost: function( e, $el ) {
			
			// Check if is preview.
			if( $('input#wp-preview').val() === 'dopreview' ) {
				
				// Ignore validation.
				this.set('ignore', true);
				
				// Unlock form to fix conflict with core "submit.edit-post" event causing all submit buttons to be disabled.
				acf.unlockForm( $el )
			}
		},
		
		/**
		*  onSubmit
		*
		*  Callback when the form is submit.
		*
		*  @date	4/9/18
		*  @since	5.7.5
		*
		*  @param	object e The event object.
		*  @param	jQuery $el The input element.
		*  @return	void
		*/
		onSubmit: function( e, $el ){
			
			// Allow form to submit if...
			if(
				// Validation has been disabled.
				!this.active	
				
				// Or this event is to be ignored.		
				|| this.get('ignore')
				
				// Or this event has already been prevented.
				|| e.isDefaultPrevented()
			) {
				// Return early and call reset function.
				return this.allowSubmit();
			}
			
			// Validate form.
			var valid = acf.validateForm({
				form: $el,
				event: this.get('originalEvent')
			});
			
			// If not valid, stop event to prevent form submit.
			if( !valid ) {
				e.preventDefault();
			}
		},
		
		/**
		 * allowSubmit
		 *
		 * Resets data during onSubmit when the form is allowed to submit.
		 *
		 * @date	5/3/19
		 * @since	5.7.13
		 *
		 * @param	void
		 * @return	void
		 */
		allowSubmit: function(){
			
			// Reset "ignore" state.
			this.set('ignore', false);
			
			// Reset "originalEvent" object.
			this.set('originalEvent', false);
			
			// Return true
			return true;
		}
	});
	
})(jQuery);