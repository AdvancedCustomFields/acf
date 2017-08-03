(function($){
	
	acf.media = acf.model.extend({
		
		frames: [],
		mime_types: {},
		
		actions: {
			'ready': 'ready'
		},
		
		
		/*
		*  frame
		*
		*  This function will return the current frame
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.2
		*
		*  @param	n/a
		*  @return	frame (object)
		*/
		
		frame: function(){
			
			// vars
			var i = this.frames.length - 1;
			
			
			// bail early if no index
			if( i < 0 ) return false;
			
			
			// return
			return this.frames[ i ];
				
		},
		
		
		/*
		*  destroy
		*
		*  this function will destroy a frame
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @return	frame (object)
		*  @return	n/a
		*/
		
		destroy: function( frame ) {
			
			// detach
			frame.detach();
			frame.dispose();
					
			
			// remove frame
			frame = null;
			this.frames.pop();
			
		},
		
		
		/*
		*  popup
		*
		*  This function will create a wp media popup frame
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @param	args (object)
		*  @return	frame (object)
		*/
		
		popup: function( args ) {
			
			// vars
			var post_id = acf.get('post_id'),
				frame = false;
			
			
			// validate post_id
			if( !$.isNumeric(post_id) ) post_id = 0;
			
			
			// settings
			var settings = acf.parse_args( args, {
				mode:		'select',			// 'select', 'edit'
				title:		'',					// 'Upload Image'
				button:		'',					// 'Select Image'
				type:		'',					// 'image', ''
				field:		'',					// 'field_123'
				mime_types:	'',					// 'pdf, etc'
				library:	'all',				// 'all', 'uploadedTo'
				multiple:	false,				// false, true, 'add'
				attachment:	0,					// the attachment to edit
				post_id:	post_id,			// the post being edited
				select: 	function(){}
			});
			
			
			// id changed to attributes
			if( settings.id ) settings.attachment = settings.id;
			
			
			// create frame
			var frame = this.new_media_frame( settings );
			
			
			// append
			this.frames.push( frame );
			
			
			// open popup (allow frame customization before opening)
			setTimeout(function(){
				
				frame.open();
				
			}, 1);
			
			
			// return
			return frame;
				
		},
		
		
		/*
		*  _get_media_frame_settings
		*
		*  This function will return an object containing frame settings
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @param	frame (object)
		*  @param	settings (object)
		*  @return	frame (object)
		*/
		
		_get_media_frame_settings: function( frame, settings ){
			
			// select
			if( settings.mode === 'select' ) {
					
				frame = this._get_select_frame_settings( frame, settings );
			
			// edit	
			} else if( settings.mode === 'edit' ) {
				
				frame = this._get_edit_frame_settings( frame, settings );
				
			}
			
			
			// return
			return frame;
			
		},
		
		_get_select_frame_settings: function( frame, settings ){
			
			// type
			if( settings.type ) {
				
				frame.library.type = settings.type;
				
			}
			
			
			// library
			if( settings.library === 'uploadedTo' ) {
			
				frame.library.uploadedTo = settings.post_id;
			
			}
			
			
			// button
			frame._button = acf._e('media', 'select');
			
			
			// return
			return frame;
			
		},
		
		_get_edit_frame_settings: function( frame, settings ){

			// post__in
			frame.library.post__in = [ settings.attachment ];
			
			
			// button
			frame._button = acf._e('media', 'update');
			
			
			// return 
			return frame;
			
		},
		
		
		/*
		*  _add_media_frame_events
		*
		*  This function will add events to the frame object
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_add_media_frame_events: function( frame, settings ){
			
			// log events
/*
			frame.on('all', function( e ) {
				
				console.log( 'frame all: %o', e );
			
			});
*/
			
			
			// add class
			frame.on('open',function() {
				
				// add class
				this.$el.closest('.media-modal').addClass('acf-media-modal -' +settings.mode );
					
			}, frame);
			
						
			// edit image view
			// source: media-views.js:2410 editImageContent()
			frame.on('content:render:edit-image', function(){
				
				var image = this.state().get('image'),
					view = new wp.media.view.EditImage( { model: image, controller: this } ).render();
	
				this.content.set( view );
	
				// after creating the wrapper view, load the actual editor via an ajax call
				view.loadEditor();
				
			}, frame);
			
			
			// update toolbar button
			frame.on( 'toolbar:create:select', function( toolbar ) {
				
				toolbar.view = new wp.media.view.Toolbar.Select({
					text: frame.options._button,
					controller: this
				});
				
			}, frame );
			
			
			// select image
			frame.on('select', function() {
				
				// get selected images
				var state = frame.state(),
					image = state.get('image'),
					selection = state.get('selection');
				
				
				// if editing image
				if( image ) {
					
					settings.select.apply( frame, [image, 0] );
					
					return;
					
				}
				
				
				// if selecting images
				if( selection ) {
					
					// vars
					var i = 0;
				
					
					// loop
					selection.each(function( attachment ){
						
						settings.select.apply( frame, [attachment, i] );
						
						i++;
						
					});
					
					return;
					
				}
				
			});
			
			
			// close popup
			frame.on('close',function(){
			
				setTimeout(function(){
					
					acf.media.destroy( frame );
					
				}, 500);
				
			});
			
			
			// select
			if( settings.mode === 'select' ) {
					
				frame = this._add_select_frame_events( frame, settings );
			
			// edit	
			} else if( settings.mode === 'edit' ) {
				
				frame = this._add_edit_frame_events( frame, settings );
				
			}
			
			
			// return
			return frame;
			
		},
		
		_add_select_frame_events: function( frame, settings ){
			
			// reference
			var self = this;
			
			
			// plupload
			// adds _acfuploader param to validate uploads
			if( acf.isset(_wpPluploadSettings, 'defaults', 'multipart_params') ) {
				
				// add _acfuploader so that Uploader will inherit
				_wpPluploadSettings.defaults.multipart_params._acfuploader = settings.field;
				
				
				// remove acf_field so future Uploaders won't inherit
				frame.on('open', function(){
					
					delete _wpPluploadSettings.defaults.multipart_params._acfuploader;
					
				});
				
			}
			
			
			// modify DOM
			frame.on('content:activate:browse', function(){
				
				// populate above vars making sure to allow for failure
				try {
					
					var toolbar = frame.content.get().toolbar,
						filters = toolbar.get('filters'),
						search = toolbar.get('search');
				
				} catch(e) {
				
					// one of the objects was 'undefined'... perhaps the frame open is Upload Files
					// console.log( 'error %o', e );
					return;
					
				}
				
				
				// image
				if( settings.type == 'image' ) {
					
					// update all
					filters.filters.all.text = acf._e('image', 'all');
					
					
					// remove some filters
					delete filters.filters.audio;
					delete filters.filters.video;
					
					
					// update all filters to show images
					$.each( filters.filters, function( k, filter ){
						
						if( filter.props.type === null ) {
							
							filter.props.type = 'image';
							
						}
						
					});
					
				}
				
				
				// custom mime types
				if( settings.mime_types ) {
					
					// explode
					var extra_types = settings.mime_types.split(' ').join('').split('.').join('').split(',');
					
					
					// loop through mime_types
					$.each( extra_types, function( i, type ){
						
						// find mime
						$.each( self.mime_types, function( t, mime ){
							
							// continue if key does not match
							if( t.indexOf(type) === -1 ) {
								
								return;
								
							}
							
							
							// create new filter
							var filter = {
								text: type,
								props: {
									status:  null,
									type:    mime,
									uploadedTo: null,
									orderby: 'date',
									order:   'DESC'
								},
								priority: 20
							};			
											
							
							// append filter
							filters.filters[ mime ] = filter;
														
						});
						
					});
					
				}
				
				
				// uploaded to post
				if( settings.library == 'uploadedTo' ) {
					
					// remove some filters
					delete filters.filters.unattached;
					delete filters.filters.uploaded;
					
					
					// add 'uploadedTo' text
					filters.$el.parent().append('<span class="acf-uploadedTo">' + acf._e('image', 'uploadedTo') + '</span>');
					
					
					// add uploadedTo to filters
					$.each( filters.filters, function( k, filter ){
						
						filter.props.uploadedTo = settings.post_id;
						
					});
					
				}
				
				
				// add _acfuploader to filters
				$.each( filters.filters, function( k, filter ){
					
					filter.props._acfuploader = settings.field;
					
				});
				
				
				// add _acfuplaoder to search
				search.model.attributes._acfuploader = settings.field;
				
				
				// render
				if( typeof filters.refresh === 'function' ) {
					
					filters.refresh();
				
				}
				
			});
			
			
			// return
			return frame;
			
		},
		
		_add_edit_frame_events: function( frame, settings ){
			
			// add class
			frame.on('open',function() {
				
				// add class
				this.$el.closest('.media-modal').addClass('acf-expanded');
				
				
				// set to browse
				if( this.content.mode() != 'browse' ) {
				
					this.content.mode('browse');
					
				}
				
				
				// set selection
				var state 		= this.state(),
					selection	= state.get('selection'),
					attachment	= wp.media.attachment( settings.attachment );
				
				
				selection.add( attachment );
								
			}, frame);

			
			// return 
			return frame;
			
		},
		
		
		/*
		*  new_media_frame
		*
		*  this function will create a new media frame
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @param	settings (object)
		*  @return	frame (object)
		*/
		
		new_media_frame: function( settings ){
			
			// vars
			var attributes = {
				title: settings.title,
				multiple: settings.multiple,
				library: {},
				states:	[]
			};
			
			
			// get options
			attributes = this._get_media_frame_settings( attributes, settings );
						
		
			// create query
			var Query = wp.media.query( attributes.library );
			
			
			// add _acfuploader
			// this is super wack!
			// if you add _acfuploader to the options.library args, new uploads will not be added to the library view.
			// this has been traced back to the wp.media.model.Query initialize function (which can't be overriden)
			// Adding any custom args will cause the Attahcments to not observe the uploader queue
			// To bypass this security issue, we add in the args AFTER the Query has been initialized
			// options.library._acfuploader = settings.field;
			if( acf.isset(Query, 'mirroring', 'args') ) {
				
				Query.mirroring.args._acfuploader = settings.field;
				
			}
			
			
			// add states
			attributes.states = [
				
				// main state
				new wp.media.controller.Library({
					library:		Query,
					multiple: 		attributes.multiple,
					title: 			attributes.title,
					priority: 		20,
					filterable: 	'all',
					editable: 		true,

					// If the user isn't allowed to edit fields,
					// can they still edit it locally?
					allowLocalEdits: true
				})
				
			];
			
			
			// edit image functionality (added in WP 3.9)
			if( acf.isset(wp, 'media', 'controller', 'EditImage') ) {
				
				attributes.states.push( new wp.media.controller.EditImage() );
				
			}
			
			
			// create frame
			var frame = wp.media( attributes );
			
			
			// add args reference
			frame.acf = settings;
			
			
			// add events
			frame = this._add_media_frame_events( frame, settings );
			
			
			// return
			return frame;
			
		},
		
		ready: function(){
			
			// vars
			var version = acf.get('wp_version'),
				browser = acf.get('browser'),
				post_id = acf.get('post_id');
			
			
			// update wp.media
			if( acf.isset(window,'wp','media','view','settings','post') && $.isNumeric(post_id) ) {
				
				wp.media.view.settings.post.id = post_id;
					
			}
			
			
			// append browser
			if( browser ) {
				
				$('body').addClass('browser-' + browser );
				
			}
			
			
			// append version
			if( version ) {
				
				// ensure is string
				version = version + '';
				
				
				// use only major version
				major = version.substr(0,1);
				
				
				// add body class
				$('body').addClass('major-' + major);
				
			}
			
			
			// customize wp.media views
			if( acf.isset(window, 'wp', 'media', 'view') ) {
				
				//this.customize_Attachments();
				//this.customize_Query();
				//this.add_AcfEmbed();
				this.customize_Attachment();
				this.customize_AttachmentFiltersAll();
				this.customize_AttachmentCompat();
			
			}
			
		},
		
		
/*
		add_AcfEmbed: function(){
			
			//test urls
			//(image) jpg: 	http://www.ml24.net/img/ml24_design_process_scion_frs_3d_rendering.jpg
			//(image) svg: 	http://kompozer.net/images/svg/Mozilla_Firefox.svg
			//(file) pdf: 	http://martinfowler.com/ieeeSoftware/whenType.pdf
			//(video) mp4:	https://videos.files.wordpress.com/kUJmAcSf/bbb_sunflower_1080p_30fps_normal_hd.mp4
				
			
			
			// add view
			wp.media.view.AcfEmbed = wp.media.view.Embed.extend({
				
				initialize: function() {
				
					// set attachments
					this.model.props.attributes = this.controller.acf.attachment || {};
						
					
					// refresh
					wp.media.view.Embed.prototype.initialize.apply( this, arguments );
					
				},
				
				refresh: function() {
					
					// vars
					var attachment = acf.parse_args(this.model.props.attributes, {
						url: '',
						filename: '',
						title: '',
						caption: '',
						alt: '',
						description: '',
						type: '',
						ext: ''
					});
					
					
					// update attachment
					if( attachment.url ) {
						
						// filename
						attachment.filename = attachment.url.split('/').pop().split('?')[0];
						
						
						// update
						attachment.ext = attachment.filename.split('.').pop();
						attachment.type = /(jpe?g|png|gif|svg)/i.test(attachment.ext) ? 'image': 'file';
						
					}
					
					
					// auto generate title
					if( attachment.filename && !attachment.title ) {
						
						// replace
						attachment.title = attachment.filename.split('-').join(' ').split('_').join(' ');
						
						
						// uppercase first word
						attachment.title = attachment.title.charAt(0).toUpperCase() + attachment.title.slice(1);
						
						
						// remove extension
						attachment.title = attachment.title.replace('.'+attachment.ext, '');
						
						
						// update model
						this.model.props.attributes.title = attachment.title;
						
					}
					
					
					// save somee extra data
					this.model.props.attributes.filename = attachment.filename;
					this.model.props.attributes.type = attachment.type;
					
						
					// always show image view
					// avoid this.model.set() to prevent listeners updating view
					this.model.attributes.type = 'image';
					
					
					// refresh
					wp.media.view.Embed.prototype.refresh.apply( this, arguments );

					
					// append title
					this.$el.find('.setting.caption').before([
						'<label class="setting title">',
							'<span>Title</span>',
							'<input type="text" data-setting="title" value="' + attachment.title + '">',
						'</label>'
					].join(''));
					
					
					// append description
					this.$el.find('.setting.alt-text').after([
						'<label class="setting description">',
							'<span>Description</span>',
							'<textarea type="text" data-setting="description">' + attachment.description + '</textarea>',
						'</label>'
					].join(''));
					
					
					// hide alt
					if( attachment.type !== 'image' ) {
						
						this.$el.find('.setting.alt-text').hide();
						
					}
					
				}
				
			});	
			
		},
*/
/*
		
		customize_Attachments: function(){
			
			// vars
			var Attachments = wp.media.model.Attachments;
			
			
			wp.media.model.Attachments = Attachments.extend({
				
				initialize: function( models, options ){
					
					// console.log('My Attachments initialize: %o %o %o', this, models, options);
					
					// return
					return Attachments.prototype.initialize.apply( this, arguments );
					
				},
				
				sync: function( method, model, options ) {
					
					// console.log('My Attachments sync: %o %o %o %o', this, method, model, options);
					
					
					// return
					return Attachments.prototype.sync.apply( this, arguments );
					
				}
				
			});
			
		},
		
		customize_Query: function(){
			
			// console.log('customize Query!');
			
			// vars
			var Query = wp.media.model.Query;
			
			
			wp.media.model.Query = {};
			
		},
*/
		
		customize_Attachment: function(){
			
			// vars
			var AttachmentLibrary = wp.media.view.Attachment.Library;
			
			
			// extend
			wp.media.view.Attachment.Library = AttachmentLibrary.extend({
				
				render: function() {
					
					// vars
					var frame = acf.media.frame(),
						errors = acf.maybe_get(this, 'model.attributes.acf_errors');
					
					
					// add class
					// also make sure frame exists to prevent this logic running on a WP popup (such as feature image)
					if( frame && errors ) {
						
						this.$el.addClass('acf-disabled');
						
					}
					
					
					// return
					return AttachmentLibrary.prototype.render.apply( this, arguments );
					
				},
				
				
				/*
				*  toggleSelection
				*
				*  This function is called before an attachment is selected
				*  A good place to check for errors and prevent the 'select' function from being fired
				*
				*  @type	function
				*  @date	29/09/2016
				*  @since	5.4.0
				*
				*  @param	options (object)
				*  @return	n/a
				*/
				
				toggleSelection: function( options ) {
					
					// vars
					// source: wp-includes/js/media-views.js:2880
					var collection = this.collection,
						selection = this.options.selection,
						model = this.model,
						single = selection.single();
					
					
					// vars
					var frame = acf.media.frame(),
						errors = acf.maybe_get(this, 'model.attributes.acf_errors'),
						$sidebar = this.controller.$el.find('.media-frame-content .media-sidebar');
					
					
					// remove previous error
					$sidebar.children('.acf-selection-error').remove();
					
					
					// show attachment details
					$sidebar.children().removeClass('acf-hidden');
					
					
					// add message
					if( frame && errors ) {
						
						// vars
						var filename = acf.maybe_get(this, 'model.attributes.filename', '');
						
						
						// hide attachment details
						// Gallery field continues to show previously selected attachment...
						$sidebar.children().addClass('acf-hidden');
						
						
						// append message
						$sidebar.prepend([
							'<div class="acf-selection-error">',
								'<span class="selection-error-label">' + acf._e('restricted') +'</span>',
								'<span class="selection-error-filename">' + filename + '</span>',
								'<span class="selection-error-message">' + errors + '</span>',
							'</div>'
						].join(''));
						
						
						// reset selection (unselects all attachments)
						selection.reset();
						
						
						// set single (attachment displayed in sidebar)
						selection.single( model );
						
						
						// return and prevent 'select' form being fired
						return;
						
					}
									
					
					// return					
					AttachmentLibrary.prototype.toggleSelection.apply( this, arguments );
					
				}
				
			});
			
		},
		
		customize_AttachmentFiltersAll: function(){
			
			// add function refresh
			wp.media.view.AttachmentFilters.All.prototype.refresh = function(){
				
				// Build `<option>` elements.
				this.$el.html( _.chain( this.filters ).map( function( filter, value ) {
					return {
						el: $( '<option></option>' ).val( value ).html( filter.text )[0],
						priority: filter.priority || 50
					};
				}, this ).sortBy('priority').pluck('el').value() );
				
			};
			
		},
		
		customize_AttachmentCompat: function(){
			
			// vars
			var AttachmentCompat = wp.media.view.AttachmentCompat;
			
			
			// extend
			wp.media.view.AttachmentCompat = AttachmentCompat.extend({
				
				add_acf_expand_button: function(){
					
					// vars
					var $el = this.$el.closest('.media-modal');
					
					
					// does button already exist?
					if( $el.find('.media-frame-router .acf-expand-details').exists() ) return;
					
					
					// create button
					var $a = $([
						'<a href="#" class="acf-expand-details">',
							'<span class="is-closed"><span class="acf-icon -left small grey"></span>' + acf._e('expand_details') +  '</span>',
							'<span class="is-open"><span class="acf-icon -right small grey"></span>' + acf._e('collapse_details') +  '</span>',
						'</a>'
					].join('')); 
					
					
					// add events
					$a.on('click', function( e ){
						
						e.preventDefault();
						
						if( $el.hasClass('acf-expanded') ) {
						
							$el.removeClass('acf-expanded');
							
						} else {
							
							$el.addClass('acf-expanded');
							
						}
						
					});
					
					
					// append
					$el.find('.media-frame-router').append( $a );
					
				},
				
				render: function() {
					
					// validate
					if( this.ignore_render ) return this;
					
					
					// reference
					var self = this;
					
					
					// add expand button
					setTimeout(function(){
						
						self.add_acf_expand_button();
						
					}, 0);
					
					
					// setup fields
					// The clearTimout is needed to prevent many setup functions from running at the same time
					clearTimeout( acf.media.render_timout );
					acf.media.render_timout = setTimeout(function(){
						
						acf.do_action('append', self.$el);
						
					}, 50);
					
					
					// return
					return AttachmentCompat.prototype.render.apply( this, arguments );
					
				},
				
				
				dispose: function() {
					
					// remove
					acf.do_action('remove', this.$el);
					
					
					// return
					return AttachmentCompat.prototype.dispose.apply( this, arguments );
					
				},
				
				
				save: function( e ) {
				
					if( e ) {
						
						e.preventDefault();
						
					}
					
					
					// serialize form
					var data = acf.serialize(this.$el);
					
					
					// ignore render
					this.ignore_render = true;
					
					
					// save
					this.model.saveCompat( data );
					
				}
				
			
			});
			
		}
		
		
	});

})(jQuery);