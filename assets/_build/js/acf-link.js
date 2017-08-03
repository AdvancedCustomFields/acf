(function($){
	
	acf.fields.link = acf.field.extend({
		
		type: 'link',
		active: false,
		$el: null,
		$node: null,
		
		events: {
			'click a[data-name="add"]': 	'add',
			'click a[data-name="edit"]': 	'edit',
			'click a[data-name="remove"]':	'remove',
			'change .link-node':			'change',
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
			
			// get elements
			this.$el = this.$field.find('.acf-link');
			this.$node = this.$el.find('.link-node');
			
		},
		
		add: function( e ){
			
			acf.link.open( this.$node );
			
		},
		
		edit: function( e ){
			
			this.add();
			
		},
		
		remove: function( e ){
			
			this.val('');
			
		},
		
		change: function( e, value ){
			
			// vars
			var val = {
				'title': this.$node.html(),
				'url': this.$node.attr('href'),
				'target': this.$node.attr('target')
			};
						
			
			// vars
			this.val( val );
			
		},
		
		val: function( val ){
			
			// default
			val = acf.parse_args(val, {
				'title': '',
				'url': '',
				'target': ''
			});
			
			
			// remove class
			this.$el.removeClass('-value -external');
			
			
			// add class
			if( val.url ) this.$el.addClass('-value');
			if( val.target === '_blank' ) this.$el.addClass('-external');
			
			
			// update text
			this.$el.find('.link-title').html( val.title );
			this.$el.find('.link-url').attr('href', val.url).html( val.url );
			
			
			// update inputs
			this.$el.find('.input-title').val( val.title );
			this.$el.find('.input-target').val( val.target );
			this.$el.find('.input-url').val( val.url ).trigger('change');
			
			
			// update node
			this.$node.html(val.title);
			this.$node.attr('href', val.url);
			this.$node.attr('target', val.target);
		}
		
	});
	
	
	/*
	*  acf.link
	*
	*  This model will handle adding tabs and groups
	*
	*  @type	function
	*  @date	25/11/2015
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	acf.link = acf.model.extend({
		
		active: false,
		$textarea: null,
		$node: null,
		
		events: {
			'click #wp-link-submit': '_update',
			//'river-select .query-results':	'_select',
			'wplink-open': '_open',
			'wplink-close': '_close',
		},
				
		atts: function( value ){
			
			// update
			if( typeof value !== 'undefined' ) {
				
				this.$node.html( value.title );
				this.$node.attr('href', value.url);
				this.$node.attr('target', value.target);
				this.$node.trigger('change', [value]);
				return true;
				
			}
			
			
			// get
			return {
				'title':	this.$node.html(),
				'url': 		this.$node.attr('href'),
				'target': 	this.$node.attr('target')
			};
			
		},
		
		inputs: function( value ){
			
			// update
			if( typeof value !== 'undefined' ) {
				
				$('#wp-link-text').val( value.title );
				$('#wp-link-url').val( value.url );
				$('#wp-link-target').prop('checked', value.target === '_blank' );
				return true;
				
			}
			
			
			// get
			return {
				'title':	$('#wp-link-text').val(),
				'url':		$('#wp-link-url').val(),
				'target':	$('#wp-link-target').prop('checked') ? '_blank' : ''
			};
			
		},
		
		open: function( $node ){
			
			// create textarea
			var $textarea = $('<textarea id="acf-link-textarea"></textarea>');
			
			
			// append textarea
			$node.before( $textarea );
			
			
			// update vars
			this.active = true;
			this.$node = $node;
			this.$textarea = $textarea;
			
			
			// get atts
			var atts = this.atts();
			
			
			// open link
			wpLink.open( 'acf-link-textarea', atts.url, atts.title, null );
			
			
			// always show title (WP will hide title if empty)
			$('#wp-link-wrap').addClass('has-text-field');
			
		},
		
		reset: function(){
			
			this.active = false;
			this.$textarea.remove();
			this.$textarea = null;
			this.$node = null;	
			
		},
		
		_select: function( e, $li ){
			
			// get inputs
			var val = this.inputs();
			
			
			// update title
			if( !val.title ) {
				
                val.title = $li.find('.item-title').text();
                this.inputs( val );
                
                console.log(val);
            }
			
		},
		
		_open: function( e ){
			
			// bail early if not active
			if( !this.active ) return;
			
			
			// get atts
			var val = this.atts();
			
			
			// update WP inputs
			this.inputs( val );
			
		},
		
		_close: function( e ){
			
			// bail early if not active
			if( !this.active ) return;
			
			
			// reset vars
			// use timeout to allow _update() function to check vars
			setTimeout(function(){
				
				acf.link.reset();
				
			}, 100);
			
		},
		
		_update: function( e ){
			
			// bail early if not active
			if( !this.active ) return;
			
			
			// get atts
			var val = this.inputs();
			
			
			// update node
			this.atts( val );
						
		}
	
	});
	
	
	// todo - listen to AJAX for wp-link-ajax and append post_id to value
	

})(jQuery);