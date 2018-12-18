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
					terms[tax] = terms[tax].split(', ');
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
				if( postbox.hasHTML() ) {
					ajaxData.exists.push( postbox.get('key') );
				}
			});
			
			// filter
			ajaxData = acf.applyFilters('check_screen_args', ajaxData);
			
			// success
			var onSuccess = function( json ){
				
				// bail early if not success
				if( !acf.isAjaxSuccess(json) ) {
					return;
				}
				
				// vars
				var visible = [];
				
				// loop
				json.data.results.map(function( fieldGroup, i ){
					
					// vars
					var id = 'acf-' + fieldGroup.key;
					var postbox = acf.getPostbox( id );
					
					// show postbox
					postbox.showEnable();
					
					// append
					visible.push( id );
					
					// update HTML
					if( !postbox.hasHTML() && fieldGroup.html ) {
						postbox.html( fieldGroup.html );
					}
				});
				
				// hide other postboxes
				acf.getPostboxes().map(function( postbox ){
					if( visible.indexOf( postbox.get('id') ) === -1 ) {
						postbox.hideDisable();
					}
				});
				
				// reset style
				$('#acf-style').html( json.data.style );
				
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
				return ( edits[attr] && edits[attr] !== this.get(attr) );
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
				terms[ taxonomy.slug ] = wp.data.select( 'core/editor' ).getEditedPostAttribute( taxonomy.rest_base );
			});
			
			// return
			return terms;
		},
	});

})(jQuery);