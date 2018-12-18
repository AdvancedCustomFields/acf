(function($, undefined){
	
	/**
	*  acf.newMediaPopup
	*
	*  description
	*
	*  @date	10/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newMediaPopup = function( args ){
		
		// args
		var popup = null;
		var args = acf.parseArgs(args, {
			mode:			'select',			// 'select', 'edit'
			title:			'',					// 'Upload Image'
			button:			'',					// 'Select Image'
			type:			'',					// 'image', ''
			field:			false,				// field instance
			allowedTypes:	'',					// '.jpg, .png, etc'
			library:		'all',				// 'all', 'uploadedTo'
			multiple:		false,				// false, true, 'add'
			attachment:		0,					// the attachment to edit
			autoOpen:		true,				// open the popup automatically
			open: 			function(){},		// callback after close
			select: 		function(){},		// callback after select
			close: 			function(){}		// callback after close
		});
		
		// initialize
		if( args.mode == 'edit' ) {
			popup = new acf.models.EditMediaPopup( args );
		} else {
			popup = new acf.models.SelectMediaPopup( args );
		}
		
		// open popup (allow frame customization before opening)
		if( args.autoOpen ) {
			setTimeout(function(){
				popup.open();
			}, 1);
		}
		
		// action
		acf.doAction('new_media_popup', popup);
		
		// return
		return popup;
	};
	
	
	/**
	*  getPostID
	*
	*  description
	*
	*  @date	10/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var getPostID = function() {
		var postID = acf.get('post_id');
		return $.isNumeric(postID) ? postID : 0;
	}
	
	
	/**
	*  acf.getMimeTypes
	*
	*  description
	*
	*  @date	11/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.getMimeTypes = function(){
		return this.get('mimeTypes');
	};
	
	acf.getMimeType = function( name ){
		
		// vars
		var allTypes = acf.getMimeTypes();
		
		// search
		if( allTypes[name] !== undefined ) {
			return allTypes[name];
		}
		
		// some types contain a mixed key such as "jpg|jpeg|jpe"
		for( var key in allTypes ) {
			if( key.indexOf(name) !== -1 ) {
				return allTypes[key];
			}
		}
		
		// return
		return false;
	};
	
	
	/**
	*  MediaPopup
	*
	*  description
	*
	*  @date	10/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var MediaPopup = acf.Model.extend({
		
		id: 'MediaPopup',
		data: {},
		defaults: {},
		frame: false,
		
		setup: function( props ){
			$.extend(this.data, props);
		},
		
		initialize: function(){
			
			// vars
			var options = this.getFrameOptions();
			
			// add states
			this.addFrameStates( options );
			
			// create frame
			var frame = wp.media( options );
			
			// add args reference
			frame.acf = this;
			
			// add events
			this.addFrameEvents( frame, options );
			
			// strore frame
			this.frame = frame;
		},
		
		open: function(){
			this.frame.open();
		},
		
		close: function(){
			this.frame.close();
		},
		
		remove: function(){
			this.frame.detach();
			this.frame.remove();
		},
		
		getFrameOptions: function(){
			
			// vars
			var options = {
				title:		this.get('title'),
				multiple:	this.get('multiple'),
				library:	{},
				states:		[]
			};
			
			// type
			if( this.get('type') ) {
				options.library.type = this.get('type');
			}
			
			// type
			if( this.get('library') === 'uploadedTo' ) {
				options.library.uploadedTo = getPostID();
			}
			
			// attachment
			if( this.get('attachment') ) {
				options.library.post__in = [ this.get('attachment') ];
			}
			
			// button
			if( this.get('button') ) {
				options.button = {
					text: this.get('button')
				};
			}
			
			// return
			return options;
		},
		
		addFrameStates: function( options ){
			
			// create query
			var Query = wp.media.query( options.library );
			
			// add _acfuploader
			// this is super wack!
			// if you add _acfuploader to the options.library args, new uploads will not be added to the library view.
			// this has been traced back to the wp.media.model.Query initialize function (which can't be overriden)
			// Adding any custom args will cause the Attahcments to not observe the uploader queue
			// To bypass this security issue, we add in the args AFTER the Query has been initialized
			// options.library._acfuploader = settings.field;
			if( this.get('field') && acf.isset(Query, 'mirroring', 'args') ) {
				Query.mirroring.args._acfuploader = this.get('field');
			}
			
			// add states
			options.states.push(
				
				// main state
				new wp.media.controller.Library({
					library:		Query,
					multiple: 		this.get('multiple'),
					title: 			this.get('title'),
					priority: 		20,
					filterable: 	'all',
					editable: 		true,
					allowLocalEdits: true
				})
				
			);
			
			// edit image functionality (added in WP 3.9)
			if( acf.isset(wp, 'media', 'controller', 'EditImage') ) {
				options.states.push( new wp.media.controller.EditImage() );
			}
		},
		
		addFrameEvents: function( frame, options ){
			
			// log all events
			//frame.on('all', function( e ) {
			//	console.log( 'frame all: %o', e );
			//});
			
			// add class
			frame.on('open',function() {
				this.$el.closest('.media-modal').addClass('acf-media-modal -' + this.acf.get('mode') );
			}, frame);
			
			// edit image view
			// source: media-views.js:2410 editImageContent()
			frame.on('content:render:edit-image', function(){
				
				var image = this.state().get('image');
				var view = new wp.media.view.EditImage({ model: image, controller: this }).render();
				this.content.set( view );
	
				// after creating the wrapper view, load the actual editor via an ajax call
				view.loadEditor();
				
			}, frame);
			
			// update toolbar button
/*
			frame.on( 'toolbar:create:select', function( toolbar ) {
				
				toolbar.view = new wp.media.view.Toolbar.Select({
					text: frame.options._button,
					controller: this
				});
				
			}, frame );
*/
			// on select
			frame.on('select', function() {
				
				// vars
				var selection = frame.state().get('selection');
				
				// if selecting images
				if( selection ) {
					
					// loop
					selection.each(function( attachment, i ){
						frame.acf.get('select').apply( frame.acf, [attachment, i] );
					});
				}
			});
			
			// on close
			frame.on('close',function(){
				
				// callback and remove
				setTimeout(function(){
					frame.acf.get('close').apply( frame.acf );
					frame.acf.remove();
				}, 1);
			});
		}
	});
	
	
	/**
	*  acf.models.SelectMediaPopup
	*
	*  description
	*
	*  @date	10/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.models.SelectMediaPopup = MediaPopup.extend({
		id: 'SelectMediaPopup',
		setup: function( props ){
			
			// default button
			if( !props.button ) {
				props.button = acf._x('Select', 'verb');
			}
			
			// parent
			MediaPopup.prototype.setup.apply(this, arguments);
		},
		
		addFrameEvents: function( frame, options ){
			
			// plupload
			// adds _acfuploader param to validate uploads
			if( acf.isset(_wpPluploadSettings, 'defaults', 'multipart_params') ) {
				
				// add _acfuploader so that Uploader will inherit
				_wpPluploadSettings.defaults.multipart_params._acfuploader = this.get('field');
				
				// remove acf_field so future Uploaders won't inherit
				frame.on('open', function(){
					delete _wpPluploadSettings.defaults.multipart_params._acfuploader;
				});
			}
			
			// browse
			frame.on('content:activate:browse', function(){
				
				// vars
				var toolbar = false;
				
				// populate above vars making sure to allow for failure
				// perhaps toolbar does not exist because the frame open is Upload Files
				try {
					toolbar = frame.content.get().toolbar;
				} catch(e) {
					console.log(e);
					return;
				}
				
				// callback
				frame.acf.customizeFilters.apply(frame.acf, [toolbar]);
			});
			
			// parent
			MediaPopup.prototype.addFrameEvents.apply(this, arguments);
			
		},
		
		customizeFilters: function( toolbar ){
			
			// vars
			var filters = toolbar.get('filters');
			
			// image
			if( this.get('type') == 'image' ) {
				
				// update all
				filters.filters.all.text = acf.__('All images');
				
				// remove some filters
				delete filters.filters.audio;
				delete filters.filters.video;
				delete filters.filters.image;
				
				// update all filters to show images
				$.each(filters.filters, function( i, filter ){
					filter.props.type = filter.props.type || 'image';
				});
			}
			
			// specific types
			if( this.get('allowedTypes') ) {
				
				// convert ".jpg, .png" into ["jpg", "png"]
				var allowedTypes = this.get('allowedTypes').split(' ').join('').split('.').join('').split(',');
				
				// loop
				allowedTypes.map(function( name ){
					
					// get type
					var mimeType = acf.getMimeType( name );
					
					// bail early if no type
					if( !mimeType ) return;
					
					// create new filter
					var newFilter = {
						text: mimeType,
						props: {
							status:  null,
							type:    mimeType,
							uploadedTo: null,
							orderby: 'date',
							order:   'DESC'
						},
						priority: 20
					};			
									
					// append
					filters.filters[ mimeType ] = newFilter;
					
				});
			}
			
			
			
			// uploaded to post
			if( this.get('library') === 'uploadedTo' ) {
				
				// vars
				var uploadedTo = this.frame.options.library.uploadedTo;
				
				// remove some filters
				delete filters.filters.unattached;
				delete filters.filters.uploaded;
				
				// add uploadedTo to filters
				$.each(filters.filters, function( i, filter ){
					filter.text += ' (' + acf.__('Uploaded to this post') + ')';
					filter.props.uploadedTo = uploadedTo;
				});
			}
			
			// add _acfuploader to filters
			var field = this.get('field');
			$.each(filters.filters, function( k, filter ){
				filter.props._acfuploader = field;
			});
			
			// add _acfuplaoder to search
			var search = toolbar.get('search');
			search.model.attributes._acfuploader = field;
			
			// render (custom function added to prototype)
			if( filters.renderFilters ) {
				filters.renderFilters();
			}
		}
	});
	
	
	/**
	*  acf.models.EditMediaPopup
	*
	*  description
	*
	*  @date	10/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.models.EditMediaPopup = MediaPopup.extend({
		id: 'SelectMediaPopup',
		setup: function( props ){
			
			// default button
			if( !props.button ) {
				props.button = acf._x('Update', 'verb');
			}
			
			// parent
			MediaPopup.prototype.setup.apply(this, arguments);
		},
		
		addFrameEvents: function( frame, options ){
			
			// add class
			frame.on('open',function() {
				
				// add class
				this.$el.closest('.media-modal').addClass('acf-expanded');
				
				// set to browse
				if( this.content.mode() != 'browse' ) {
					this.content.mode('browse');
				}
				
				// set selection
				var state 		= this.state();
				var selection	= state.get('selection');
				var attachment	= wp.media.attachment( frame.acf.get('attachment') );
				selection.add( attachment );
								
			}, frame);
			
			// parent
			MediaPopup.prototype.addFrameEvents.apply(this, arguments);
			
		}
	});
	
	
	/**
	*  customizePrototypes
	*
	*  description
	*
	*  @date	11/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var customizePrototypes = new acf.Model({
		id: 'customizePrototypes',
		wait: 'ready',
		
		initialize: function(){
			
			// bail early if no media views
			if( !acf.isset(window, 'wp', 'media', 'view') ) {
				return;
			}
			
			// fix bug where CPT without "editor" does not set post.id setting which then prevents uploadedTo from working
			var postID = getPostID();
			if( postID && acf.isset(wp, 'media', 'view', 'settings', 'post') ) {
				wp.media.view.settings.post.id = postID;
			}
			
			// customize
			this.customizeAttachmentsRouter();
			this.customizeAttachmentFilters();
			this.customizeAttachmentCompat();
			this.customizeAttachmentLibrary();
		},
		
		customizeAttachmentsRouter: function(){
			
			// validate
			if( !acf.isset(wp, 'media', 'view', 'Router') ) {
				return;
			}
			
			// vars
			var Parent = wp.media.view.Router;
			
			// extend
			wp.media.view.Router = Parent.extend({
				
				addExpand: function(){
					
					// vars
					var $a = $([
						'<a href="#" class="acf-expand-details">',
							'<span class="is-closed"><span class="acf-icon -left small grey"></span>' + acf.__('Expand Details') +  '</span>',
							'<span class="is-open"><span class="acf-icon -right small grey"></span>' + acf.__('Collapse Details') +  '</span>',
						'</a>'
					].join('')); 
					
					// add events
					$a.on('click', function( e ){
						e.preventDefault();
						var $div = $(this).closest('.media-modal');
						if( $div.hasClass('acf-expanded') ) {
							$div.removeClass('acf-expanded');
						} else {
							$div.addClass('acf-expanded');
						}
					});
					
					// append
					this.$el.append( $a );
				},
				
				initialize: function(){
					
					// initialize
					Parent.prototype.initialize.apply( this, arguments );
					
					// add buttons
					this.addExpand();
					
					// return
					return this;
				}
			});	
		},
		
		customizeAttachmentFilters: function(){
			
			// validate
			if( !acf.isset(wp, 'media', 'view', 'AttachmentFilters', 'All') ) {
				return;
			}
			
			// vars
			var Parent = wp.media.view.AttachmentFilters.All;
			
			// renderFilters
			// copied from media-views.js:6939
			Parent.prototype.renderFilters = function(){
				
				// Build `<option>` elements.
				this.$el.html( _.chain( this.filters ).map( function( filter, value ) {
					return {
						el: $( '<option></option>' ).val( value ).html( filter.text )[0],
						priority: filter.priority || 50
					};
				}, this ).sortBy('priority').pluck('el').value() );
				
			};
		},
		
		customizeAttachmentCompat: function(){
			
			// validate
			if( !acf.isset(wp, 'media', 'view', 'AttachmentCompat') ) {
				return;
			}
			
			// vars
			var AttachmentCompat = wp.media.view.AttachmentCompat;
			var timeout = false;
			
			// extend
			wp.media.view.AttachmentCompat = AttachmentCompat.extend({
				
				render: function() {
					
					// WP bug
					// When multiple media frames exist on the same page (WP content, WYSIWYG, image, file ),
					// WP creates multiple instances of this AttachmentCompat view.
					// Each instance will attempt to render when a new modal is created.
					// Use a property to avoid this and only render once per instance.
					if( this.rendered ) {
						return this;
					}
					
					// render HTML
					AttachmentCompat.prototype.render.apply( this, arguments );
					
					// when uploading, render is called twice.
					// ignore first render by checking for #acf-form-data element
					if( !this.$('#acf-form-data').length ) {
						return this;
					}
					
					// clear timeout
					clearTimeout( timeout );
					
					// setTimeout
					timeout = setTimeout($.proxy(function(){
						this.rendered = true;
						acf.doAction('append', this.$el);
					}, this), 50);
					
					// return
					return this;
				},
				
				save: function( event ) {
					var data = {};
			
					if ( event ) {
						event.preventDefault();
					}
					
					//_.each( this.$el.serializeArray(), function( pair ) {
					//	data[ pair.name ] = pair.value;
					//});
					
					// Serialize data more thoroughly to allow chckbox inputs to save.
					data = acf.serializeForAjax(this.$el);
					
					this.controller.trigger( 'attachment:compat:waiting', ['waiting'] );
					this.model.saveCompat( data ).always( _.bind( this.postSave, this ) );
				}
			});

		},
		
		customizeAttachmentLibrary: function(){
			
			// validate
			if( !acf.isset(wp, 'media', 'view', 'Attachment', 'Library') ) {
				return;
			}
			
			// vars
			var AttachmentLibrary = wp.media.view.Attachment.Library;
			
			// extend
			wp.media.view.Attachment.Library = AttachmentLibrary.extend({
				
				render: function() {
					
					// vars
					var popup = acf.isget(this, 'controller', 'acf');
					var attributes = acf.isget(this, 'model', 'attributes');
					
					// check vars exist to avoid errors
					if( popup && attributes ) {
						
						// show errors
						if( attributes.acf_errors ) {
							this.$el.addClass('acf-disabled');
						}
						
						// disable selected
						var selected = popup.get('selected');
						if( selected && selected.indexOf(attributes.id) > -1 ) {
							this.$el.addClass('acf-selected');
						}
					}
										
					// render
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
					var frame = this.controller;
					var errors = acf.isget(this, 'model', 'attributes', 'acf_errors');
					var $sidebar = frame.$el.find('.media-frame-content .media-sidebar');
					
					// remove previous error
					$sidebar.children('.acf-selection-error').remove();
					
					// show attachment details
					$sidebar.children().removeClass('acf-hidden');
					
					// add message
					if( frame && errors ) {
						
						// vars
						var filename = acf.isget(this, 'model', 'attributes', 'filename');
						
						// hide attachment details
						// Gallery field continues to show previously selected attachment...
						$sidebar.children().addClass('acf-hidden');
						
						// append message
						$sidebar.prepend([
							'<div class="acf-selection-error">',
								'<span class="selection-error-label">' + acf.__('Restricted') +'</span>',
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
					return AttachmentLibrary.prototype.toggleSelection.apply( this, arguments );
				}
			});
		}
	});

})(jQuery);