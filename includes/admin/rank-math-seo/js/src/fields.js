var fieldObjects = {
	text: require( './fields/text.js' ),
	textarea: require( './fields/textarea.js' ),
	email: require( './fields/email.js' ),
	url: require( './fields/url.js' ),
	link: require( './fields/link.js' ),
	wysiwyg: require( './fields/wysiwyg.js' ),
	image: require( './fields/image.js' ),
	gallery: require( './fields/gallery.js' ),
	taxonomy: require( './fields/taxonomy.js' ),
};

var fields = {};

/**
 * Checks if there already is a field for a field type in the store.
 *
 * @param {string} type Type of field to find.
 *
 * @returns {boolean} True if the field is already defined.
 */
var hasField = function( type ) {
	return ( type in fields );
};

/**
 * Set a field object on the store. Existing fields will be overwritten.
 *
 * @param {Object} field The field to add.
 * @param {string} type Type of field.
 *
 * @returns {Object} Added field.
 */
var setField = function( field, type ) {
	if ( hasField( type ) ) {
		console.warn( 'Field for ' + type + ' already exists and will be overwritten.' );
	}

	fields[ type ] = field;
	return field;
};

/**
 * Returns the field object for a field type.
 *
 * @param {string} type Type of field to fetch.
 *
 * @returns {Object} The field for the specified type.
 */
var getField = function( type, fields_data ) {
	if ( hasField( type ) ) {
		return fields[ type ];
	}

	if ( type in fieldObjects ) {
		return setField( new fieldObjects[ type ]( fields_data ), type );
	}

	return {
		analyze: function( fields ) {
			if ( RankMathACFAnalysisConfig.debug ) {
				console.warn( 'No Scraper for field type: ' + type );
			}
			return fields;
		},
	};

	return fields_data;
};

module.exports = {
	setField: setField,
	getField: getField,
};
