(function($, undefined){
	
	acf.models.Popup = acf.Model.extend({
			
		data: {
			title: '',
			content: '',
			width: 0,
			height: 0,
			loading: false,
		},
		
		events: {
			'click [data-event="close"]': 'onClickClose',
			'click .acf-close-popup': 'onClickClose',
		},
		
		setup: function( props ){
			$.extend(this.data, props);
			this.$el = $(this.tmpl());
		},
		
		initialize: function(){
			this.render();
			this.open();
		},
		
		tmpl: function(){
			return [
				'<div id="acf-popup">',
					'<div class="acf-popup-box acf-box">',
						'<div class="title"><h3></h3><a href="#" class="acf-icon -cancel grey" data-event="close"></a></div>',
						'<div class="inner"></div>',
						'<div class="loading"><i class="acf-loading"></i></div>',
					'</div>',
					'<div class="bg" data-event="close"></div>',
				'</div>'
			].join('');
		},
		
		render: function(){
			
			// vars
			var title = this.get('title');
			var content = this.get('content');
			var loading = this.get('loading');
			var width = this.get('width');
			var height = this.get('height');
			
			// html
			this.title( title );
			this.content( content );
			
			// width
			if( width ) {
				this.$('.acf-popup-box').css('width', width);
			}
			
			// height
			if( height ) {
				this.$('.acf-popup-box').css('min-height', height);
			}
			
			// loading
			this.loading( loading );
			
			// action
			acf.doAction('append', this.$el);

		},
		
		update: function( props ){
			this.data = acf.parseArgs(props, this.data);
			this.render();
		},
		
		title: function( title ){
			this.$('.title:first h3').html( title );
		},
		
		content: function( content ){
			this.$('.inner:first').html( content );
		},
		
		loading: function( show ){
			var $loading = this.$('.loading:first');
			show ? $loading.show() : $loading.hide();
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
	*  newPopup
	*
	*  Creates a new Popup with the supplied props
	*
	*  @date	17/12/17
	*  @since	5.6.5
	*
	*  @param	object props
	*  @return	object
	*/
	
	acf.newPopup = function( props ){
		return new acf.models.Popup( props );
	};
	
})(jQuery);