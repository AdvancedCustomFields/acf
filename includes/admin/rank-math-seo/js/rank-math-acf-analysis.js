/* global jQuery, RankMathApp, YoastACFAnalysis: true */
/* exported RankMathApp */

var config = YoastACFAnalysisConfig;

// Scrapper Store
var TextScrapper = function() {};
TextScrapper.prototype.scrape = function( fields ) {
	var that = this;

	fields = _.map( fields, function( field ) {
		if ( field.type !== "text" ) {
			return field;
		}

		field.content = field.$el.find( "input[type=text][id^=acf]" ).val();
		field = that.wrapInHeadline( field );

		return field;
	} );

	return fields;
};

TextScrapper.prototype.wrapInHeadline = function( field ) {
	var level = this.isHeadline( field );
	if ( level ) {
		field.content = "<h" + level + ">" + field.content + "</h" + level + ">";
	} else {
		field.content = "<p>" + field.content + "</p>";
	}

	return field;
};

TextScrapper.prototype.isHeadline = function( field ) {
	var level = _.find( config.scraper.text.headlines, function( value, key ) {
		return field.key === key;
	} );

	// It has to be an integer
	if ( level ) {
		level = parseInt( level, 10 );
	}

	// Headlines only exist from h1 to h6
	if ( level < 1 || level > 6 ) {
		level = false;
	}

	return level;
};

var TextAreaScrapper = function() {};
TextAreaScrapper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "textarea" ) {
			return field;
		}

		field.content = "<p>" + field.$el.find( "textarea[id^=acf]" ).val() + "</p>";

		return field;
	} );

	return fields;
};

var scraperObjects = {
	// Basic
	text: TextScrapper,
	textarea: TextAreaScrapper,
	// email: require( "./scraper/scraper.email.js" ),
	// url: require( "./scraper/scraper.url.js" ),
	// link: require( "./scraper/scraper.link.js" ),

	// // Content
	// wysiwyg: require( "./scraper/scraper.wysiwyg.js" ),
	// // TODO: Add oembed handler
	// image: require( "./scraper/scraper.image.js" ),
	// gallery: require( "./scraper/scraper.gallery.js" ),

	// // Choice
	// // TODO: select, checkbox, radio

	// // Relational
	// taxonomy: require( "./scraper/scraper.taxonomy.js" ),

	// Third-party / jQuery
	// TODO: google_map, date_picker, color_picker

};

var scrapers = {};

/**
 * Checks if there already is a scraper for a field type in the store.
 *
 * @param {string} type Type of scraper to find.
 *
 * @returns {boolean} True if the scraper is already defined.
 */
var hasScraper = function( type ) {
	return (
		type in scrapers
	);
};

/**
 * Set a scraper object on the store. Existing scrapers will be overwritten.
 *
 * @param {Object} scraper The scraper to add.
 * @param {string} type Type of scraper.
 *
 * @chainable
 *
 * @returns {Object} Added scraper.
 */
var setScraper = function( scraper, type ) {
	if ( config.debug && hasScraper( type ) ) {
		console.warn( "Scraper for " + type + " already exists and will be overwritten." );
	}

	scrapers[ type ] = scraper;

	return scraper;
};

/**
 * Returns the scraper object for a field type.
 * If there is no scraper object for this field type a no-op scraper is returned.
 *
 * @param {string} type Type of scraper to fetch.
 *
 * @returns {Object} The scraper for the specified type.
 */
var getScraper = function( type ) {
	if ( hasScraper( type ) ) {
		return scrapers[ type ];
	}

	if ( type in scraperObjects ) {
		return setScraper( new scraperObjects[ type ](), type );
	}

	// If we do not have a scraper just pass the fields through so it will be filtered out by the app.
	return {
		scrape: function( fields ) {
			if ( config.debug ) {
				console.warn( "No Scraper for field type: " + type );
			}
			return fields;
		},
	};
};

var scraper_store = {
	setScraper: setScraper,
	getScraper: getScraper,
};

// Collect
var Collect = function() {

};

Collect.prototype.getFieldData = function() {
	var field_data = this.sort( this.filterBroken( this.filterBlacklistName( this.filterBlacklistType( this.getData() ) ) ) );

	var used_types = _.uniq( _.pluck( field_data, "type" ) );

	if ( config.debug ) {
		console.log( "Used types:" );
		console.log( used_types );
	}

	_.each( used_types, function( type ) {
		field_data = scraper_store.getScraper( type ).scrape( field_data );
	});

	return field_data;
};

Collect.prototype.append = function( data ) {
	if ( config.debug ) {
		console.log( "Recalculate..." + new Date() );
	}

	var field_data = this.getFieldData();

	_.each( field_data, function( field ) {
		if ( typeof field.content !== "undefined" && field.content !== "" ) {
			if ( field.order < 0 ) {
				data = field.content + "\n" + data;
				return;
			}
			data += "\n" + field.content;
		}
	});

	if ( config.debug ) {
		console.log( "Field data:" );
		console.table( field_data );

		console.log( "Data:" );
		console.log( data );
	}

	return data;
};

Collect.prototype.getData = function() {
	var outerFieldsName = [
		"flexible_content",
		"repeater",
		"group",
	];

	var innerFields = [];
	var outerFields = [];

	var fields = _.map( acf.get_fields(), function( field ) {
		var field_data = jQuery.extend( true, {}, acf.get_data( jQuery( field ) ) );
		field_data.$el = jQuery( field );
		field_data.post_meta_key = field_data.name;

		// Collect nested and parent
		if ( outerFieldsName.indexOf( field_data.type ) === -1 ) {
			innerFields.push( field_data );
		} else {
			outerFields.push( field_data );
		}

		return field_data;
	} );

	if ( outerFields.length === 0 ) {
		return fields;
	}

	// Transform field names for nested fields.
	_.each( innerFields, function( inner ) {
		_.each( outerFields, function( outer ) {
			if ( jQuery.contains( outer.$el[ 0 ], inner.$el[ 0 ] ) ) {
				// Types that hold multiple children.
				if ( outer.type === "flexible_content" || outer.type === "repeater" ) {
					outer.children = outer.children || [];
					outer.children.push( inner );
					inner.parent = outer;
					inner.post_meta_key = outer.name + "_" + ( outer.children.length - 1 ) + "_" + inner.name;
				}

				// Types that hold single children.
				if ( outer.type === "group" ) {
					outer.children = [ inner ];
					inner.parent = outer;
					inner.post_meta_key = outer.name + "_" + inner.name;
				}
			}
		} );
	} );

	return fields;
};

Collect.prototype.filterBlacklistType = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ! _.contains( config.blacklistType, field.type );
	} );
};

Collect.prototype.filterBlacklistName = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ! _.contains( config.blacklistName, field.name );
	} );
};

Collect.prototype.filterBroken = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ( "key" in field );
	} );
};

Collect.prototype.sort = function( field_data ) {
	if ( typeof config.fieldOrder === "undefined" || ! config.fieldOrder ) {
		return field_data;
	}

	_.each( field_data, function( field ) {
		field.order = ( typeof config.fieldOrder[ field.key ] === "undefined" ) ? 0 : config.fieldOrder[ field.key ];
	} );

	return field_data.sort( function( a, b ) {
		return a.order > b.order;
	} );
};

var collect = new Collect();


var App = function() {
	RankMathApp.registerPlugin( config.pluginName );
	wp.hooks.addFilter( 'rank_math_content', config.pluginName, collect.append.bind( collect ) );

	this.bindListeners();
};

App.prototype.bindListeners = function() {
	jQuery( this.acf5Listener.bind( this ) );
};

/**
 * ACF 5 Listener.
 *
 * @returns {void}
 */
App.prototype.acf5Listener = function() {
	console.log(acf);
	acf.add_action( "change remove append sortstop", this.maybeRefresh );
};

App.prototype.maybeRefresh = function() {
	console.log('maybe');
	console.log(analysisTimeout);
	if ( analysisTimeout ) {
		window.clearTimeout( analysisTimeout );
	}

	analysisTimeout = window.setTimeout( function() {
		if ( config.debug ) {
			console.log( "Recalculate..." + new Date() + "(Internal)" );
		}

		RankMathApp.reloadPlugin( config.pluginName );
	}, config.refreshRate );
};

( function( $ ) {
	$( document ).ready( function() {
		if ( "undefined" !== typeof RankMathApp ) {
			YoastACFAnalysis = new App();
		}
	} );
}( jQuery ) );
