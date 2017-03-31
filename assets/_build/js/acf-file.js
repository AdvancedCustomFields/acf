(function($){
	
	acf.fields.file = acf.field.extend({
		
		type: 'file',
		$el: null,
		$input: null,
		
		actions: {
			'ready':	'initialize',
			'append':	'initialize'
		},
		
		events: {
			'click a[data-name="add"]': 	'add',
			'click a[data-name="edit"]': 	'edit',
			'click a[data-name="remove"]':	'remove',
			'change input[type="file"]':	'change'
		},
		
		
		/*
		*  focus
		*
		*  This function will setup variables when focused on a field
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.acf-file-uploader');
			this.$input = this.$el.find('input[type="hidden"]');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			
		},
		
		
		/*
		*  initialize
		*
		*  This function is used to setup basic upload form attributes
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		initialize: function(){
			
			// add attribute to form
			if( this.o.uploader == 'basic' ) {
				
				this.$el.closest('form').attr('enctype', 'multipart/form-data');
				
			}
				
		},
		
		
		/*
		*  prepare
		*
		*  This function will prepare an object of attachment data
		*  selecting a library image vs embed an image via url return different data
		*  this function will keep the 2 consistent
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	attachment (object)
		*  @return	data (object)
		*/
		
		prepare: function( attachment ) {
			
			// defaults
			attachment = attachment || {};
			
			
			// bail ealry if already valid
			if( attachment._valid ) return attachment;
			
			
			// vars
			var data = {
				url: '',
				alt: '',
				title: '',
				filename: '',
				filesizeHumanReadable: '',
				icon: '/wp-includes/images/media/default.png'
			};
			
			
			// wp image
			if( attachment.id ) {
				
				// update data
				data = attachment.attributes;
				
			}
			
	    	
	    	// valid
			data._valid = true;
			
			
	    	// return
	    	return data;
			
		},
		
		
		/*
		*  render
		*
		*  This function will render the UI
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	attachment (obj)
		*  @return	n/a
		*/
		
		render: function( data ){
			
			// prepare
			data = this.prepare(data);
			
			
			// update els
		 	this.$el.find('img').attr({
			 	src: data.icon,
			 	alt: data.alt,
			 	title: data.title
			});
			this.$el.find('[data-name="title"]').text( data.title );
		 	this.$el.find('[data-name="filename"]').text( data.filename ).attr( 'href', data.url );
		 	this.$el.find('[data-name="filesize"]').text( data.filesizeHumanReadable );
		 	
		 	
			// vars
			var val = '';
			
			
			// WP attachment
			if( data.id ) {
				
				val = data.id;
			
			}
			
			
			// update val
		 	acf.val( this.$input, val );
		 	
		 	
		 	// update class
		 	if( val ) {
			 	
			 	this.$el.addClass('has-value');
			 	
		 	} else {
			 	
			 	this.$el.removeClass('has-value');
			 	
		 	}
	
		},
		
		
		/*
		*  add
		*
		*  event listener
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	e (event)
		*  @return	n/a
		*/
		
		add: function() {
			
			// reference
			var self = this,
				$field = this.$field;
			
			
			// get repeater
			var $repeater = acf.get_closest_field( $field, 'repeater' );
			
			
			// popup
			var frame = acf.media.popup({
				
				title:		acf._e('file', 'select'),
				mode:		'select',
				type:		'',
				field:		$field.data('key'),
				multiple:	$repeater.exists(),
				library:	this.o.library,
				mime_types: this.o.mime_types,
				
				select: function( attachment, i ) {
					
					// select / add another image field?
			    	if( i > 0 ) {
			    		
						// vars
						var key = $field.data('key'),
							$tr = $field.closest('.acf-row');
						
						
						// reset field
						$field = false;
							
						
						// find next image field
						$tr.nextAll('.acf-row:visible').each(function(){
							
							// get next $field
							$field = acf.get_field( key, $(this) );
							
							
							// bail early if $next was not found
							if( !$field ) return;
							
							
							// bail early if next file uploader has value
							if( $field.find('.acf-file-uploader.has-value').exists() ) {
								
								$field = false;
								return;
								
							}
								
								
							// end loop if $next is found
							return false;
							
						});
						
						
						
						// add extra row if next is not found
						if( !$field ) {
							
							$tr = acf.fields.repeater.doFocus( $repeater ).add();
							
							
							// bail early if no $tr (maximum rows hit)
							if( !$tr ) return false;
							
							
							// get next $field
							$field = acf.get_field( key, $tr );
							
						}
						
					}
					
					
					// render
					self.set('$field', $field).render( attachment );
					
				}
			});
			
		},
		
		
		/*
		*  edit
		*
		*  event listener
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	e (event)
		*  @return	n/a
		*/
		
		edit: function() {
			
			// reference
			var self = this,
				$field = this.$field;
			
			
			// vars
			var val = this.$input.val();
			
			
			// bail early if no val
			if( !val ) return;
			
			
			// popup
			var frame = acf.media.popup({
			
				title:		acf._e('file', 'edit'),
				button:		acf._e('file', 'update'),
				mode:		'edit',
				attachment:	val,
				
				select:	function( attachment, i ) {
					
					// render
					self.set('$field', $field).render( attachment );
					
				}
				
			});
			
		},
		
		
		/*
		*  remove
		*
		*  event listener
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	e (event)
		*  @return	n/a
		*/
		
		remove: function() {
			
			// vars
	    	var attachment = {};
	    	
	    	
	    	// add file to field
	        this.render( attachment );
	        
		},
		
		
		/*
		*  get_file_info
		*
		*  This function will find basic file info and store it in a hidden input
		*
		*  @type	function
		*  @date	18/1/17
		*  @since	5.5.0
		*
		*  @param	$file_input (jQuery)
		*  @param	$hidden_input (jQuery)
		*  @return	n/a
		*/
		
		get_file_info: function( $file_input, $hidden_input ){
			
			// vars
			var val = $file_input.val(),
				attachment = {};
			
			
			// bail early if no value
			if( !val ) {
				
				$hidden_input.val('');
				return;
				
			}
			
			
			// url
			attachment.url = val;
			
			
			// modern browsers
			var files = $file_input[0].files;
			
			if( files.length ){
				
				// vars
				var file = files[0];
				
				
				// update
				attachment.size = file.size;
				attachment.type = file.type;
				
				
				// image
				if( file.type.indexOf('image') > -1 ) {
					
					// vars
					var _url = window.URL || window.webkitURL;
					
					
					// temp image
					var img = new Image();
					
					img.onload = function () {
						
						// update
						attachment.width = this.width;
						attachment.height = this.height;
						
						
						// set hidden input value
						$hidden_input.val( jQuery.param(attachment) );
						
					};
					
					img.src = _url.createObjectURL(file);
					
				}
				
			}
			
			
			// set hidden input value
			$hidden_input.val( jQuery.param(attachment) );
			
		},
		
		
		/*
		*  change
		*
		*  This function will update the hidden input when selecting a basic file to add basic validation
		*
		*  @type	function
		*  @date	12/04/2016
		*  @since	5.3.8
		*
		*  @param	e (event)
		*  @return	n/a
		*/
		
		change: function( e ){
			
			this.get_file_info( e.$el, this.$input );
			
		}
		
	});
	

})(jQuery);