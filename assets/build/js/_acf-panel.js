(function($, undefined){
	
	var panel = new acf.Model({
		
		events: {
			'click .acf-panel-title': 'onClick',
		},
		
		onClick: function( e, $el ){
			e.preventDefault();
			this.toggle( $el.parent() );
		},
		
		isOpen: function( $el ) {
			return $el.hasClass('-open');
		},
		
		toggle: function( $el ){
			this.isOpen($el) ? this.close( $el ) : this.open( $el );
		},
		
		open: function( $el ){
			$el.addClass('-open');
			$el.find('.acf-panel-title i').attr('class', 'dashicons dashicons-arrow-down');
		},
		
		close: function( $el ){
			$el.removeClass('-open');
			$el.find('.acf-panel-title i').attr('class', 'dashicons dashicons-arrow-right');
		}
				 
	});
		
})(jQuery);