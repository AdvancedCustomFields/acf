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
		
		initialize: function(){
			
		},
/*
		
		checkScreenEvents: function(){
			
			// vars
			var events = [
				'change #page_template',
				'change #parent_id',
				'change #post-formats-select input',
				'change .categorychecklist input',
				'change .categorychecklist select',
				'change .acf-taxonomy-field[data-save="1"] input',
				'change .acf-taxonomy-field[data-save="1"] select',
				'change #product-type'	
			];
			
			acf.screen.on('change', '#product-type', 'fetch');
		},
*/
		
		
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
		
		getPostFormat: function( e, $el ){
			var $el = $('#post-formats-select input:checked');
			if( $el.length ) {
				var val = $el.val();
				return (val == '0') ? 'standard' : val;
			}
			return null;
		},
		
		getPostTerms: function(){
			
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
	
/*	
	// tests
	acf.registerScreenChange('#page_template', function( e, $el ){
		return $('#page_template').val();
	});
	
	acf.registerScreenData({
		name: 'page_template',
		change: '#page_template',
		val: function(){
			var $input = $(this.el);
			return $input.length ? $input.val() : null;
		}
	});
	
	acf.registerScreenData({
		name: 'post_terms',
		change: '.acf-taxonomy-field[data-save="1"]',
		val: function(){
			var $input = $(this.el);
			return $input.length ? $input.val() : null;
		}
	});
	
	acf.registerScreenData({
		name: 'post_terms',
		change: '#product-type',
		val: function( terms ){
			var $select = $('#product-type');
			if( $select.length ) {
				terms.push('product_cat:'+$select.val());
			}
			return terms;
		}
	});
	
	
	acf.screen.get('post_terms');
	acf.screen.getPostTerms();
	
*/

})(jQuery);