( function ( $, undefined ) {
	var Field = acf.Field.extend( {
		type: 'radio',

		events: {
			'click input[type="radio"]': 'onClick',
			'keydown input[type="radio"]': 'onKeyDownInput',
		},

		$control: function () {
			return this.$( '.acf-radio-list' );
		},

		$input: function () {
			return this.$( 'input:checked' );
		},

		$inputText: function () {
			return this.$( 'input[type="text"]' );
		},

		setValue: function ( val ) {
			// Remove previous selected state.
			this.$( '.selected' ).removeClass( 'selected' );

			// Uncheck all radios.
			this.$( 'input[type="radio"]' ).prop( 'checked', false );

			if ( val !== false && val !== null && val !== undefined && val !== '' ) {
				// Find and check the matching radio.
				const $radio = this.$( 'input[type="radio"]' ).filter( function () {
					return $( this ).val() === val;
				} );
				if ( $radio.length ) {
					$radio.prop( 'checked', true );
					$radio.parent( 'label' ).addClass( 'selected' );

					// Handle other_choice text input.
					if ( this.get( 'other_choice' ) ) {
						if ( val === 'other' ) {
							this.$inputText().prop( 'disabled', false );
						} else {
							this.$inputText().prop( 'disabled', true );
						}
					}
				}
			}
		},

		getValue: function () {
			var val = this.$input().val();
			if ( val === 'other' && this.get( 'other_choice' ) ) {
				val = this.$inputText().val();
			}
			return val;
		},

		onClick: function ( e, $el ) {
			// vars
			var $label = $el.parent( 'label' );
			var selected = $label.hasClass( 'selected' );
			var val = $el.val();

			// remove previous selected
			this.$( '.selected' ).removeClass( 'selected' );

			// add active class
			$label.addClass( 'selected' );

			// allow null
			if ( this.get( 'allow_null' ) && selected ) {
				$label.removeClass( 'selected' );
				$el.prop( 'checked', false ).trigger( 'change' );
				val = false;
			}

			// other
			if ( this.get( 'other_choice' ) ) {
				// enable
				if ( val === 'other' ) {
					this.$inputText().prop( 'disabled', false );

					// disable
				} else {
					this.$inputText().prop( 'disabled', true );
				}
			}
		},

		onKeyDownInput: function ( e, $el ) {
			const key = e.which;
			// Enter should activate the focused radio like Space does in browsers
			if ( key === 13 ) {
				e.preventDefault();
				$el.prop( 'checked', true ).trigger( 'change' );
			}
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
