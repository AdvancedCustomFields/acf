var scraperObjects = {
	text: require( './scraper/scraper.text.js' ),
	textarea: require( './scraper/scraper.textarea.js' ),
	email: require( './scraper/scraper.email.js' ),
	url: require( './scraper/scraper.url.js' ),
	link: require( './scraper/scraper.link.js' ),
	wysiwyg: require( './scraper/scraper.wysiwyg.js' ),
	image: require( './scraper/scraper.image.js' ),
	gallery: require( './scraper/scraper.gallery.js' ),
	taxonomy: require( './scraper/scraper.taxonomy.js' ),
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
	return ( type in scrapers );
};

/**
 * Set a scraper object on the store. Existing scrapers will be overwritten.
 *
 * @param {Object} scraper The scraper to add.
 * @param {string} type Type of scraper.
 *
 * @returns {Object} Added scraper.
 */
var setScraper = function( scraper, type ) {
	if ( RankMathACFAnalysisConfig.debug && hasScraper( type ) ) {
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
			if ( RankMathACFAnalysisConfig.debug ) {
				console.warn( 'No Scraper for field type: ' + type );
			}
			return fields;
		},
	};
};

module.exports = {
	setScraper: setScraper,
	getScraper: getScraper,
};
