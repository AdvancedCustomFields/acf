( function ( $, undefined ) {
	var i = 0;

	var Field = acf.Field.extend( {
		type: 'accordion',

		wait: '',

		$control: function () {
			return this.$( '.acf-fields:first' );
		},

		initialize: function () {
			// Bail early if this is a duplicate of an existing initialized accordion.
			if ( this.$el.hasClass( 'acf-accordion' ) ) {
				return;
			}

			// bail early if is cell
			if ( this.$el.is( 'td' ) ) return;

			// enpoint
			if ( this.get( 'endpoint' ) ) {
				return this.remove();
			}

			// vars
			var $field = this.$el;
			var $label = this.$labelWrap();
			var $input = this.$inputWrap();
			var $wrap = this.$control();
			var $instructions = $input.children( '.description' );

			// force description into label
			if ( $instructions.length ) {
				$label.append( $instructions );
			}

			// table
			if ( this.$el.is( 'tr' ) ) {
				// vars
				var $table = this.$el.closest( 'table' );
				var $newLabel = $( '<div class="acf-accordion-title"/>' );
				var $newInput = $( '<div class="acf-accordion-content"/>' );
				var $newTable = $(
					'<table class="' + $table.attr( 'class' ) + '"/>'
				);
				var $newWrap = $( '<tbody/>' );

				// dom
				$newLabel.append( $label.html() );
				$newTable.append( $newWrap );
				$newInput.append( $newTable );
				$input.append( $newLabel );
				$input.append( $newInput );

				// modify
				$label.remove();
				$wrap.remove();
				$input.attr( 'colspan', 2 );

				// update vars
				$label = $newLabel;
				$input = $newInput;
				$wrap = $newWrap;
			}

			// add classes
			$field.addClass( 'acf-accordion' );
			$label.addClass( 'acf-accordion-title' );
			$input.addClass( 'acf-accordion-content' );

			// index
			i++;

			// multi-expand
			if ( this.get( 'multi_expand' ) ) {
				$field.attr( 'multi-expand', 1 );
			}

			// open
			var order = acf.getPreference( 'this.accordions' ) || [];
			if ( order[ i - 1 ] !== undefined ) {
				this.set( 'open', order[ i - 1 ] );
			}

			if ( this.get( 'open' ) ) {
				$field.addClass( '-open' );
				$input.css( 'display', 'block' ); // needed for accordion to close smoothly
			}

			// add icon
			$label.prepend(
				accordionManager.iconHtml( { open: this.get( 'open' ) } )
			);

			// make keyboard accessible
			$label.attr( {
				'tabindex': '0',
				'role': 'button',
				'aria-expanded': this.get( 'open' ) ? 'true' : 'false',
			} );
			$input.attr( {
				'role': 'region',
			} );

			// classes
			// - remove 'inside' which is a #poststuff WP class
			var $parent = $field.parent();
			$wrap.addClass( $parent.hasClass( '-left' ) ? '-left' : '' );
			$wrap.addClass( $parent.hasClass( '-clear' ) ? '-clear' : '' );

			// append
			$wrap.append(
				$field.nextUntil( '.acf-field-accordion', '.acf-field' )
			);

			// clean up
			$wrap.removeAttr( 'data-open data-multi_expand data-endpoint' );
		},
	} );

	acf.registerFieldType( Field );

	/**
	 *  accordionManager
	 *
	 *  Events manager for the acf accordion
	 *
	 *  @date	14/2/18
	 *  @since	5.6.9
	 *
	 *  @param	void
	 *  @return	void
	 */

	var accordionManager = new acf.Model( {
		actions: {
			unload: 'onUnload',
		},

		events: {
			'click .acf-accordion-title': 'onClick',
			'keydown .acf-accordion-title': 'onKeydown',
			'invalidField .acf-accordion': 'onInvalidField',
		},

		isOpen: function ( $el ) {
			return $el.hasClass( '-open' );
		},

		toggle: function ( $el ) {
			if ( this.isOpen( $el ) ) {
				this.close( $el );
			} else {
				this.open( $el );
			}
		},

		iconHtml: function ( props ) {
			// Use SVG inside Gutenberg editor.
			if ( acf.isGutenberg() ) {
				if ( props.open ) {
					return '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="acf-accordion-icon components-panel__arrow" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>';
				} else {
					return '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class=" acf-accordion-icon components-panel__arrow" aria-hidden="true" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>';
				}
			} else {
				if ( props.open ) {
					return '<i class="acf-accordion-icon dashicons dashicons-arrow-down"></i>';
				} else {
					return '<i class="acf-accordion-icon dashicons dashicons-arrow-right"></i>';
				}
			}
		},

		open: function ( $el ) {
			var duration = acf.isGutenberg() ? 0 : 300;

			// open
			$el.find( '.acf-accordion-content:first' )
				.slideDown( duration )
				.css( 'display', 'block' );
			$el.find( '.acf-accordion-icon:first' ).replaceWith(
				this.iconHtml( { open: true } )
			);
			$el.addClass( '-open' );

			// update ARIA attribute
			$el.find( '.acf-accordion-title:first' ).attr( 'aria-expanded', 'true' );

			// action
			acf.doAction( 'show', $el );

			// close siblings
			if ( ! $el.attr( 'multi-expand' ) ) {
				$el.siblings( '.acf-accordion.-open' ).each( function () {
					accordionManager.close( $( this ) );
				} );
			}
		},

		close: function ( $el ) {
			var duration = acf.isGutenberg() ? 0 : 300;

			// close
			$el.find( '.acf-accordion-content:first' ).slideUp( duration );
			$el.find( '.acf-accordion-icon:first' ).replaceWith(
				this.iconHtml( { open: false } )
			);
			$el.removeClass( '-open' );

			// update ARIA attribute
			$el.find( '.acf-accordion-title:first' ).attr( 'aria-expanded', 'false' );

			// action
			acf.doAction( 'hide', $el );
		},

		onClick: function ( e, $el ) {
			// prevent Defailt
			e.preventDefault();

			// open close
			this.toggle( $el.parent() );
		},

		onKeydown: function ( e, $el ) {
			// Only handle Enter (13) key
			if ( e.which !== 13 ) {
				return;
			}

			// prevent default behavior
			e.preventDefault();

			// toggle accordion
			this.toggle( $el.parent() );
		},

		onInvalidField: function ( e, $el ) {
			// bail early if already focused
			if ( this.busy ) {
				return;
			}

			// disable functionality for 1sec (allow next validation to work)
			this.busy = true;
			this.setTimeout( function () {
				this.busy = false;
			}, 1000 );

			// open accordion
			this.open( $el );
		},

		onUnload: function ( e ) {
			// vars
			var order = [];

			// loop
			$( '.acf-accordion' ).each( function () {
				var open = $( this ).hasClass( '-open' ) ? 1 : 0;
				order.push( open );
			} );

			// set
			if ( order.length ) {
				acf.setPreference( 'this.accordions', order );
			}
		},
	} );
} )( jQuery );
