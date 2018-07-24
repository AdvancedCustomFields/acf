(function($, undefined){
	
	acf.unload = new acf.Model({
		
		wait: 'load',
		active: true,
		changed: false,
		
		actions: {
			'change_field': 'startListening',
			'validation_failure': 'startListening'
		},
		
		events: {
			'submit form':	'stopListening'
		},
				
		reset: function(){
			this.stopListening();
		},
		
		startListening: function(){
			
			// bail ealry if already changed, not active
			if( this.changed || !this.active ) {
				return;
			}
			
			// update 
			this.changed = true;
			
			// add event
			$(window).on('beforeunload', this.onUnload);
			
		},
		
		stopListening: function(){
			
			// update 
			this.changed = false;
			
			// remove event
			$(window).off('beforeunload', this.onUnload);
			
		},
		
		onUnload: function(){
			return acf.__('The changes you made will be lost if you navigate away from this page');
		}
		 
	});
	
})(jQuery);