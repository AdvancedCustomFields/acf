var App = require( './src/app.js' );

$( document ).ready( function() {
	if ( 'undefined' !== typeof RankMathApp ) {
		RankMathACFAnalysis = new App();
	}
});
