( function ( $, undefined ) {
	acf.models.Popup = acf.Model.extend( {
		data: {
			title: '',
			content: '',
			width: 0,
			height: 0,
			loading: false,
			openedBy: null,
			confirmRemove: false,
		},

		events: {
			'click [data-event="close"]': 'onClickClose',
			'click .acf-close-popup': 'onClickClose',
			'keydown': 'onPressEscapeClose',
		},

		setup: function ( props ) {
			$.extend( this.data, props );
			this.$el = $( this.tmpl() );
		},

		initialize: function () {
			this.render();
			this.open();
			this.focus();
			this.lockFocusToPopup( true );
		},

		tmpl: function () {
			return [
				'<div id="acf-popup" role="dialog" tabindex="-1">',
				'<div class="acf-popup-box acf-box">',
				'<div class="title"><h3></h3><a href="#" class="acf-icon -cancel grey" data-event="close" aria-label="' + acf.__( 'Close modal' ) + '"></a></div>',
				'<div class="inner"></div>',
				'<div class="loading"><i class="acf-loading"></i></div>',
				'</div>',
				'<div class="bg" data-event="close"></div>',
				'</div>',
			].join( '' );
		},

		render: function () {
			// Extract Vars.
			var title = this.get( 'title' );
			var content = this.get( 'content' );
			var loading = this.get( 'loading' );
			var width = this.get( 'width' );
			var height = this.get( 'height' );

			// Update.
			this.title( title );
			this.content( content );
			if ( width ) {
				this.$( '.acf-popup-box' ).css( 'width', width );
			}
			if ( height ) {
				this.$( '.acf-popup-box' ).css( 'min-height', height );
			}
			this.loading( loading );

			// Trigger action.
			acf.doAction( 'append', this.$el );
		},

		/**
		 * Places focus within the popup.
		 */
		focus: function() {
			this.$el.find( '.acf-icon' ).first().trigger( 'focus' );
		},

		/**
		 * Locks focus within the popup.
		 *
		 * @param {boolean} locked True to lock focus, false to unlock.
		 */
		lockFocusToPopup: function( locked ) {
			let inertElement = $( '#wpwrap' );

			if ( ! inertElement.length ) {
				return;
			}

			inertElement[ 0 ].inert = locked;
			inertElement.attr( 'aria-hidden', locked );
		},

		update: function ( props ) {
			this.data = acf.parseArgs( props, this.data );
			this.render();
		},

		title: function ( title ) {
			this.$( '.title:first h3' ).html( title );
		},

		content: function ( content ) {
			this.$( '.inner:first' ).html( content );
		},

		loading: function ( show ) {
			var $loading = this.$( '.loading:first' );
			show ? $loading.show() : $loading.hide();
		},

		open: function () {
			$( 'body' ).append( this.$el );
		},

		close: function () {
			this.lockFocusToPopup( false );
			this.returnFocusToOrigin();
			this.remove();
		},

		onClickClose: function ( e, $el ) {
			e.preventDefault();
			this.close();
		},

		/**
		 * Closes the popup when the escape key is pressed.
		 *
		 * @param {KeyboardEvent} e
		 */
		onPressEscapeClose: function( e ) {
			if ( e.key === 'Escape' ) {
				this.close();
			}
		},

		/**
		 * Returns focus to the element that opened the popup
		 * if it still exists in the DOM.
		 */
		returnFocusToOrigin: function() {
			if (
				this.data.openedBy instanceof $
				&& this.data.openedBy.closest( 'body' ).length > 0
			) {
				this.data.openedBy.trigger( 'focus' );
			}
		}

	} );

	/**
	 * A helper popup for confirming/cancelling an action.
	 *
	 * @since 6.5
	 *
	 * @param object props The props to pass to the popup.
	 * @return object
	 */
	acf.models.PopupConfirm = acf.models.Popup.extend( {
		data: {
			text: '',
			textConfirm: '',
			textCancel: '',
			context: false,
			confirm: function() {},
			cancel: function() {},
		},

		events: {
			'click [data-event="close"]': 'onCancel',
			'click .acf-close-popup': 'onClickClose',
			'keydown': 'onPressEscapeClose',
			'click [data-event="confirm"]': 'onConfirm',
		},

		tmpl: function () {
			return `
			<div id="acf-popup" role="dialog" tabindex="-1">
				<div class="acf-popup-box acf-box acf-confirm-popup">
					<div class="title">
						<h3>${this.get( 'title')}</h3>
						<a href="#" data-event="close" aria-label="${acf.__( 'Close modal' )}">
							<i class="acf-icon -close"></i>
						</a>
					</div>
					<div class="inner">
						<p>${acf.escHtml( this.get( 'text' ) )}</p>
						<div class="acf-actions">
							<button tabindex="0" type="button" data-event="close" class="acf-btn acf-btn-secondary acf-close-popup">${acf.strEscape( this.get( 'textCancel' ) )}</button>
							<button tabindex="0" type="submit" data-event="confirm" class="acf-btn acf-btn-primary acf-confirm">${acf.strEscape( this.get( 'textConfirm' ) )}</button>
						</div>
					</div>
				</div>
				<div class="bg" data-event="close"></div>
			</div>`;
		},

		render: function () {
			const loading = this.get( 'loading' );
			const width = this.get( 'width' );
			const height = this.get( 'height' );
			const self = this;

			if ( width ) {
				this.$( '.acf-popup-box' ).css( 'width', width );
			}

			if ( height ) {
				this.$( '.acf-popup-box' ).css( 'min-height', height );
			}

			this.loading( loading );
			acf.doAction( 'append', this.$el );

			setTimeout( function() {
				self.$el.find( '.acf-close-popup' ).trigger( 'focus' );
			}, 1 );
		},

		onConfirm: function( e, $el) {
			e.preventDefault();
			e.stopPropagation();

			this.close();

			const callback = this.get( 'confirm' );
			const context = this.get( 'context' ) || this;
			callback.apply( context, arguments );
		},

		onCancel: function( e, $el ) {
			e.preventDefault();
			e.stopPropagation();

			this.close();

			const callback = this.get( 'cancel' );
			const context = this.get( 'context' ) || this;
			callback.apply( context, arguments );
		},
	} );

	/**
	 *  newPopup
	 *
	 *  Creates a new Popup with the supplied props
	 *
	 *  @date	17/12/17
	 *  @since	5.6.5
	 *
	 *  @param	object props
	 *  @return	object
	 */

	acf.newPopup = function ( props ) {
		if ( props.confirmRemove ) {
			return new acf.models.PopupConfirm( props );
		}

		return new acf.models.Popup( props );
	};
} )( jQuery );
