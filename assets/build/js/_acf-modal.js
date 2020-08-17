(function($, undefined){
	
	acf.models.Modal = acf.Model.extend({
		data: {
			title: '',
			content: '',
			toolbar: '',
		},
		events: {
			'click .acf-modal-close': 'onClickClose',
		},
		setup: function( props ){
			$.extend(this.data, props);
			this.$el = $();
			this.render();
		},
		initialize: function(){
			this.open();
		},
		render: function(){
			
			// Extract vars.
			var title = this.get('title');
			var content = this.get('content');
			var toolbar = this.get('toolbar');
			
			// Create element.
			var $el = $([
				'<div>',
					'<div class="acf-modal">',
						'<div class="acf-modal-title">',
							'<h2>' + title + '</h2>',
							'<button class="acf-modal-close" type="button"><span class="dashicons dashicons-no"></span></button>',
						'</div>',
						'<div class="acf-modal-content">' + content + '</div>',
						'<div class="acf-modal-toolbar">' + toolbar + '</div>',
					'</div>',
					'<div class="acf-modal-backdrop acf-modal-close"></div>',
				'</div>'
			].join('') );
			
			// Update DOM.
			if( this.$el ) {
				this.$el.replaceWith( $el );
			}
			this.$el = $el;
				
			// Trigger action.
			acf.doAction('append', $el);
		},
		update: function( props ){
			this.data = acf.parseArgs(props, this.data);
			this.render();
		},
		title: function( title ){
			this.$('.acf-modal-title h2').html( title );
		},
		content: function( content ){
			this.$('.acf-modal-content').html( content );
		},
		toolbar: function( toolbar ){
			this.$('.acf-modal-toolbar').html( toolbar );
		},
		open: function(){
			$('body').append( this.$el );
		},
		close: function(){
			this.remove();
		},
		onClickClose: function( e, $el ){
			e.preventDefault();
			this.close();
		}
	});
	
	/**
	 * Returns a new modal.
	 *
	 * @date	21/4/20
	 * @since	5.9.0
	 *
	 * @param	object props The modal props.
	 * @return	object
	 */
	acf.newModal = function( props ){
		return new acf.models.Modal( props );
	};
	
})(jQuery);