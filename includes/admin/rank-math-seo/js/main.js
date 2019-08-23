/* global jQuery, RankMathApp */
/* exported RankMathACFAnalysis */

var App = require( "./src/app.js" );

( function( $ ) {
	$( document ).ready( function() {
		if ( "undefined" !== typeof RankMathApp ) {
			RankMathACFAnalysis = new App();
		}
	});
}( jQuery ) );
