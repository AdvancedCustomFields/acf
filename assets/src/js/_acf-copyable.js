( function ( $, undefined ) {
	acf.copyable = new acf.Model( {
		events: {
			'click .copyable': 'copyCopyable',
		},
		wait: 'ready',
		initialize: function () {
			if ( 'undefined' === typeof pagenow ){
				return;
			}

			const copyablePages = [
				'edit-acf-field-group',
				'edit-acf-post-type',
				'edit-acf-taxonomy',
				'edit-acf-ui-options-page'
			];

			if ( ! copyablePages.includes( pagenow ) ) {
				return;
			}

			// To be expanded in the future to more copyable elements.
			const $copyableElements = $( document ).find( '.column-acf-key' );

			// If there are no elements, there is nothing copyable.
			if ( ! $copyableElements ) {
				return;
			}
			
			// For each key, check the copyable class.
			$copyableElements.each( function () {
				$( this ).html( acf.copyable.makeCopyable( $( this ) ) );
			} );
		},
		makeCopyable: function ( $element ) {
			const copyableText = acf.strSanitize( $element.text() );
			const markup = $element.html();

			let copyableClass = 'copyable';
			if ( ! navigator.clipboard ) {
				copyableClass = `${copyableClass} copy-unsupported`;
			}

			return markup.replace(
				copyableText,
				`<span class="${copyableClass}">${copyableText}</span>`
			);
		},
		copyCopyable: function ( e ) {
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
					$( e.target )
						.closest( '.copyable' )
						.removeClass( 'copied' );
				}, 2000 );
			} );
		},
	});
} )( jQuery );
