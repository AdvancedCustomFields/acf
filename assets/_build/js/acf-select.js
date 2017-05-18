(function($){
	
	// select
	acf.fields.select = acf.field.extend({
		
		type: 'select',
		
		$select: null,
		
		actions: {
			'ready':	'render',
			'append':	'render',
			'remove':	'remove'
		},

		focus: function(){
			
			// focus on $select
			this.$select = this.$field.find('select');
			
			
			// bail early if no select field
			if( !this.$select.exists() ) return;
			
			
			// get options
			this.o = acf.get_data( this.$select );
			
			
			// customize o
			this.o = acf.parse_args(this.o, {
				'ajax_action':	'acf/fields/'+this.type+'/query',
				'key':			this.$field.data('key')
			});
			
		},
		
		render: function(){
			
			// validate ui
			if( !this.$select.exists() || !this.o.ui ) {
				
				return false;
				
			}
			
			
			acf.select2.init( this.$select, this.o, this.$field );
			
		},
		
		remove: function(){
			
			// validate ui
			if( !this.$select.exists() || !this.o.ui ) {
				
				return false;
				
			}
			
			
			// remove select2
			acf.select2.destroy( this.$select );
			
		}
		 
	});
	
		
	// user
	acf.fields.user = acf.fields.select.extend({
		
		type: 'user'
		
	});	
	
	
	// post_object
	acf.fields.post_object = acf.fields.select.extend({
		
		type: 'post_object'
		
	});
	
	
	// page_link
	acf.fields.page_link = acf.fields.select.extend({
		
		type: 'page_link'
		
	});
	

})(jQuery);