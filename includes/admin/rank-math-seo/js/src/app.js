var config = require( './config/config.js' );
var collect = require( './collect/collect.js' );

var analysisTimeout = 0;

var App = function() {
	RankMathApp.registerPlugin( config.pluginName );
	wp.hooks.addFilter( 'rank_math_content', config.pluginName, collect.append.bind( collect ) );

	this.bindListeners();
};

App.prototype.bindListeners = function() {
	jQuery( this.acfListener.bind( this ) );
};

/**
 * ACF Listener.
 *
 * @returns {void}
 */
App.prototype.acfListener = function() {
	acf.add_action( 'change remove append sortstop', this.maybeRefresh );
};

App.prototype.maybeRefresh = function() {
	if ( analysisTimeout ) {
		window.clearTimeout( analysisTimeout );
	}

	analysisTimeout = window.setTimeout( function() {
		if ( config.debug ) {
			console.log( 'Recalculate...' + new Date() + '(Internal)' );
		}

		RankMathApp.reloadPlugin( config.pluginName );
	}, config.refreshRate );
};

module.exports = App;
