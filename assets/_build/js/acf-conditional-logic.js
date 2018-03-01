(function($, undefined){
	
	// constants
	var CLASS = 'hidden-by-conditional-logic';
	var CONTEXT = 'conditional_logic';
	
	// model
	var conditionalLogic = acf.conditional_logic = acf.model.extend({
		
		// storage of fields that have conditions
		conditions: {},
		
		// storage of fields that trigger a condition
		triggers: {},
		
		// reference to parent element of both the trigger and target
		$parent: false,
		
		// actions
		actions: {
			'prepare 20': 	'render',
			'append 20': 	'render',
			'change':		'change'
		},
		
		
		/*
		*  add
		*
		*  This function will add a set of conditional logic rules
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	string	target		field key
		*  @param	array	conditions	array of conditional logic groups
		*  @return	$post_id (int)
		*/
		
		add: function( target, conditions ){
			
			// add triggers
			for( var i in conditions ) {
				var group = conditions[i];
				
				for( var k in group ) {
					var rule = group[k];
					
					this.addTrigger( rule.field, target );
				}
			}
			
			
			// add condition
			this.setCondition( target, conditions );
			
		},
		
		
		/**
		*  getTrigger
		*
		*  This function will return the fields that are triggered by this key.
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	string key The trigger's key.
		*  @return	mixed
		*/
		
		getTrigger: function( key ){
			return this.triggers[ key ] || null;
		},
		
		
		/**
		*  setTrigger
		*
		*  This function will set the fields that are triggered by this key.
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	string key The trigger's key.
		*  @return	mixed
		*/
		
		setTrigger: function( key, value ){
			this.triggers[ key ] = value;
		},
		
		
		/**
		*  addTrigger
		*
		*  This function will add a reference for a field that triggers another field's visibility
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		addTrigger: function( trigger, target ){
			
			// vars
			var triggers = this.getTrigger( trigger ) || {};
			
			// append
			triggers[ target ] = 1;
			
			// set
			this.setTrigger(trigger, triggers);
				
		},
		
		
		/**
		*  getConditions
		*
		*  This function will return the conditions for all targets.
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	string key The trigger's key.
		*  @return	mixed
		*/
		
		getConditions: function(){
			return this.conditions;
		},
		
		
		/**
		*  getCondition
		*
		*  This function will return the conditions for a target.
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	string key The trigger's key.
		*  @return	mixed
		*/
		
		getCondition: function( key ){
			return this.conditions[ key ] || null;
		},
		
		
		/**
		*  setCondition
		*
		*  This function will set the conditions for a target.
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	string key The trigger's key.
		*  @return	mixed
		*/
		
		setCondition: function( key, value ){
			this.conditions[ key ] = value;
		},
		
		
		/*
		*  render
		*
		*  This function will render all fields
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		render: function( $el ){
			
			// vars
			$el = $el || false;
			
			// get targets
			var $targets = acf.get_fields( '', $el, true );
			
			// render fields
			this.renderFields( $targets );
			
			// action for 3rd party customization
			acf.do_action('refresh', $el);
			
		},
		
		
		/**
		*  findParent
		*
		*  This function will find a parent that contains both the trigger and target
		*
		*  @date	15/11/17
		*  @since	5.6.5
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		findTarget: function( $trigger, target ){
			
			// vars
			var self = this;
			
			// reset scope
			this.$parent = false;
			
			
			// find siblings
			var selector = acf.get_selector( target );
			var $targets = $trigger.siblings( selector );
			
			// return if found
			if( $targets.length ) {
				this.$parent = $trigger.parent();
				return $targets;
			}
			
			
			// find all targets
			var $targets = acf.get_fields(target, false, true);
			
			// refine scope if more than 1 found
			if( $targets.length > 1 ) {
				
				// loop
				$trigger.parents('.acf-row, .acf-table, .acf-fields').each(function(){
					
					// vars
					var $parent = $(this);
					var $child = $parent.find( $targets );
					
					// found
					if( $child.length ) {
						$targets = $child;
						self.$parent = $parent;
						return false;
					}
					
				});
				
			}
			
			// return
			return $targets;
			
		},
		
		
		/*
		*  change
		*
		*  This function is called when an input is changed and will render any fields which are considered targets of this trigger
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		change: function( $input ){
			
			// vars
			var $trigger = acf.get_field_wrap($input);
			var key = $trigger.data('key');
			var trigger = this.getTrigger(key);
			
			// bail early if this field is not a trigger
			if( !trigger ) return false;
			
			// loop
			for( var target in trigger ) {
				
				// get target(s)
				var $targets = this.findTarget( $trigger, target );
				
				// render
				this.renderFields( $targets );
				
			}
			
			// action for 3rd party customization
			acf.do_action('refresh', this.$parent);
			
		},
		
		
		/*
		*  renderFields
		*
		*  This function will render a selection of fields
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		renderFields: function( $targets ) {
		
			// reference
			var self = this;
			
			// loop		
			$targets.each(function(){
				self.renderField( $(this) );
			});
			
		},
		
		
		/*
		*  render_field
		*
		*  This function will render a field
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		renderField : function( $target ){
			
			// vars
			var visibility = false;
			var key = $target.data('key');
			var condition = this.getCondition( key );
			
			// bail early if this field does not contain any conditional logic
			if( !condition ) return false;
			
			// loop
			for( var i = 0; i < condition.length; i++ ) {
				
				// vars
				var group = condition[i],
					match_group	= true;
				
				// loop
				for( var k = 0; k < group.length; k++ ) {
					
					// vars
					var rule = group[k];
					
					// get trigger for rule
					var $trigger = this.findTarget( $target, rule.field );
					
					// break if rule did not validate
					if( !this.calculate(rule, $trigger, $target) ) {
						match_group = false;
						break;
					}					
				}
				
				// set visibility if rule group did validate
				if( match_group ) {
					visibility = true;
					break;
				}
			}
			
			// hide / show
			if( visibility ) {
				this.showField( $target );					
			} else {
				this.hideField( $target );
			}
			
		},
		
		
		/*
		*  show_field
		*
		*  This function will show a field
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		showField: function( $field, lockKey ){
//console.log('showField', lockKey, $field.data('name'), $field.data('type') );
			// defaults
			lockKey = lockKey || 'default';
			
			// bail early if field is not locked (does not need to be unlocked)
			if( !acf.isLocked($field, CONTEXT) ) {
//console.log('- not locked, no need to show');
				return false;
			}
			
			// unlock
			acf.unlock($field, CONTEXT, lockKey);
			
			// bail early if field is still locked (by another field)
			if( acf.isLocked($field, CONTEXT) ) {
//console.log('- is still locked, cant show', acf.getLocks($field, CONTEXT));
				return false;
			}
			
			// remove class
			$field.removeClass( CLASS );
			
			// enable
			acf.enable_form( $field, CONTEXT );
			
			// action for 3rd party customization
			acf.do_action('show_field', $field, CONTEXT );
			
		},
		
		
		/*
		*  hide_field
		*
		*  This function will hide a field
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		hideField: function( $field, lockKey ){
//console.log('hideField', lockKey, $field.data('name'), $field.data('type') );
			// defaults
			lockKey = lockKey || 'default';
			
			// vars
			var isLocked = acf.isLocked($field, CONTEXT);
			
			// unlock
			acf.lock($field, CONTEXT, lockKey);
			
			// bail early if field is already locked (by another field)
			if( isLocked ) {
//console.log('- is already locked');
				return false;
			}
			
			// add class
			$field.addClass( CLASS );
			
			// disable
			acf.disable_form( $field, CONTEXT );
						
			// action for 3rd party customization
			acf.do_action('hide_field', $field, CONTEXT );
			
		},
				
		
		/*
		*  calculate
		*
		*  This function will calculate if a rule matches based on the $trigger
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		calculate: function( rule, $trigger, $target ){
			
			// bail early if $trigger could not be found
			if( !$trigger || !$target ) return false;
			
			
			// debug
			//console.log( 'calculate(%o, %o, %o)', rule, $trigger, $target);
			
			
			// vars
			var match = false,
				type = $trigger.data('type');
			
			
			// input with :checked
			if( type == 'true_false' || type == 'checkbox' || type == 'radio' || type == 'button_group' ) {
				
				match = this.calculate_checkbox( rule, $trigger );
	        
				
			} else if( type == 'select' ) {
				
				match = this.calculate_select( rule, $trigger );
								
			}
			
			
			// reverse if 'not equal to'
			if( rule.operator === "!=" ) {
				
				match = !match;
					
			}
	        
			
			// return
			return match;
			
		},
		
		calculate_checkbox: function( rule, $trigger ){
			
			// look for selected input
			var match = $trigger.find('input[value="' + rule.value + '"]:checked').exists();
			
			
			// override for "allow null"
			if( rule.value === '' && !$trigger.find('input:checked').exists() ) {
				
				match = true;
				
			}
			
			
			// return
			return match;
			
		},
		
		
		calculate_select: function( rule, $trigger ){
			
			// vars
			var $select = $trigger.find('select'),
				val = $select.val();
			
			
			// check for no value
			if( !val && !$.isNumeric(val) ) {
				
				val = '';
				
			}
			
			
			// convert to array
			if( !$.isArray(val) ) {
				
				val = [ val ];
				
			}
			
			
			// calc
			match = ($.inArray(rule.value, val) > -1);

			
			// return
			return match;
			
		}
		
	});
	
	
	// compatibility
	conditionalLogic.show_field = conditionalLogic.showField;
	conditionalLogic.hide_field = conditionalLogic.hideField;
	

})(jQuery);