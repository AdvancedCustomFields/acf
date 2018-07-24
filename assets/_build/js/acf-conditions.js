(function($, undefined){
	
	// vars
	var CONTEXT = 'conditional_logic';
	
	/**
	*  conditionsManager
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var conditionsManager = new acf.Model({
		
		id: 'conditionsManager',
		
		priority: 20, // run actions later
		
		actions: {
			'new_field':		'onNewField',
		},
		
		onNewField: function( field ){
			if( field.has('conditions') ) {
				field.getConditions().render();
			}
		},
	});
	
	/**
	*  acf.Field.prototype.getField
	*
	*  Finds a field that is related to another field
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var getSiblingField = function( field, key ){
			
		// find sibling (very fast)
		var fields = acf.getFields({
			key: key,
			sibling: field.$el,
			suppressFilters: true,
		});
		
		// find sibling-children (fast)
		// needed for group fields, accordions, etc
		if( !fields.length ) {
			fields = acf.getFields({
				key: key,
				parent: field.$el.parent(),
				suppressFilters: true,
			});
		}
		 
		// return
		if( fields.length ) {
			return fields[0];
		}
		return false;
	};
	
	acf.Field.prototype.getField = function( key ){
		
		// get sibling field
		var field = getSiblingField( this, key );
		
		// return early
		if( field ) {
			return field;
		}
		
		// move up through each parent and try again
		var parents = this.parents();
		for( var i = 0; i < parents.length; i++ ) {
			
			// get sibling field
			field = getSiblingField( parents[i], key );
			
			// return early
			if( field ) {
				return field;
			}
		}
		
		// return
		return false;
	};
	
	
	/**
	*  acf.Field.prototype.getConditions
	*
	*  Returns the field's conditions instance
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.Field.prototype.getConditions = function(){
		
		// instantiate
		if( !this.conditions ) {
			this.conditions = new Conditions( this );
		}
		
		// return
		return this.conditions;
	};
	
	
	/**
	*  Conditions
	*
	*  description
	*
	*  @date	1/2/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	var timeout = false;
	var Conditions = acf.Model.extend({
		
		id: 'Conditions',
		
		data: {
			field:		false,	// The field with "data-conditions" (target).
			timeStamp:	false,	// Reference used during "change" event.
			groups:		[],		// The groups of condition instances.
		},
		
		setup: function( field ){
			
			// data
			this.data.field = field;
			
			// vars
			var conditions = field.get('conditions');
			
			// detect groups
			if( conditions instanceof Array ) {
				
				// detect groups
				if( conditions[0] instanceof Array ) {

					// loop
					conditions.map(function(rules, i){
						this.addRules( rules, i );
					}, this);
				
				// detect rules
				} else {
					this.addRules( conditions );
				}
				
			// detect rule
			} else {
				this.addRule( conditions );
			}
		},
		
		change: function( e ){
			
			// this function may be triggered multiple times per event due to multiple condition classes
			// compare timestamp to allow only 1 trigger per event
			if( this.get('timeStamp') === e.timeStamp ) {
				return false;
			} else {
				this.set('timeStamp', e.timeStamp, true);
			}
			
			// render condition and store result
			var changed = this.render();
		},
		
		render: function(){
			return this.calculate() ? this.show() : this.hide();
		},
		
		show: function(){
			return this.get('field').showEnable(this.cid, CONTEXT);
		},
		
		hide: function(){
			return this.get('field').hideDisable(this.cid, CONTEXT);
		},
		
		calculate: function(){
			
			// vars
			var pass = false;
			
			// loop
			this.getGroups().map(function( group ){
				
				// igrnore this group if another group passed
				if( pass ) return;
				
				// find passed
				var passed = group.filter(function(condition){
					return condition.calculate();
				});
				
				// if all conditions passed, update the global var
				if( passed.length == group.length ) {
					pass = true;
				}
			});
			
			return pass;
		},
		
		hasGroups: function(){
			return this.data.groups != null;
		},
		
		getGroups: function(){
			return this.data.groups;
		},
		
		addGroup: function(){
			var group = [];
			this.data.groups.push( group );
			return group;
		},
		
		hasGroup: function( i ){
			return this.data.groups[i] != null;
		},
		
		getGroup: function( i ){
			return this.data.groups[i];
		},
		
		removeGroup: function( i ){
			this.data.groups[i].delete;
			return this;
		},
		
		addRules: function( rules, group ){
			rules.map(function( rule ){
				this.addRule( rule, group );
			}, this);
		},
		
		addRule: function( rule, group ){
			
			// defaults
			group = group || 0;
			
			// vars
			var groupArray;
			
			// get group
			if( this.hasGroup(group) ) {
				groupArray = this.getGroup(group);
			} else {
				groupArray = this.addGroup();
			}
			
			// instantiate
			var condition = acf.newCondition( rule, this );
			
			// bail ealry if condition failed (field did not exist)
			if( !condition ) {
				return false;
			}
			
			// add rule
			groupArray.push(condition);
		},
		
		hasRule: function(){
			
		},
		
		getRule: function( rule, group ){
			
			// defaults
			rule = rule || 0;
			group = group || 0;
			
			return this.data.groups[ group ][ rule ];
		},
		
		removeRule: function(){
			
		}
	});
	
})(jQuery);