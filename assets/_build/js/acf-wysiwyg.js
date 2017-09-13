(function($){
	
	acf.fields.wysiwyg = acf.field.extend({
		
		type: 'wysiwyg',
		$el: null,
		$textarea: null,
		toolbars: {},
		
		events: {
			'mousedown .acf-editor-wrap.delay': 'mousedown'
		},
		
		actions: {
			'load':			'initialize',
			'append':		'initialize',
			'remove':		'disable',
			'sortstart':	'disable',
			'sortstop':		'enable'
		},
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.wp-editor-wrap').last();
			this.$textarea = this.$el.find('textarea');
			
			
			// get options
			this.o = acf.get_data(this.$el, {
				toolbar:	'',
				active:		this.$el.hasClass('tmce-active'),
				id:			this.$textarea.attr('id')
			});
			
		},
		
		mousedown: function(e){
			
			// prevent default
			e.preventDefault();
			
			
			// remove delay class
			this.$el.removeClass('delay');
			this.$el.find('.acf-editor-toolbar').remove();
			
			
			// initialize
			this.initialize();
			
		},
		
		initialize: function(){
			
			// bail early if delay
			if( this.$el.hasClass('delay') ) return;
			
			
			// vars
			var args = {
				tinymce:	true,
				quicktags:	true,
				toolbar:	this.o.toolbar,
				mode:		this.o.active ? 'visual' : 'text',
			};
			
			
			// generate new id
			var old_id = this.o.id,
				new_id = acf.get_uniqid('acf-editor-'),
				html = this.$el.outerHTML();
			
			
			// replace
			html = acf.str_replace( old_id, new_id, html );
			
			
			// swap
			this.$el.replaceWith( html );			
			
			
			// update id
			this.o.id = new_id;
			
						
			// initialize
			acf.tinymce.initialize( this.o.id, args, this.$field );
			
		},
		
		disable: function(){
			
			acf.tinymce.destroy( this.o.id );
			
		},
		
		enable: function(){
			
			if( this.o.active ) {
				acf.tinymce.enable( this.o.id );
			}
			
		}
		
	});
	
	
	/*
	*  acf.tinymce
	*
	*  description
	*
	*  @type	function
	*  @date	18/8/17
	*  @since	5.6.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	acf.tinymce = acf.model.extend({
		
		toolbars: {},
		
		actions: {
			'ready': 'ready'
		},
		
		
		/*
		*  ready
		*
		*  This function will move the acf-hidden-wp-editor and fix the activeEditor
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		ready: function(){

			// vars
			var $div = $('#acf-hidden-wp-editor');
			
			
			// bail early if doesn't exist
			if( !$div.exists() ) return;
			
			
			// move to footer
			$div.appendTo('body');
			
			
			// bail early if no tinymce
			if( !acf.isset(window,'tinymce','on') ) return;
			
			
			// restore default activeEditor
			tinymce.on('AddEditor', function( data ){
				
				// vars
				var editor = data.editor;
				
				
				// bail early if not 'acf'
				if( editor.id.substr(0, 3) !== 'acf' ) return;
				
				
				// override if 'content' exists
				editor = tinymce.editors.content || editor;
				
				
				// update vars
				tinymce.activeEditor = editor;
				wpActiveEditor = editor.id;
				
			});
			
		},
		
		
		/*
		*  defaults
		*
		*  This function will return default mce and qt settings
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		defaults: function(){
			
			// bail early if no tinyMCEPreInit
			if( typeof tinyMCEPreInit === 'undefined' ) return false;
			
			
			// vars
			var defaults = {
				tinymce:	tinyMCEPreInit.mceInit.acf_content,
				quicktags:	tinyMCEPreInit.qtInit.acf_content
			};
			
			
			// return
			return defaults;
			
		},
		
		
		/*
		*  initialize
		*
		*  This function will initialize the tinymce and quicktags instances
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		initialize: function( id, args, $field ){
			
			// defaults
			args = args || {};
			$field = $field || null;
			
			
			// merge
			args = acf.parse_args(args, {
				tinymce:	true,
				quicktags:	true,
				toolbar:	'full',
				mode:		'visual', // visual,text
			});
			
			
			// tinymce
			if( args.tinymce ) {
				this.initialize_tinymce( id, args, $field );
			}
			
			
			// quicktags
			if( args.quicktags ) {
				this.initialize_quicktags( id, args, $field );
			}
			
		},
		
		
		/*
		*  initialize_tinymce
		*
		*  This function will initialize the tinymce instance
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		initialize_tinymce: function( id, args, $field ){
			
			// vars
			var $textarea = $('#'+id);
			var defaults = this.defaults();
			var toolbars = this.toolbars;
			
			
			// bail early
			if( typeof tinymce === 'undefined' ) return false;
			if( !defaults ) return false;
			
			
			// check if exists
			if( tinymce.get(id) ) {
				return this.enable( id );
			}
			
			
			// settings
			init = $.extend( {}, defaults.tinymce, args.tinymce );
			init.id = id;
			init.selector = '#' + id;
			
			
			// toolbar
			var toolbar = args.toolbar;
			if( toolbar && typeof toolbars[toolbar] !== 'undefined' ) {
				
				for( var i = 1; i <= 4; i++ ) {
					init[ 'toolbar' + i ] = toolbars[toolbar][i] || '';
				}
				
			}
			
			
			// event
			init.setup = function( ed ){
				
				ed.on('focus', function(e) {
					acf.validation.remove_error( $field );
				});
				
				ed.on('change', function(e) {
					ed.save(); // save to textarea	
					$textarea.trigger('change');
				});
				
				$( ed.getWin() ).on('unload', function() {
					acf.tinymce.remove( id );
				});
				
			};
			
			
			// disable wp_autoresize_on (no solution yet for fixed toolbar)
			init.wp_autoresize_on = false;
			
			
			// hook for 3rd party customization
			init = acf.apply_filters('wysiwyg_tinymce_settings', init, id, $field);
			
			
			// z-index fix
			if( acf.isset(tinymce,'ui','FloatPanel') ) {
				tinymce.ui.FloatPanel.zIndex = 900000;
			}
			
			
			// store settings
			tinyMCEPreInit.mceInit[ id ] = init;
			
			
			// visual tab is active
			if( args.mode == 'visual' ) {
				
				// init 
				tinymce.init( init );
				
				
				// get editor
				var ed = tinymce.get( id );
				
				
				// action
				acf.do_action('wysiwyg_tinymce_init', ed, ed.id, init, $field);
				
			}
			
		},
		
		
		/*
		*  initialize_quicktags
		*
		*  This function will initialize the quicktags instance
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		initialize_quicktags: function( id, args, $field ){
			
			// vars
			var defaults = this.defaults();
			
			
			// bail early
			if( typeof quicktags === 'undefined' ) return false;
			if( !defaults ) return false;
			
			
			// settings
			init = $.extend( {}, defaults.quicktags, args.quicktags );
			init.id = id;
			
					
			// filter
			init = acf.apply_filters('wysiwyg_quicktags_settings', init, init.id, $field);
			
			
			// store settings
			tinyMCEPreInit.qtInit[ id ] = init;
			
			
			// init
			var ed = quicktags( init );
			
			
			// generate HTML
			this.build_quicktags( ed );
			
			
			// action for 3rd party customization
			acf.do_action('wysiwyg_quicktags_init', ed, ed.id, init, $field);
				
		},
		
		
		/*
		*  build_quicktags
		*
		*  This function will build the quicktags HTML
		*
		*  @type	function
		*  @date	18/8/17
		*  @since	5.6.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		build_quicktags: function( ed ){
			
			var canvas, name, settings, theButtons, html, ed, id, i, use,
				defaults = ',strong,em,link,block,del,ins,img,ul,ol,li,code,more,close,';

			canvas = ed.canvas;
			name = ed.name;
			settings = ed.settings;
			html = '';
			theButtons = {};
			use = '';

			// set buttons
			if ( settings.buttons ) {
				use = ','+settings.buttons+',';
			}

			for ( i in edButtons ) {
				if ( ! edButtons[i] ) {
					continue;
				}

				id = edButtons[i].id;
				if ( use && defaults.indexOf( ',' + id + ',' ) !== -1 && use.indexOf( ',' + id + ',' ) === -1 ) {
					continue;
				}

				if ( ! edButtons[i].instance || edButtons[i].instance === instanceId ) {
					theButtons[id] = edButtons[i];

					if ( edButtons[i].html ) {
						html += edButtons[i].html( name + '_' );
					}
				}
			}

			if ( use && use.indexOf(',dfw,') !== -1 ) {
				theButtons.dfw = new QTags.DFWButton();
				html += theButtons.dfw.html( name + '_' );
			}

			if ( 'rtl' === document.getElementsByTagName( 'html' )[0].dir ) {
				theButtons.textdirection = new QTags.TextDirectionButton();
				html += theButtons.textdirection.html( name + '_' );
			}

			ed.toolbar.innerHTML = html;
			ed.theButtons = theButtons;

			if ( typeof jQuery !== 'undefined' ) {
				jQuery( document ).triggerHandler( 'quicktags-init', [ ed ] );
			}
			
		},
		
		disable: function( id ){
			
			this.destroy( id );
			
		},
		
		destroy: function( id ){
			
			this.destroy_tinymce( id );
			
		},
		
		destroy_tinymce: function( id ){
			
			// bail early
			if( typeof tinymce === 'undefined' ) return false;
			
			
			// get editor
			var ed = tinymce.get( id );
				
			
			// bail early if no editor
			if( !ed ) return false;
			
			
			// save
			ed.save();
			
			
			// destroy editor
			ed.destroy();
			
			
			// return
			return true;
			
		},
		
		enable: function( id ){
			
			this.enable_tinymce( id );
			
		},
		
		enable_tinymce: function( id ){
			
			// bail early
			if( typeof switchEditors === 'undefined' ) return false;
			
						
			// toggle			
			switchEditors.go( id, 'tmce');
			
			
			// return
			return true;
			
		},
		
	});
	

})(jQuery);