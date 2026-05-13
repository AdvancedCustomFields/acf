( function ( $, undefined ) {
	// vars
	var CONTEXT = 'tab';

	var Field = acf.Field.extend( {
		type: 'tab',

		wait: '',

		tabs: false,

		tab: false,

		events: {
			duplicateField: 'onDuplicate',
		},

		findFields: function () {
			let filter;

			/**
			 * Tabs in the admin UI that can be extended by third
			 * parties have the child settings wrapped inside an extra div,
			 * so we need to look for that instead of an adjacent .acf-field.
			 */
			switch ( this.get( 'key' ) ) {
				case 'acf_field_settings_tabs':
					filter = '.acf-field-settings-main';
					break;
				case 'acf_field_group_settings_tabs':
					filter = '.field-group-settings-tab';
					break;
				case 'acf_browse_fields_tabs':
					filter = '.acf-field-types-tab';
					break;
				case 'acf_icon_picker_tabs':
					filter = '.acf-icon-picker-tabs';
					break;
				case 'acf_post_type_tabs':
					filter = '.acf-post-type-advanced-settings';
					break;
				case 'acf_taxonomy_tabs':
					filter = '.acf-taxonomy-advanced-settings';
					break;
				case 'acf_ui_options_page_tabs':
					filter = '.acf-ui-options-page-advanced-settings';
					break;
				default:
					filter = '.acf-field';
			}

			return this.$el.nextUntil( '.acf-field-tab', filter );
		},

		getFields: function () {
			return acf.getFields( this.findFields() );
		},

		findTabs: function () {
			return this.$el.prevAll( '.acf-tab-wrap:first' );
		},

		findTab: function () {
			return this.$( '.acf-tab-button' );
		},

		initialize: function () {
			// bail early if is td
			if ( this.$el.is( 'td' ) ) {
				this.events = {};
				return false;
			}

			// vars
			var $tabs = this.findTabs();
			var $tab = this.findTab();
			var settings = acf.parseArgs( $tab.data(), {
				endpoint: false,
				placement: '',
				before: this.$el,
			} );

			// create wrap
			if ( ! $tabs.length || settings.endpoint ) {
				this.tabs = new Tabs( settings );
			} else {
				this.tabs = $tabs.data( 'acf' );
			}

			// add tab
			this.tab = this.tabs.addTab( $tab, this );
		},

		isActive: function () {
			return this.tab.isActive();
		},

		showFields: function () {
			// show fields
			this.getFields().map( function ( field ) {
				field.show( this.cid, CONTEXT );
				field.hiddenByTab = false;
			}, this );
		},

		hideFields: function () {
			// hide fields
			this.getFields().map( function ( field ) {
				field.hide( this.cid, CONTEXT );
				field.hiddenByTab = this.tab;
			}, this );
		},

		show: function ( lockKey ) {
			// show field and store result
			var visible = acf.Field.prototype.show.apply( this, arguments );

			// check if now visible
			if ( visible ) {
				// show tab
				this.tab.show();

				// check active tabs
				this.tabs.refresh();
			}

			// return
			return visible;
		},

		hide: function ( lockKey ) {
			// hide field and store result
			var hidden = acf.Field.prototype.hide.apply( this, arguments );

			// check if now hidden
			if ( hidden ) {
				// hide tab
				this.tab.hide();

				// reset tabs if this was active
				if ( this.isActive() ) {
					this.tabs.reset();
				}
			}

			// return
			return hidden;
		},

		enable: function ( lockKey ) {
			// enable fields
			this.getFields().map( function ( field ) {
				field.enable( CONTEXT );
			} );
		},

		disable: function ( lockKey ) {
			// disable fields
			this.getFields().map( function ( field ) {
				field.disable( CONTEXT );
			} );
		},

		onDuplicate: function ( e, $el, $duplicate ) {
			if ( this.isActive() ) {
				$duplicate.prevAll( '.acf-tab-wrap:first' ).remove();
			}
		},
	} );

	acf.registerFieldType( Field );

	/**
	 *  tabs
	 *
	 *  description
	 *
	 *  @date	8/2/18
	 *  @since	5.6.5
	 *
	 *  @param	type $var Description. Default.
	 *  @return	type Description.
	 */

	var i = 0;
	var Tabs = acf.Model.extend( {
		tabs: [],

		active: false,

		actions: {
			refresh: 'onRefresh',
			close_field_object: 'onCloseFieldObject',
		},

		data: {
			before: false,
			placement: 'top',
			index: 0,
			initialized: false,
		},

		setup: function ( settings ) {
			// data
			$.extend( this.data, settings );

			// define this prop to avoid scope issues
			this.tabs = [];
			this.active = false;

			// vars
			var placement = this.get( 'placement' );
			var $before = this.get( 'before' );
			var $parent = $before.parent();

			// add sidebar for left placement
			if ( placement == 'left' && $parent.hasClass( 'acf-fields' ) ) {
				$parent.addClass( '-sidebar' );
			}

			// create wrap
			if ( $before.is( 'tr' ) ) {
				this.$el = $(
					'<tr class="acf-tab-wrap"><td colspan="2"><ul class="acf-hl acf-tab-group"></ul></td></tr>'
				);
			} else {
				let ulClass = 'acf-hl acf-tab-group';

				if ( this.get( 'key' ) === 'acf_field_settings_tabs' ) {
					ulClass = 'acf-field-settings-tab-bar';
				}

				this.$el = $(
					'<div class="acf-tab-wrap -' +
						placement +
						'"><ul class="' +
						ulClass +
						'"></ul></div>'
				);
			}

			// append
			$before.before( this.$el );

			// set index
			this.set( 'index', i, true );
			i++;
		},

		initializeTabs: function () {
			// Bail if tabs are disabled.
			if (
				'acf_field_settings_tabs' === this.get( 'key' ) &&
				$( '#acf-field-group-fields' ).hasClass( 'hide-tabs' )
			) {
				return;
			}

			var tab = false;

			// check if we've got a saved default tab.
			var order = acf.getPreference( 'this.tabs' ) || false;
			if ( order ) {
				var groupIndex = this.get( 'index' );
				var tabIndex = order[ groupIndex ];
				if (
					this.tabs[ tabIndex ] &&
					this.tabs[ tabIndex ].isVisible()
				) {
					tab = this.tabs[ tabIndex ];
				}
			}

			// If we've got a defaultTab provided by configuration, use that.
			if (
				! tab &&
				this.data.defaultTab &&
				this.data.defaultTab.isVisible()
			) {
				tab = this.data.defaultTab;
			}

			// find first visible tab as our default.
			if ( ! tab ) {
				tab = this.getVisible().shift();
			}

			if ( tab ) {
				this.selectTab( tab );
			} else {
				this.closeTabs();
			}

			// set local variable used by tabsManager
			this.set( 'initialized', true );
		},

		getVisible: function () {
			return this.tabs.filter( function ( tab ) {
				return tab.isVisible();
			} );
		},

		getActive: function () {
			return this.active;
		},

		setActive: function ( tab ) {
			return ( this.active = tab );
		},

		hasActive: function () {
			return this.active !== false;
		},

		isActive: function ( tab ) {
			var active = this.getActive();
			return active && active.cid === tab.cid;
		},

		closeActive: function () {
			if ( this.hasActive() ) {
				this.closeTab( this.getActive() );
			}
		},

		openTab: function ( tab ) {
			// close existing tab
			this.closeActive();

			// open
			tab.open();

			// set active
			this.setActive( tab );
		},

		closeTab: function ( tab ) {
			// close
			tab.close();

			// set active
			this.setActive( false );
		},

		closeTabs: function () {
			this.tabs.map( this.closeTab, this );
		},

		selectTab: function ( tab ) {
			// close other tabs
			this.tabs.map( function ( t ) {
				if ( tab.cid !== t.cid ) {
					this.closeTab( t );
				}
			}, this );

			// open
			this.openTab( tab );
		},

		addTab: function ( $a, field ) {
			// create <li>
			var $li = $( '<li>' + $a.outerHTML() + '</li>' );

			// add settings type class.
			var settingsType = $a.data( 'settings-type' );
			if ( settingsType ) {
				$li.addClass( 'acf-settings-type-' + settingsType );
			}


			// append
			this.$( 'ul' ).append( $li );

			// initialize
			var tab = new Tab( {
				$el: $li,
				field: field,
				group: this,
			} );

			// store
			this.tabs.push( tab );

			if ( $a.data( 'selected' ) ) {
				this.data.defaultTab = tab;
			}

			// return
			return tab;
		},

		reset: function () {
			// close existing tab
			this.closeActive();

			// find and active a tab
			return this.refresh();
		},

		refresh: function () {
			// bail early if active already exists
			if ( this.hasActive() ) {
				return false;
			}
			// find next active tab
			var tab = this.getVisible().shift();
			// open tab
			if ( tab ) {
				this.openTab( tab );
			}

			// return
			return tab;
		},

		onRefresh: function () {
			// only for left placements
			if ( this.get( 'placement' ) !== 'left' ) {
				return;
			}

			// vars
			var $parent = this.$el.parent();
			var $list = this.$el.children( 'ul' );
			var attribute = $parent.is( 'td' ) ? 'height' : 'min-height';

			// find height (minus 1 for border-bottom)
			var height = $list.position().top + $list.outerHeight( true ) - 1;

			// add css
			$parent.css( attribute, height );
		},

		onCloseFieldObject: function ( fieldObject ) {
			const tab = this.getVisible().find( ( item ) => {
				const id = item.$el.closest( 'div[data-id]' ).data( 'id' );
				if ( fieldObject.data.id === id ) {
					return item;
				}
			} );

			if ( tab ) {
				// Wait for field group drawer to close
				setTimeout( () => {
					this.openTab( tab );
				}, 300 );
			}
		},
	} );

	var Tab = acf.Model.extend( {
		group: false,

		field: false,

		events: {
			'click a': 'onClick',
		},

		index: function () {
			return this.$el.index();
		},

		isVisible: function () {
			return acf.isVisible( this.$el );
		},

		isActive: function () {
			return this.$el.hasClass( 'active' );
		},

		open: function () {
			// add class
			this.$el.addClass( 'active' );

			// show field
			this.field.showFields();
		},

		close: function () {
			// remove class
			this.$el.removeClass( 'active' );

			// hide field
			this.field.hideFields();
		},

		onClick: function ( e, $el ) {
			// prevent default
			e.preventDefault();

			// toggle
			this.toggle();
		},

		toggle: function () {
			// bail early if already active
			if ( this.isActive() ) {
				return;
			}

			// toggle this tab
			this.group.openTab( this );
		},
	} );

	var tabsManager = new acf.Model( {
		priority: 50,

		actions: {
			refresh: 'render',
			prepare: 'render',
			append: 'render',
			unload: 'onUnload',
			show: 'render',
			invalid_field: 'onInvalidField',
		},

		findTabs: function () {
			return $( '.acf-tab-wrap' );
		},

		getTabs: function () {
			return acf.getInstances( this.findTabs() );
		},

		render: function ( $el ) {
			this.getTabs().map( function ( tabs ) {
				if ( ! tabs.get( 'initialized' ) ) {
					tabs.initializeTabs();
				}
			} );
		},

		onInvalidField: function ( field ) {
			// bail early if busy
			if ( this.busy ) {
				return;
			}

			// ignore if not hidden by tab
			if ( ! field.hiddenByTab ) {
				return;
			}

			// toggle tab
			field.hiddenByTab.toggle();

			// ignore other invalid fields
			this.busy = true;
			this.setTimeout( function () {
				this.busy = false;
			}, 100 );
		},

		onUnload: function () {
			// vars
			var order = [];

			// loop
			this.getTabs().map( function ( group ) {
				// Do not save selected tab on field settings, or an acf-advanced-settings when unloading
				if (
					group.$el.children( '.acf-field-settings-tab-bar' )
						.length ||
					group.$el.parents( '#acf-advanced-settings.postbox' ).length
				) {
					return true;
				}

				var active = group.hasActive() ? group.getActive().index() : 0;
				order.push( active );
			} );

			// bail if no tabs
			if ( ! order.length ) {
				return;
			}

			// update
			acf.setPreference( 'this.tabs', order );
		},
	} );
} )( jQuery );
