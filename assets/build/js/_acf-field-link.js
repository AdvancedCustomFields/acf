(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'link',
		
		events: {
			'click a[data-name="add"]': 	'onClickEdit',
			'click a[data-name="edit"]': 	'onClickEdit',
			'click a[data-name="remove"]':	'onClickRemove',
			'change .link-node':			'onChange',
		},
		
		$control: function(){
			return this.$('.acf-link');
		},
		
		$node: function(){
			return this.$('.link-node');
		},
		
		getValue: function(){
			
			// vars
			var $node = this.$node();
			
			// return false if empty
			if( !$node.attr('href') ) {
				return false;
			}
			
			// return
			return {
				title:	$node.html(),
				url:	$node.attr('href'),
				target:	$node.attr('target')
			};
		},
		
		setValue: function( val ){
			
			// default
			val = acf.parseArgs(val, {
				title:	'',
				url:	'',
				target:	''
			});
			
			// vars
			var $div = this.$control();
			var $node = this.$node();
			
			// remove class
			$div.removeClass('-value -external');
			
			// add class
			if( val.url ) $div.addClass('-value');
			if( val.target === '_blank' ) $div.addClass('-external');
			
			// update text
			this.$('.link-title').html( val.title );
			this.$('.link-url').attr('href', val.url).html( val.url );
			
			// update node
			$node.html(val.title);
			$node.attr('href', val.url);
			$node.attr('target', val.target);
			
			// update inputs
			this.$('.input-title').val( val.title );
			this.$('.input-target').val( val.target );
			this.$('.input-url').val( val.url ).trigger('change');
		},
		
		onClickEdit: function( e, $el ){
			acf.wpLink.open( this.$node() );
		},
		
		onClickRemove: function( e, $el ){
			this.setValue( false );
		},
		
		onChange: function( e, $el ){
			
			// get the changed value
			var val = this.getValue();
			
			// update inputs
			this.setValue(val);
		}
		
	});
	
	acf.registerFieldType( Field );
	
	
	// manager
	acf.wpLink = new acf.Model({
		
		getNodeValue: function(){
			var $node = this.get('node');
			return {
				title:	$node.html(),
				url:	$node.attr('href'),
				target:	$node.attr('target')
			};
		},
		
		setNodeValue: function( val ){
			var $node = this.get('node');
			$node.html( val.title );
			$node.attr('href', val.url);
			$node.attr('target', val.target);
			$node.trigger('change');
		},
		
		getInputValue: function(){
			return {
				title:	$('#wp-link-text').val(),
				url:	$('#wp-link-url').val(),
				target:	$('#wp-link-target').prop('checked') ? '_blank' : ''
			};
		},
		
		setInputValue: function( val ){
			$('#wp-link-text').val( val.title );
			$('#wp-link-url').val( val.url );
			$('#wp-link-target').prop('checked', val.target === '_blank' );
		},
		
		open: function( $node ){

			// add events
			this.on('wplink-open', 'onOpen');
			this.on('wplink-close', 'onClose');
			
			// set node
			this.set('node', $node);
			
			// create textarea
			var $textarea = $('<textarea id="acf-link-textarea" style="display:none;"></textarea>');
			$('body').append( $textarea );
			
			// vars
			var val = this.getNodeValue();
			
			// open popup
			wpLink.open( 'acf-link-textarea', val.url, val.title, null );
			
		},
		
		onOpen: function(){

			// always show title (WP will hide title if empty)
			$('#wp-link-wrap').addClass('has-text-field');
			
			// set inputs
			var val = this.getNodeValue();
			this.setInputValue( val );
		},
		
		close: function(){
			wpLink.close();
		},
		
		onClose: function(){
			
			// bail early if no node
			// needed due to WP triggering this event twice
			if( !this.has('node') ) {
				return false;
			}
			
			// remove events
			this.off('wplink-open');
			this.off('wplink-close');
			
			// set value
			var val = this.getInputValue();
			this.setNodeValue( val );
			
			// remove textarea
			$('#acf-link-textarea').remove();
			
			// reset
			this.set('node', null);
			
		}
	});	

})(jQuery);