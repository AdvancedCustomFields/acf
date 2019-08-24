var collect = require( './collect.js' );

var analysisTimeout = 0;

var App = function() {
	RankMathApp.registerPlugin( RankMathACFAnalysisConfig.pluginName );
	wp.hooks.addFilter( 'rank_math_content', RankMathACFAnalysisConfig.pluginName, collect.append.bind( collect ) );
	this.events();
};

App.prototype.events = function() {
	var self = this;
	jQuery( '.acf-field' ).on( 'change', function() {
		self.maybeRefresh();
	});
};

App.prototype.maybeRefresh = function() {
	if ( analysisTimeout ) {
		window.clearTimeout( analysisTimeout );
	}

	analysisTimeout = window.setTimeout( function() {
		RankMathApp.reloadPlugin( RankMathACFAnalysisConfig.pluginName );
	}, RankMathACFAnalysisConfig.refreshRate );
};

module.exports = App;
