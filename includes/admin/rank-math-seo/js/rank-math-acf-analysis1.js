(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({1: [function(require, module, exports) {
/* global YoastSEO, acf, _, jQuery, wp */
var config = require( "./config/config.js" );
var helper = require( "./helper.js" );
var collect = require( "./collect/collect.js" );

var analysisTimeout = 0;

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

module.exports = App;

},{"./collect/collect.js":6,"./config/config.js":7,"./helper.js":8}],2:[function(require,module,exports){
/* global _ */
var cache = require( "./cache.js" );

var refresh = function( attachment_ids ) {
	var uncached = cache.getUncached( attachment_ids, "attachment" );

	if ( uncached.length === 0 ) {
		return;
	}

	window.wp.ajax.post( "query-attachments", {
		query: {
			post__in: uncached,
		},
	} ).done( function( attachments ) {
		_.each( attachments, function( attachment ) {
			cache.set( attachment.id, attachment, "attachment" );
			window.YoastACFAnalysis.maybeRefresh();
		} );
	} );
};

var get = function( id ) {
	var attachment = cache.get( id, "attachment" );

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
};

module.exports = {
	refresh: refresh,
	get: get,
};

},{"./cache.js":3}],3:[function(require,module,exports){
/* global _ */
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

module.exports = new Cache();

},{}],4:[function(require,module,exports){
/* global jQuery */

var config = require( "./../config/config.js" );
var fieldSelectors = config.fieldSelectors;

var field_data = [];

var fields = jQuery( "#post-body, #edittag" ).find( fieldSelectors.join( "," ) );

fields.each( function() {
	var $el = jQuery( this ).parents( ".field" ).last();

	field_data.push( {
		$el: $el,
		key: $el.data( "field_key" ),
		name: $el.data( "field_name" ),
		type: $el.data( "field_type" ),
		post_meta_key: $el.data( "field_name" ),
	} );
} );

module.exports = field_data;

},{"./../config/config.js":7}],5:[function(require,module,exports){
/* global _, acf, jQuery */

module.exports = function() {
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

},{}],6:[function(require,module,exports){
/* global _ */

var config = require( "./../config/config.js" );
var helper = require( "./../helper.js" );
var scraper_store = require( "./../scraper-store.js" );

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
	} );

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
	} );

	if ( config.debug ) {
		console.log( "Field data:" );
		console.table( field_data );

		console.log( "Data:" );
		console.log( data );
	}

	return data;
};

Collect.prototype.getData = function() {
	if ( helper.acf_version >= 5 ) {
		return require( "./collect-v5.js" )();
	}
	return require( "./collect-v4.js" );
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

module.exports = new Collect();

},{"./../config/config.js":7,"./../helper.js":8,"./../scraper-store.js":11,"./collect-v4.js":4,"./collect-v5.js":5}],7:[function(require,module,exports){
/* globals YoastACFAnalysisConfig */
module.exports = YoastACFAnalysisConfig;

},{}],8:[function(require,module,exports){
var config = require( "./config/config.js" );

module.exports = {
	acf_version: parseFloat( config.acfVersion, 10 ),
};

},{"./config/config.js":7}],9:[function(require,module,exports){
/* global jQuery, YoastSEO, YoastACFAnalysis: true */
/* exported YoastACFAnalysis */

var App = require( "./app.js" );

( function( $ ) {
	$( document ).ready( function() {
		if ( "undefined" !== typeof RankMathApp ) {
			YoastACFAnalysis = new App();
		}
	} );
}( jQuery ) );

},{"./app.js":1}],10:[function(require,module,exports){
/* global _, jQuery, YoastSEO */

var config = require( "./config/config.js" );

var supportedTypes = [ "email", "text", "textarea", "url", "wysiwyg" ];

},{"./config/config.js":7}],11:[function(require,module,exports){
var config = require( "./config/config.js" );

var scraperObjects = {
	// Basic
	text: require( "./scraper/scraper.text.js" ),
	textarea: require( "./scraper/scraper.textarea.js" ),
	email: require( "./scraper/scraper.email.js" ),
	url: require( "./scraper/scraper.url.js" ),
	link: require( "./scraper/scraper.link.js" ),

	// Content
	wysiwyg: require( "./scraper/scraper.wysiwyg.js" ),
	// TODO: Add oembed handler
	image: require( "./scraper/scraper.image.js" ),
	gallery: require( "./scraper/scraper.gallery.js" ),

	// Choice
	// TODO: select, checkbox, radio

	// Relational
	taxonomy: require( "./scraper/scraper.taxonomy.js" ),

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

module.exports = {
	setScraper: setScraper,
	getScraper: getScraper,
};

},{"./config/config.js":7,"./scraper/scraper.email.js":12,"./scraper/scraper.gallery.js":13,"./scraper/scraper.image.js":14,"./scraper/scraper.link.js":15,"./scraper/scraper.taxonomy.js":16,"./scraper/scraper.text.js":17,"./scraper/scraper.textarea.js":18,"./scraper/scraper.url.js":19,"./scraper/scraper.wysiwyg.js":20}],12:[function(require,module,exports){
/* global _ */

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "email" ) {
			return field;
		}

		field.content = field.$el.find( "input[type=email][id^=acf]" ).val();

		return field;
	} );

	return fields;
};

module.exports = Scraper;

},{}],13:[function(require,module,exports){
/* global _, jQuery */

var attachmentCache = require( "./../cache/cache.attachments.js" );

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		if ( field.type !== "gallery" ) {
			return field;
		}

		field.content = "";

		field.$el.find( ".acf-gallery-attachment input[type=hidden]" ).each( function() {
			// TODO: Is this the best way to get the attachment id?
			var attachment_id = jQuery( this ).val();

			// Collect all attachment ids for cache refresh
			attachment_ids.push( attachment_id );

			// If we have the attachment data in the cache we can return a useful value
			if ( attachmentCache.get( attachment_id, "attachment" ) ) {
				var attachment = attachmentCache.get( attachment_id, "attachment" );

				field.content += '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '">';
			}
		} );

		return field;
	} );

	attachmentCache.refresh( attachment_ids );

	return fields;
};

module.exports = Scraper;

},{"./../cache/cache.attachments.js":2}],14:[function(require,module,exports){
/* global _ */

var attachmentCache = require( "./../cache/cache.attachments.js" );

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		if ( field.type !== "image" ) {
			return field;
		}

		field.content = "";

		var attachment_id = field.$el.find( "input[type=hidden]" ).val();

		attachment_ids.push( attachment_id );

		if ( attachmentCache.get( attachment_id, "attachment" ) ) {
			var attachment = attachmentCache.get( attachment_id, "attachment" );

			field.content += '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '">';
		}


		return field;
	} );

	attachmentCache.refresh( attachment_ids );

	return fields;
};

module.exports = Scraper;

},{"./../cache/cache.attachments.js":2}],15:[function(require,module,exports){
/* global _ */
require( "./../scraper-store.js" );

var Scraper = function() {};

/**
 * Scraper for the link field type.
 *
 * @param {Object} fields Fields to parse.
 *
 * @returns {Object} Mapped list of fields.
 */
Scraper.prototype.scrape = function( fields ) {
	/**
	 * Set content for all link fields as a-tag with title, url and target.
	 * Return the fields object containing all fields.
	 */
	return _.map( fields, function( field ) {
		if ( field.type !== "link" ) {
			return field;
		}

		var title = field.$el.find( "input[type=hidden].input-title" ).val(),
			url = field.$el.find( "input[type=hidden].input-url" ).val(),
			target = field.$el.find( "input[type=hidden].input-target" ).val();

		field.content = "<a href=\"" + url + "\" target=\"" + target + "\">" + title + "</a>";

		return field;
	} );
};

module.exports = Scraper;

},{"./../scraper-store.js":11}],16:[function(require,module,exports){
/* global _, acf */

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "taxonomy" ) {
			return field;
		}

		var terms = [];

		if ( field.$el.find( '.acf-taxonomy-field[data-type="multi_select"]' ).length > 0 ) {
			var select2Target = ( acf.select2.version >= 4 ) ? "select" : "input";

			terms = _.pluck(
				field.$el.find( '.acf-taxonomy-field[data-type="multi_select"] ' + select2Target )
					.select2( "data" )
				, "text"
			);
		} else if ( field.$el.find( '.acf-taxonomy-field[data-type="checkbox"]' ).length > 0 ) {
			terms = _.pluck(
				field.$el.find( '.acf-taxonomy-field[data-type="checkbox"] input[type="checkbox"]:checked' )
					.next(),
				"textContent"
			);
		} else if ( field.$el.find( "input[type=checkbox]:checked" ).length > 0 ) {
			terms = _.pluck(
				field.$el.find( "input[type=checkbox]:checked" )
					.parent(),
				"textContent"
			);
		} else if ( field.$el.find( "select option:checked" ).length > 0 ) {
			terms = _.pluck(
				field.$el.find( "select option:checked" ),
				"textContent"
			);
		}

		terms = _.map( terms, function( term ) {
			return term.trim();
		} );

		if ( terms.length > 0 ) {
			field.content = "<ul>\n<li>" + terms.join( "</li>\n<li>" ) + "</li>\n</ul>";
		}

		return field;
	} );

	return fields;
};

module.exports = Scraper;

},{}],17:[function(require,module,exports){
/* global _ */

var config = require( "./../config/config.js" );

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
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

Scraper.prototype.wrapInHeadline = function( field ) {
	var level = this.isHeadline( field );
	if ( level ) {
		field.content = "<h" + level + ">" + field.content + "</h" + level + ">";
	} else {
		field.content = "<p>" + field.content + "</p>";
	}

	return field;
};

Scraper.prototype.isHeadline = function( field ) {
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

module.exports = Scraper;

},{"./../config/config.js":7}],18:[function(require,module,exports){
/* global _ */

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "textarea" ) {
			return field;
		}

		field.content = "<p>" + field.$el.find( "textarea[id^=acf]" ).val() + "</p>";

		return field;
	} );

	return fields;
};

module.exports = Scraper;

},{}],19:[function(require,module,exports){
/* global _ */

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "url" ) {
			return field;
		}

		var content = field.$el.find( "input[type=url][id^=acf]" ).val();

		field.content = content ? '<a href="' + content + '">' + content + "</a>" : "";

		return field;
	} );

	return fields;
};

module.exports = Scraper;

},{}],20:[function(require,module,exports){
/* global tinyMCE, _ */

var Scraper = function() {};

/**
 * Adapted from wp-seo-post-scraper-plugin-310.js:196-210
 *
 * @param {string} editorID TinyMCE identifier to look up.
 *
 * @returns {boolean} True if an editor exists for the supplied ID.
 */
var isTinyMCEAvailable = function( editorID ) {
	if ( typeof tinyMCE === "undefined" ||
		 typeof tinyMCE.editors === "undefined" ||
		 tinyMCE.editors.length === 0 ||
		 tinyMCE.get( editorID ) === null ||
		 tinyMCE.get( editorID ).isHidden() ) {
		return false;
	}

	return true;
};

/**
 * Adapted from wp-seo-shortcode-plugin-305.js:115-126
 *
 * @param {Object} field Field to get the content for.
 *
 * @returns {string} The content of the field.
 */
var getContentTinyMCE = function( field ) {
	var textarea = field.$el.find( "textarea" )[ 0 ];
	var editorID = textarea.id;
	var val = textarea.value;

	if ( isTinyMCEAvailable( editorID ) ) {
		val = tinyMCE.get( editorID ) && tinyMCE.get( editorID ).getContent() || "";
	}

	return val;
};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( field.type !== "wysiwyg" ) {
			return field;
		}

		field.content = getContentTinyMCE( field );

		return field;
	} );

	return fields;
};

module.exports = Scraper;

},{}]},{},[9]);
