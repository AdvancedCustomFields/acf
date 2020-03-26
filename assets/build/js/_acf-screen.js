(function($, undefined){
	
	acf.screen = new acf.Model({
		
		active: true,
		
		xhr: false,
		
		timeout: false,
		
		wait: 'load',
		
		events: {
			'change #page_template':						'onChange',
			'change #parent_id':							'onChange',
			'change #post-formats-select':					'onChange',
			'change .categorychecklist':					'onChange',
			'change .tagsdiv':								'onChange',
			'change .acf-taxonomy-field[data-save="1"]':	'onChange',
			'change #product-type':							'onChange'
		},
		
		isPost: function(){
			return acf.get('screen') === 'post';
		},
		
		isUser: function(){
			return acf.get('screen') === 'user';
		},
		
		isTaxonomy: function(){
			return acf.get('screen') === 'taxonomy';
		},
		
		isAttachment: function(){
			return acf.get('screen') === 'attachment';
		},
		
		isNavMenu: function(){
			return acf.get('screen') === 'nav_menu';
		},
		
		isWidget: function(){
			return acf.get('screen') === 'widget';
		},
		
		isComment: function(){
			return acf.get('screen') === 'comment';
		},
		
		getPageTemplate: function(){
			var $el = $('#page_template');
			return $el.length ? $el.val() : null;
		},
		
		getPageParent: function( e, $el ){
			var $el = $('#parent_id');
			return $el.length ? $el.val() : null;
		},
		
		getPageType: function( e, $el ){
			return this.getPageParent() ? 'child' : 'parent';
		},
		
		getPostType: function(){
			return $('#post_type').val();
		},
		
		getPostFormat: function( e, $el ){
			var $el = $('#post-formats-select input:checked');
			if( $el.length ) {
				var val = $el.val();
				return (val == '0') ? 'standard' : val;
			}
			return null;
		},
		
		getPostCoreTerms: function(){
			
			// vars
			var terms = {};
			
			// serialize WP taxonomy postboxes		
			var data = acf.serialize( $('.categorydiv, .tagsdiv') );
			
			// use tax_input (tag, custom-taxonomy) when possible.
			// this data is already formatted in taxonomy => [terms].
			if( data.tax_input ) {
				terms = data.tax_input;
			}
			
			// append "category" which uses a different name
			if( data.post_category ) {
				terms.category = data.post_category;
			}
			
			// convert any string values (tags) into array format
			for( var tax in terms ) {
				if( !acf.isArray(terms[tax]) ) {
					terms[tax] = terms[tax].split(/,[\s]?/);
				}
			}
			
			// return
			return terms;
		},
		
		getPostTerms: function(){
			
			// Get core terms.
			var terms = this.getPostCoreTerms();
			
			// loop over taxonomy fields and add their values
			acf.getFields({type: 'taxonomy'}).map(function( field ){
				
				// ignore fields that don't save
				if( !field.get('save') ) {
					return;
				}
				
				// vars
				var val = field.val();
				var tax = field.get('taxonomy');
				
				// check val
				if( val ) {
					
					// ensure terms exists
					terms[ tax ] = terms[ tax ] || [];
					
					// ensure val is an array
					val = acf.isArray(val) ? val : [val];
					
					// append
					terms[ tax ] = terms[ tax ].concat( val );
				}
			});
			
			// add WC product type
			if( (productType = this.getProductType()) !== null ) {
				terms.product_type = [productType];
			}
			
			// remove duplicate values
			for( var tax in terms ) {
				terms[tax] = acf.uniqueArray(terms[tax]);
			}
			
			// return
			return terms;
		},
		
		getProductType: function(){
			var $el = $('#product-type');
			return $el.length ? $el.val() : null;
		},
		
		check: function(){
			
			// bail early if not for post
			if( acf.get('screen') !== 'post' ) {
				return;
			}
			
			// abort XHR if is already loading AJAX data
			if( this.xhr ) {
				this.xhr.abort();
			}
			
			// vars
			var ajaxData = acf.parseArgs(this.data, {
				action:	'acf/ajax/check_screen',
				screen: acf.get('screen'),
				exists: []
			});
			
			// post id
			if( this.isPost() ) {
				ajaxData.post_id = acf.get('post_id');
			}
			
			// post type
			if( (postType = this.getPostType()) !== null ) {
				ajaxData.post_type = postType;
			}
			
			// page template
			if( (pageTemplate = this.getPageTemplate()) !== null ) {
				ajaxData.page_template = pageTemplate;
			}
			
			// page parent
			if( (pageParent = this.getPageParent()) !== null ) {
				ajaxData.page_parent = pageParent;
			}
			
			// page type
			if( (pageType = this.getPageType()) !== null ) {
				ajaxData.page_type = pageType;
			}
			
			// post format
			if( (postFormat = this.getPostFormat()) !== null ) {
				ajaxData.post_format = postFormat;
			}
			
			// post terms
			if( (postTerms = this.getPostTerms()) !== null ) {
				ajaxData.post_terms = postTerms;
			}
			
			// add array of existing postboxes to increase performance and reduce JSON HTML
			acf.getPostboxes().map(function( postbox ){
				ajaxData.exists.push( postbox.get('key') );
			});
			
			// filter
			ajaxData = acf.applyFilters('check_screen_args', ajaxData);
			
			// success
			var onSuccess = function( json ){
				
				// Render post screen.
				if( acf.get('screen') == 'post' ) {
					this.renderPostScreen( json );
				
				// Render user screen.
				} else if( acf.get('screen') == 'user' ) {
					this.renderUserScreen( json );
				}
				
				// action
				acf.doAction('check_screen_complete', json, ajaxData);
			};
			
			// ajax
			this.xhr = $.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax( ajaxData ),
				type: 'post',
				dataType: 'json',
				context: this,
				success: onSuccess
			});
		},
		
		onChange: function( e, $el ){
			this.setTimeout(this.check, 1);
		},
		
		renderPostScreen: function( data ){
			
			// Helper function to copy events
			var copyEvents = function( $from, $to ){
				var events = $._data($from[0]).events;
				for( var type in events ) {
					for( var i = 0; i < events[type].length; i++ ) {
						$to.on( type, events[type][i].handler );
					}
				}
			}
			
			// Helper function to sort metabox.
			var sortMetabox = function( id, ids ){
				
				// Find position of id within ids.
				var index = ids.indexOf( id );
				
				// Bail early if index not found.
				if( index == -1 ) {
					return false;
				}
				
				// Loop over metaboxes behind (in reverse order).
				for( var i = index-1; i >= 0; i-- ) {
					if( $('#'+ids[i]).length ) {
						return $('#'+ids[i]).after( $('#'+id) );
					}
				}
				
				// Loop over metaboxes infront.
				for( var i = index+1; i < ids.length; i++ ) {
					if( $('#'+ids[i]).length ) {
						return $('#'+ids[i]).before( $('#'+id) );
					}
				}
				
				// Return false if not sorted.
				return false;
			};
			
			// Keep track of visible and hidden postboxes.
			data.visible = [];
			data.hidden = [];
			
			// Show these postboxes.
			data.results = data.results.map(function( result, i ){
				
				// vars
				var postbox = acf.getPostbox( result.id );
				
				// Prevent "acf_after_title" position in Block Editor.
				if( acf.isGutenberg() && result.position == "acf_after_title" ) {
					result.position = 'normal';
				}
				
				// Create postbox if doesn't exist.
				if( !postbox ) {
					
					// Create it.
					var $postbox = $([
						'<div id="' + result.id + '" class="postbox">',
							'<button type="button" class="handlediv" aria-expanded="false">',
								'<span class="screen-reader-text">Toggle panel: ' + result.title + '</span>',
								'<span class="toggle-indicator" aria-hidden="true"></span>',
							'</button>',
							'<h2 class="hndle ui-sortable-handle">',
								'<span>' + result.title + '</span>',
							'</h2>',
							'<div class="inside">',
								result.html,
							'</div>',
						'</div>'
					].join(''));
					
					// Create new hide toggle.
					if( $('#adv-settings').length ) {
						var $prefs = $('#adv-settings .metabox-prefs');
						var $label = $([
							'<label for="' + result.id + '-hide">',
								'<input class="hide-postbox-tog" name="' + result.id + '-hide" type="checkbox" id="' + result.id + '-hide" value="' + result.id + '" checked="checked">',
								' ' + result.title,
							'</label>'
						].join(''));
						
						// Copy default WP events onto checkbox.
						copyEvents( $prefs.find('input').first(), $label.find('input') );
						
						// Append hide label
						$prefs.append( $label );
					}
					
					// Copy default WP events onto metabox.
					if( $('.postbox').length ) {
						copyEvents( $('.postbox .handlediv').first(), $postbox.children('.handlediv') );
						copyEvents( $('.postbox .hndle').first(), $postbox.children('.hndle') );
					}
					
					// Append metabox to the bottom of "side-sortables".
					if( result.position === 'side' ) {
						$('#' + result.position + '-sortables').append( $postbox );
					
					// Prepend metabox to the top of "normal-sortbables".
					} else {
						$('#' + result.position + '-sortables').prepend( $postbox );
					}
					
					// Position metabox amongst existing ACF metaboxes within the same location.
					var order = [];
					data.results.map(function( _result ){
						if( result.position === _result.position && $('#' + result.position + '-sortables #' + _result.id).length ) {
							order.push( _result.id );
						}
					});
					sortMetabox(result.id, order)
					
					// Check 'sorted' for user preference.
					if( data.sorted ) {
						
						// Loop over each position (acf_after_title, side, normal).
						for( var position in data.sorted ) {
							
							// Explode string into array of ids.
							var order = data.sorted[position].split(',');
							
							// Position metabox relative to order.
							if( sortMetabox(result.id, order) ) {
								break;
							}
						}
					}
					
					// Initalize it (modifies HTML).
					postbox = acf.newPostbox( result );
					
					// Trigger action.
					acf.doAction('append', $postbox);
					acf.doAction('append_postbox', postbox);
				}
				
				// show postbox
				postbox.showEnable();
				
				// append
				data.visible.push( result.id );
				
				// Return result (may have changed).
				return result;
			});
			
			// Hide these postboxes.
			acf.getPostboxes().map(function( postbox ){
				if( data.visible.indexOf( postbox.get('id') ) === -1 ) {
					
					// Hide postbox.
					postbox.hideDisable();
					
					// Append to data.
					data.hidden.push( postbox.get('id') );
				}
			});
			
			// Update style.
			$('#acf-style').html( data.style );
			
			// Do action.
			acf.doAction( 'refresh_post_screen', data );
		},
		
		renderUserScreen: function( json ){
			
		}
	});
	
	/**
	*  gutenScreen
	*
	*  Adds compatibility with the Gutenberg edit screen.
	*
	*  @date	11/12/18
	*  @since	5.8.0
	*
	*  @param	void
	*  @return	void
	*/
	var gutenScreen = new acf.Model({
		
		// Keep a reference to the most recent post attributes.
		postEdits: {},
				
		// Wait until load to avoid 'core' issues when loading taxonomies.
		wait: 'load',

		initialize: function(){
			
			// Bail early if not Gutenberg.
			if( !acf.isGutenberg() ) {
				return;
			}
			
			// Listen for changes (use debounced version as this can fires often).
			wp.data.subscribe( acf.debounce(this.onChange).bind(this) );
			
			// Customize "acf.screen.get" functions.
			acf.screen.getPageTemplate = this.getPageTemplate;
			acf.screen.getPageParent = this.getPageParent;
			acf.screen.getPostType = this.getPostType;
			acf.screen.getPostFormat = this.getPostFormat;
			acf.screen.getPostCoreTerms = this.getPostCoreTerms;
			
			// Disable unload
			acf.unload.disable();
			
			// Refresh metaboxes since WP 5.3.
			var wpMinorVersion = parseFloat( acf.get('wp_version') );
			if( wpMinorVersion >= 5.3 ) {
				this.addAction( 'refresh_post_screen', this.onRefreshPostScreen );
			}
		},
		
		onChange: function(){
			
			// Determine attributes that can trigger a refresh.
			var attributes = [ 'template', 'parent', 'format' ];
			
			// Append taxonomy attribute names to this list.
			( wp.data.select( 'core' ).getTaxonomies() || [] ).map(function( taxonomy ){
				attributes.push( taxonomy.rest_base );
			});
			
			// Get relevant current post edits.
			var _postEdits = wp.data.select( 'core/editor' ).getPostEdits();
			var postEdits = {};
			attributes.map(function( k ){
				if( _postEdits[k] !== undefined ) {
					postEdits[k] = _postEdits[k];
				}
			});
			
			// Detect change.
			if( JSON.stringify(postEdits) !== JSON.stringify(this.postEdits) ) {
				this.postEdits = postEdits;
				
				// Check screen.
				acf.screen.check();
			}
		},
				
		getPageTemplate: function(){
			return wp.data.select( 'core/editor' ).getEditedPostAttribute( 'template' );
		},
		
		getPageParent: function( e, $el ){
			return wp.data.select( 'core/editor' ).getEditedPostAttribute( 'parent' );
		},
		
		getPostType: function(){
			return wp.data.select( 'core/editor' ).getEditedPostAttribute( 'type' );
		},
		
		getPostFormat: function( e, $el ){
			return wp.data.select( 'core/editor' ).getEditedPostAttribute( 'format' );
		},
		
		getPostCoreTerms: function(){
			
			// vars
			var terms = {};
			
			// Loop over taxonomies.
			var taxonomies = wp.data.select( 'core' ).getTaxonomies() || [];
			taxonomies.map(function( taxonomy ){
				
				// Append selected taxonomies to terms object.
				var postTerms = wp.data.select( 'core/editor' ).getEditedPostAttribute( taxonomy.rest_base );
				if( postTerms ) {
					terms[ taxonomy.slug ] = postTerms;
				}
			});
			
			// return
			return terms;
		},
		
		/**
		 * onRefreshPostScreen
		 *
		 * Fires after the Post edit screen metaboxs are refreshed to update the Block Editor API state.
		 *
		 * @date	11/11/19
		 * @since	5.8.7
		 *
		 * @param	object data The "check_screen" JSON response data.
		 * @return	void
		 */
		onRefreshPostScreen: function( data ) {
			
			// Extract vars.
			var select = wp.data.select( 'core/edit-post' );
			var dispatch = wp.data.dispatch( 'core/edit-post' );
			
			// Load current metabox locations and data.
			var locations = {};
			select.getActiveMetaBoxLocations().map(function( location ){
				locations[ location ] = select.getMetaBoxesPerLocation( location );
			});
			
			// Generate flat array of existing ids.
			var ids = [];
			for( var k in locations ) {
				locations[k].map(function( m ){
					ids.push( m.id );
				});
			}
			
			// Append new ACF metaboxes (ignore those which already exist).
			data.results.filter(function( r ){
				return ( ids.indexOf( r.id ) === -1 );
			}).map(function( result, i ){
				
				// Ensure location exists.
				var location = result.position;
				locations[ location ] = locations[ location ] || [];
				
				// Append.
				locations[ location ].push({
					id: result.id,
					title: result.title
				});
			});
			
			// Remove hidden ACF metaboxes.
			for( var k in locations ) {
				locations[k] = locations[k].filter(function( m ){
					return ( data.hidden.indexOf( m.id ) === -1 );
				});
			}
			
			// Update state.
			dispatch.setAvailableMetaBoxesPerLocation( locations );	
		}
	});

})(jQuery);