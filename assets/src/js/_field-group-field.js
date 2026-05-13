( function ( $, undefined ) {
	acf.FieldObject = acf.Model.extend( {
		// class used to avoid nested event triggers
		eventScope: '.acf-field-object',

		// variable for field type select2
		fieldTypeSelect2: false,

		// events
		events: {
			'click .copyable': 'onClickCopy',
			'click .handle': 'onClickEdit',
			'click .close-field': 'onClickEdit',
			'click a[data-key="acf_field_settings_tabs"]': 'onChangeSettingsTab',
			'click .close-add-field': 'onClickCloseAddBelow',
			'click .delete-field': 'onClickDelete',
			'click .duplicate-field': 'duplicate',
			'click .move-field': 'move',
			'click .browse-fields': 'browseFields',

			'focus .edit-field': 'onFocusEdit',
			'blur .edit-field, .row-options a': 'onBlurEdit',

			'change .field-type': 'onChangeType',
			'change .acf-schema-property': 'onChangeSchemaProperty',
			'change .field-required': 'onChangeRequired',
			'blur .field-label': 'onChangeLabel',
			'blur .field-name': 'onChangeName',

			change: 'onChange',
			changed: 'onChanged',
		},

		// data
		data: {
			// Similar to ID, but used for HTML puposes.
			// It is possbile for a new field to have an ID of 0, but an id of 'field_123' */
			id: 0,

			// The field key ('field_123')
			key: '',

			// The field type (text, image, etc)
			type: '',

			// The $post->ID of this field
			//ID: 0,

			// The field's parent
			//parent: 0,

			// The menu order
			//menu_order: 0
		},

		setup: function ( $field ) {
			// set $el
			this.$el = $field;

			// inherit $field data (id, key, type)
			this.inherit( $field );

			// load additional props
			// - this won't trigger 'changed'
			this.prop( 'ID' );
			this.prop( 'parent' );
			this.prop( 'menu_order' );
		},

		$input: function ( name ) {
			return $( '#' + this.getInputId() + '-' + name );
		},

		$meta: function () {
			return this.$( '.meta:first' );
		},

		$handle: function () {
			return this.$( '.handle:first' );
		},

		$settings: function () {
			return this.$( '.settings:first' );
		},

		$setting: function ( name ) {
			return this.$( '.acf-field-settings:first .acf-field-setting-' + name );
		},

		$fieldTypeSelect: function () {
			return this.$( '.field-type' );
		},

		$fieldLabel: function () {
			return this.$( '.field-label' );
		},

		getParent: function () {
			return acf.getFieldObjects( { child: this.$el, limit: 1 } ).pop();
		},

		getParents: function () {
			return acf.getFieldObjects( { child: this.$el } );
		},

		getFields: function () {
			return acf.getFieldObjects( { parent: this.$el } );
		},

		getInputName: function () {
			return 'acf_fields[' + this.get( 'id' ) + ']';
		},

		getInputId: function () {
			return 'acf_fields-' + this.get( 'id' );
		},

		newInput: function ( name, value ) {
			// vars
			var inputId = this.getInputId();
			var inputName = this.getInputName();

			// append name
			if ( name ) {
				inputId += '-' + name;
				inputName += '[' + name + ']';
			}

			// create input (avoid HTML + JSON value issues)
			var $input = $( '<input />' ).attr( {
				id: inputId,
				name: inputName,
				value: value,
			} );
			this.$( '> .meta' ).append( $input );

			// return
			return $input;
		},

		getProp: function ( name ) {
			// check data
			if ( this.has( name ) ) {
				return this.get( name );
			}

			// get input value
			var $input = this.$input( name );
			var value = $input.length ? $input.val() : null;

			// set data silently (cache)
			this.set( name, value, true );

			// return
			return value;
		},

		setProp: function ( name, value ) {
			// get input
			var $input = this.$input( name );
			var prevVal = $input.val();

			// create if new
			if ( ! $input.length ) {
				$input = this.newInput( name, value );
			}

			// remove
			if ( value === null ) {
				$input.remove();

				// update
			} else {
				$input.val( value );
			}

			//console.log('setProp', name, value, this);

			// set data silently (cache)
			if ( ! this.has( name ) ) {
				//console.log('setting silently');
				this.set( name, value, true );

				// set data allowing 'change' event to fire
			} else {
				//console.log('setting loudly!');
				this.set( name, value );
			}

			// return
			return this;
		},

		prop: function ( name, value ) {
			if ( value !== undefined ) {
				return this.setProp( name, value );
			} else {
				return this.getProp( name );
			}
		},

		props: function ( props ) {
			Object.keys( props ).map( function ( key ) {
				this.setProp( key, props[ key ] );
			}, this );
		},

		getLabel: function () {
			// get label with empty default
			var label = this.prop( 'label' );
			if ( label === '' ) {
				label = acf.__( '(no label)' );
			}

			// return
			return label;
		},

		getName: function () {
			return this.prop( 'name' );
		},

		getType: function () {
			return this.prop( 'type' );
		},

		getTypeLabel: function () {
			var type = this.prop( 'type' );
			var types = acf.get( 'fieldTypes' );
			return types[ type ] ? types[ type ].label : type;
		},

		getKey: function () {
			return this.prop( 'key' );
		},

		initialize: function () {
			this.checkCopyable();
		},

		makeCopyable: function ( text ) {
			if ( ! navigator.clipboard ) return '<span class="copyable copy-unsupported">' + text + '</span>';
			return '<span class="copyable">' + text + '</span>';
		},

		checkCopyable: function () {
			if ( ! navigator.clipboard ) {
				this.$el.find( '.copyable' ).addClass( 'copy-unsupported' );
			}
		},

		initializeFieldTypeSelect2: function () {
			if ( this.fieldTypeSelect2 ) return;

			// Support disabling via filter.
			if ( this.$fieldTypeSelect().hasClass( 'disable-select2' ) ) return;

			// Check for a full modern version of select2, bail loading if not found with a console warning.
			try {
				$.fn.select2.amd.require( 'select2/compat/dropdownCss' );
			} catch ( err ) {
				console.warn(
					'ACF was not able to load the full version of select2 due to a conflicting version provided by another plugin or theme taking precedence. Select2 fields may not work as expected.'
				);
				return;
			}

			this.fieldTypeSelect2 = acf.newSelect2( this.$fieldTypeSelect(), {
				field: false,
				ajax: false,
				multiple: false,
				allowNull: false,
				suppressFilters: true,
				dropdownCssClass: 'field-type-select-results',
				templateResult: function ( selection ) {
					if ( selection.loading || ( selection.element && selection.element.nodeName === 'OPTGROUP' ) ) {
						var $selection = $( '<span class="acf-selection"></span>' );
						$selection.html( acf.strEscape( selection.text ) );
					} else {
						var $selection = $(
							'<i class="field-type-icon field-type-icon-' +
								selection.id.replaceAll( '_', '-' ) +
								'"></i><span class="acf-selection has-icon">' +
								acf.strEscape( selection.text ) +
								'</span>'
						);
					}
					$selection.data( 'element', selection.element );
					return $selection;
				},
				templateSelection: function ( selection ) {
					var $selection = $(
						'<i class="field-type-icon field-type-icon-' +
							selection.id.replaceAll( '_', '-' ) +
							'"></i><span class="acf-selection has-icon">' +
							acf.strEscape( selection.text ) +
							'</span>'
					);
					$selection.data( 'element', selection.element );
					return $selection;
				},
			} );

			this.fieldTypeSelect2.on( 'select2:open', function () {
				$( '.field-type-select-results input.select2-search__field' ).attr(
					'placeholder',
					acf.__( 'Type to search...' )
				);
			} );

			this.fieldTypeSelect2.on( 'change', function ( e ) {
				$( e.target ).parents( 'ul:first' ).find( 'button.browse-fields' ).prop( 'disabled', true );
			} );

			// When typing happens on the li element above the select2.
			this.fieldTypeSelect2.$el
				.parent()
				.on( 'keydown', '.select2-selection.select2-selection--single', this.onKeyDownSelect );
		},

		addProFields: function () {
			// Don't run if we have a valid license.
			if ( acf.get( 'is_pro' ) && acf.get( 'isLicenseActive' ) ) {
				return;
			}

			// Make sure we haven't appended these fields before.
			var $fieldTypeSelect = this.$fieldTypeSelect();
			if ( $fieldTypeSelect.hasClass( 'acf-free-field-type' ) ) return;

			// Loop over each pro field type and append it to the select.
			const PROFieldTypes = acf.get( 'PROFieldTypes' );
			if ( typeof PROFieldTypes !== 'object' ) return;

			const $layoutGroup = $fieldTypeSelect.find( 'optgroup option[value="group"]' ).parent();

			const $contentGroup = $fieldTypeSelect.find( 'optgroup option[value="image"]' ).parent();

			for ( const [ name, field ] of Object.entries( PROFieldTypes ) ) {
				const $useGroup = field.category === 'content' ? $contentGroup : $layoutGroup;
				const $existing = $useGroup.children( '[value="' + name + '"]' );
				const label = `${ acf.strEscape( field.label ) } (${ acf.strEscape( acf.__( 'PRO Only' ) ) })`;

				if ( $existing.length ) {
					// Already added by pro, update existing option.
					$existing.text( label );

					// Don't disable if already selected (prevents re-save from overriding field type).
					if ( $fieldTypeSelect.val() !== name ) {
						$existing.attr( 'disabled', 'disabled' );
					}
				} else {
					// Append new disabled option.
					$useGroup.append( `<option value="null" disabled="disabled">${ label }</option>` );
				}
			}

			$fieldTypeSelect.addClass( 'acf-free-field-type' );
		},

		render: function () {
			// vars
			var $handle = this.$( '.handle:first' );
			var menu_order = this.prop( 'menu_order' );
			var label = acf.strEscape( this.getLabel() );
			var name = this.prop( 'name' );
			var type = this.getTypeLabel();
			var key = this.prop( 'key' );
			var required = this.$input( 'required' ).prop( 'checked' );

			// update menu order
			$handle.find( '.acf-icon' ).html( parseInt( menu_order ) + 1 );

			// update required
			if ( required ) {
				label += ' <span class="acf-required">*</span>';
			}

			// update label
			$handle.find( '.li-field-label strong a' ).html( label );

			// update name
			let toLowerCase = name === name.toLowerCase();
			toLowerCase = acf.applyFilters( 'convert_field_name_to_lowercase', toLowerCase, this );
			$handle.find( '.li-field-name' ).html( this.makeCopyable( acf.strSanitize( name, toLowerCase ) ) );

			// update type
			const iconName = acf.strSlugify( this.getType() );
			$handle.find( '.field-type-label' ).text( ' ' + type );
			$handle
				.find( '.field-type-icon' )
				.removeClass()
				.addClass( 'field-type-icon field-type-icon-' + iconName );

			// update key
			$handle.find( '.li-field-key' ).html( this.makeCopyable( key ) );

			// action for 3rd party customization
			acf.doAction( 'render_field_object', this );
		},

		refresh: function () {
			acf.doAction( 'refresh_field_object', this );
		},

		isOpen: function () {
			return this.$el.hasClass( 'open' );
		},

		onClickCopy: function ( e ) {
			e.stopPropagation();
			if ( ! navigator.clipboard || $( e.target ).is( 'input' ) ) return;

			// Find the value to copy depending on input or text elements.
			let copyValue;
			if ( $( e.target ).hasClass( 'acf-input-wrap' ) ) {
				copyValue = $( e.target ).find( 'input' ).first().val();
			} else {
				copyValue = $( e.target ).text().trim();
			}

			navigator.clipboard.writeText( copyValue ).then( () => {
				$( e.target ).closest( '.copyable' ).addClass( 'copied' );
				setTimeout( function () {
					$( e.target ).closest( '.copyable' ).removeClass( 'copied' );
				}, 2000 );
			} );
		},

		onClickEdit: function ( e ) {
			const $target = $( e.target );

			// Bail out if a pro field without a license.
			if (
				acf.get( 'is_pro' ) &&
				! acf.get( 'isLicenseActive' ) &&
				! acf.get( 'isLicenseExpired' ) &&
				acf.get( 'PROFieldTypes' ).hasOwnProperty( this.getType() )
			) {
				return;
			}

			if ( $target.parent().hasClass( 'row-options' ) && ! $target.hasClass( 'edit-field' ) ) {
				return;
			}

			this.isOpen() ? this.close() : this.open();
		},

		onClickCloseAddBelow: function () {
			this.close();
			acf.doAction( 'add_field_below', this.$el );
		},

		onChangeSettingsTab: function () {
			const $settings = this.$el.children( '.settings' );
			acf.doAction( 'show', $settings );
		},

		/**
		 * Adds 'active' class to row options nearest to the target.
		 */
		onFocusEdit: function ( e ) {
			var $rowOptions = $( e.target ).closest( 'li' ).find( '.row-options' );
			$rowOptions.addClass( 'active' );
		},

		/**
		 * Removes 'active' class from row options if links in same row options area are no longer in focus.
		 */
		onBlurEdit: function ( e ) {
			var focusDelayMilliseconds = 50;
			var $rowOptionsBlurElement = $( e.target ).closest( 'li' ).find( '.row-options' );

			// Timeout so that `activeElement` gives the new element in focus instead of the body.
			setTimeout( function () {
				var $rowOptionsFocusElement = $( document.activeElement ).closest( 'li' ).find( '.row-options' );
				if ( ! $rowOptionsBlurElement.is( $rowOptionsFocusElement ) ) {
					$rowOptionsBlurElement.removeClass( 'active' );
				}
			}, focusDelayMilliseconds );
		},

		open: function () {
			// vars
			var $settings = this.$el.children( '.settings' );

			// initialise field type select
			this.addProFields();
			this.initializeFieldTypeSelect2();

			// action (open)
			acf.doAction( 'open_field_object', this );
			this.trigger( 'openFieldObject' );

			// action (show)
			acf.doAction( 'show', $settings );

			this.hideEmptyTabs();

			// open
			$settings.slideDown();
			this.$el.addClass( 'open' );
		},

		onKeyDownSelect: function ( e ) {
			// Omit events from special keys.
			if (
				! (
					( e.which >= 186 && e.which <= 222 ) || // punctuation and special characters
					[
						8, 9, 13, 16, 17, 18, 19, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 144,
						145,
					].includes( e.which ) || // Special keys
					( e.which >= 112 && e.which <= 123 )
				)
			) {
				// Function keys
				$( this ).closest( '.select2-container' ).siblings( 'select:enabled' ).select2( 'open' );
				return;
			}
		},

		close: function () {
			// vars
			var $settings = this.$el.children( '.settings' );

			// close
			$settings.slideUp();
			this.$el.removeClass( 'open' );

			// action (close)
			acf.doAction( 'close_field_object', this );
			this.trigger( 'closeFieldObject' );

			// action (hide)
			acf.doAction( 'hide', $settings );
		},

		serialize: function () {
			return acf.serialize( this.$el, this.getInputName() );
		},

		save: function ( type ) {
			// defaults
			type = type || 'settings'; // meta, settings

			// vars
			var save = this.getProp( 'save' );

			// bail if already saving settings
			if ( save === 'settings' ) {
				return;
			}

			// prop
			this.setProp( 'save', type );

			// debug
			this.$el.attr( 'data-save', type );

			// action
			acf.doAction( 'save_field_object', this, type );
		},

		submit: function () {
			// vars
			var inputName = this.getInputName();
			var save = this.get( 'save' );

			// close
			if ( this.isOpen() ) {
				this.close();
			}

			// allow all inputs to save
			if ( save == 'settings' ) {
				// do nothing
				// allow only meta inputs to save
			} else if ( save == 'meta' ) {
				this.$( '> .settings [name^="' + inputName + '"]' ).remove();

				// prevent all inputs from saving
			} else {
				this.$( '[name^="' + inputName + '"]' ).remove();
			}

			// action
			acf.doAction( 'submit_field_object', this );
		},

		onChange: function ( e, $el ) {
			// save settings
			this.save();

			// action for 3rd party customization
			acf.doAction( 'change_field_object', this );
		},

		onChanged: function ( e, $el, name, value ) {
			if ( this.getType() === $el.attr( 'data-type' ) ) {
				$( 'button.acf-btn.browse-fields' ).prop( 'disabled', false );
			}

			// ignore 'save'
			if ( name == 'save' ) {
				return;
			}

			// save meta
			if ( [ 'menu_order', 'parent' ].indexOf( name ) > -1 ) {
				this.save( 'meta' );

				// save field
			} else {
				this.save();
			}

			// render
			if ( [ 'menu_order', 'label', 'required', 'name', 'type', 'key' ].indexOf( name ) > -1 ) {
				this.render();
			}

			// action for 3rd party customization
			acf.doAction( 'change_field_object_' + name, this, value );
		},

		onChangeLabel: function ( e, $el ) {
			// set
			const label = $el.val();
			const safeLabel = acf.strEscape( label );
			this.set( 'label', safeLabel );

			// render name
			if ( this.prop( 'name' ) == '' ) {
				var name = acf.applyFilters( 'generate_field_object_name', acf.strSanitize( label ), this );
				this.prop( 'name', name );
			}
		},

		onChangeName: function ( e, $el ) {
			const id = this.get( 'id' );
			let toLowerCase = false;

			// New fields should always be lower case.
			if ( typeof id !== 'number' || id === 0 ) {
				toLowerCase = true;
			}

			// Existing fields that were already lowercase should remain lowercase.
			const savedName = $el.attr( 'value' );
			if ( typeof savedName === 'string' && savedName === savedName.toLowerCase() ) {
				toLowerCase = true;
			}

			/**
			 * Allows developers to control whether field names are converted to lowercase.
			 *
			 * @param {boolean} toLowerCase Whether to convert the field name to lowercase.
			 * @param {object}  field       The current field context (this).
			 * @return {boolean}            Return true to convert to lowercase, false to preserve case.
			 */
			toLowerCase = acf.applyFilters( 'convert_field_name_to_lowercase', toLowerCase, this );

			const sanitizedName = acf.strSanitize( $el.val(), toLowerCase );

			$el.val( sanitizedName );
			this.set( 'name', sanitizedName );

			if ( sanitizedName.startsWith( 'field_' ) ) {
				alert( acf.__( 'The string "field_" may not be used at the start of a field name' ) );
			}
		},

		onChangeRequired: function ( e, $el ) {
			// set
			var required = $el.prop( 'checked' ) ? 1 : 0;
			this.set( 'required', required );
		},

		delete: function ( args ) {
			// defaults
			args = acf.parseArgs( args, {
				animate: true,
			} );

			// add to remove list
			var id = this.prop( 'ID' );

			if ( id ) {
				var $input = $( '#_acf_delete_fields' );
				var newVal = $input.val() + '|' + id;
				$input.val( newVal );
			}

			// action
			acf.doAction( 'delete_field_object', this );

			// animate
			if ( args.animate ) {
				this.removeAnimate();
			} else {
				this.remove();
			}
		},

		onClickDelete: function ( e, $el ) {
			// Bypass confirmation when holding down "shift" key.
			if ( e.shiftKey ) {
				return this.delete();
			}

			// add class
			this.$el.addClass( '-hover' );

			// add tooltip
			var tooltip = acf.newTooltip( {
				confirmRemove: true,
				target: $el,
				context: this,
				confirm: function () {
					this.delete();
				},
				cancel: function () {
					this.$el.removeClass( '-hover' );
				},
			} );
		},

		removeAnimate: function () {
			// vars
			var field = this;
			var $list = this.$el.parent();
			var $fields = acf.findFieldObjects( {
				sibling: this.$el,
			} );

			// remove
			acf.remove( {
				target: this.$el,
				endHeight: $fields.length ? 0 : 50,
				complete: function () {
					field.remove();
					acf.doAction( 'removed_field_object', field, $list );
				},
			} );

			// action
			acf.doAction( 'remove_field_object', field, $list );
		},

		duplicate: function () {
			// vars
			var newKey = acf.uniqid( 'field_' );

			// duplicate
			var $newField = acf.duplicate( {
				target: this.$el,
				search: this.get( 'id' ),
				replace: newKey,
			} );

			// set new key
			$newField.attr( 'data-key', newKey );

			// get instance
			var newField = acf.getFieldObject( $newField );

			// update newField label / name
			var label = newField.prop( 'label' );
			var name = newField.prop( 'name' );
			var end = name.split( '_' ).pop();
			var copy = acf.__( 'copy' );

			// increase suffix "1"
			if ( acf.isNumeric( end ) ) {
				var i = end * 1 + 1;
				label = label.replace( end, i );
				name = name.replace( end, i );

				// increase suffix "(copy1)"
			} else if ( end.indexOf( copy ) === 0 ) {
				var i = end.replace( copy, '' ) * 1;
				i = i ? i + 1 : 2;

				// replace
				label = label.replace( end, copy + i );
				name = name.replace( end, copy + i );

				// add default "(copy)"
			} else {
				label += ' (' + copy + ')';
				name += '_' + copy;
			}

			newField.prop( 'ID', 0 );
			newField.prop( 'label', label );
			newField.prop( 'name', name );
			newField.prop( 'key', newKey );

			// close the current field if it's open.
			if ( this.isOpen() ) {
				this.close();
			}

			// open the new field and initialise correctly.
			newField.open();

			// focus label
			var $label = newField.$setting( 'label input' );
			setTimeout( function () {
				$label.trigger( 'focus' );
			}, 251 );

			// action
			acf.doAction( 'duplicate_field_object', this, newField );
			acf.doAction( 'append_field_object', newField );
		},

		wipe: function () {
			// vars
			var prevId = this.get( 'id' );
			var prevKey = this.get( 'key' );
			var newKey = acf.uniqid( 'field_' );

			// rename
			acf.rename( {
				target: this.$el,
				search: prevId,
				replace: newKey,
			} );

			// data
			this.set( 'id', newKey );
			this.set( 'prevId', prevId );
			this.set( 'prevKey', prevKey );

			// props
			this.prop( 'key', newKey );
			this.prop( 'ID', 0 );

			// attr
			this.$el.attr( 'data-key', newKey );
			this.$el.attr( 'data-id', newKey );

			// action
			acf.doAction( 'wipe_field_object', this );
		},

		move: function () {
			// helper
			var hasChanged = function ( field ) {
				return field.get( 'save' ) == 'settings';
			};

			// vars
			var changed = hasChanged( this );

			// has sub fields changed
			if ( ! changed ) {
				acf.getFieldObjects( {
					parent: this.$el,
				} ).map( function ( field ) {
					changed = hasChanged( field ) || field.changed;
				} );
			}

			// bail early if changed
			if ( changed ) {
				alert( acf.__( 'This field cannot be moved until its changes have been saved' ) );
				return;
			}

			// step 1.
			var id = this.prop( 'ID' );
			var field = this;
			var popup = false;
			var step1 = function () {
				// popup
				popup = acf.newPopup( {
					title: acf.__( 'Move Custom Field' ),
					loading: true,
					width: '300px',
					openedBy: field.$el.find( '.move-field' ),
				} );

				// ajax
				var ajaxData = {
					action: 'acf/field_group/move_field',
					field_id: id,
				};

				// get HTML
				$.ajax( {
					url: acf.get( 'ajaxurl' ),
					data: acf.prepareForAjax( ajaxData ),
					type: 'post',
					dataType: 'html',
					success: step2,
				} );
			};

			var step2 = function ( html ) {
				// update popup
				popup.loading( false );
				popup.content( html );

				// submit form
				popup.on( 'submit', 'form', step3 );
			};

			var step3 = function ( e, $el ) {
				// prevent
				e.preventDefault();

				// disable
				acf.startButtonLoading( popup.$( '.button' ) );

				// ajax
				var ajaxData = {
					action: 'acf/field_group/move_field',
					field_id: id,
					field_group_id: popup.$( 'select' ).val(),
				};

				// get HTML
				$.ajax( {
					url: acf.get( 'ajaxurl' ),
					data: acf.prepareForAjax( ajaxData ),
					type: 'post',
					dataType: 'html',
					success: step4,
				} );
			};

			var step4 = function ( html ) {
				popup.content( html );

				if ( wp.a11y && wp.a11y.speak && acf.__ ) {
					wp.a11y.speak( acf.__( 'Field moved to other group' ), 'polite' );
				}

				popup.$( '.acf-close-popup' ).trigger( 'focus' );

				field.removeAnimate();
			};

			// start
			step1();
		},

		browseFields: function ( e, $el ) {
			e.preventDefault();

			const modal = acf.newBrowseFieldsModal( {
				openedBy: this,
			} );
		},

		onChangeType: function ( e, $el ) {
			// clea previous timout
			if ( this.changeTimeout ) {
				clearTimeout( this.changeTimeout );
			}

			// set new timeout
			// - prevents changing type multiple times whilst user types in newType
			this.changeTimeout = this.setTimeout( function () {
				this.changeType( $el.val() );
			}, 300 );
		},

		changeType: function ( newType ) {
			var prevType = this.prop( 'type' );
			var prevClass = acf.strSlugify( 'acf-field-object-' + prevType );
			var newClass = acf.strSlugify( 'acf-field-object-' + newType );

			// Update props.
			this.$el.removeClass( prevClass ).addClass( newClass );
			this.$el.attr( 'data-type', newType );
			this.$el.data( 'type', newType );

			// Abort XHR if this field is already loading AJAX data.
			if ( this.has( 'xhr' ) ) {
				this.get( 'xhr' ).abort();
			}

			// Store old settings so they can be reused later.
			const $oldSettings = {};

			this.$el
				.find( '.acf-field-settings:first > .acf-field-settings-main > .acf-field-type-settings' )
				.each( function () {
					let tab = $( this ).data( 'parent-tab' );
					let $tabSettings = $( this ).children().removeData();

					$oldSettings[ tab ] = $tabSettings;

					$tabSettings.detach();
				} );

			this.set( 'settings-' + prevType, $oldSettings );

			// Show the settings if we already have them cached.
			if ( this.has( 'settings-' + newType ) ) {
				let $newSettings = this.get( 'settings-' + newType );

				this.showFieldTypeSettings( $newSettings );
				this.set( 'type', newType );
				return;
			}

			// Add loading spinner.
			const $loading = $(
				'<div class="acf-field"><div class="acf-input"><div class="acf-loading"></div></div></div>'
			);
			this.$el.find( '.acf-field-settings-main-general .acf-field-type-settings' ).before( $loading );

			const ajaxData = {
				action: 'acf/field_group/render_field_settings',
				field: this.serialize(),
				prefix: this.getInputName(),
			};

			// Get the settings for this field type over AJAX.
			var xhr = $.ajax( {
				url: acf.get( 'ajaxurl' ),
				data: acf.prepareForAjax( ajaxData ),
				type: 'post',
				dataType: 'json',
				context: this,
				success: function ( response ) {
					if ( ! acf.isAjaxSuccess( response ) ) {
						return;
					}

					this.showFieldTypeSettings( response.data );
				},
				complete: function () {
					// also triggered by xhr.abort();
					$loading.remove();
					this.set( 'type', newType );
					//this.refresh();
				},
			} );

			// set
			this.set( 'xhr', xhr );
		},

		onChangeSchemaProperty: function( e, $el ) {
			const newVal = $el.val();
			const $outputFormatSetting = this.$setting( 'schema_output_format' );
			const $select = $outputFormatSetting.find( 'select' );

			// Bail early if no Schema.org Property value selected.
			if ( ! newVal ) {
				return;
			}

			// Abort any pending request
			if ( this.has( 'schemaPropertyXhr' ) ) {
				this.get( 'schemaPropertyXhr' ).abort();
			}

			// Destroy existing Select2
			if ( $select.data( 'select2' ) ) {
				$select.select2( 'destroy' );
			}

			const request = $.ajax({
				url: acf.get( 'ajaxurl' ),
				data: acf.prepareForAjax({
					action: 'acf/schema/get_output_formats',
					field_type: this.getType(),
					property: newVal,
				}),
				type: 'post',
				dataType: 'json',
			});

			this.set( 'schemaPropertyXhr', request );

			if ( request.state() === 'pending' ) {
				$select.prop( 'disabled', true );
			}

			request.done( response => {
				if ( ! response.success ) {
					acf.debug( 'Failed to fetch Schema.org Output Formats', response.data );
					acf.unlock( $select, 'disabled', 'schema_single_option' );
					$select.prop( 'disabled', false );
					return;
				}

				const choices = response.data.choices;
				const defaultValue = response.data.default;

				// Clear and rebuild options
				$select.empty();

				choices.forEach( function ( choice ) {
					$select.append(
						$( '<option></option>' )
							.val( choice.id )
							.text( choice.text )
					);
				} );
				$select.val( defaultValue );

				// Disable the dropdown if there is only one option.
				if ( choices.length <= 1 ) {
					acf.lock( $select, 'disabled', 'schema_single_option' );
					$select.prop( 'disabled', true );
				} else {
					acf.unlock( $select, 'disabled', 'schema_single_option' );
					$select.prop( 'disabled', false );
				}

				// Re-initialize Select2
				acf.newSelect2( $select, {
					field: false,
					allowNull: false,
				} );
			});

			request.fail( () => {
				acf.unlock( $select, 'disabled', 'schema_single_option' );
				$select.prop( 'disabled', false );
			});
		},

		showFieldTypeSettings: function ( settings ) {
			if ( 'object' !== typeof settings ) {
				return;
			}

			const self = this;
			const tabs = Object.keys( settings );

			tabs.forEach( ( tab ) => {
				const $tab = self.$el.find(
					'.acf-field-settings-main-' + tab.replace( '_', '-' ) + ' .acf-field-type-settings'
				);
				let tabContent = '';

				if ( [ 'object', 'string' ].includes( typeof settings[ tab ] ) ) {
					tabContent = settings[ tab ];
				}

				$tab.prepend( tabContent );
				acf.doAction( 'append', $tab );
			} );

			this.hideEmptyTabs();
		},

		updateParent: function () {
			// vars
			var ID = acf.get( 'post_id' );

			// check parent
			var parent = this.getParent();
			if ( parent ) {
				ID = parseInt( parent.prop( 'ID' ) ) || parent.prop( 'key' );
			}

			// update
			this.prop( 'parent', ID );
		},

		hideEmptyTabs: function () {
			const $settings = this.$settings();
			const $tabs = $settings.find( '.acf-field-settings:first > .acf-field-settings-main' );

			$tabs.each( function () {
				const $tabContent = $( this );
				const tabName = $tabContent.find( '.acf-field-type-settings:first' ).data( 'parentTab' );
				const $tabLink = $settings.find( '.acf-settings-type-' + tabName ).first();

				if ( $.trim( $tabContent.text() ) === '' ) {
					$tabLink.hide();
				} else if ( $tabLink.is( ':hidden' ) ) {
					$tabLink.show();
				}
			} );
		},
	} );
} )( jQuery );
