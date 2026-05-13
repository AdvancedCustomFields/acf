( function ( $, undefined ) {
	const Field = acf.Field.extend( {
		type: 'image',

		$control: function () {
			return this.$( '.acf-image-uploader' );
		},

		$input: function () {
			return this.$( 'input[type="hidden"]:first' );
		},

		events: {
			'click a[data-name="add"]': 'onClickAdd',
			'click a[data-name="edit"]': 'onClickEdit',
			'click a[data-name="remove"]': 'onClickRemove',
			'change input[type="file"]': 'onChange',
			'keydown .image-wrap': 'onImageWrapKeydown',
		},

		initialize: function () {
			// add attribute to form
			if ( this.get( 'uploader' ) === 'basic' ) {
				this.$el
					.closest( 'form' )
					.attr( 'enctype', 'multipart/form-data' );
			}
		},

		validateAttachment: function ( attachment ) {
			// Use WP attachment attributes when available.
			if ( attachment && attachment.attributes ) {
				attachment = attachment.attributes;
			}

			// Apply defaults.
			attachment = acf.parseArgs( attachment, {
				id: 0,
				url: '',
				alt: '',
				title: '',
				caption: '',
				description: '',
				width: 0,
				height: 0,
			} );

			// Override with "preview size".
			const size = acf.isget(
				attachment,
				'sizes',
				this.get( 'preview_size' )
			);
			if ( size ) {
				attachment.url = size.url;
				attachment.width = size.width;
				attachment.height = size.height;
			}

			// Return.
			return attachment;
		},

		render: function ( attachment ) {
			attachment = this.validateAttachment( attachment );

			// Update the hidden input silently so 3rd party plugins calling
			// render() directly still persist the value without firing a
			// change event that would re-trigger the datastore sync.
			acf.val( this.$input(), String( attachment.id || '' ), true );

			// Update DOM.
			this.$( 'img' ).attr( {
				src: attachment.url,
				alt: attachment.alt,
			} );
			if ( attachment.id ) {
				this.$control().addClass( 'has-value' );

				// Focus the image wrapper when an image is selected for keyboard accessibility
				const $imageWrap = this.$( '.image-wrap' );
				if ( $imageWrap.length ) {
					$imageWrap.trigger( 'focus' );
				}
			} else {
				this.$control().removeClass( 'has-value' );
			}
		},

		// create a new repeater row and render value
		append: function ( attachment, parent ) {
			// create function to find next available field within parent
			const getNext = function ( field, parent ) {
				// find existing file fields within parent
				const fields = acf.getFields( {
					key: field.get( 'key' ),
					parent: parent.$el,
				} );

				// find the first field with no value
				for ( let i = 0; i < fields.length; i++ ) {
					if ( ! fields[ i ].val() ) {
						return fields[ i ];
					}
				}

				// return
				return false;
			};

			// find existing file fields within parent
			let field = getNext( this, parent );

			// add new row if no available field
			if ( ! field ) {
				parent.$( '.acf-button:last' ).trigger( 'click' );
				field = getNext( this, parent );
			}

			if ( field ) {
				acf.val( field.$input(), String( attachment.id || attachment.attributes?.id || '' ) );
				field.render( attachment );
			}
		},

		selectAttachment: function () {
			// vars
			const parent = this.parent();
			const multiple = parent && parent.get( 'type' ) === 'repeater';

			// new frame
			const frame = acf.newMediaPopup( {
				mode: 'select',
				type: 'image',
				title: acf.__( 'Select Image' ),
				field: this.get( 'key' ),
				multiple: multiple,
				library: this.get( 'library' ),
				allowedTypes: this.get( 'mime_types' ),
				select: $.proxy( function ( attachment, i ) {
					if ( i > 0 ) {
						this.append( attachment, parent );
					} else {
						acf.val( this.$input(), String( attachment.id || attachment.attributes?.id || '' ) );
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
				title: acf.__( 'Edit Image' ),
				button: acf.__( 'Update Image' ),
				attachment: val,
				field: this.get( 'key' ),
				select: $.proxy( function ( attachment ) {
					acf.val( this.$input(), String( attachment.id || attachment.attributes?.id || '' ) );
					this.render( attachment );
				}, this ),
				close: $.proxy( function () {
					// Handle all modal close events (Escape, X button, etc.)
					// Focus the appropriate element based on how the modal was opened
					if ( focusTarget === 'edit-button' ) {
						const $editButton = this.$el.find( 'a[data-name="edit"]' );
						if ( $editButton.length ) {
							$editButton.trigger( 'focus' );
						}
					} else {
						// Default to image wrapper (for keyboard navigation)
						const $imageWrap = this.$el.find( '.image-wrap' );
						if ( $imageWrap.length ) {
							$imageWrap.trigger( 'focus' );
						}
					}
				}, this ),
			} );
		},

		removeAttachment: function () {
			acf.val( this.$input(), '' );
			this.render( false );
		},

		onClickAdd: function ( e, $el ) {
			this.selectAttachment();
		},

		onClickEdit: function ( e, $el ) {
			this.editAttachment( 'edit-button' );
		},

		onClickRemove: function ( e, $el ) {
			this.removeAttachment();
		},

		onChange: function ( e, $el ) {
			const $hiddenInput = this.$input();

			if ( ! $el.val() ) {
				$hiddenInput.val( '' );
			}

			acf.getFileInputData( $el, function ( data ) {
				$hiddenInput.val( $.param( data ) );
			} );
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

		onImageWrapKeydown: function ( e, $el ) {
			// Handle Enter key on image wrapper to trigger edit action
			// Only respond if the image wrapper itself is the target (not child elements like action buttons)
			if ( e.which === 13 && e.target === $el[ 0 ] ) {
				// Enter
				e.preventDefault();
				// Only trigger edit if we have a value and edit is available by checking uploader type
				if ( this.val() && this.get( 'uploader' ) !== 'basic' ) {
					this.editAttachment();
				}
			}
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
