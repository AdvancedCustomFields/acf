/* global, acf_escaped_html_notice */
( function ( $ ) {
	const $notice = $( '.acf-escaped-html-notice' );

	$notice.on( 'click', '.acf-show-more-details', function ( e ) {
		e.preventDefault();

		const $link = $( e.target );
		const $details = $link
			.closest( '.acf-escaped-html-notice' )
			.find( '.acf-error-details' );

		if ( $details.is( ':hidden' ) ) {
			$details.slideDown( 100 );
			$link.text( acf_escaped_html_notice.hide_details );
		} else {
			$details.slideUp( 100 );
			$link.text( acf_escaped_html_notice.show_details );
		}
	} );
} )( jQuery );
