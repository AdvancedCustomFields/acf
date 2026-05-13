/**
 * Extends acf.models.Modal to create the field browser.
 *
 * @package Advanced Custom Fields
 */

( function ( $, undefined, acf ) {
	const browseFieldsModal = {
		data: {
			openedBy: null,
			currentFieldType: null,
			popularFieldTypes: [
				'text',
				'textarea',
				'email',
				'url',
				'file',
				'gallery',
				'select',
				'true_false',
				'link',
				'post_object',
				'relationship',
				'repeater',
				'flexible_content',
				'clone',
			],
		},

		events: {
			'click .acf-modal-close': 'onClickClose',
			'keydown .acf-browse-fields-modal': 'onPressEscapeClose',
			'click .acf-select-field': 'onClickSelectField',
			'click .acf-field-type': 'onClickFieldType',
			'changed:currentFieldType': 'onChangeFieldType',
			'input .acf-search-field-types': 'onSearchFieldTypes',
			'click .acf-browse-popular-fields': 'onClickBrowsePopular',
		},

		setup: function ( props ) {
			$.extend( this.data, props );
			this.$el = $( this.tmpl() );
			this.render();
		},

		initialize: function () {
			this.open();
			this.lockFocusToModal( true );
			this.$el.find( '.acf-modal-title' ).trigger( 'focus' );
			acf.doAction( 'show', this.$el );
		},

		tmpl: function () {
			return $( '#tmpl-acf-browse-fields-modal' ).html();
		},

		getFieldTypes: function ( category, search ) {
			let fieldTypes;
			if ( ! acf.get( 'is_pro' ) ) {
				// Add in the pro fields.
				fieldTypes = Object.values( {
					...acf.get( 'fieldTypes' ),
					...acf.get( 'PROFieldTypes' ),
				} );
			} else {
				fieldTypes = Object.values( acf.get( 'fieldTypes' ) );
			}

			if ( category ) {
				if ( 'popular' === category ) {
					return fieldTypes.filter( ( fieldType ) =>
						this.get( 'popularFieldTypes' ).includes(
							fieldType.name
						)
					);
				}

				if ( 'pro' === category ) {
					return fieldTypes.filter( ( fieldType ) => fieldType.pro );
				}

				fieldTypes = fieldTypes.filter(
					( fieldType ) => fieldType.category === category
				);
			}

			if ( search ) {
				fieldTypes = fieldTypes.filter( ( fieldType ) => {
					const label = fieldType.label.toLowerCase();
					const labelParts = label.split( ' ' );
					let match = false;

					if ( label.startsWith( search.toLowerCase() ) ) {
						match = true;
					} else if ( labelParts.length > 1 ) {
						labelParts.forEach( ( part ) => {
							if ( part.startsWith( search.toLowerCase() ) ) {
								match = true;
							}
						} );
					}

					return match;
				} );
			}

			return fieldTypes;
		},

		render: function () {
			acf.doAction( 'append', this.$el );

			const $tabs = this.$el.find( '.acf-field-types-tab' );
			const self = this;

			$tabs.each( function () {
				const category = $( this ).data( 'category' );
				const fieldTypes = self.getFieldTypes( category );
				fieldTypes.forEach( ( fieldType ) => {
					$( this ).append( self.getFieldTypeHTML( fieldType ) );
				} );
			} );

			this.initializeFieldLabel();
			this.initializeFieldType();
			this.onChangeFieldType();
		},

		getFieldTypeHTML: function ( fieldType ) {
			const iconName = fieldType.name.replaceAll( '_', '-' );

			return `
			<a href="#" class="acf-field-type" data-field-type="${ fieldType.name }">
				${
					fieldType.pro && ! acf.get( 'is_pro' )
						? '<span class="field-type-requires-pro not-pro"></span>'
						: fieldType.pro
						? '<span class="field-type-requires-pro"></span>'
						: ''
				}
				<i class="field-type-icon field-type-icon-${ iconName }"></i>
				<span class="field-type-label">${ fieldType.label }</span>
			</a>
			`;
		},

		decodeFieldTypeURL: function ( url ) {
			if ( typeof url != 'string' ) return url;
			return url.replaceAll( '&#038;', '&' );
		},

		renderFieldTypeDesc: function ( fieldType ) {
			const fieldTypeInfo =
				this.getFieldTypes().filter(
					( fieldTypeFilter ) => fieldTypeFilter.name === fieldType
				)[ 0 ] || {};

			const args = acf.parseArgs( fieldTypeInfo, {
				label: '',
				description: '',
				doc_url: false,
				tutorial_url: false,
				preview_image: false,
				pro: false,
			} );

			this.$el.find( '.field-type-name' ).text( args.label );
			this.$el.find( '.field-type-desc' ).text( args.description );

			if ( args.doc_url ) {
				this.$el
					.find( '.field-type-doc' )
					.attr( 'href', this.decodeFieldTypeURL( args.doc_url ) )
					.show();
			} else {
				this.$el.find( '.field-type-doc' ).hide();
			}

			if ( args.tutorial_url ) {
				this.$el
					.find( '.field-type-tutorial' )
					.attr(
						'href',
						this.decodeFieldTypeURL( args.tutorial_url )
					)
					.parent()
					.show();
			} else {
				this.$el.find( '.field-type-tutorial' ).parent().hide();
			}

			if ( args.preview_image ) {
				this.$el
					.find( '.field-type-image' )
					.attr( 'src', args.preview_image )
					.show();
			} else {
				this.$el.find( '.field-type-image' ).hide();
			}

			const isPro = acf.get( 'is_pro' );
			const isActive = acf.get( 'isLicenseActive' );
			const $upgateToProButton = this.$el.find( '.acf-btn-pro' );
			const $upgradeToUnlockButton = this.$el.find(
				'.field-type-upgrade-to-unlock'
			);

			if ( args.pro && ( ! isPro || ! isActive ) ) {
				$upgateToProButton.show();
				$upgateToProButton.attr(
					'href',
					$upgateToProButton.data( 'urlBase' ) + fieldType
				);

				$upgradeToUnlockButton.show();
				$upgradeToUnlockButton.attr(
					'href',
					$upgradeToUnlockButton.data( 'urlBase' ) + fieldType
				);
				this.$el
					.find( '.acf-insert-field-label' )
					.attr( 'disabled', true );
				this.$el.find( '.acf-select-field' ).hide();
			} else {
				$upgateToProButton.hide();
				$upgradeToUnlockButton.hide();
				this.$el
					.find( '.acf-insert-field-label' )
					.attr( 'disabled', false );
				this.$el.find( '.acf-select-field' ).show();
			}
		},

		initializeFieldType: function () {
			const fieldObject = this.get( 'openedBy' );
			const fieldType = fieldObject?.data?.type;

			// Select default field type
			if ( fieldType ) {
				this.set( 'currentFieldType', fieldType );
			} else {
				this.set( 'currentFieldType', 'text' );
			}

			// Select first tab with selected field type
			// If type selected is wthin Popular, select Popular Tab
			// Else select first tab the type belongs
			const fieldTypes = this.getFieldTypes();
			const isFieldTypePopular =
				this.get( 'popularFieldTypes' ).includes( fieldType );

			let category = '';
			if ( isFieldTypePopular ) {
				category = 'popular';
			} else {
				const selectedFieldType = fieldTypes.find( ( x ) => {
					return x.name === fieldType;
				} );

				category = selectedFieldType.category;
			}

			const uppercaseCategory =
				category[ 0 ].toUpperCase() + category.slice( 1 );
			const searchTabElement = `.acf-modal-content .acf-tab-wrap a:contains('${ uppercaseCategory }')`;
			setTimeout( () => {
				$( searchTabElement ).click();
			}, 0 );
		},

		initializeFieldLabel: function () {
			const fieldObject = this.get( 'openedBy' );
			const labelText = fieldObject.$fieldLabel().val();
			const $fieldLabel = this.$el.find( '.acf-insert-field-label' );
			if ( labelText ) {
				$fieldLabel.val( labelText );
			} else {
				$fieldLabel.val( '' );
			}
		},

		updateFieldObjectFieldLabel: function () {
			const label = this.$el.find( '.acf-insert-field-label' ).val();
			const fieldObject = this.get( 'openedBy' );
			fieldObject.$fieldLabel().val( label );
			fieldObject.$fieldLabel().trigger( 'blur' );
		},

		onChangeFieldType: function () {
			const fieldType = this.get( 'currentFieldType' );

			this.$el.find( '.selected' ).removeClass( 'selected' );
			this.$el
				.find( '.acf-field-type[data-field-type="' + fieldType + '"]' )
				.addClass( 'selected' );

			this.renderFieldTypeDesc( fieldType );
		},

		onSearchFieldTypes: function ( e ) {
			const $modal = this.$el.find( '.acf-browse-fields-modal' );
			const inputVal = this.$el.find( '.acf-search-field-types' ).val();
			const self = this;
			let searchString,
				resultsHtml = '';
			let matches = [];

			if ( 'string' === typeof inputVal ) {
				searchString = inputVal.trim();
				matches = this.getFieldTypes( false, searchString );
			}

			if ( searchString.length && matches.length ) {
				$modal.addClass( 'is-searching' );
			} else {
				$modal.removeClass( 'is-searching' );
			}

			if ( ! matches.length ) {
				$modal.addClass( 'no-results-found' );
				this.$el
					.find( '.acf-invalid-search-term' )
					.text( searchString );
				return;
			} else {
				$modal.removeClass( 'no-results-found' );
			}

			matches.forEach( ( fieldType ) => {
				resultsHtml = resultsHtml + self.getFieldTypeHTML( fieldType );
			} );

			$( '.acf-field-type-search-results' ).html( resultsHtml );

			this.set( 'currentFieldType', matches[ 0 ].name );
			this.onChangeFieldType();
		},

		onClickBrowsePopular: function () {
			this.$el
				.find( '.acf-search-field-types' )
				.val( '' )
				.trigger( 'input' );
			this.$el.find( '.acf-tab-wrap a' ).first().trigger( 'click' );
		},

		onClickSelectField: function ( e ) {
			const fieldObject = this.get( 'openedBy' );

			fieldObject
				.$fieldTypeSelect()
				.val( this.get( 'currentFieldType' ) );
			fieldObject.$fieldTypeSelect().trigger( 'change' );

			this.updateFieldObjectFieldLabel();

			this.close();
		},

		onClickFieldType: function ( e ) {
			const $fieldType = $( e.currentTarget );
			this.set( 'currentFieldType', $fieldType.data( 'field-type' ) );
		},

		onClickClose: function () {
			this.close();
		},

		onPressEscapeClose: function ( e ) {
			if ( e.key === 'Escape' ) {
				this.close();
			}
		},

		close: function () {
			this.lockFocusToModal( false );
			this.returnFocusToOrigin();
			this.remove();
		},

		focus: function () {
			this.$el.find( 'button' ).first().trigger( 'focus' );
		},
	};

	acf.models.browseFieldsModal = acf.models.Modal.extend( browseFieldsModal );
	acf.newBrowseFieldsModal = ( props ) =>
		new acf.models.browseFieldsModal( props );
} )( window.jQuery, undefined, window.acf );
