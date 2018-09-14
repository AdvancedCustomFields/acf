(function($, undefined){
	
	// vars
	var storage = [];
	
	/**
	*  acf.Condition
	*
	*  description
	*
	*  @date	23/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.Condition = acf.Model.extend({
		
		type: '',							// used for model name
		operator: '==',						// rule operator
		label: '',							// label shown when editing fields
		choiceType: 'input',				// input, select
		fieldTypes: [],						// auto connect this conditions with these field types
		
		data: {
			conditions: false,	// the parent instance
			field: false,		// the field which we query against
			rule: {}			// the rule [field, operator, value]
		},
		
		events: {
			'change':		'change',
			'keyup':		'change',
			'enableField':	'change',
			'disableField':	'change'
		},
		
		setup: function( props ){
			$.extend(this.data, props);
		},
		
		getEventTarget: function( $el, event ){
			return $el || this.get('field').$el;
		},
		
		change: function( e, $el ){
			this.get('conditions').change( e );
		},
		
		match: function( rule, field ){
			return false;
		},
		
		calculate: function(){
			return this.match( this.get('rule'), this.get('field') );
		},
		
		choices: function( field ){
			return '<input type="text" />';
		}
	});
	
	/**
	*  acf.newCondition
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newCondition = function( rule, conditions ){
		
		// currently setting up conditions for fieldX, this field is the 'target'
		var target = conditions.get('field');
		
		// use the 'target' to find the 'trigger' field. 
		// - this field is used to setup the conditional logic events
		var field = target.getField( rule.field );
		
		// bail ealry if no target or no field (possible if field doesn't exist due to HTML error)
		if( !target || !field ) {
			return false;
		}
		
		// vars
		var args = {
			rule: rule,
			target: target,
			conditions: conditions,
			field: field
		};
		
		// vars
		var fieldType = field.get('type');
		var operator = rule.operator;
		
		// get avaibale conditions
		var conditionTypes = acf.getConditionTypes({
			fieldType: fieldType,
			operator: operator,
		});
		
		// instantiate
		var model = conditionTypes[0] || acf.Condition;
		
		// instantiate
		var condition = new model( args );
		
		// return
		return condition;
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
		return acf.strPascalCase( type || '' ) + 'Condition';
	};
	
	/**
	*  acf.registerConditionType
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerConditionType = function( model ){
		
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
	*  acf.getConditionType
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getConditionType = function( type ){
		var mid = modelId( type );
		return acf.models[ mid ] || false;
	}
	
	/**
	*  acf.registerConditionForFieldType
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.registerConditionForFieldType = function( conditionType, fieldType ){
		
		// get model
		var model = acf.getConditionType( conditionType );
		
		// append
		if( model ) {
			model.prototype.fieldTypes.push( fieldType );
		}
	};
	
	/**
	*  acf.getConditionTypes
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getConditionTypes = function( args ){
		
		// defaults
		args = acf.parseArgs(args, {
			fieldType: '',
			operator: ''
		});
		
		// clonse available types
		var types = [];
		
		// loop
		storage.map(function( type ){
			
			// vars
			var model = acf.getConditionType(type);
			var ProtoFieldTypes = model.prototype.fieldTypes;
			var ProtoOperator = model.prototype.operator;
			
			// check fieldType
			if( args.fieldType && ProtoFieldTypes.indexOf( args.fieldType ) === -1 )  {
				return;
			}
			
			// check operator
			if( args.operator && ProtoOperator !== args.operator )  {
				return;
			}
			
			// append
			types.push( model );
		});
		
		// return
		return types;
	};
	
})(jQuery);