(function($, undefined){
	
	var Field = acf.models.ImageField.extend({
		
		type: 'file',
		
		$control: function(){
			return this.$('.acf-file-uploader');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		validateAttachment: function( attachment ){
			
			// defaults
			attachment = attachment || {};
			
			// WP attachment
			if( attachment.id !== undefined ) {
				attachment = attachment.attributes;
			}
			
			// args
			attachment = acf.parseArgs(attachment, {
				url: '',
				alt: '',
				title: '',
				filename: '',
				filesizeHumanReadable: '',
				icon: '/wp-includes/images/media/default.png'
			});
						
			// return
			return attachment;
		},
		
		render: function( attachment ){
			
			// vars
			attachment = this.validateAttachment( attachment );
			
			// update image
		 	this.$('img').attr({
			 	src: attachment.icon,
			 	alt: attachment.alt,
			 	title: attachment.title
		 	});
		 	
		 	// update elements
		 	this.$('[data-name="title"]').text( attachment.title );
		 	this.$('[data-name="filename"]').text( attachment.filename ).attr( 'href', attachment.url );
		 	this.$('[data-name="filesize"]').text( attachment.filesizeHumanReadable );
		 	
			// vars
			var val = attachment.id || '';
						
			// update val
		 	acf.val( this.$input(), val );
		 	
		 	// update class
		 	if( val ) {
			 	this.$control().addClass('has-value');
		 	} else {
			 	this.$control().removeClass('has-value');
		 	}
		},
		
		selectAttachment: function(){
			
			// vars
			var parent = this.parent();
			var multiple = (parent && parent.get('type') === 'repeater');
			
			// new frame
			var frame = acf.newMediaPopup({
				mode:			'select',
				title:			acf.__('Select File'),
				field:			this.get('key'),
				multiple:		multiple,
				library:		this.get('library'),
				allowedTypes:	this.get('mime_types'),
				select:			$.proxy(function( attachment, i ) {
					if( i > 0 ) {
						this.append( attachment, parent );
					} else {
						this.render( attachment );
					}
				}, this)
			});
		},
		
		editAttachment: function(){
			
			// vars
			var val = this.val();
			
			// bail early if no val
			if( !val ) {
				return false;
			}
			
			// popup
			var frame = acf.newMediaPopup({
				mode:		'edit',
				title:		acf.__('Edit File'),
				button:		acf.__('Update File'),
				attachment:	val,
				field:		this.get('key'),
				select:		$.proxy(function( attachment, i ) {
					this.render( attachment );
				}, this)
			});
		}
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);