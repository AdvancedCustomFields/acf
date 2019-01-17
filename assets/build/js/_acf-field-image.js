(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'image',
		
		$control: function(){
			return this.$('.acf-image-uploader');
		},
		
		$input: function(){
			return this.$('input[type="hidden"]');
		},
		
		events: {
			'click a[data-name="add"]': 	'onClickAdd',
			'click a[data-name="edit"]': 	'onClickEdit',
			'click a[data-name="remove"]':	'onClickRemove',
			'change input[type="file"]':	'onChange'
		},
		
		initialize: function(){
			
			// add attribute to form
			if( this.get('uploader') === 'basic' ) {
				this.$el.closest('form').attr('enctype', 'multipart/form-data');
			}
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
				caption: '',
				description: '',
				width: 0,
				height: 0
			});
			
			// preview size
			var url = acf.isget(attachment, 'sizes', this.get('preview_size'), 'url');
			if( url !== null ) {
				attachment.url = url;
			}
			
			// return
			return attachment;
		},
		
		render: function( attachment ){
			
			// vars
			attachment = this.validateAttachment( attachment );
			
			// update image
		 	this.$('img').attr({
			 	src: attachment.url,
			 	alt: attachment.alt,
			 	title: attachment.title
		 	});
		 	
			// vars
			var val = attachment.id || '';
						
			// update val
			this.val( val );
		 	
		 	// update class
		 	if( val ) {
			 	this.$control().addClass('has-value');
		 	} else {
			 	this.$control().removeClass('has-value');
		 	}
		},
		
		// create a new repeater row and render value
		append: function( attachment, parent ){
			
			// create function to find next available field within parent
			var getNext = function( field, parent ){
				
				// find existing file fields within parent
				var fields = acf.getFields({
					key: 	field.get('key'),
					parent: parent.$el
				});
				
				// find the first field with no value
				for( var i = 0; i < fields.length; i++ ) {
					if( !fields[i].val() ) {
						return fields[i];
					}
				}
								
				// return
				return false;
			}
			
			// find existing file fields within parent
			var field = getNext( this, parent );
			
			// add new row if no available field
			if( !field ) {
				parent.$('.acf-button:last').trigger('click');
				field = getNext( this, parent );
			}
					
			// render
			if( field ) {
				field.render( attachment );
			}
		},
		
		selectAttachment: function(){
			
			// vars
			var parent = this.parent();
			var multiple = (parent && parent.get('type') === 'repeater');
			
			// new frame
			var frame = acf.newMediaPopup({
				mode:			'select',
				type:			'image',
				title:			acf.__('Select Image'),
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
			if( !val ) return;
			
			// popup
			var frame = acf.newMediaPopup({
				mode:		'edit',
				title:		acf.__('Edit Image'),
				button:		acf.__('Update Image'),
				attachment:	val,
				field:		this.get('key'),
				select:		$.proxy(function( attachment, i ) {
					this.render( attachment );
				}, this)
			});
		},
		
		removeAttachment: function(){
	        this.render( false );
		},
		
		onClickAdd: function( e, $el ){
			this.selectAttachment();
		},
		
		onClickEdit: function( e, $el ){
			this.editAttachment();
		},
		
		onClickRemove: function( e, $el ){
			this.removeAttachment();
		},
		
		onChange: function( e, $el ){
			var $hiddenInput = this.$input();
			
			acf.getFileInputData($el, function( data ){
				$hiddenInput.val( $.param(data) );
			});
		}
	});
	
	acf.registerFieldType( Field );

})(jQuery);