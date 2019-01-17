(function($, undefined){
	
	acf.FieldObject = acf.Model.extend({
		
		// class used to avoid nested event triggers
		eventScope: '.acf-field-object',
		
		// events
		events: {
			'click .edit-field':		'onClickEdit',
			'click .delete-field':		'onClickDelete',
			'click .duplicate-field':	'duplicate',
			'click .move-field':		'move',
			
			'change .field-type':		'onChangeType',
			'change .field-required':	'onChangeRequired',
			'blur .field-label':		'onChangeLabel',
			'blur .field-name':			'onChangeName',
			
			'change':					'onChange',
			'changed':					'onChanged',
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
		
		setup: function( $field ){
			
			// set $el
			this.$el = $field;
			
			// inherit $field data (id, key, type)
			this.inherit( $field );
			
			// load additional props
			// - this won't trigger 'changed'
			this.prop('ID');
			this.prop('parent');
			this.prop('menu_order');
		},
		
		$input: function( name ){
			return $('#' + this.getInputId() + '-' + name);
		},
		
		$meta: function(){
			return this.$('.meta:first');
		},
		
		$handle: function(){
			return this.$('.handle:first');
		},
		
		$settings: function(){
			return this.$('.settings:first');
		},
		
		$setting: function( name ){
			return this.$('.acf-field-settings:first > .acf-field-setting-' + name);
		},
		
		getParent: function(){
			return acf.getFieldObjects({ child: this.$el, limit: 1 }).pop();
		},
		
		getParents: function(){
			return acf.getFieldObjects({ child: this.$el });
		},
		
		getFields: function(){
			return acf.getFieldObjects({ parent: this.$el });
		},
		
		getInputName: function(){
			return 'acf_fields[' + this.get('id') + ']';
		},
		
		getInputId: function(){
			return 'acf_fields-' + this.get('id');
		},
		
		newInput: function( name, value ){
			
			// vars
			var inputId = this.getInputId();
			var inputName = this.getInputName();
			
			// append name
			if( name ) {
				inputId += '-'+name;
				inputName += '['+name+']';
			}
			
			// create input (avoid HTML + JSON value issues)
			var $input = $('<input />').attr({
				id: inputId,
				name: inputName,
				value: value
			});
			this.$('> .meta').append( $input );
			
			// return
			return $input;
		},
		
		getProp: function( name ){
			
			// check data
			if( this.has(name) ) {
				return this.get(name);
			}
			
			// get input value
			var $input = this.$input( name );
			var value = $input.length ? $input.val() : null;
			
			// set data silently (cache)
			this.set(name, value, true);
			
			// return
			return value;
		},
		
		setProp: function( name, value ) {
			
			// get input
			var $input = this.$input( name );
			var prevVal = $input.val();
			
			// create if new
			if( !$input.length ) {
				$input = this.newInput( name, value );
			}
			
			// remove
			if( value === null ) {
				$input.remove();
				
			// update
			} else {
				$input.val( value );	
			}
			
			//console.log('setProp', name, value, this);
			
			// set data silently (cache)
			if( !this.has(name) ) {
				//console.log('setting silently');
				this.set(name, value, true);
				
			// set data allowing 'change' event to fire
			} else {
				//console.log('setting loudly!');
				this.set(name, value);
			}
			
			// return
			return this;
			
		},
		
		prop: function( name, value ){
			if( value !== undefined ) {
				return this.setProp( name, value );
			} else {
				return this.getProp( name );
			}
		},
		
		props: function( props ){
			Object.keys( props ).map(function( key ){
				this.setProp( key, props[key] );
			}, this);
		},
		
		getLabel: function(){
			
			// get label with empty default
			var label = this.prop('label');
			if( label === '' ) {
				label = acf.__('(no label)')
			}
			
			// return
			return label;
		},
		
		getName: function(){
			return this.prop('name');
		},
		
		getType: function(){
			return this.prop('type');
		},
		
		getTypeLabel: function(){
			var type = this.prop('type');
			var types = acf.get('fieldTypes');
			return ( types[type] ) ? types[type].label : type;
		},
		
		getKey: function(){
			return this.prop('key');
		},
			
		initialize: function(){
			// do nothing
		},
		
		render: function(){
					
			// vars
			var $handle = this.$('.handle:first');
			var menu_order = this.prop('menu_order');
			var label = this.getLabel();
			var name = this.prop('name');
			var type = this.getTypeLabel();
			var key = this.prop('key');
			var required = this.$input('required').prop('checked');
			
			// update menu order
			$handle.find('.acf-icon').html( parseInt(menu_order) + 1 );
			
			// update required
			if( required ) {
				label += ' <span class="acf-required">*</span>';
			}
			
			// update label
			$handle.find('.li-field-label strong a').html( label );
						
			// update name
			$handle.find('.li-field-name').text( name );
			
			// update type
			$handle.find('.li-field-type').text( type );
			
			// update key
			$handle.find('.li-field-key').text( key );
			
			// action for 3rd party customization
			acf.doAction('render_field_object', this);
		},
		
		refresh: function(){
			acf.doAction('refresh_field_object', this);
		},
		
		isOpen: function() {
			return this.$el.hasClass('open');
		},
		
		onClickEdit: function( e ){
			this.isOpen() ? this.close() : this.open();
		},
		
		open: function(){
			
			// vars
			var $settings = this.$el.children('.settings');
			
			// open
			$settings.slideDown();
			this.$el.addClass('open');
			
			// action (open)
			acf.doAction('open_field_object', this);
			this.trigger('openFieldObject');
			
			// action (show)
			acf.doAction('show', $settings);
		},
		
		close: function(){
			
			// vars
			var $settings = this.$el.children('.settings');
			
			// close
			$settings.slideUp();
			this.$el.removeClass('open');
			
			// action (close)
			acf.doAction('close_field_object', this);
			this.trigger('closeFieldObject');
			
			// action (hide)
			acf.doAction('hide', $settings);
		},
		
		serialize: function(){
			return acf.serialize( this.$el, this.getInputName() );
		},
		
		save: function( type ){
			
			// defaults
			type = type || 'settings'; // meta, settings
			
			// vars
			var save = this.getProp('save');
			
			// bail if already saving settings
			if( save === 'settings' ) {
				return;
			}
			
			// prop
			this.setProp('save', type);
			
			// debug
			this.$el.attr('data-save', type);
			
			// action
			acf.doAction('save_field_object', this, type);
		},
		
		submit: function(){
			
			// vars
			var inputName = this.getInputName();
			var save = this.get('save');
			
			// close
			if( this.isOpen() ) {
				this.close();
			}
			
			// allow all inputs to save
			if( save == 'settings' ) {
				// do nothing
			
			// allow only meta inputs to save	
			} else if( save == 'meta' ) {
				this.$('> .settings [name^="' + inputName + '"]').remove();
				
			// prevent all inputs from saving
			} else {
				this.$('[name^="' + inputName + '"]').remove();
			}
			
			// action
			acf.doAction('submit_field_object', this);
		},
		
		onChange: function( e, $el ){
			
			// save settings
			this.save();
			
			// action for 3rd party customization
			acf.doAction('change_field_object', this);
		},
		
		onChanged: function( e, $el, name, value ){
			
			// ignore 'save'
			if( name == 'save' ) {
				return;
			}
			
			// save meta
			if( ['menu_order', 'parent'].indexOf(name) > -1 ) {
				this.save('meta');
			
			// save field
			} else {
				this.save();
			}			
			
			// render
			if( ['menu_order', 'label', 'required', 'name', 'type', 'key'].indexOf(name) > -1 ) {
				this.render();
			}
						
			// action for 3rd party customization
			acf.doAction('change_field_object_' + name, this, value);
		},
		
		onChangeLabel: function( e, $el ){
			
			// set
			var label = $el.val();
			this.set('label', label);
			
			// render name
			if( this.prop('name') == '' ) {
				var name = acf.applyFilters('generate_field_object_name', acf.strSanitize(label), this);
				this.prop('name', name);
			}
		},
		
		onChangeName: function( e, $el){
			
			// set
			var name = $el.val();
			this.set('name', name);
			
			// error
			if( name.substr(0, 6) === 'field_' ) {
				alert( acf.__('The string "field_" may not be used at the start of a field name') );
			}
		},
		
		onChangeRequired: function( e, $el ){
			
			// set
			var required = $el.prop('checked') ? 1 : 0;
			this.set('required', required);
		},
		
		delete: function( args ){
			
			// defaults
			args = acf.parseArgs(args, {
				animate: true
			});
			
			// add to remove list
			var id = this.prop('ID');
			
			if( id ) {
				var $input = $('#_acf_delete_fields');
				var newVal = $input.val() + '|' + id;
				$input.val( newVal );
			}
			
			// action
			acf.doAction('delete_field_object', this);
			
			// animate
			if( args.animate ) {
				this.removeAnimate();
			} else {
				this.remove();
			}
		},
		
		onClickDelete: function( e, $el ){
			
			// add class
			this.$el.addClass('-hover');
			
			// add tooltip
			var self = this;
			var tooltip = acf.newTooltip({
				confirmRemove: true,
				target: $el,
				confirm: function(){
					self.delete( true );
				},
				cancel: function(){
					self.$el.removeClass('-hover');
				}
			});
		},
		
		removeAnimate: function(){
			
			// vars
			var field = this;
			var $list = this.$el.parent();
			var $fields = acf.findFieldObjects({
				sibling: this.$el
			});
			
			// remove
			acf.remove({
				target: this.$el,
				endHeight: $fields.length ? 0 : 50,
				complete: function(){
					field.remove();
					acf.doAction('removed_field_object', field, $list);
				}
			});
			
			// action
			acf.doAction('remove_field_object', field, $list);
		},
		
		duplicate: function(){
			
			// vars
			var newKey = acf.uniqid('field_');
			
			// duplicate
			var $newField = acf.duplicate({
				target: this.$el,
				search: this.get('id'),
				replace: newKey,
			});
			
			// set new key
			$newField.attr('data-key', newKey);
			
			// get instance
			var newField = acf.getFieldObject( $newField );
			
			// open / close
			if( this.isOpen() ) {
				this.close();
			} else {
				newField.open();
			}
			
			// focus label
			var $label = newField.$setting('label input');
			setTimeout(function(){
	        	$label.focus();
	        }, 251);
			
			// update newField label / name
			var label = newField.prop('label');
			var name = newField.prop('name');
			var end = name.split('_').pop();
			var copy = acf.__('copy');
			
			// increase suffix "1"
			if( $.isNumeric(end) ) {
				var i = (end*1) + 1;
				label = label.replace( end, i );
				name = name.replace( end, i );
			
			// increase suffix "(copy1)"
			} else if( end.indexOf(copy) === 0 ) {
				var i = end.replace(copy, '') * 1;
				i = i ? i+1 : 2;
				
				// replace
				label = label.replace( end, copy + i );
				name = name.replace( end, copy + i );
			
			// add default "(copy)"
			} else {
				label += ' (' + copy + ')';
				name += '_' + copy;
			}
			
			newField.prop('ID', 0);
			newField.prop('label', label);
			newField.prop('name', name);
			newField.prop('key', newKey);
			
			// action
			acf.doAction('duplicate_field_object', this, newField);
			acf.doAction('append_field_object', newField);
		},
		
		wipe: function(){
			
			// vars
			var prevId = this.get('id');
			var prevKey = this.get('key');
			var newKey = acf.uniqid('field_');
			
			// rename
			acf.rename({
				target: this.$el,
				search: prevId,
				replace: newKey,
			});
			
			// data
			this.set('id', newKey);
			this.set('prevId', prevId);
			this.set('prevKey', prevKey);
			
			// props
			this.prop('key', newKey);
			this.prop('ID', 0);
			
			// attr
			this.$el.attr('data-key', newKey);
			this.$el.attr('data-id', newKey);
			
			// action
			acf.doAction('wipe_field_object', this);
		},
		
		move: function(){
			
			// helper
			var hasChanged = function( field ){
				return (field.get('save') == 'settings');
			};
			
			// vars
			var changed = hasChanged(this);
			
			// has sub fields changed
			if( !changed ) {
				acf.getFieldObjects({
					parent: this.$el
				}).map(function( field ){
					changed = hasChanged(field) || field.changed;
				});
			}
			
			// bail early if changed
			if( changed ) {
				alert( acf.__('This field cannot be moved until its changes have been saved') );
				return;
			}
			
			// step 1.
			var id = this.prop('ID');
			var field = this;
			var popup = false;
			var step1 = function(){
				
				// popup
				popup = acf.newPopup({
					title: acf.__('Move Custom Field'),
					loading: true,
					width: '300px'
				});
				
				// ajax
				var ajaxData = {
					action:		'acf/field_group/move_field',
					field_id:	id
				};
				
				// get HTML
				$.ajax({
					url: acf.get('ajaxurl'),
					data: acf.prepareForAjax(ajaxData),
					type: 'post',
					dataType: 'html',
					success: step2
				});
			};
			
			var step2 = function( html ){
				
				// update popup
				popup.loading(false);
				popup.content(html);
				
				// submit form
				popup.on('submit', 'form', step3);
			};
			
			var step3 = function( e, $el ){
				
				// prevent
				e.preventDefault();
				
				// disable
				acf.startButtonLoading( popup.$('.button') );
				
				// ajax
				var ajaxData = {
					action: 'acf/field_group/move_field',
					field_id: id,
					field_group_id: popup.$('select').val()
				};
				
				// get HTML
				$.ajax({
					url: acf.get('ajaxurl'),
					data: acf.prepareForAjax(ajaxData),
					type: 'post',
					dataType: 'html',
					success: step4
				});
			};
			
			var step4 = function( html ){
				
				// update popup
				popup.content(html);
				
				// remove element
				field.removeAnimate();
			};
			
			// start
			step1();
			
		},
		
		onChangeType: function( e, $el ){
			
			// clea previous timout
			if( this.changeTimeout ) {
				clearTimeout(this.changeTimeout);
			}
			
			// set new timeout
			// - prevents changing type multiple times whilst user types in newType
			this.changeTimeout = this.setTimeout(function(){
				this.changeType( $el.val() );
			}, 300);
		},
		
		changeType: function( newType ){
			
			// vars
			var prevType = this.prop('type');
			var prevClass = acf.strSlugify( 'acf-field-object-' + prevType );
			var newClass = acf.strSlugify( 'acf-field-object-' + newType );
			
			// update props
			this.$el.removeClass(prevClass).addClass(newClass);
			this.$el.attr('data-type', newType);
			this.$el.data('type', newType);
			
			// abort XHR if this field is already loading AJAX data
			if( this.has('xhr') ) {
				this.get('xhr').abort();
			}
			
			// store settings
			var $tbody = this.$('> .settings > table > tbody');
			var $settings = $tbody.children('[data-setting="' + prevType + '"]');			
			this.set( 'settings-' + prevType, $settings );
			$settings.detach();
						
			// show settings
			if( this.has('settings-' + newType) ) {
				var $newSettings = this.get('settings-' + newType);
				this.$setting('conditional_logic').before( $newSettings );
				this.set('type', newType);
				//this.refresh();
				return;
			}
			
			// load settings
			var $loading = $('<tr class="acf-field"><td class="acf-label"></td><td class="acf-input"><div class="acf-loading"></div></td></tr>');
			this.$setting('conditional_logic').before( $loading );
			
			// ajax
			var ajaxData = {
				action: 'acf/field_group/render_field_settings',
				field: this.serialize(),
				prefix: this.getInputName()
			};			
			
			// ajax
			var xhr = $.ajax({
				url: acf.get('ajaxurl'),
				data: acf.prepareForAjax(ajaxData),
				type: 'post',
				dataType: 'html',
				context: this,
				success: function( html ){
					
					// bail early if no settings
					if( !html ) return;
					
					// append settings
					$loading.after( html );
					
					// events
					acf.doAction('append', $tbody);
				},
				complete: function(){
					// also triggered by xhr.abort();
					$loading.remove();
					this.set('type', newType);
					//this.refresh();
				}
			});
			
			// set
			this.set('xhr', xhr);
			
		},
		
		updateParent: function(){
			
			// vars
			var ID = acf.get('post_id');
			
			// check parent
			var parent = this.getParent();
			if( parent ) {
				ID = parseInt(parent.prop('ID')) || parent.prop('key');
			}
			
			// update
			this.prop('parent', ID);
		}
				
	});
	
})(jQuery);