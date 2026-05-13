( function ( $, undefined ) {
	const Field = acf.Field.extend( {
		type: 'button_group',

		events: {
			'click input[type="radio"]': 'onClick',
			'keydown label': 'onKeyDown',
		},

		$control: function () {
			return this.$( '.acf-button-group' );
		},

		$input: function () {
			return this.$( 'input:checked' );
		},

		initialize: function () {
			// Set up proper initial state for saved values
			this.updateButtonStates();
		},

		setValue: function ( val ) {
			this.$( 'input[value="' + val + '"]' )
				.prop( 'checked', true )
				.trigger( 'change' );

			// Update visual state and accessibility after setting value
			this.updateButtonStates();
		},

		updateButtonStates: function () {
			const $labels = this.$control().find( 'label' );
			const $checkedInput = this.$input();

			// Reset all labels
			$labels.removeClass( 'selected' ).attr( 'aria-checked', 'false' ).attr( 'tabindex', '-1' );

			// Set selected state for checked input
			if ( $checkedInput.length ) {
				const $selectedLabel = $checkedInput.parent( 'label' );
				$selectedLabel.addClass( 'selected' ).attr( 'aria-checked', 'true' ).attr( 'tabindex', '0' );
			} else {
				// If no selection, make first label focusable for keyboard navigation
				$labels.first().attr( 'tabindex', '0' );
			}
		},

		onClick: function ( e, $el ) {
			this.selectButton( $el.parent( 'label' ) );
		},

		onKeyDown: function ( e, $el ) {
			const key = e.which;

			// Enter or Space - activate button
			if ( key === 13 || key === 32 ) {
				e.preventDefault();
				this.selectButton( $el );
				return;
			}

			// Arrow keys - navigate between buttons (Left/Up = previous, Right/Down = next)
			if ( key === 37 || key === 39 || key === 38 || key === 40 ) {
				// Left/Right arrows
				e.preventDefault();
				const $labels = this.$control().find( 'label' );
				const currentIndex = $labels.index( $el );
				let nextIndex;

				if ( key === 37 || key === 38 ) {
					// Left or Up arrow -> previous
					nextIndex = currentIndex > 0 ? currentIndex - 1 : $labels.length - 1;
				} else {
					// Right or Down arrow -> next
					nextIndex = currentIndex < $labels.length - 1 ? currentIndex + 1 : 0;
				}

				const $next = $labels.eq( nextIndex );
				$labels.attr( 'tabindex', '-1' );
				$next.attr( 'tabindex', '0' ).trigger( 'focus' );
			}
		},

		selectButton: function ( $label ) {
			const $input = $label.find( 'input[type="radio"]' );
			const selected = $label.hasClass( 'selected' );

			// Set the input state first
			$input.prop( 'checked', true ).trigger( 'change' );

			// allow null - if clicking already selected button and null is allowed
			if ( this.get( 'allow_null' ) && selected ) {
				$input.prop( 'checked', false ).trigger( 'change' );
			}

			// Update all visual states and accessibility
			this.updateButtonStates();
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
