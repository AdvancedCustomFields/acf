(function($){
	
	acf.ajax = acf.model.extend({
		
		active: false,
		actions: {
			'ready': 'ready'
		},
		events: {
			'change #page_template':								'_change_template',
			'change #parent_id':									'_change_parent',
			'change #post-formats-select input':					'_change_format',
			'change .categorychecklist input':						'_change_term',
			'change .categorychecklist select':						'_change_term',
			'change .acf-taxonomy-field[data-save="1"] input':		'_change_term',
			'change .acf-taxonomy-field[data-save="1"] select':		'_change_term'
		},
		o: {
			//'post_id':		0,
			//'page_template':	0,
			//'page_parent':	0,
			//'page_type':		0,
			//'post_format':	0,
			//'post_taxonomy':	0
		},
		xhr: null,
		
		update: function( k, v ){
			
			this.o[ k ] = v;
			
			return this;
			
		},
		
		get: function( k ){
			
			return this.o[ k ] || null;
			
		},
		
		ready: function(){
			
			// update post_id
			this.update('post_id', acf.get('post_id'));
			
			
			// active
			this.active = true;
			
		},
		
/*
		timeout: null,
		maybe_fetch: function(){
			
			// reference
			var self = this;
			
			
			// abort timeout
			if( this.timeout ) {
				
				clearTimeout( this.timeout );
				
			}
			
			
		    // fetch
		    this.timeout = setTimeout(function(){
			    
			    self.fetch();
			    
		    }, 100);
		    
		},
*/
		
		fetch: function(){
			
			// bail early if not active
			if( !this.active ) return;
			
			// bail early if not for post
			if( acf.get('screen') !== 'post' ) return;
			
			// bail early if no ajax
			if( !acf.get('ajax') ) return;
			
			
			// abort XHR if is already loading AJAX data
			if( this.xhr ) {
			
				this.xhr.abort();
				
			}
			
			
			// vars
			var self = this,
				data = this.o;
			
			
			// add action url
			data.action = 'acf/post/get_field_groups';
			
			
			// add ignore
			data.exists = [];
			
			$('.acf-postbox').not('.acf-hidden').each(function(){
				
				data.exists.push( $(this).attr('id').substr(4) );
				
			});
			
			
			// ajax
			this.xhr = $.ajax({
				url:		acf.get('ajaxurl'),
				data:		acf.prepare_for_ajax( data ),
				type:		'post',
				dataType:	'json',
				
				success: function( json ){
					
					if( acf.is_ajax_success( json ) ) {
						
						self.render( json.data );
						
					}
					
				}
			});
			
		},
		
		render: function( json ){
			
			// hide
			$('.acf-postbox').addClass('acf-hidden');
			$('.acf-postbox-toggle').addClass('acf-hidden');
			
			
			// reset style
			$('#acf-style').html('');
			
			
			// show the new postboxes
			$.each(json, function( k, field_group ){
				
				// vars
				var $postbox = $('#acf-' + field_group.key),
					$toggle = $('#acf-' + field_group.key + '-hide'),
					$label = $toggle.parent();
					
				
				// show
				// use show() to force display when postbox has been hidden by 'Show on screen' toggle
				$postbox.removeClass('acf-hidden hide-if-js').show();
				$label.removeClass('acf-hidden hide-if-js').show();
				$toggle.prop('checked', true);
				
				
				// replace HTML if needed
				var $replace = $postbox.find('.acf-replace-with-fields');
				
				if( $replace.exists() ) {
					
					$replace.replaceWith( field_group.html );
					
					acf.do_action('append', $postbox);
					
				}
				
				
				// update style if needed
				if( k === 0 ) {
					
					$('#acf-style').html( field_group.style );
					
				}
				
				
				// enable inputs
				$postbox.find('.acf-hidden-by-postbox').prop('disabled', false);
				
			});
			
			
			// disable inputs
			$('.acf-postbox.acf-hidden').find('select, textarea, input').not(':disabled').each(function(){
				
				$(this).addClass('acf-hidden-by-postbox').prop('disabled', true);
				
			});
			
		},
		
		sync_taxonomy_terms: function(){
			
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
			values = values.filter (function (v, i, a) { return a.indexOf (v) == i });
			
			
			// update screen
			this.update( 'post_taxonomy', values ).fetch();
			
		},
		
		
		/*
		*  events
		*
		*  description
		*
		*  @type	function
		*  @date	29/09/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		_change_template: function( e ){
			
			// vars
			var page_template = e.$el.val();
			
			
			// update & fetch
			this.update('page_template', page_template).fetch();
			
		},
		
		_change_parent: function( e ){
			
			// vars
			var page_type = 'parent',
				page_parent = 0;
			
			
			// if is child
			if( e.$el.val() != "" ) {
			
				page_type = 'child';
				page_parent = e.$el.val();
				
			}
			
			// update & fetch
			this.update('page_type', page_type).update('page_parent', page_parent).fetch();
			
		},
		
		_change_format: function( e ){
			
			// vars			
			var post_format = e.$el.val();
			
			
			// default
			if( post_format == '0' ) {
				
				post_format = 'standard';
				
			}
			
			
			// update & fetch
			this.update('post_format', post_format).fetch();
			
		},
		
		_change_term: function( e ){
			
			// reference
			var self = this;
			
			
			// bail early if within media popup
			if( e.$el.closest('.media-frame').exists() ) {
				
				return;
			
			}
			
			
			// set timeout to fix issue with chrome which does not register the change has yet happened
			setTimeout(function(){
				
				self.sync_taxonomy_terms();
			
			}, 1);
			
			
		}
		
	});

	
})(jQuery);