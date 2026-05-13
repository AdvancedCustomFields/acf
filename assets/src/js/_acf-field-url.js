( function ( $, undefined ) {
	var Field = acf.Field.extend( {
		type: 'url',

		events: {
			'keyup input[type="url"]': 'onkeyup',
		},

		$control: function () {
			return this.$( '.acf-input-wrap' );
		},

		$input: function () {
			return this.$( 'input[type="url"]' );
		},

		initialize: function () {
			this.render();
		},

		isValid: function () {
			// vars
			var val = this.val();

			// bail early if no val
			if ( ! val ) {
				return false;
			}

			// url
			if ( val.indexOf( '://' ) !== -1 ) {
				return true;
			}

			// protocol relative url
			if ( val.indexOf( '//' ) === 0 ) {
				return true;
			}

			// return
			return false;
		},

		render: function () {
			// add class
			if ( this.isValid() ) {
				this.$control().addClass( '-valid' );
			} else {
				this.$control().removeClass( '-valid' );
			}
		},

		onkeyup: function ( e, $el ) {
			this.render();
		},
	} );

	acf.registerFieldType( Field );
} )( jQuery );
