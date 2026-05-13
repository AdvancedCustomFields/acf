( function ( $, undefined ) {
	/**
	 *  fieldGroupManager
	 *
	 *  Generic field group functionality
	 *
	 *  @date	15/12/17
	 *  @since	5.7.0
	 *
	 *  @param	void
	 *  @return	void
	 */

	var fieldGroupManager = new acf.Model( {
		id: 'fieldGroupManager',

		events: {
			'submit #post': 'onSubmit',
			'click a[href="#"]': 'onClick',
			'click .acf-delete-field-group': 'onClickDeleteFieldGroup',
			'blur input#title': 'validateTitle',
			'input input#title': 'validateTitle',
		},

		filters: {
			find_fields_args: 'filterFindFieldArgs',
			find_fields_selector: 'filterFindFieldsSelector',
		},

		initialize: function () {
			acf.addAction( 'prepare', this.maybeInitNewFieldGroup );
			acf.add_filter( 'select2_args', this.setBidirectionalSelect2Args );
			acf.add_filter( 'select2_ajax_data', this.setBidirectionalSelect2AjaxDataArgs );
		},

		setBidirectionalSelect2Args: function ( args, $select, settings, field, instance ) {
			if ( field?.data?.( 'key' ) !== 'bidirectional_target' ) return args;

			args.dropdownCssClass = 'field-type-select-results';

			// Check for a full modern version of select2 like the one provided by ACF.
			try {
				$.fn.select2.amd.require( 'select2/compat/dropdownCss' );
			} catch ( err ) {
				console.warn(
					'ACF was not able to load the full version of select2 due to a conflicting version provided by another plugin or theme taking precedence. Skipping styling of bidirectional settings.'
				);
				delete args.dropdownCssClass;
			}

			args.templateResult = function ( selection ) {
				if ( 'undefined' !== typeof selection.element ) {
					return selection;
				}

				if ( selection.children ) {
					return selection.text;
				}

				if ( selection.loading || ( selection.element && selection.element.nodeName === 'OPTGROUP' ) ) {
					var $selection = $( '<span class="acf-selection"></span>' );
					$selection.html( acf.strEscape( selection.text ) );
					return $selection;
				}

				if (
					'undefined' === typeof selection.human_field_type ||
					'undefined' === typeof selection.field_type ||
					'undefined' === typeof selection.this_field
				) {
					return selection.text;
				}

				var $selection = $(
					'<i title="' +
						acf.escAttr( selection.human_field_type ) +
						'" class="field-type-icon field-type-icon-' +
						acf.strEscape( selection.field_type.replaceAll( '_', '-' ) ) +
						'"></i><span class="acf-selection has-icon">' +
						acf.strEscape( selection.text ) +
						'</span>'
				);
				if ( selection.this_field ) {
					$selection
						.last()
						.append( '<span class="acf-select2-default-pill">' + acf.__( 'This Field' ) + '</span>' );
				}
				$selection.data( 'element', selection.element );
				return $selection;
			};

			return args;
		},

		setBidirectionalSelect2AjaxDataArgs: function ( data, args, $input, field, instance ) {
			if ( data.field_key !== 'bidirectional_target' ) return data;

			const $fieldObject = acf.findFieldObjects( { child: field } );
			const fieldObject = acf.getFieldObject( $fieldObject );
			data.field_key = '_acf_bidirectional_target';
			data.parent_key = fieldObject.get( 'key' );
			data.field_type = fieldObject.get( 'type' );

			// This might not be needed, but I wanted to figure out how to get a field setting in the JS API when the key isn't unique.
			data.post_type = acf.getField( acf.findFields( { parent: $fieldObject, key: 'post_type' } ) ).val();

			return data;
		},

		maybeInitNewFieldGroup: function () {
			let $field_list_wrapper = $(
				'#acf-field-group-fields > .inside > .acf-field-list-wrap.acf-auto-add-field'
			);

			if ( $field_list_wrapper.length ) {
				$( '.acf-headerbar-actions .add-field' ).trigger( 'click' );
				$( '.acf-title-wrap #title' ).trigger( 'focus' );
			}
		},

		onSubmit: function ( e, $el ) {
			// vars
			var $title = $( '.acf-title-wrap #title' );

			// empty
			if ( ! $title.val() ) {
				// prevent default
				e.preventDefault();

				// unlock form
				acf.unlockForm( $el );

				// focus
				$title.trigger( 'focus' );
			}
		},

		onClick: function ( e ) {
			e.preventDefault();
		},

		onClickDeleteFieldGroup: function ( e, $el ) {
			e.preventDefault();
			$el.addClass( '-hover' );

			// Add confirmation tooltip.
			acf.newTooltip( {
				confirm: true,
				target: $el,
				context: this,
				text: acf.__( 'Move field group to trash?' ),
				confirm: function () {
					window.location.href = $el.attr( 'href' );
				},
				cancel: function () {
					$el.removeClass( '-hover' );
				},
			} );
		},

		validateTitle: function ( e, $el ) {
			let $submitButton = $( '.acf-publish' );

			if ( ! $el.val() ) {
				$el.addClass( 'acf-input-error' );
				$submitButton.addClass( 'disabled' );
				$( '.acf-publish' ).addClass( 'disabled' );
			} else {
				$el.removeClass( 'acf-input-error' );
				$submitButton.removeClass( 'disabled' );
				$( '.acf-publish' ).removeClass( 'disabled' );
			}
		},

		filterFindFieldArgs: function ( args ) {
			args.visible = true;

			if (
				args.parent &&
				( args.parent.hasClass( 'acf-field-object' ) ||
					args.parent.hasClass( 'acf-browse-fields-modal-wrap' ) ||
					args.parent.parents( '.acf-field-object' ).length )
			) {
				args.visible = false;
				args.excludeSubFields = true;
			}

			// If the field has any open subfields, don't exclude subfields as they're already being displayed.
			if ( args.parent && args.parent.find( '.acf-field-object.open' ).length ) {
				args.excludeSubFields = false;
			}

			return args;
		},

		filterFindFieldsSelector: function ( selector ) {
			return selector + ', .acf-field-acf-field-group-settings-tabs';
		},
	} );

	/**
	 *  screenOptionsManager
	 *
	 *  Screen options functionality
	 *
	 *  @date	15/12/17
	 *  @since	5.7.0
	 *
	 *  @param	void
	 *  @return	void
	 */

	var screenOptionsManager = new acf.Model( {
		id: 'screenOptionsManager',
		wait: 'prepare',

		events: {
			'change #acf-field-key-hide': 'onFieldKeysChange',
			'change #acf-field-settings-tabs': 'onFieldSettingsTabsChange',
			'change [name="screen_columns"]': 'render',
		},

		initialize: function () {
			// vars
			var $div = $( '#adv-settings' );
			var $append = $( '#acf-append-show-on-screen' );

			// append
			$div.find( '.metabox-prefs' ).append( $append.html() );
			$div.find( '.metabox-prefs br' ).remove();

			// clean up
			$append.remove();

			// initialize
			this.$el = $( '#screen-options-wrap' );

			// render
			this.render();
		},

		isFieldKeysChecked: function () {
			return this.$el.find( '#acf-field-key-hide' ).prop( 'checked' );
		},

		isFieldSettingsTabsChecked: function () {
			const $input = this.$el.find( '#acf-field-settings-tabs' );

			// Screen option is hidden by filter.
			if ( ! $input.length ) {
				return false;
			}

			return $input.prop( 'checked' );
		},

		getSelectedColumnCount: function () {
			return this.$el.find( 'input[name="screen_columns"]:checked' ).val();
		},

		onFieldKeysChange: function ( e, $el ) {
			var val = this.isFieldKeysChecked() ? 1 : 0;
			acf.updateUserSetting( 'show_field_keys', val );
			this.render();
		},

		onFieldSettingsTabsChange: function () {
			const val = this.isFieldSettingsTabsChecked() ? 1 : 0;
			acf.updateUserSetting( 'show_field_settings_tabs', val );
			this.render();
		},

		render: function () {
			if ( this.isFieldKeysChecked() ) {
				$( '#acf-field-group-fields' ).addClass( 'show-field-keys' );
			} else {
				$( '#acf-field-group-fields' ).removeClass( 'show-field-keys' );
			}

			if ( ! this.isFieldSettingsTabsChecked() ) {
				$( '#acf-field-group-fields' ).addClass( 'hide-tabs' );
				$( '.acf-field-settings-main' ).removeClass( 'acf-hidden' ).prop( 'hidden', false );
			} else {
				$( '#acf-field-group-fields' ).removeClass( 'hide-tabs' );

				$( '.acf-field-object' ).each( function () {
					const tabFields = acf.getFields( {
						type: 'tab',
						parent: $( this ),
						excludeSubFields: true,
						limit: 1,
					} );

					if ( tabFields.length ) {
						tabFields[ 0 ].tabs.set( 'initialized', false );
					}

					acf.doAction( 'show', $( this ) );
				} );
			}

			if ( this.getSelectedColumnCount() == 1 ) {
				$( 'body' ).removeClass( 'columns-2' );
				$( 'body' ).addClass( 'columns-1' );
			} else {
				$( 'body' ).removeClass( 'columns-1' );
				$( 'body' ).addClass( 'columns-2' );
			}
		},
	} );

	/**
	 *  appendFieldManager
	 *
	 *  Appends fields together
	 *
	 *  @date	15/12/17
	 *  @since	5.7.0
	 *
	 *  @param	void
	 *  @return	void
	 */

	var appendFieldManager = new acf.Model( {
		actions: {
			new_field: 'onNewField',
		},

		onNewField: function ( field ) {
			// bail early if not append
			if ( ! field.has( 'append' ) ) return;

			// vars
			var append = field.get( 'append' );
			var $sibling = field.$el.siblings( '[data-name="' + append + '"]' ).first();

			// bail early if no sibling
			if ( ! $sibling.length ) return;

			// ul
			var $div = $sibling.children( '.acf-input' );
			var $ul = $div.children( 'ul' );

			// create ul
			if ( ! $ul.length ) {
				$div.wrapInner( '<ul class="acf-hl"><li></li></ul>' );
				$ul = $div.children( 'ul' );
			}

			// li
			var html = field.$( '.acf-input' ).html();
			var $li = $( '<li>' + html + '</li>' );
			$ul.append( $li );
			$ul.attr( 'data-cols', $ul.children().length );

			// clean up
			field.remove();
		},
	} );
} )( jQuery );
