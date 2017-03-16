(function($){
	
	acf.fields.oembed = acf.field.extend({
		
		type: 'oembed',
		$el: null,
		
		events: {
			'click [data-name="search-button"]': 	'_search',
			'click [data-name="clear-button"]': 	'_clear',
			'click [data-name="value-title"]':		'_edit',
			'keypress [data-name="search-input"]':	'_keypress',
			'keyup [data-name="search-input"]':		'_keyup',
			'blur [data-name="search-input"]':		'_blur'
		},
		
		
		/*
		*  focus
		*
		*  This function will setup variables when focused on a field
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		focus: function(){
			
			// vars
			this.$el = this.$field.find('.acf-oembed');
			this.$search = this.$el.find('[data-name="search-input"]');
			this.$input = this.$el.find('[data-name="value-input"]');
			this.$title = this.$el.find('[data-name="value-title"]');
			this.$embed = this.$el.find('[data-name="value-embed"]');
			
			
			// options
			this.o = acf.get_data( this.$el );
			
		},
		
		
		/*
		*  maybe_search
		*
		*  description
		*
		*  @type	function
		*  @date	14/10/16
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		maybe_search: function(){
			
			// set url and focus
	        var old_url = this.$input.val(),
	        	new_url = this.$search.val();
	        
	        
	        // bail early if no value
	        if( !new_url ) {
		        
		        this.clear();
		        return;
		        
	        }
	        
	        
	        // bail early if no change
	        if( new_url == old_url ) return;
	        
	        
	        // search
	        this.search();
	        
		},
		
		
		/*
		*  search
		*
		*  This function will search for an oembed
		*
		*  @type	function
		*  @date	13/10/16
		*  @since	5.4.0
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		search: function(){ 
			
			// vars
			var s = this.$search.val();
			
			
			// fix missing 'http://' - causes the oembed code to error and fail
			if( s.substr(0, 4) != 'http' ) {
				
				s = 'http://' + s;
				this.$search.val( s );
				
			}
			
			
			// show loading
			this.$el.addClass('is-loading');
			
			
			// AJAX data
			var ajax_data = acf.prepare_for_ajax({
				'action'	: 'acf/fields/oembed/search',
				's'			: s,
				'field_key'	: this.$field.data('key')
			});
			
			
			// abort XHR if this field is already loading AJAX data
			if( this.$el.data('xhr') ) this.$el.data('xhr').abort();
			
			
			// get HTML
			var xhr = $.ajax({
				url: acf.get('ajaxurl'),
				data: ajax_data,
				type: 'post',
				dataType: 'json',
				context: this,
				success: this.search_success
			});
			
			
			// update el data
			this.$el.data('xhr', xhr);
			
		},
		
		search_success: function( json ){
			
			// vars
			var s = this.$search.val();
			
			
			// remove loading
			this.$el.removeClass('is-loading');
			
			
			// error
			if( !json || !json.html ) {
				
				this.$el.removeClass('has-value').addClass('has-error');
				return;
				
			}
			
			
			// add classes
			this.$el.removeClass('has-error').addClass('has-value');
			
			
			// update vars
			this.$input.val( s );
			this.$title.html( s );
			this.$embed.html( json.html );
			
		},
				
		clear: function(){
			
			// update class
	        this.$el.removeClass('has-error has-value');
			
			
			// clear search
			this.$el.find('[data-name="search-input"]').val('');
			
			
			// clear inputs
			this.$input.val('');
			this.$title.html('');
			this.$embed.html('');
			
		},
		
		edit: function(){ 
			
			// add class
	        this.$el.addClass('is-editing');
	        
	        
	        // set url and focus
	        this.$search.val( this.$title.text() ).focus();
			
		},
		
		blur: function( $el ){ 
			
			// remove class
			this.$el.removeClass('is-editing');
			
			
			// maybe search
			this.maybe_search();
				        	
		},
		
		_search: function( e ){ // console.log('_search');
			
			this.search();
			
		},
		
		_clear: function( e ){ // console.log('_clear');
			
			this.clear();
			
		},
		
		_edit: function( e ){ // console.log('_clear');
			
			this.edit();
			
		},
		
		_keypress: function( e ){ // console.log('_keypress');
			
			// don't submit form
			if( e.which == 13 ) e.preventDefault();
			
		},
		
		_keyup: function( e ){  //console.log('_keypress', e.which);
			
			// bail early if no value
			if( !this.$search.val() ) return;
			
			
			// maybe search
			this.maybe_search();
			
		},
		
		_blur: function( e ){ // console.log('_blur');
			
			this.blur();
			
		}
		
	});

})(jQuery);