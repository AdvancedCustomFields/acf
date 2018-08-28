(function($, undefined){
	
	var __ = acf.__;
	
	var parseString = function( val ){
		return val ? '' + val : '';
	};
	
	var isEqualTo = function( v1, v2 ){
		return ( parseString(v1).toLowerCase() === parseString(v2).toLowerCase() );
	};
	
	var isEqualToNumber = function( v1, v2 ){
		return ( parseFloat(v1) === parseFloat(v2) );
	};
	
	var isGreaterThan = function( v1, v2 ){
		return ( parseFloat(v1) > parseFloat(v2) );
	};
	
	var isLessThan = function( v1, v2 ){
		return ( parseFloat(v1) < parseFloat(v2) );
	};
	
	var inArray = function( v1, array ){
		
		// cast all values as string
		array = array.map(function(v2){
			return parseString(v2);
		});
		
		return (array.indexOf( v1 ) > -1);
	}
	
	var containsString = function( haystack, needle ){
		return ( parseString(haystack).indexOf( parseString(needle) ) > -1 );
	};
	
	var matchesPattern = function( v1, pattern ){
		var regexp = new RegExp(parseString(pattern), 'gi');
		return parseString(v1).match( regexp );
	};
	
	/**
	*  hasValue
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var HasValue = acf.Condition.extend({
		type: 'hasValue',
		operator: '!=empty',
		label: __('Has any value'),
		fieldTypes: [ 'text', 'textarea', 'number', 'range', 'email', 'url', 'password', 'image', 'file', 'wysiwyg', 'oembed', 'select', 'checkbox', 'radio', 'button_group', 'link', 'post_object', 'page_link', 'relationship', 'taxonomy', 'user', 'google_map', 'date_picker', 'date_time_picker', 'time_picker', 'color_picker' ],
		match: function( rule, field ){
			return (field.val() ? true : false);
		},
		choices: function( fieldObject ){
			return '<input type="text" disabled="" />';
		}
	});
	
	acf.registerConditionType( HasValue );
	
	/**
	*  hasValue
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var HasNoValue = HasValue.extend({
		type: 'hasNoValue',
		operator: '==empty',
		label: __('Has no value'),
		match: function( rule, field ){
			return !HasValue.prototype.match.apply(this, arguments);
		}
	});
	
	acf.registerConditionType( HasNoValue );
	
	
	
	/**
	*  EqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var EqualTo = acf.Condition.extend({
		type: 'equalTo',
		operator: '==',
		label: __('Value is equal to'),
		fieldTypes: [ 'text', 'textarea', 'number', 'range', 'email', 'url', 'password' ],
		match: function( rule, field ){
			if( $.isNumeric(rule.value) ) {
				return isEqualToNumber( rule.value, field.val() );
			} else {
				return isEqualTo( rule.value, field.val() );
			}
		},
		choices: function( fieldObject ){
			return '<input type="text" />';
		}
	});
	
	acf.registerConditionType( EqualTo );
	
	/**
	*  NotEqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var NotEqualTo = EqualTo.extend({
		type: 'notEqualTo',
		operator: '!=',
		label: __('Value is not equal to'),
		match: function( rule, field ){
			return !EqualTo.prototype.match.apply(this, arguments);
		}
	});
	
	acf.registerConditionType( NotEqualTo );
	
	/**
	*  PatternMatch
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var PatternMatch = acf.Condition.extend({
		type: 'patternMatch',
		operator: '==pattern',
		label: __('Value matches pattern'),
		fieldTypes: [ 'text', 'textarea', 'email', 'url', 'password', 'wysiwyg' ],
		match: function( rule, field ){
			return matchesPattern( field.val(), rule.value );
		},
		choices: function( fieldObject ){
			return '<input type="text" placeholder="[a-z0-9]" />';
		}
	});
	
	acf.registerConditionType( PatternMatch );
	
	/**
	*  Contains
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var Contains = acf.Condition.extend({
		type: 'contains',
		operator: '==contains',
		label: __('Value contains'),
		fieldTypes: [ 'text', 'textarea', 'number', 'email', 'url', 'password', 'wysiwyg', 'oembed', 'select' ],
		match: function( rule, field ){
			return containsString( field.val(), rule.value );
		},
		choices: function( fieldObject ){
			return '<input type="text" />';
		}
	});
	
	acf.registerConditionType( Contains );
	
	/**
	*  TrueFalseEqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var TrueFalseEqualTo = EqualTo.extend({
		type: 'trueFalseEqualTo',
		choiceType: 'select',
		fieldTypes: [ 'true_false' ],
		choices: function( field ){
			return [
				{
					id:		1,
					text:	__('Checked')
				}
			];
		},
	});
	
	acf.registerConditionType( TrueFalseEqualTo );
	
	/**
	*  TrueFalseNotEqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var TrueFalseNotEqualTo = NotEqualTo.extend({
		type: 'trueFalseNotEqualTo',
		choiceType: 'select',
		fieldTypes: [ 'true_false' ],
		choices: function( field ){
			return [
				{
					id:		1,
					text:	__('Checked')
				}
			];
		},
	});
	
	acf.registerConditionType( TrueFalseNotEqualTo );
	
	/**
	*  SelectEqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var SelectEqualTo = acf.Condition.extend({
		type: 'selectEqualTo',
		operator: '==',
		label: __('Value is equal to'),
		fieldTypes: [ 'select', 'checkbox', 'radio', 'button_group' ],
		match: function( rule, field ){
			var val = field.val();
			if( val instanceof Array ) {
				return inArray( rule.value, val );
			} else {
				return isEqualTo( rule.value, val );
			}
		},
		choices: function( fieldObject ){
			
			// vars
			var choices = [];
			var lines = fieldObject.$setting('choices textarea').val().split("\n");	
			
			// allow null
			if( fieldObject.$input('allow_null').prop('checked') ) {
				choices.push({
					id: '',
					text: __('Null')
				});
			}
			
			// loop
			lines.map(function( line ){
				
				// split
				line = line.split(':');
				
				// default label to value
				line[1] = line[1] || line[0];
				
				// append					
				choices.push({
					id: $.trim( line[0] ),
					text: $.trim( line[1] )
				});
			});
			
			// return
			return choices;
		},
	});
	
	acf.registerConditionType( SelectEqualTo );
	
	/**
	*  SelectNotEqualTo
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var SelectNotEqualTo = SelectEqualTo.extend({
		type: 'selectNotEqualTo',
		operator: '!=',
		label: __('Value is not equal to'),
		match: function( rule, field ){
			return !SelectEqualTo.prototype.match.apply(this, arguments);
		}
	});
	
	acf.registerConditionType( SelectNotEqualTo );
	
	/**
	*  GreaterThan
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var GreaterThan = acf.Condition.extend({
		type: 'greaterThan',
		operator: '>',
		label: __('Value is greater than'),
		fieldTypes: [ 'number', 'range' ],
		match: function( rule, field ){
			var val = field.val();
			if( val instanceof Array ) {
				val = val.length;
			}
			return isGreaterThan( val, rule.value );
		},
		choices: function( fieldObject ){
			return '<input type="number" />';
		}
	});
	
	acf.registerConditionType( GreaterThan );
	
	
	/**
	*  LessThan
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var LessThan = GreaterThan.extend({
		type: 'lessThan',
		operator: '<',
		label: __('Value is less than'),
		match: function( rule, field ){
			var val = field.val();
			if( val instanceof Array ) {
				val = val.length;
			}
			return isLessThan( val, rule.value );
		},
		choices: function( fieldObject ){
			return '<input type="number" />';
		}
	});
	
	acf.registerConditionType( LessThan );
	
	/**
	*  SelectedGreaterThan
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var SelectionGreaterThan = GreaterThan.extend({
		type: 'selectionGreaterThan',
		label: __('Selection is greater than'),
		fieldTypes: [ 'checkbox', 'select', 'post_object', 'page_link', 'relationship', 'taxonomy', 'user' ],
	});
	
	acf.registerConditionType( SelectionGreaterThan );
	
	/**
	*  SelectedGreaterThan
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	void
	*  @return	void
	*/
	
	var SelectionLessThan = LessThan.extend({
		type: 'selectionLessThan',
		label: __('Selection is less than'),
		fieldTypes: [ 'checkbox', 'select', 'post_object', 'page_link', 'relationship', 'taxonomy', 'user' ],
	});
	
	acf.registerConditionType( SelectionLessThan );
	
})(jQuery);