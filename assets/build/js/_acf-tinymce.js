(function($, undefined){
	
	acf.tinymce = {
		
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
		
		initialize: function( id, args ){
			
			// defaults
			args = acf.parseArgs(args, {
				tinymce:	true,
				quicktags:	true,
				toolbar:	'full',
				mode:		'visual', // visual,text
				field:		false
			});
			
			// tinymce
			if( args.tinymce ) {
				this.initializeTinymce( id, args );
			}
			
			// quicktags
			if( args.quicktags ) {
				this.initializeQuicktags( id, args );
			}
		},
		
		
		/*
		*  initializeTinymce
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
		
		initializeTinymce: function( id, args ){
			
			// vars
			var $textarea = $('#'+id);
			var defaults = this.defaults();
			var toolbars = acf.get('toolbars');
			var field = args.field || false;
			var $field = field.$el || false;
			
			// bail early
			if( typeof tinymce === 'undefined' ) return false;
			if( !defaults ) return false;
			
			// check if exists
			if( tinymce.get(id) ) {
				return this.enable( id );
			}
			
			// settings
			var init = $.extend( {}, defaults.tinymce, args.tinymce );
			init.id = id;
			init.selector = '#' + id;
			
			// toolbar
			var toolbar = args.toolbar;
			if( toolbar && toolbars && toolbars[toolbar] ) {
				
				for( var i = 1; i <= 4; i++ ) {
					init[ 'toolbar' + i ] = toolbars[toolbar][i] || '';
				}
			}
			
			// event
			init.setup = function( ed ){
				
				ed.on('change', function(e) {
					ed.save(); // save to textarea	
					$textarea.trigger('change');
				});
				
				// Fix bug where Gutenberg does not hear "mouseup" event and tries to select multiple blocks.
				ed.on('mouseup', function(e) {
					var event = new MouseEvent('mouseup');
					window.dispatchEvent(event);
				});
				
				// Temporarily comment out. May not be necessary due to wysiwyg field actions.
				//ed.on('unload', function(e) {
				//	acf.tinymce.remove( id );
				//});				
			};
			
			// disable wp_autoresize_on (no solution yet for fixed toolbar)
			init.wp_autoresize_on = false;
			
			// Enable wpautop allowing value to save without <p> tags.
			// Only if the "TinyMCE Advanced" plugin hasn't already set this functionality.
			if( !init.tadv_noautop ) {
				init.wpautop = true;
			}
			
			// hook for 3rd party customization
			init = acf.applyFilters('wysiwyg_tinymce_settings', init, id, field);
			
			// z-index fix (caused too many conflicts)
			//if( acf.isset(tinymce,'ui','FloatPanel') ) {
			//	tinymce.ui.FloatPanel.zIndex = 900000;
			//}
			
			// store settings
			tinyMCEPreInit.mceInit[ id ] = init;
			
			// visual tab is active
			if( args.mode == 'visual' ) {
				
				// init 
				var result = tinymce.init( init );
				
				// get editor
				var ed = tinymce.get( id );
				
				// validate
				if( !ed ) {
					return false;
				}
				
				// add reference
				ed.acf = args.field;
				
				// action
				acf.doAction('wysiwyg_tinymce_init', ed, ed.id, init, field);
			}
		},
		
		/*
		*  initializeQuicktags
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
		
		initializeQuicktags: function( id, args ){
			
			// vars
			var defaults = this.defaults();
			
			// bail early
			if( typeof quicktags === 'undefined' ) return false;
			if( !defaults ) return false;
			
			// settings
			var init = $.extend( {}, defaults.quicktags, args.quicktags );
			init.id = id;
			
			// filter
			var field = args.field || false;
			var $field = field.$el || false;
			init = acf.applyFilters('wysiwyg_quicktags_settings', init, init.id, field);
			
			// store settings
			tinyMCEPreInit.qtInit[ id ] = init;
			
			// init
			var ed = quicktags( init );
			
			// validate
			if( !ed ) {
				return false;
			}
			
			// generate HTML
			this.buildQuicktags( ed );
			
			// action for 3rd party customization
			acf.doAction('wysiwyg_quicktags_init', ed, ed.id, init, field);
		},
		
		
		/*
		*  buildQuicktags
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
		
		buildQuicktags: function( ed ){
			
			var canvas, name, settings, theButtons, html, ed, id, i, use, instanceId,
				defaults = ',strong,em,link,block,del,ins,img,ul,ol,li,code,more,close,';
			
			canvas = ed.canvas;
			name = ed.name;
			settings = ed.settings;
			html = '';
			theButtons = {};
			use = '';
			instanceId = ed.id;
			
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
			this.destroyTinymce( id );
		},
		
		remove: function( id ){
			this.destroyTinymce( id );
		},
		
		destroy: function( id ){
			this.destroyTinymce( id );
		},
		
		destroyTinymce: function( id ){
			
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
			this.enableTinymce( id );
		},
		
		enableTinymce: function( id ){
			
			// bail early
			if( typeof switchEditors === 'undefined' ) return false;
			
			// bail ealry if not initialized
			if( typeof tinyMCEPreInit.mceInit[ id ] === 'undefined' ) return false;
						
			// toggle			
			switchEditors.go( id, 'tmce');
			
			// return
			return true;
		}
	};
	
	var editorManager = new acf.Model({
		
		// hook in before fieldsEventManager, conditions, etc
		priority: 5,
		
		actions: {
			'prepare':	'onPrepare',
			'ready':	'onReady',
		},
		onPrepare: function(){
			
			// find hidden editor which may exist within a field
			var $div = $('#acf-hidden-wp-editor');
			
			// move to footer
			if( $div.exists() ) {
				$div.appendTo('body');
			}
		},
		onReady: function(){
			
			// Restore wp.editor functions used by tinymce removed in WP5.
			if( acf.isset(window,'wp','oldEditor') ) {
				wp.editor.autop = wp.oldEditor.autop;
				wp.editor.removep = wp.oldEditor.removep;
			}
			
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
		}
	});
	
})(jQuery);