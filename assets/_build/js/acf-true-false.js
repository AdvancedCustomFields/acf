(function($){
	
	acf.fields.true_false = acf.field.extend({
		
		type: 'true_false',
		$switch: null,
		$input: null,
		
		actions: {
			'prepare':	'render',
			'append':	'render',
			'show':		'render'
		},
		
		events: {
			'change .acf-switch-input': '_change',
			'focus .acf-switch-input': 	'_focus',
			'blur .acf-switch-input': 	'_blur',
			'keypress .acf-switch-input':	'_keypress'
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
			this.$input = this.$field.find('.acf-switch-input');
			this.$switch = this.$field.find('.acf-switch');
			
		},
		
		
		/*
		*  render
		*
		*  This function is used to setup basic upload form attributes
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		render: function(){
			
			// bail ealry if no $switch
			if( !this.$switch.exists() ) return;
			
			
			// vars
			var $on = this.$switch.children('.acf-switch-on'),
				$off = this.$switch.children('.acf-switch-off')
				width = Math.max( $on.width(), $off.width() );
			
			
			// bail ealry if no width
			if( !width ) return;
			
			
			// set widths
			$on.css( 'min-width', width );
			$off.css( 'min-width', width );
				
		},
		
		
		/*
		*  on
		*
		*  description
		*
		*  @type	function
		*  @date	10/1/17
		*  @since	5.5.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		on: function() { //console.log('on');
			
			this.$input.prop('checked', true);
			this.$switch.addClass('-on');
			
		},
		
		
		/*
		*  off
		*
		*  description
		*
		*  @type	function
		*  @date	10/1/17
		*  @since	5.5.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		off: function() { //console.log('off');
			
			this.$input.prop('checked', false);
			this.$switch.removeClass('-on');
			
		},
		
		
		/*
		*  change
		*
		*  description
		*
		*  @type	function
		*  @date	12/10/16
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_change: function( e ){
			
			// vars
			var checked = e.$el.prop('checked');
			
			
			// enable
			if( checked ) {
				
				this.on();
			
			// disable	
			} else {
				
				this.off();
			
			}
					
		},
		
		
		/*
		*  _focus
		*
		*  description
		*
		*  @type	function
		*  @date	10/1/17
		*  @since	5.5.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_focus: function( e ){
			
			this.$switch.addClass('-focus');
			
		},
		
		
		/*
		*  _blur
		*
		*  description
		*
		*  @type	function
		*  @date	10/1/17
		*  @since	5.5.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_blur: function( e ){
			
			this.$switch.removeClass('-focus');
			
		},
		
		
		/*
		*  _keypress
		*
		*  description
		*
		*  @type	function
		*  @date	10/1/17
		*  @since	5.5.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_keypress: function( e ){
			
			// left
			if( e.keyCode === 37 ) {
				
				return this.off();
				
			}
			
			
			// right
			if( e.keyCode === 39 ) {
				
				return this.on();
				
			}
			
		}
	
	});

})(jQuery);