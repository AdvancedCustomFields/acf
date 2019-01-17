(function($, undefined){
	
	/**
	*  acf.getPostbox
	*
	*  Returns a postbox instance.
	*
	*  @date	23/9/18
	*  @since	5.7.7
	*
	*  @param	mixed $el Either a jQuery element or the postbox id.
	*  @return	object
	*/
	acf.getPostbox = function( $el ){
		
		// allow string parameter
		if( typeof arguments[0] == 'string' ) {
			$el = $('#' + arguments[0]);
		}
		
		// return instance
		return acf.getInstance( $el );
	};
	
	/**
	*  acf.getPostboxes
	*
	*  Returns an array of postbox instances.
	*
	*  @date	23/9/18
	*  @since	5.7.7
	*
	*  @param	void
	*  @return	array
	*/
	acf.getPostboxes = function(){
		return acf.getInstances( $('.acf-postbox') );
	};
	
	/**
	*  acf.newPostbox
	*
	*  Returns a new postbox instance for the given props.
	*
	*  @date	20/9/18
	*  @since	5.7.6
	*
	*  @param	object props The postbox properties.
	*  @return	object
	*/
	acf.newPostbox = function( props ){
		return new acf.models.Postbox( props );
	};
	
	/**
	*  acf.models.Postbox
	*
	*  The postbox model.
	*
	*  @date	20/9/18
	*  @since	5.7.6
	*
	*  @param	void
	*  @return	void
	*/
	acf.models.Postbox = acf.Model.extend({
		
		data: {
			id:			'',
			key:		'',
			style: 		'default',
			label: 		'top',
			edit:		''
		},
		
		setup: function( props ){
			
			// compatibilty
			if( props.editLink ) {
				props.edit = props.editLink;
			}
			
			// extend data
			$.extend(this.data, props);
			
			// set $el
			this.$el = this.$postbox();
		},
		
		$postbox: function(){
			return $('#' + this.get('id'));
		},
		
		$hide: function(){
			return $('#' + this.get('id') + '-hide');
		},
		
		$hideLabel: function(){
			return this.$hide().parent();
		},
		
		$hndle: function(){
			return this.$('> .hndle');
		},
		
		$inside: function(){
			return this.$('> .inside');
		},
		
		isVisible: function(){
			return this.$el.hasClass('acf-hidden');
		},
		
		initialize: function(){
			
			// Add default class.
			this.$el.addClass('acf-postbox');
			
			// Remove 'hide-if-js class.
			// This class is added by WP to postboxes that are hidden via the "Screen Options" tab.
			this.$el.removeClass('hide-if-js');
			
			// Add field group style class.
			var style = this.get('style');
			if( style !== 'default' ) {
				this.$el.addClass( style );
			}
			
			// Add .inside class.
			this.$inside().addClass('acf-fields').addClass('-' + this.get('label'));
			
			// Append edit link.
			var edit = this.get('edit');
			if( edit ) {
				this.$hndle().append('<a href="' + edit + '" class="dashicons dashicons-admin-generic acf-hndle-cog acf-js-tooltip" title="' + acf.__('Edit field group') + '"></a>');
			}
			
			// Show postbox.
			this.show();
		},
		
		show: function(){
			
			// Show label.
			this.$hideLabel().show();
			
			// toggle on checkbox
			this.$hide().prop('checked', true);
			
			// Show postbox
			this.$el.show().removeClass('acf-hidden');
		},
		
		enable: function(){
			acf.enable( this.$el, 'postbox' );
		},
		
		showEnable: function(){
			this.show();
			this.enable();
		},
		
		hide: function(){
			
			// Hide label.
			this.$hideLabel().hide();
			
			// Hide postbox
			this.$el.hide().addClass('acf-hidden');
		},
		
		disable: function(){
			acf.disable( this.$el, 'postbox' );
		},
		
		hideDisable: function(){
			this.hide();
			this.disable();
		},
		
		html: function( html ){
			
			// Update HTML.
			this.$inside().html( html );
			
			// Do action.
			acf.doAction('append', this.$el);
		}
	});
		
})(jQuery);