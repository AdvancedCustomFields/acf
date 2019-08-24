var Collect = function() {};

var fields = {
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

Collect.prototype.getContent = function() {
	var field_data = this.filterFields( this.getData() );
	var used_types = _.uniq( _.pluck( field_data, 'type' ) );
	if ( RankMathACFAnalysisConfig.debug ) {
		console.log( 'Used types:' );
		console.log( used_types );
	}

	_.each( used_types, function( type ) {
		if ( type in fields ) {
			field_data = new fields[ type ]( field_data );
		}
	});

	return field_data;
};

Collect.prototype.append = function( data ) {
	var field_data = this.getContent();
	_.each( field_data, function( field ) {
		if ( 'undefined' !== typeof field.content && '' !== field.content ) {
			data += '\n' + field.content;
		}
	});

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

	var acf_fields = _.map( acf.get_fields(), function( field ) {
		var field_data = jQuery.extend( true, {}, acf.get_data( jQuery( field ) ) );
		field_data.$el = jQuery( field );
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
		return acf_fields;
	}

	// Transform field names for nested acf_fields.
	_.each( innerFields, function( inner ) {
		_.each( outerFields, function( outer ) {
			if ( jQuery.contains( outer.$el[ 0 ], inner.$el[ 0 ] ) ) {
				// Types that hold multiple children.
				if ( 'flexible_content' === outer.type  || 'repeater' === outer.type ) {
					outer.children = outer.children || [];
					outer.children.push( inner );
					inner.parent        = outer;
					inner.post_meta_key = outer.name + "_" + ( outer.children.length - 1 ) + "_" + inner.name;
				}

				// Types that hold single children.
				if ( 'group' === outer.type ) {
					outer.children      = [ inner ];
					inner.parent        = outer;
					inner.post_meta_key = outer.name + "_" + inner.name;
				}
			}
		});
	});

	return acf_fields;
};

Collect.prototype.filterFields = function( field_data ) {
	return _.filter( field_data, function( field ) {
		return ! _.contains( RankMathACFAnalysisConfig.blacklistFields.type, field.type ) &&
					! _.contains( RankMathACFAnalysisConfig.blacklistFields.name, field.name ) &&
					( 'key' in field );
	});

	return field_data;
};

module.exports = new Collect();
