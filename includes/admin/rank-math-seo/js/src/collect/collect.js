var config        = require( './../config/config.js' );
var scraper_store = require( './../scraper-store.js' );

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
				data = field.content + "\n" + data;
				return;
			}
			data += "\n" + field.content;
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
			outerFields = [],
			fields = _.map( acf.get_fields(), function( field ) {
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
			});

	if ( outerFields.length === 0 ) {
		return fields;
	}

	// Transform field names for nested fields.
	_.each( innerFields, function( inner ) {
		_.each( outerFields, function( outer ) {
			if ( jQuery.contains( outer.$el[ 0 ], inner.$el[ 0 ] ) ) {
				// Types that hold multiple children.
				if ( 'flexible_content' === outer.type  || 'repeater' === outer.type ) {
					outer.children = outer.children || [];
					outer.children.push( inner );
					inner.parent = outer;
					inner.post_meta_key = outer.name + "_" + ( outer.children.length - 1 ) + "_" + inner.name;
				}

				// Types that hold single children.
				if ( 'group' === outer.type ) {
					outer.children = [ inner ];
					inner.parent = outer;
					inner.post_meta_key = outer.name + "_" + inner.name;
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
	if ( 'undefined' === typeof config.fieldOrder  || ! config.fieldOrder ) {
		return field_data;
	}

	_.each( field_data, function( field ) {
		field.order = ( 'undefined' === typeof config.fieldOrder[ field.key ] ) ? 0 : config.fieldOrder[ field.key ];
	});

	return field_data.sort( function( a, b ) {
		return a.order > b.order;
	});
};

module.exports = new Collect();
