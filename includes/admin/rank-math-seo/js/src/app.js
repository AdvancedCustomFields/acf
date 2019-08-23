var collect = require( './collect.js' );

var analysisTimeout = 0;

var App = function() {
	RankMathApp.registerPlugin( RankMathACFAnalysisConfig.pluginName );
	wp.hooks.addFilter( 'rank_math_content', RankMathACFAnalysisConfig.pluginName, collect.append.bind( collect ) );

	acf.add_action( 'change remove append sortstop', this.maybeRefresh );
};

App.prototype.maybeRefresh = function() {
	if ( analysisTimeout ) {
		window.clearTimeout( analysisTimeout );
	}

	analysisTimeout = window.setTimeout( function() {
		if ( RankMathACFAnalysisConfig.debug ) {
			console.log( 'Recalculate...' + new Date() + '(Internal)' );
		}

		RankMathApp.reloadPlugin( RankMathACFAnalysisConfig.pluginName );
	}, RankMathACFAnalysisConfig.refreshRate );
};

module.exports = App;
