/* global jQuery, RankMathApp, RankMathACFAnalysis: true */
/* exported RankMathApp */

var config = RankMathACFAnalysisConfig;

// Scrapper Store
var TextScrapper = function() {};
TextScrapper.prototype.scrape = function( fields ) {
	var that = this;

	fields = _.map( fields, function( field ) {
		if ( 'text' !== field.type ) {
			return field;
		}

		field.content = field.$el.find( 'input[type=text][id^=acf]' ).val();
		field = that.wrapInHeadline( field );

		return field;
	});

	return fields;
};

TextScrapper.prototype.wrapInHeadline = function( field ) {
	var level = this.isHeadline( field );
	if ( level ) {
		field.content = '<h' + level + '>' + field.content + '</h' + level + '>';
	} else {
		field.content = '<p>' + field.content + '</p>';
	}

	return field;
};

TextScrapper.prototype.isHeadline = function( field ) {
	var level = _.find( config.scraper.text.headlines, function( value, key ) {
		return field.key === key;
	});

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
		if ( 'textarea' !== field.type ) {
			return field;
		}

		field.content = '<p>' + field.$el.find( 'textarea[id^=acf]' ).val() + '</p>';

		return field;
	} );

	return fields;
};

// Cache
var Cache = function() {
	this.clear( "all" );
};

var _cache;

Cache.prototype.set = function( id, value, store ) {
	store = typeof store === "undefined" ? "default" : store;

	if ( ! ( store in _cache ) ) {
		_cache[ store ] = {};
	}

	_cache[ store ][ id ] = value;
};

Cache.prototype.get =  function( id, store ) {
	store = typeof store === "undefined" ? "default" : store;

	if ( store in _cache && id in _cache[ store ] ) {
		return _cache[ store ][ id ];
	}

	return false;
};

Cache.prototype.getUncached =  function( ids, store ) {
	store = typeof store === "undefined" ? "default" : store;

	var that = this;

	ids = _.uniq( ids );

	return ids.filter( function( id ) {
		var value = that.get( id, store );

		return value === false;
	} );
};

Cache.prototype.clear =  function( store ) {
	store = typeof store === "undefined" ? "default" : store;

	if ( store === "all" ) {
		_cache = {};
	} else {
		_cache[ store ] = {};
	}
};

var cache = new Cache();

// Attachment Cache
var attachmentCache = {
	refresh: function( attachment_ids ) {
		var uncached = cache.getUncached( attachment_ids, 'attachment' );

		if ( uncached.length === 0 ) {
			return;
		}

		window.wp.ajax.post( 'query-attachments', {
			query: {
				post__in: uncached,
			},
		} ).done( function( attachments ) {
			_.each( attachments, function( attachment ) {
				cache.set( attachment.id, attachment, 'attachment' );
				window.RankMathACFAnalysis.maybeRefresh();
			} );
		} );
	},
	get: function( id ) {
		var attachment = cache.get( id, 'attachment' );
		if ( ! attachment ) {
			return false;
		}

		var changedAttachment = window.wp.media.attachment( id );

		if ( changedAttachment.has( "alt" ) ) {
			attachment.alt = changedAttachment.get( "alt" );
		}

		if ( changedAttachment.has( "title" ) ) {
			attachment.title = changedAttachment.get( "title" );
		}

		return attachment;
	},
};

// Image Scrapper
var ImageScrapper = function() {};
ImageScrapper.prototype.scrape = function( fields ) {
	var attachment_ids = [];
	fields = _.map( fields, function( field ) {
		if ( field.type !== "image" ) {
			return field;
		}

		field.content = "";

		var attachment_id = field.$el.find( "input[type=hidden]" ).val();

		attachment_ids.push( attachment_id );
		// if ( attachmentCache.get( attachment_id, "attachment" ) ) {
			var attachment = attachmentCache.get( attachment_id, 'attachment' );
			field.content += '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '">';
		// }

		return field;
	});

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
	image: ImageScrapper,
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
		console.warn( 'Scraper for ' + type + ' already exists and will be overwritten.' );
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
				console.warn( 'No Scraper for field type: ' + type );
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
var Collect = function() {};

Collect.prototype.getFieldData = function() {
	var field_data = this.sort( this.filterBroken( this.filterBlacklistName( this.filterBlacklistType( this.getData() ) ) ) );
	var used_types = _.uniq( _.pluck( field_data, 'type' ) );

	if ( config.debug ) {
		console.log( 'Used types:' );
		console.log( used_types );
	}

	_.each( used_types, function( type ) {
		field_data = scraper_store.getScraper( type ).scrape( field_data );
	});

	return field_data;
};

Collect.prototype.append = function( data ) {
	if ( config.debug ) {
		console.log( 'Recalculate...' + new Date() );
	}

	var field_data = this.getFieldData();
	_.each( field_data, function( field ) {
		if ( 'undefined' !== typeof field.content && '' !== field.content ) {
			if ( field.order < 0 ) {
				data = field.content + '\n' + data;
				return;
			}
			data += '\n' + field.content;
		}
	});

	if ( config.debug ) {
		console.log( 'Field data:' );
		console.table( field_data );

		console.log( 'Data:' );
		console.log( data );
	}

	return data;
};

Collect.prototype.getData = function() {
	var outerFieldsName = [
		'flexible_content',
		'repeater',
		'group',
	];

	var innerFields = [],
			outerFields = [];

	var fields = _.map( acf.get_fields(), function( field ) {
		var field_data           = jQuery.extend( true, {}, acf.get_data( jQuery( field ) ) );
		field_data.$el           = jQuery( field );
		field_data.post_meta_key = field_data.name;

		// Collect nested and parent
		if ( -1 === outerFieldsName.indexOf( field_data.type ) ) {
			innerFields.push( field_data );
		} else {
			outerFields.push( field_data );
		}
		return field_data;
	});

	if ( 0 === outerFields.length ) {
		return fields;
	}

	// Transform field names for nested fields.
	_.each( innerFields, function( inner ) {
		_.each( outerFields, function( outer ) {
			if ( jQuery.contains( outer.$el[ 0 ], inner.$el[ 0 ] ) ) {
				// Types that hold multiple children.
				if ( 'flexible_content' === outer.type || 'repeater' === outer.type ) {
					outer.children = outer.children || [];
					outer.children.push( inner );
					inner.parent = outer;
					inner.post_meta_key = outer.name + '_' + ( outer.children.length - 1 ) + '_' + inner.name;
				}

				// Types that hold single children.
				if ( 'group' === outer.type ) {
					outer.children = [ inner ];
					inner.parent = outer;
					inner.post_meta_key = outer.name + '_' + inner.name;
				}
			}
		});
	});

	return fields;
};

Collect.prototype.filterBlacklistType = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ! _.contains( config.blacklistType, field.type );
	});
};

Collect.prototype.filterBlacklistName = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ! _.contains( config.blacklistName, field.name );
	});
};

Collect.prototype.filterBroken = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ( 'key' in field );
	});
};

Collect.prototype.sort = function( field_data ) {
	if ( typeof config.fieldOrder === 'undefined' || ! config.fieldOrder ) {
		return field_data;
	}

	_.each( field_data, function( field ) {
		field.order = ( typeof config.fieldOrder[ field.key ] === 'undefined' ) ? 0 : config.fieldOrder[ field.key ];
	});

	return field_data.sort( function( a, b ) {
		return a.order > b.order;
	});
};

var collect = new Collect();

var App = function() {
	RankMathApp.registerPlugin( config.pluginName );
	wp.hooks.addFilter( 'rank_math_content', config.pluginName, collect.append.bind( collect ) );

	this.bindListeners();
};

App.prototype.bindListeners = function() {
	jQuery( this.acfListener.bind( this ) );
};

/**
 * ACF 5 Listener.
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

jQuery( document ).ready( function() {
	if ( 'undefined' !== typeof RankMathApp ) {
		RankMathACFAnalysis = new App();
	}
});
