( function ( $, undefined ) {
	const Field = acf.Field.extend( {
		type: 'icon_picker',

		wait: 'load',

		events: {
			showField: 'scrollToSelectedIcon',
			'input .acf-icon_url': 'onUrlChange',
			'click .acf-icon-picker-list-icon': 'onIconClick',
			'focus .acf-icon-picker-list-icon-radio': 'onIconRadioFocus',
			'blur .acf-icon-picker-list-icon-radio': 'onIconRadioBlur',
			'keydown .acf-icon-picker-list-icon-radio': 'onIconKeyDown',
			'input .acf-icon-list-search-input': 'onIconSearch',
			'keydown .acf-icon-list-search-input': 'onIconSearchKeyDown',
			'click .acf-icon-picker-media-library-button':
				'onMediaLibraryButtonClick',
			'click .acf-icon-picker-media-library-preview':
				'onMediaLibraryButtonClick',
		},

		$typeInput() {
			return this.$(
				'input[type="hidden"][data-hidden-type="type"]:first'
			);
		},

		$valueInput() {
			return this.$(
				'input[type="hidden"][data-hidden-type="value"]:first'
			);
		},

		$tabButton() {
			return this.$( '.acf-tab-button' );
		},

		$selectedIcon() {
			return this.$( '.acf-icon-picker-list-icon.active' );
		},

		$selectedRadio() {
			return this.$( '.acf-icon-picker-list-icon.active input' );
		},

		$iconsList() {
			return this.$( '.acf-icon-list:visible' );
		},

		$mediaLibraryButton() {
			return this.$( '.acf-icon-picker-media-library-button' );
		},

		$mediaLibraryPreviewImg() {
			return this.$( '.acf-icon-picker-media-library-preview-img img' );
		},

		getValue() {
			return {
				type: this.$typeInput().val(),
				value: this.$valueInput().val(),
			};
		},

		setValue( val ) {
			if ( ! val || typeof val !== 'object' ) {
				val = { type: '', value: '' };
			}

			const newType = val.type || '';
			const newValue = val.value || '';

			this.updateTypeAndValue( newType, newValue );

			// The type_and_value_change action handlers cover internal updates
			// (clicks, focus changes), but skip the steps below — needed when
			// a value is set from outside the field (e.g. revision restore).

			if ( newType ) {
				this.$tabButton()
					.filter( `[data-unique-tab-key="${ newType }"]` )
					.trigger( 'click' );

				const $iconList = this.$(
					`.acf-icon-list[data-parent-tab="${ newType }"]`
				);
				if ( $iconList.length ) {
					$iconList
						.find( '.acf-icon-picker-list-icon.active' )
						.removeClass( 'active' );
					$iconList.find( 'input:checked' ).prop( 'checked', false );

					const $newIcon = $iconList.find(
						`.acf-icon-picker-list-icon[data-icon="${ newValue }"]`
					);
					if ( $newIcon.length ) {
						$newIcon.addClass( 'active' );
						$newIcon.find( 'input' ).prop( 'checked', true );
						this.set( 'selectedIcon', newValue );
					}
				}
			}

			if ( newType === 'url' ) {
				this.$( '.acf-icon_url' ).val( newValue );
			}

			if (
				newType === 'media_library' &&
				newValue &&
				window.wp?.media?.attachment
			) {
				const attachment = wp.media.attachment( newValue );
				attachment.fetch().then( () => {
					const url = attachment.get( 'url' );
					if ( url ) {
						this.set( 'mediaLibraryPreviewUrl', url );
						this.$mediaLibraryPreviewImg().attr( 'src', url );
					}
				} );
			}
		},

		initialize() {
			// Set up actions hook callbacks.
			this.addActions();

			// Initialize the state of the icon picker.
			const typeAndValue = {
				type: this.$typeInput().val(),
				value: this.$valueInput().val(),
			};

			// Store the type and value object.
			this.set( 'typeAndValue', typeAndValue );

			// Preserve the media library preview URL from DOM for media_library type fields.
			if ( typeAndValue.type === 'media_library' ) {
				const $img = this.$mediaLibraryPreviewImg();
				const existingSrc = $img.attr( 'src' );

				if ( existingSrc ) {
					this.set( 'mediaLibraryPreviewUrl', existingSrc );
				}
			}

			// Any time any acf tab is clicked, we will re-scroll to the selected icon.
			this.$tabButton().on( 'click', () => {
				this.initializeIconLists( this.get( 'typeAndValue' ) );
			} );

			// Fire the action which lets people know the state has been updated.
			acf.doAction( this.get( 'name' ) + '/type_and_value_change', typeAndValue );

			this.initializeIconLists( typeAndValue );
			this.alignMediaLibraryTabToCurrentValue( typeAndValue );
		},

		addActions() {
			// Set up an action listener for when the type and value changes.
			acf.addAction(
				this.get( 'name' ) + '/type_and_value_change',
				( newTypeAndValue ) => {
					// Check if this action is for this specific instance by comparing
					// the hidden input values with the broadcasted values
					const currentType = this.$typeInput().val();
					const currentValue = this.$valueInput().val();

					// If the action matches this instance's current state, update the UI
					if ( currentType === newTypeAndValue.type && currentValue === newTypeAndValue.value ) {
						this.alignIconListTabsToCurrentValue( newTypeAndValue );
						this.alignMediaLibraryTabToCurrentValue( newTypeAndValue );
						this.alignUrlTabToCurrentValue( newTypeAndValue );
					}
					// Otherwise, restore this instance's own saved state
					else {
						const savedTypeAndValue = this.get( 'typeAndValue' );
						if ( savedTypeAndValue ) {
							this.alignIconListTabsToCurrentValue( savedTypeAndValue );
							this.alignMediaLibraryTabToCurrentValue( savedTypeAndValue );
							this.alignUrlTabToCurrentValue( savedTypeAndValue );
						}
					}
				}
			);
		},

		updateTypeAndValue( type, value ) {
			const typeAndValue = {
				type,
				value,
			};

			// Update the values in the hidden fields, which are what will actually be saved.
			acf.val( this.$typeInput(), type );
			acf.val( this.$valueInput(), value );

			// Set the state before firing the action
			this.set( 'typeAndValue', typeAndValue );

			// Fire an action to let each tab set itself according to the typeAndValue state.
			acf.doAction(
				this.get( 'name' ) + '/type_and_value_change',
				typeAndValue
			);
		},

		scrollToSelectedIcon() {
			const innerElement = this.$selectedIcon();

			// If no icon is selected, do nothing.
			if ( innerElement.length === 0 ) {
				return;
			}

			const scrollingDiv = innerElement.closest( '.acf-icon-list' );
			scrollingDiv.scrollTop( 0 );

			const distance = innerElement.position().top - 50;

			if ( distance === 0 ) {
				return;
			}

			scrollingDiv.scrollTop( distance );
		},

		initializeIconLists( typeAndValue ) {
			const $iconLists = this.$( '.acf-icon-list' );
			const self = this;

			$iconLists.each( function( list ) {
				const $iconList = $( this );
				const parentTab = $iconList.data( 'parent-tab' );
				const icons = self.getIconsList( parentTab ) || [];

				self.set( parentTab, icons );

				self.renderIconList( $iconList );

				if ( typeAndValue.type === parentTab ) {
					self.selectIcon( $iconList, typeAndValue.value, false ).then( () => {
						self.scrollToSelectedIcon();
					} );
				}
			} );
		},

		alignIconListTabsToCurrentValue( typeAndValue ) {
			const $iconLists = this.$( '.acf-icon-list' )
				.filter( function() {
					return $( this ).data( 'parent-tab' ) !== typeAndValue.type;
				}
			);

			const self = this;
			$iconLists.each( function() {
				self.unselectIcon( $( this ) );
			} );
		},

		renderIconHTML( tab, icon ) {
			const id = acf.strEscape( `${ this.get( 'name' ) }-${ icon.key }` );
			const key = acf.strEscape( icon.key );
			const label = acf.strEscape( icon.label );
			const url = acf.strEscape( icon.url );

			let classes = `dashicons ${key}`;
			let style = '';

			if ( 'dashicons' !== tab ) {
				classes = `${tab} ${key}`;
				style = `background: center / contain url( ${url} ) no-repeat;`;
			}

			return `<div class="${classes} acf-icon-picker-list-icon" role="radio" data-icon="${key}" style="${style}" title="${label}">
				<label for="${id}">${label}</label>
				<input id="${id}" type="radio" class="acf-icon-picker-list-icon-radio" name="acf-icon-picker-list-icon-radio" value="${key}">
			</div>`;
		},

		renderIconList( $iconList ) {
			// Get the icons for the current tab.
			const currentTab = $iconList.data( 'parent-tab' );
			const icons = this.get( currentTab );

			$iconList.empty();

			if ( ! icons ) {
				return;
			}

			icons.forEach( ( icon ) => {
				const html = this.renderIconHTML( currentTab, icon );
				$iconList.append( html );
			} );
		},

		getIconsList( tab ) {
			let icons;

			if ( tab === 'dashicons' ) {
				const iconPickeri10n = acf.get( 'iconPickeri10n' ) || [];

				icons = Object.entries( iconPickeri10n ).map(
					( [ key, value ] ) => {
						return {
							key,
							label: value,
						};
					}
				);
			} else {
				const $iconList = this.$( `.acf-icon-list[data-parent-tab="${ tab }"]` );

				if ( $iconList.length !== 0 ) {
					const iconsData = $iconList.data('icons');
					icons = Array.isArray(iconsData) ? iconsData : [];
				}
			}

			return icons;
		},

		getIconsBySearch( searchTerm, tab ) {
			const lowercaseSearchTerm = searchTerm.toLowerCase();
			const icons = this.getIconsList( tab );

			return icons.filter( function ( icon ) {
				const lowercaseIconLabel = icon.label.toLowerCase();
				return lowercaseIconLabel.indexOf( lowercaseSearchTerm ) > -1;
			} );
		},

		selectIcon( $iconList, icon, setFocus = true ) {
			this.set( 'selectedIcon', icon );

			// Select the new one.
			const $newIcon = $iconList.find( `.acf-icon-picker-list-icon[data-icon="${icon}"]` );
			$newIcon.addClass( 'active' );

			const $input = $newIcon.find( 'input' );
			const thePromise = $input.prop( 'checked', true ).promise();

			if ( setFocus ) {
				$input.trigger( 'focus' );
			}

			this.updateTypeAndValue( $iconList.data( 'parent-tab' ), icon );

			return thePromise;
		},

		unselectIcon( $iconList ) {
			$iconList
				.find( '.acf-icon-picker-list-icon' )
				.removeClass( 'active' );
			this.set( 'selectedIcon', false );
		},

		onIconRadioFocus( e ) {
			const icon = e.target.value;
			const $parentTab = this.$( e.target ).closest( '.acf-icon-picker-tabs' );
			const $iconList = $parentTab.find( '.acf-icon-list' );

			const $newIcon = $parentTab.find(
				'.acf-icon-picker-list-icon[data-icon="' + icon + '"]'
			);
			$newIcon.addClass( 'focus' );

			// If this is a different icon than previously selected, select it.
			if ( this.get( 'selectedIcon' ) !== icon ) {
				this.unselectIcon( $iconList );
				this.selectIcon( $iconList, icon );
			}
		},

		onIconRadioBlur( e ) {
			const icon = this.$( e.target );
			const iconParent = icon.parent();

			iconParent.removeClass( 'focus' );
		},

		onIconClick( e ) {
			e.preventDefault();

			const $iconList = this.$( e.target ).closest( '.acf-icon-list' );
			const $icon = this.$( e.target );
			const icon = $icon.find( 'input' ).val();

			const $newIcon = $iconList.find(
				'.acf-icon-picker-list-icon[data-icon="' + icon + '"]'
			);

			// By forcing focus on the input, we fire onIconRadioFocus.
			$newIcon.find( 'input' ).prop( 'checked', true ).trigger( 'focus' );
		},

		onIconSearch( e ) {
			const $parentTab = this.$( e.target ).closest( '.acf-icon-picker-tabs' );
			const $iconList = $parentTab.find( '.acf-icon-list' );
			const tabName = $parentTab.data( 'tab' );

			const searchTerm = e.target.value;
			const filteredIcons = this.getIconsBySearch( searchTerm, tabName );

			if ( filteredIcons.length > 0 || ! searchTerm ) {
				this.set( tabName, filteredIcons );
				$parentTab.find( '.acf-icon-list-empty' ).hide();
				$parentTab.find( '.acf-icon-list ' ).show();
				this.renderIconList( $iconList );

				// Announce change of data to screen readers.
				wp.a11y.speak(
					acf.get( 'iconPickerA11yStrings' )
						.newResultsFoundForSearchTerm,
					'polite'
				);
			} else {
				// Truncate the search term if it's too long.
				const visualSearchTerm =
					searchTerm.length > 30
						? searchTerm.substring( 0, 30 ) + '&hellip;'
						: searchTerm;

				$parentTab.find( '.acf-icon-list ' ).hide();
				$parentTab.find( '.acf-icon-list-empty' )
					.find( '.acf-invalid-icon-list-search-term' )
					.text( visualSearchTerm );
				$parentTab.find( '.acf-icon-list-empty' ).css( 'display', 'flex' );
				$parentTab.find( '.acf-icon-list-empty' ).show();

				// Announce change of data to screen readers.
				wp.a11y.speak(
					acf.get( 'iconPickerA11yStrings' ).noResultsForSearchTerm,
					'polite'
				);
			}
		},

		onIconSearchKeyDown( e ) {
			// Check if the pressed key is Enter (key code 13)
			if ( e.which === 13 ) {
				// Prevent submitting the entire form if someone presses enter after searching.
				e.preventDefault();
			}
		},

		onIconKeyDown( e ) {
			if ( e.which === 13 ) {
				// If someone presses enter while an icon is focused, prevent the form from submitting.
				e.preventDefault();
			}
		},

		alignMediaLibraryTabToCurrentValue( typeAndValue ) {
			const type = typeAndValue.type;
			const value = typeAndValue.value;

			if ( type !== 'media_library' && type !== 'dashicons' ) {
				// Hide the preview container on the media library tab.
				this.$( '.acf-icon-picker-media-library-preview' ).hide();
			}

			if ( type === 'media_library' ) {
				let previewUrl = this.get( 'mediaLibraryPreviewUrl' );

				if ( ! previewUrl ) {
					previewUrl = this.$mediaLibraryPreviewImg().attr( 'src' );
					if ( previewUrl ) {
						this.set( 'mediaLibraryPreviewUrl', previewUrl );
					}
				}

				if ( previewUrl ) {
					// Set the image file preview src.
					this.$mediaLibraryPreviewImg().attr(
						'src',
						previewUrl
					);
				}

				// Hide the dashicon preview.
				this.$(
					'.acf-icon-picker-media-library-preview-dashicon'
				).hide();

				// Show the image file preview.
				this.$( '.acf-icon-picker-media-library-preview-img' ).show();

				// Show the preview container (it may have been hidden if nothing was ever selected yet).
				this.$( '.acf-icon-picker-media-library-preview' ).show();
			}

			if ( type === 'dashicons' ) {
				// Set the dashicon preview class.
				this.$(
					'.acf-icon-picker-media-library-preview-dashicon .dashicons'
				).attr( 'class', 'dashicons ' + value );

				// Hide the image file preview.
				this.$( '.acf-icon-picker-media-library-preview-img' ).hide();

				// Show the dashicon preview.
				this.$(
					'.acf-icon-picker-media-library-preview-dashicon'
				).show();

				// Show the preview container (it may have been hidden if nothing was ever selected yet).
				this.$( '.acf-icon-picker-media-library-preview' ).show();
			}
		},

		async onMediaLibraryButtonClick( e ) {
			e.preventDefault();

			await this.selectAndReturnAttachment().then( ( attachment ) => {
				// When an attachment is selected, update the preview and the hidden fields.
				this.set( 'mediaLibraryPreviewUrl', attachment.attributes.url );
				this.updateTypeAndValue( 'media_library', attachment.id );
			} );
		},

		selectAndReturnAttachment() {
			return new Promise( ( resolve ) => {
				acf.newMediaPopup( {
					mode: 'select',
					type: 'image',
					title: acf.__( 'Select Image' ),
					field: this.get( 'key' ),
					multiple: false,
					library: 'all',
					allowedTypes: 'image',
					select: resolve,
				} );
			} );
		},

		alignUrlTabToCurrentValue( typeAndValue ) {
			if ( typeAndValue.type !== 'url' ) {
				this.$( '.acf-icon_url' ).val( '' );
			}
		},

		onUrlChange( event ) {
			const currentValue = event.target.value;
			this.updateTypeAndValue( 'url', currentValue );
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
