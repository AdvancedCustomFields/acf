(function($, undefined){
	
	// vars
	var storage = [];
	
	/**
	*  acf.Field
	*
	*  description
	*
	*  @date	23/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.Field = acf.Model.extend({
		
		// field type
		type: '',
		
		// class used to avoid nested event triggers
		eventScope: '.acf-field',
		
		// initialize events on 'ready'
		wait: 'ready',
		
		/**
		*  setup
		*
		*  Called during the constructor function to setup this field ready for initialization
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	jQuery $field The field element.
		*  @return	void
		*/
		
		setup: function( $field ){
			
			// set $el
			this.$el = $field;
			
			// inherit $field data
			this.inherit( $field );
			
			// inherit controll data
			this.inherit( this.$control() );
		},
		
		/**
		*  val
		*
		*  Sets or returns the field's value
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	mixed val Optional. The value to set
		*  @return	mixed
		*/
		
		val: function( val ){
			if( val !== undefined ) {
				return this.setValue( val );
			} else {
				return this.prop('disabled') ? null : this.getValue();
			}
		},
		
		/**
		*  getValue
		*
		*  returns the field's value
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	mixed
		*/
		
		getValue: function(){
			return this.$input().val();
		},
		
		/**
		*  setValue
		*
		*  sets the field's value and returns true if changed
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	mixed val
		*  @return	boolean. True if changed.
		*/
		
		setValue: function( val ){
			return acf.val( this.$input(), val );
		},
		
		/**
		*  __
		*
		*  i18n helper to be removed
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		__: function( string ){
			return acf._e( this.type, string );
		},
		
		/**
		*  $control
		*
		*  returns the control jQuery element used for inheriting data. Uses this.control setting.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	jQuery
		*/
		
		$control: function(){
			return false;
		},
		
		/**
		*  $input
		*
		*  returns the input jQuery element used for saving values. Uses this.input setting.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	jQuery
		*/
		
		$input: function(){
			return this.$('[name]:first');
		},
		
		/**
		*  $inputWrap
		*
		*  description
		*
		*  @date	12/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		$inputWrap: function(){
			return this.$('.acf-input:first');
		},
		
		/**
		*  $inputWrap
		*
		*  description
		*
		*  @date	12/5/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		$labelWrap: function(){
			return this.$('.acf-label:first');
		},
		
		/**
		*  getInputName
		*
		*  Returns the field's input name
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	string
		*/
		
		getInputName: function(){
			return this.$input().attr('name') || '';
		},
		
		/**
		*  parent
		*
		*  returns the field's parent field or false on failure.
		*
		*  @date	8/5/18
		*  @since	5.6.9
		*
		*  @param	void
		*  @return	object|false
		*/
		
		parent: function() {
			
			// vars
			var parents = this.parents();
			
			// return
			return parents.length ? parents[0] : false;
		},
		
		/**
		*  parents
		*
		*  description
		*
		*  @date	9/7/18
		*  @since	5.6.9
		*
		*  @param	type $var Description. Default.
		*  @return	type Description.
		*/
		
		parents: function(){
			
			// vars
			var $parents = this.$el.parents('.acf-field');
			
			// convert
			var parents = acf.getFields( $parents );
			
			// return
			return parents;
		},
		
		show: function( lockKey, context ){
			
			// show field and store result
			var changed = acf.show( this.$el, lockKey );
			
			// do action if visibility has changed
			if( changed ) {
				this.prop('hidden', false);
				acf.doAction('show_field', this, context);
			}
			
			// return
			return changed;
		},
		
		hide: function( lockKey, context ){
			
			// hide field and store result
			var changed = acf.hide( this.$el, lockKey );
			
			// do action if visibility has changed
			if( changed ) {
				this.prop('hidden', true);
				acf.doAction('hide_field', this, context);
			}
			
			// return
			return changed;
		},
		
		enable: function( lockKey, context ){
			
			// enable field and store result
			var changed = acf.enable( this.$el, lockKey );
			
			// do action if disabled has changed
			if( changed ) {
				this.prop('disabled', false);
				acf.doAction('enable_field', this, context);
			}
			
			// return
			return changed;
		},
		
		disable: function( lockKey, context ){
			
			// disabled field and store result
			var changed = acf.disable( this.$el, lockKey );
			
			// do action if disabled has changed
			if( changed ) {
				this.prop('disabled', true);
				acf.doAction('disable_field', this, context);
			}
			
			// return
			return changed;
		},
		
		showEnable: function( lockKey, context ){
			
			// enable
			this.enable.apply(this, arguments);
			
			// show and return true if changed
			return this.show.apply(this, arguments);
		},
		
		hideDisable: function( lockKey, context ){
			
			// disable
			this.disable.apply(this, arguments);
			
			// hide and return true if changed
			return this.hide.apply(this, arguments);
		},
		
		showNotice: function( props ){
			
			// ensure object
			if( typeof props !== 'object' ) {
				props = { text: props };
			}
			
			// remove old notice
			if( this.notice ) {
				this.notice.remove();
			}
			
			// create new notice
			props.target = this.$inputWrap();
			this.notice = acf.newNotice( props );
		},
		
		removeNotice: function( timeout ){
			if( this.notice ) {
				this.notice.away( timeout || 0 );
				this.notice = false;
			}
		},
		
		showError: function( message ){
			
			// add class
			this.$el.addClass('acf-error');
			
			// add message
			if( message !== undefined ) {
				this.showNotice({
					text: message,
					type: 'error',
					dismiss: false
				});
			}
			
			// action
			acf.doAction('invalid_field', this);
			
			// add event
			this.$el.one('focus change', 'input, select, textarea', $.proxy( this.removeError, this ));	
		},
		
		removeError: function(){
			
			// remove class
			this.$el.removeClass('acf-error');
			
			// remove notice
			this.removeNotice( 250 );
			
			// action
			acf.doAction('valid_field', this);
		},
		
		trigger: function( name, args, bubbles ){
			
			// allow some events to bubble
			if( name == 'invalidField' ) {
				bubbles = true;
			}
			
			// return
			return acf.Model.prototype.trigger.apply(this, [name, args, bubbles]);
		},
	});
	
	/**
	*  newField
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newField = function( $field ){
		
		// vars
		var type = $field.data('type');
		var mid = modelId( type );
		var model = acf.models[ mid ] || acf.Field;
		
		// instantiate
		var field = new model( $field );
		
		// actions
		acf.doAction('new_field', field);
		
		// return
		return field;
	};
	
	/**
	*  mid
	*
	*  Calculates the model ID for a field type
	*
	*  @date	15/12/17
	*  @since	5.6.5
	*
	*  @param	string type
	*  @return	string
	*/
	
	var modelId = function( type ) {
		return acf.strPascalCase( type || '' ) + 'Field';
	};
	
	/**
	*  registerFieldType
	*
	*  description
	*
	*  @date	14/12/17
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerFieldType = function( model ){
		
		// vars
		var proto = model.prototype;
		var type = proto.type;
		var mid = modelId( type );
		
		// store model
		acf.models[ mid ] = model;
		
		// store reference
		storage.push( type );
	};
	
	/**
	*  acf.getFieldType
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldType = function( type ){
		var mid = modelId( type );
		return acf.models[ mid ] || false;
	}
	
	/**
	*  acf.getFieldTypes
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getFieldTypes = function( args ){
		
		// defaults
		args = acf.parseArgs(args, {
			category: '',
			// hasValue: true
		});
		
		// clonse available types
		var types = [];
		
		// loop
		storage.map(function( type ){
			
			// vars
			var model = acf.getFieldType(type);
			var proto = model.prototype;
						
			// check operator
			if( args.category && proto.category !== args.category )  {
				return;
			}
			
			// append
			types.push( model );
		});
		
		// return
		return types;
	};
	
})(jQuery);