(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'wysiwyg',
		
		wait: 'load',
		
		events: {
			'mousedown .acf-editor-wrap.delay':	'onMousedown',
			'sortstartField': 'disableEditor',
			'sortstopField': 'enableEditor',
			'removeField': 'disableEditor'
		},
		
		$control: function(){
			return this.$('.acf-editor-wrap');
		},
		
		$input: function(){
			return this.$('textarea');
		},
		
		getMode: function(){
			return this.$control().hasClass('tmce-active') ? 'visual' : 'text';
		},
		
		initialize: function(){
			
			// initializeEditor if no delay
			if( !this.$control().hasClass('delay') ) {
				this.initializeEditor();
			}
		},
		
		initializeEditor: function(){
			
			// vars
			var $wrap = this.$control();
			var $textarea = this.$input();
			var args = {
				tinymce:	true,
				quicktags:	true,
				toolbar:	this.get('toolbar'),
				mode:		this.getMode(),
				field:		this
			};
			
			// generate new id
			var oldId = $textarea.attr('id');
			var newId = acf.uniqueId('acf-editor-');
			
			// rename
			acf.rename({
				target: $wrap,
				search: oldId,
				replace: newId,
				destructive: true
			});	
			
			// update id
			this.set('id', newId, true);
			
			// initialize
			acf.tinymce.initialize( newId, args );
		},
		
		onMousedown: function( e ){
			
			// prevent default
			e.preventDefault();
			
			// remove delay class
			var $wrap = this.$control();
			$wrap.removeClass('delay');
			$wrap.find('.acf-editor-toolbar').remove();
			
			// initialize
			this.initializeEditor();
		},
		
		enableEditor: function(){
			if( this.getMode() == 'visual' ) {
				acf.tinymce.enable( this.get('id') );
			}
		},
		
		disableEditor: function(){
			acf.tinymce.destroy( this.get('id') );
		}	
	});
	
	acf.registerFieldType( Field );
		
})(jQuery);