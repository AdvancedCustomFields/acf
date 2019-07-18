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
				
				// Check success.
				if( acf.isAjaxSuccess(json) ) {
					
					// Render post screen.
					if( acf.get('screen') == 'post' ) {
						this.renderPostScreen( json.data );
					
					// Render user screen.
					} else if( acf.get('screen') == 'user' ) {
						this.renderUserScreen( json.data );
					}
				}
				
				// action
				acf.doAction('check_screen_complete', json.data, ajaxData);
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
			
			// vars
			var visible = [];
			
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
			
			// Show these postboxes.
			data.results.map(function( result, i ){
				
				// vars
				var postbox = acf.getPostbox( result.id );
				
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
					
					// Copy default WP events onto metabox.
					var $submitdiv = $('#submitdiv');
					if( $('#submitdiv').length ) {
						copyEvents( $submitdiv.children('.handlediv'), $postbox.children('.handlediv') );
						copyEvents( $submitdiv.children('.hndle'), $postbox.children('.hndle') );
					}
					
					// Initalize it (modifies HTML).
					postbox = acf.newPostbox( result );
					
					// Trigger action.
					acf.doAction('append', $postbox);
					acf.doAction('append_postbox', postbox);
				}
				
				// show postbox
				postbox.showEnable();
				
				// Do action.
				acf.doAction('show_postbox', postbox);
				
				// append
				visible.push( result.id );
			});
			
			// Hide these postboxes.
			acf.getPostboxes().map(function( postbox ){
				if( visible.indexOf( postbox.get('id') ) === -1 ) {
					postbox.hideDisable();
					
					// Do action.
					acf.doAction('hide_postbox', postbox);
				}
			});
			
			// Update style.
			$('#acf-style').html( data.style );	
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
		
		// Wait until load to avoid 'core' issues when loading taxonomies.
		wait: 'load',

		initialize: function(){
			
			// Bail early if not Gutenberg.
			if( !acf.isGutenberg() ) {
				return;
			}
			
			// Listen for changes.
			wp.data.subscribe(this.proxy(this.onChange));
			
			// Customize "acf.screen.get" functions.
			acf.screen.getPageTemplate = this.getPageTemplate;
			acf.screen.getPageParent = this.getPageParent;
			acf.screen.getPostType = this.getPostType;
			acf.screen.getPostFormat = this.getPostFormat;
			acf.screen.getPostCoreTerms = this.getPostCoreTerms;
			
			// Disable unload
			acf.unload.disable();
			
			// Add actions.
			//this.addAction( 'append_postbox', acf.screen.refreshAvailableMetaBoxesPerLocation );
		},
		
		onChange: function(){
			
			// Get edits.
			var edits = wp.data.select( 'core/editor' ).getPostEdits();
			
			// Check specific attributes.
			var attributes = [
				'template',
				'parent',
				'format'
			];
			
			// Append taxonomy attributes.
			var taxonomies = wp.data.select( 'core' ).getTaxonomies() || [];
			taxonomies.map(function( taxonomy ){
				attributes.push( taxonomy.rest_base );
			});
			
			// Filter out attributes that have not changed.
			attributes = attributes.filter(this.proxy(function( attr ){
				return ( edits[attr] !== undefined && edits[attr] !== this.get(attr) );
			}));
			
			// Trigger change if has attributes.
			if( attributes.length ) {
				this.triggerChange( edits )
			}
		},
		
		triggerChange: function( edits ){
			
			// Update this.data if edits are provided.
			if( edits !== undefined ) {
				this.data = edits;
			}
			
			// Check screen.
			acf.screen.check();
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
		}
	});
	
	/**
	 * acf.screen.refreshAvailableMetaBoxesPerLocation
	 *
	 * Refreshes the WP data state based on metaboxes found in the DOM.
	 *
	 * Caution. Not safe to use.
	 * Causes duplicate dispatch listeners when saving post resulting in duplicate postmeta.
	 *
	 * @date	6/3/19
	 * @since	5.7.13
	 *
	 * @param	void
	 * @return	void
	 */
	acf.screen.refreshAvailableMetaBoxesPerLocation = function() {
		
		// Extract vars.
		var select = wp.data.select( 'core/edit-post' );
		var dispatch = wp.data.dispatch( 'core/edit-post' );
		
		// Load current metabox locations and data.
		var data = {};
		select.getActiveMetaBoxLocations().map(function( location ){
			data[ location ] = select.getMetaBoxesPerLocation( location );
		});
		
		// Generate flat array of existing ids.
		var ids = [];
		for( var k in data ) {
			ids = ids.concat( data[k].map(function(m){ return m.id; }) );
		}
		
		// Append ACF metaboxes.
		acf.getPostboxes().map(function( postbox ){
			
			// Ignore if already exists in data.
			if( ids.indexOf( postbox.get('id') ) !== -1 ) {
				return;
			}
			
			// Get metabox location looking at parent form.
			var location = postbox.$el.closest('form').attr('class').replace('metabox-location-', '');
			
			// Ensure location exists.
			data[ location ] = data[ location ] || [];
			
			// Append.
			data[ location ].push({
				id: postbox.get('id'),
				title: postbox.get('title')
			});
		});
		
		// Update state.
		dispatch.setAvailableMetaBoxesPerLocation(data);	
	};

})(jQuery);