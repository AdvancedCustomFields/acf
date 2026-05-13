( function ( $, undefined ) {
	const Field = acf.models.ImageField.extend( {
		type: 'file',

		$control: function () {
			return this.$( '.acf-file-uploader' );
		},

		$input: function () {
			return this.$( 'input[type="hidden"]:first' );
		},

		events: {
			'click a[data-name="add"]': 'onClickAdd',
			'click a[data-name="edit"]': 'onClickEdit',
			'click a[data-name="remove"]': 'onClickRemove',
			'change input[type="file"]': 'onChange',
			'keydown .file-wrap': 'onImageWrapKeydown',
		},

		validateAttachment: function ( attachment ) {
			// defaults
			attachment = attachment || {};

			// WP attachment
			if ( attachment.id !== undefined ) {
				attachment = attachment.attributes;
			}

			// args
			attachment = acf.parseArgs( attachment, {
				url: '',
				alt: '',
				title: '',
				filename: '',
				filesizeHumanReadable: '',
				icon: '/wp-includes/images/media/default.png',
			} );

			// return
			return attachment;
		},

		render: function ( attachment ) {
			// vars
			attachment = this.validateAttachment( attachment );

			// update image
			this.$( 'img' ).attr( {
				src: attachment.icon,
				alt: attachment.alt,
				title: attachment.title,
			} );

			// update elements
			this.$( '[data-name="title"]' ).text( attachment.title );
			this.$( '[data-name="filename"]' ).text( attachment.filename ).attr( 'href', attachment.url );
			this.$( '[data-name="filesize"]' ).text( attachment.filesizeHumanReadable );

			// vars
			const val = String( attachment.id || '' );

			// update val
			acf.val( this.$input(), val );

			// update class
			if ( val ) {
				this.$control().addClass( 'has-value' );

				// Focus the file wrapper when a file is selected for keyboard accessibility
				const $fileWrap = this.$( '.file-wrap' );
				if ( $fileWrap.length ) {
					$fileWrap.trigger( 'focus' );
				}
			} else {
				this.$control().removeClass( 'has-value' );
			}
		},

		setValue: function ( val ) {
			// Normalize to string so the no-change check below isn't fooled by
			// numeric IDs passed in from the datastore (acf.val compares with
			// strict === against $input.val(), which is always a string).
			val = val ? String( val ) : '';

			// Update the hidden input silently (no change event) to avoid
			// re-triggering the datastore sync. Bail if the value is unchanged
			// to avoid redundant fetches and renders.
			if ( acf.val( this.$input(), val, true ) === false ) {
				return;
			}

			if ( val ) {
				// Fetch attachment data and render.
				if ( window.wp && wp.media && wp.media.attachment ) {
					const attachment = wp.media.attachment( val );
					attachment.fetch().then(
						$.proxy( function () {
							this.render( attachment );
						}, this )
					);
				} else {
					this.$control().addClass( 'has-value' );
				}
			} else {
				this.render( false );
			}
		},

		selectAttachment: function () {
			// vars
			const parent = this.parent();
			const multiple = parent && parent.get( 'type' ) === 'repeater';

			// new frame
			const frame = acf.newMediaPopup( {
				mode: 'select',
				title: acf.__( 'Select File' ),
				field: this.get( 'key' ),
				multiple: multiple,
				library: this.get( 'library' ),
				allowedTypes: this.get( 'mime_types' ),
				select: $.proxy( function ( attachment, i ) {
					if ( i > 0 ) {
						this.append( attachment, parent );
					} else {
						this.render( attachment );
					}
				}, this ),
			} );
		},

		editAttachment: function ( focusTarget ) {
			// vars
			const val = this.val();

			// bail early if no val
			if ( ! val ) {
				return;
			}

			// popup
			acf.newMediaPopup( {
				mode: 'edit',
				title: acf.__( 'Edit File' ),
				button: acf.__( 'Update File' ),
				attachment: val,
				field: this.get( 'key' ),
				select: $.proxy( function ( attachment ) {
					this.render( attachment );
				}, this ),
				close: $.proxy( function () {
					// Handle all modal close events (Escape, X button, etc.)
					// Focus the appropriate element based on how the modal was opened
					if ( focusTarget === 'edit-button' ) {
						const $editButton = this.$el.find( 'a[data-name="edit"]' );
						if ( $editButton.length ) {
							$editButton.focus();
						}
					} else {
						// Default to file wrapper (for keyboard navigation)
						const $fileWrap = this.$el.find( '.file-wrap' );
						if ( $fileWrap.length ) {
							$fileWrap.focus();
						}
					}
				}, this ),
			} );
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
