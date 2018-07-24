(function($, undefined){
	
	acf.screen = new acf.Model({
		
		active: true,
		
		xhr: false,
		
		wait: 'ready',
		
		events: {
			'change #page_template':								'onChangeTemplate',
			'change #parent_id':									'onChangeParent',
			'change #post-formats-select input':					'onChangeFormat',
			'change .categorychecklist input':						'onChangeTerm',
			'change .categorychecklist select':						'onChangeTerm',
			'change .acf-taxonomy-field[data-save="1"] input':		'onChangeTerm',
			'change .acf-taxonomy-field[data-save="1"] select':		'onChangeTerm'
		},
		
		data: {
			//'post_id':		0,
			//'page_template':	0,
			//'page_parent':	0,
			//'page_type':		0,
			//'post_format':	0,
			//'post_taxonomy':	0
		},
			
		fetch: function(){
			
			// bail early if not active
			if( !this.active ) {
				return;
			}
			
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
				post_id: acf.get('post_id')
			});
			
			// add action url
			ajaxData.action = 'acf/post/get_field_groups';
			
			// add ignore
			ajaxData.exists = [];
			$('.acf-postbox').not('.acf-hidden').each(function(){
				ajaxData.exists.push( $(this).attr('id').substr(4) );
			});
			
			// success
			var onSuccess = function( json ){
				
				// bail early if not success
				if( !acf.isAjaxSuccess(json) ) {
					return;
				}
				
				// hide
				$('.acf-postbox').addClass('acf-hidden');
				$('.acf-postbox-toggle').addClass('acf-hidden');
				
				// reset style
				$('#acf-style').html('');
				
				// loop
				json.data.map(function( fieldGroup, i ){
					
					// vars
					var $postbox = $('#acf-' + fieldGroup.key);
					var $toggle = $('#acf-' + fieldGroup.key + '-hide');
					var $label = $toggle.parent();
						
					// show
					// use show() to force display when postbox has been hidden by 'Show on screen' toggle
					$postbox.removeClass('acf-hidden hide-if-js').show();
					$label.removeClass('acf-hidden hide-if-js').show();
					$toggle.prop('checked', true);
					
					// replace HTML if needed
					var $replace = $postbox.find('.acf-replace-with-fields');
					if( $replace.exists() ) {
						$replace.replaceWith( fieldGroup.html );
						acf.doAction('append', $postbox);
					}
					
					// update style if needed
					if( i === 0 ) {
						$('#acf-style').html( fieldGroup.style );
					}
					
					// enable inputs
					acf.enable( $postbox, 'postbox' );
				});
			};
			
			// complete
			var onComplete = function( json ){
				
				// disable inputs
				$('.acf-postbox.acf-hidden').each(function(){
					acf.disable( $(this), 'postbox' );
				});
			};
			
			// ajax
			this.xhr = $.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax( ajaxData ),
				type: 'post',
				dataType: 'json',
				context: this,
				success: onSuccess,
				complete: onComplete
			});
		},
		
		syncTaxonomyTerms: function(){
			
			// vars
			var values = [''];
			
			// loop over term lists
			$('.categorychecklist, .acf-taxonomy-field').each(function(){
				
				// vars
				var $el = $(this),
					$checkbox = $el.find('input[type="checkbox"]').not(':disabled'),
					$radio = $el.find('input[type="radio"]').not(':disabled'),
					$select = $el.find('select').not(':disabled'),
					$hidden = $el.find('input[type="hidden"]').not(':disabled');
				
				
				// bail early if not a field which saves taxonomy terms to post
				if( $el.is('.acf-taxonomy-field') && $el.attr('data-save') != '1' ) {
					
					return;
					
				}
				
				
				// bail early if in attachment
				if( $el.closest('.media-frame').exists() ) {
					
					return;
				
				}
				
				
				// checkbox
				if( $checkbox.exists() ) {
					
					$checkbox.filter(':checked').each(function(){
						
						values.push( $(this).val() );
						
					});
					
				} else if( $radio.exists() ) {
					
					$radio.filter(':checked').each(function(){
						
						values.push( $(this).val() );
						
					});
					
				} else if( $select.exists() ) {
					
					$select.find('option:selected').each(function(){
						
						values.push( $(this).val() );
						
					});
					
				} else if( $hidden.exists() ) {
					
					$hidden.each(function(){
						
						// ignor blank values
						if( ! $(this).val() ) {
							
							return;
							
						}
						
						values.push( $(this).val() );
						
					});
					
				}
								
			});
	
			
			// filter duplicates
			values = values.filter(function(item, pos, self) {
			    return self.indexOf(item) == pos;
			});
			
			
			// update screen
			this.set( 'post_taxonomy', values ).fetch();
		},
		
		onChangeTemplate: function( e, $el ){
			
			// update & fetch
			this.set('page_template', $el.val()).fetch();
		},
		
		onChangeParent: function( e, $el ){
			
			// vars
			var pageType = 'parent';
			var pageParent = 0;
			
			// if is child
			if( $el.val() != "" ) {
				pageType = 'child';
				pageParent = $el.val();
			}
			
			// update & fetch
			this.set('page_type', pageType).set('page_parent', pageParent).fetch();
		},
		
		onChangeFormat: function( e, $el ){
			
			// vars			
			var postFormat = $el.val();
			
			// default
			if( postFormat == '0' ) {
				postFormat = 'standard';
			}
			
			// update & fetch
			this.set('post_format', postFormat).fetch();
		},
		
		onChangeTerm: function( e, $el ){
			
			// bail early if within media popup
			if( $el.closest('.media-frame').exists() ) {
				return;
			}
			
			// set timeout to fix issue with chrome which does not register the change has yet happened
			this.setTimeout(this.syncTaxonomyTerms, 1);
		}
	});
	
})(jQuery);