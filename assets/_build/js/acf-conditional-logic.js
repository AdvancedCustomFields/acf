(function($){
	
	acf.conditional_logic = acf.model.extend({
			
		actions: {
			'prepare 20': 	'render',
			'append 20': 	'render'
		},
		
		events: {
			'change .acf-field input': 		'change',
			'change .acf-field textarea': 	'change',
			'change .acf-field select': 	'change'
		},
		
		items: {},
		triggers: {},
		
		
		/*
		*  add
		*
		*  This function will add a set of conditional logic rules
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	target (string) target field key
		*  @param	groups (array) rule groups
		*  @return	$post_id (int)
		*/
		
		add: function( target, groups ){
			
			// debug
			//console.log( 'conditional_logic.add(%o, %o)', target, groups );
			
			
			// populate triggers
			for( var i in groups ) {
				
				// vars
				var group = groups[i];
				
				for( var k in group ) {
					
					// vars
					var rule = group[k],
						trigger = rule.field,
						triggers = this.triggers[ trigger ] || {};
					
					
					// append trigger (sub field will simply override)
					triggers[ target ] = target;
					
					
					// update
					this.triggers[ trigger ] = triggers;
										
				}
				
			}
			
			
			// append items
			this.items[ target ] = groups;
			
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
			
			// debug
			//console.log('conditional_logic.render(%o)', $el);
			
			
			// defaults
			$el = $el || false;
			
			
			// get targets
			var $targets = acf.get_fields( '', $el, true );
			
			
			// render fields
			this.render_fields( $targets );
			
			
			// action for 3rd party customization
			acf.do_action('refresh', $el);
			
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
		
		change: function( e ){
			
			// debug
			//console.log( 'conditional_logic.change(%o)', $input );
			
			
			// vars
			var $input = e.$el,
				$field = acf.get_field_wrap( $input ),
				key = $field.data('key');
			
			
			// bail early if this field does not trigger any actions
			if( typeof this.triggers[key] === 'undefined' ) {
				
				return false;
				
			}
			
			
			// vars
			$parent = $field.parent();
			
			
			// update visibility
			for( var i in this.triggers[ key ] ) {
				
				// get the target key
				var target_key = this.triggers[ key ][ i ];
				
				
				// get targets
				var $targets = acf.get_fields(target_key, $parent, true);
				
				
				// render
				this.render_fields( $targets );
				
			}
			
			
			// action for 3rd party customization
			acf.do_action('refresh', $parent);
			
		},
		
		
		/*
		*  render_fields
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
		
		render_fields: function( $targets ) {
		
			// reference
			var self = this;
			
			
			// loop over targets and render them			
			$targets.each(function(){
					
				self.render_field( $(this) );
				
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
		
		render_field : function( $target ){
			
			// vars
			var key = $target.data('key');
			
			
			// bail early if this field does not contain any conditional logic
			if( typeof this.items[ key ] === 'undefined' ) {
				
				return false;
				
			}
			
			
			// vars
			var visibility = false;
			
			
			// debug
			//console.log( 'conditional_logic.render_field(%o)', $field );
			
			
			// get conditional logic
			var groups = this.items[ key ];
			
			
			// calculate visibility
			for( var i = 0; i < groups.length; i++ ) {
				
				// vars
				var group = groups[i],
					match_group	= true;
				
				for( var k = 0; k < group.length; k++ ) {
					
					// vars
					var rule = group[k];
					
					
					// get trigger for rule
					var $trigger = this.get_trigger( $target, rule.field );
					
					
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
			
			
			// hide / show field
			if( visibility ) {
				
				this.show_field( $target );					
			
			} else {
				
				this.hide_field( $target );
			
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
		
		show_field: function( $field ){
			
			// debug
			//console.log('show_field(%o)', $field);
			
			
			// vars
			var key = $field.data('key');
			
			
			// remove class
			$field.removeClass( 'hidden-by-conditional-logic' );
			
			
			// enable
			acf.enable_form( $field, 'condition_'+key );
			
						
			// action for 3rd party customization
			acf.do_action('show_field', $field, 'conditional_logic' );
			
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
		
		hide_field : function( $field ){
			
			// debug
			//console.log('hide_field(%o)', $field);
			
			
			// vars
			var key = $field.data('key');
			
			
			// add class
			$field.addClass( 'hidden-by-conditional-logic' );
			
			
			// disable
			acf.disable_form( $field, 'condition_'+key );
						
			
			// action for 3rd party customization
			acf.do_action('hide_field', $field, 'conditional_logic' );
			
		},
		
		
		/*
		*  get_trigger
		*
		*  This function will return the relevant $trigger for a $target
		*
		*  @type	function
		*  @date	22/05/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		get_trigger: function( $target, key ){
			
			// vars
			var selector = acf.get_selector( key );
			
			
			// find sibling $trigger
			var $trigger = $target.siblings( selector );
			
			
			// parent trigger
			if( !$trigger.exists() ) {
				
				// vars
				var parent = acf.get_selector();
				
				
				// loop through parent fields and review their siblings too
				$target.parents( parent ).each(function(){
					
					// find sibling $trigger
					$trigger = $(this).siblings( selector );
					
					
					// bail early if $trigger is found
					if( $trigger.exists() ) {
						
						return false;
						
					}
	
				});
				
			}
			
			
			// bail early if no $trigger is found
			if( !$trigger.exists() ) {
				
				return false;
				
			}
			
			
			// return
			return $trigger;
			
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
		
		calculate : function( rule, $trigger, $target ){
			
			// bail early if $trigger could not be found
			if( !$trigger || !$target ) return false;
			
			
			// debug
			//console.log( 'calculate(%o, %o, %o)', rule, $trigger, $target);
			
			
			// vars
			var match = false,
				type = $trigger.data('type');
			
			
			// input with :checked
			if( type == 'true_false' || type == 'checkbox' || type == 'radio' ) {
				
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

})(jQuery);