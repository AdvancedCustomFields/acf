(function($, undefined){
	
	/**
	*  fieldGroupManager
	*
	*  Generic field group functionality 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	var fieldGroupManager = new acf.Model({
		
		id: 'fieldGroupManager',
		
		events: {
			'submit #post':					'onSubmit',
			'click a[href="#"]':			'onClick',
			'click .submitdelete': 			'onClickTrash',
		},
		
		filters: {
			'find_fields_args':				'filterFindFieldArgs'
		},
		
		onSubmit: function( e, $el ){
			
			// vars
			var $title = $('#titlewrap #title');
			
			// empty
			if( !$title.val() ) {
				
				// prevent default
				e.preventDefault();
				
				// unlock form
				acf.unlockForm( $el );
				
				// alert
				alert( acf.__('Field group title is required') );
				
				// focus
				$title.focus();
			}
		},
		
		onClick: function( e ){
			e.preventDefault();
		},
		
		onClickTrash: function( e ){
			var result = confirm( acf.__('Move to trash. Are you sure?') );
			if( !result ) {
				e.preventDefault();
			}
		},
		
		filterFindFieldArgs: function( args ){
			args.visible = true;
			return args;
		}
	});
	
	
	/**
	*  screenOptionsManager
	*
	*  Screen options functionality 
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
		
	var screenOptionsManager = new acf.Model({
		
		id: 'screenOptionsManager',
		wait: 'prepare',
		
		events: {
			'change': 'onChange'
		},
		
		initialize: function(){
			
			// vars
			var $div = $('#adv-settings');
			var $append = $('#acf-append-show-on-screen');
			
			// append
			$div.find('.metabox-prefs').append( $append.html() );
			$div.find('.metabox-prefs br').remove();
			
			// clean up
			$append.remove();
			
			// initialize
			this.$el = $('#acf-field-key-hide');
			
			// render
			this.render();
		},
		
		isChecked: function(){
			return this.$el.prop('checked');
		},
		
		onChange: function( e, $el ) {
			var val = this.isChecked() ? 1 : 0;
			acf.updateUserSetting('show_field_keys', val);
			this.render();
		},
		
		render: function(){
			if( this.isChecked() ) {
				$('#acf-field-group-fields').addClass('show-field-keys');
			} else {
				$('#acf-field-group-fields').removeClass('show-field-keys');
			}
		}
		
	});
	
	
	/**
	*  appendFieldManager
	*
	*  Appends fields together
	*
	*  @date	15/12/17
	*  @since	5.7.0
	*
	*  @param	void
	*  @return	void
	*/
	
	var appendFieldManager = new acf.Model({
		
		actions: {
			'new_field' : 'onNewField'
		},
		
		onNewField: function( field ){
			
			// bail ealry if not append
			if( !field.has('append') ) return;
			
			// vars
			var append = field.get('append');
			var $sibling = field.$el.siblings('[data-name="' + append + '"]').first();
			
			// bail early if no sibling
			if( !$sibling.length ) return;
			
			// ul
			var $div = $sibling.children('.acf-input');
			var $ul = $div.children('ul');
			
			// create ul
			if( !$ul.length ) {
				$div.wrapInner('<ul class="acf-hl"><li></li></ul>');
				$ul = $div.children('ul');
			}
			
			// li
			var html = field.$('.acf-input').html();
			var $li = $('<li>' + html + '</li>');
			$ul.append( $li );
			$ul.attr('data-cols', $ul.children().length );
			
			// clean up
			field.remove();
		}
	});
	
})(jQuery);