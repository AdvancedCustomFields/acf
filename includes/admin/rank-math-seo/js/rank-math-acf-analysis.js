(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var App = require( './src/app.js' );

$( document ).ready( function() {
	if ( 'undefined' !== typeof RankMathApp ) {
		RankMathACFAnalysis = new App();
	}
});

},{"./src/app.js":2}],2:[function(require,module,exports){
var collect = require( './collect.js' );

var analysisTimeout = 0;

var App = function() {
	RankMathApp.registerPlugin( RankMathACFAnalysisConfig.pluginName );
	wp.hooks.addFilter( 'rank_math_content', RankMathACFAnalysisConfig.pluginName, collect.append.bind( collect ) );
	if( RankMathACFAnalysisConfig.enableReload )
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

},{"./collect.js":3}],3:[function(require,module,exports){
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

	_.each( innerFields, function( inner ) {
		_.each( outerFields, function( outer ) {
			if ( jQuery.contains( outer.$el[ 0 ], inner.$el[ 0 ] ) ) {
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

},{"./fields/email.js":6,"./fields/gallery.js":7,"./fields/image.js":8,"./fields/link.js":9,"./fields/taxonomy.js":10,"./fields/text.js":11,"./fields/textarea.js":12,"./fields/url.js":13,"./fields/wysiwyg.js":14}],4:[function(require,module,exports){
var cache = require( './cache.js' );

var refresh = function( attachment_ids ) {
	var uncached = cache.getUncached( attachment_ids, 'attachment' );

	if ( 0 === uncached.length ) {
		return;
	}

	window.wp.ajax.post( 'query-attachments', {
		query: {
			post__in: uncached,
		},
	}).done( function( attachments ) {
		_.each( attachments, function( attachment ) {
			cache.set( attachment.id, attachment, 'attachment' );
			window.RankMathACFAnalysis.maybeRefresh();
		});
	});
};

var get = function( id ) {
	var attachment = cache.get( id, 'attachment' );

	if ( ! attachment ) {
		return false;
	}

	var changedAttachment = window.wp.media.attachment( id );

	if ( changedAttachment.has( 'alt' ) ) {
		attachment.alt = changedAttachment.get( 'alt' );
	}

	if ( changedAttachment.has( 'title' ) ) {
		attachment.title = changedAttachment.get( 'title' );
	}

	return attachment;
};

module.exports = {
	refresh: refresh,
	get: get,
};

},{"./cache.js":5}],5:[function(require,module,exports){
var Cache = function() {
	this.clear( 'all' );
};

var _cache;

Cache.prototype.set = function( id, value, store ) {
	store = 'undefined' === typeof store ? 'default' : store;

	if ( ! ( store in _cache ) ) {
		_cache[ store ] = {};
	}

	_cache[ store ][ id ] = value;
};

Cache.prototype.get =  function( id, store ) {
	store = 'undefined' === typeof store ? 'default' : store;

	if ( store in _cache && id in _cache[ store ] ) {
		return _cache[ store ][ id ];
	}

	return false;
};

Cache.prototype.getUncached =  function( ids, store ) {
	store = 'undefined' === typeof store ? 'default' : store;

	var that = this;

	ids = _.uniq( ids );

	return ids.filter( function( id ) {
		var value = that.get( id, store );
		return value === false;
	});
};

Cache.prototype.clear =  function( store ) {
	store = 'undefined' === typeof store ? 'default' : store;

	if ( 'all' === store ) {
		_cache = {};
	} else {
		_cache[ store ] = {};
	}
};

module.exports = new Cache();

},{}],6:[function(require,module,exports){
var Email = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'email' !== field.type ) {
			return field;
		}

		field.content = field.$el.find( 'input[type=email][id^=acf]' ).val();

		return field;
	});

	return fields;
};

module.exports = Email;

},{}],7:[function(require,module,exports){
var attachmentCache = require( './cache.attachments.js' );
var Gallery = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		if ( 'gallery' !== field.type ) {
			return field;
		}

		field.content = '';

		field.$el.find( '.acf-gallery-attachment input[type=hidden]' ).each( function() {
			var attachment_id = jQuery( this ).val();
			attachment_ids.push( attachment_id );

			if ( attachmentCache.get( attachment_id, 'attachment' ) ) {
				var attachment = attachmentCache.get( attachment_id, 'attachment' );
				field.content += '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '">';
			}
		});

		return field;
	});

	attachmentCache.refresh( attachment_ids );

	return fields;
};

module.exports = Gallery;

},{"./cache.attachments.js":4}],8:[function(require,module,exports){
var attachmentCache = require( './cache.attachments.js' );
var Image = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		if ( 'image' !== field.type ) {
			return field;
		}

		field.content = '';

		var attachment_id = field.$el.find( 'input[type=hidden]' ).val();

		attachment_ids.push( attachment_id );
		if ( attachmentCache.get( attachment_id, 'attachment' ) ) {
			var attachment = attachmentCache.get( attachment_id, 'attachment' );
			field.content += '<img src="' + attachment.url + '" alt="' + attachment.alt + '" title="' + attachment.title + '">';
		}

		return field;
	});

	attachmentCache.refresh( attachment_ids );

	return fields;
};

module.exports = Image;

},{"./cache.attachments.js":4}],9:[function(require,module,exports){
var Link = function( fields ) {
	return _.map( fields, function( field ) {
		if ( 'link' !== field.type ) {
			return field;
		}

		var title  = field.$el.find( 'input[type=hidden].input-title' ).val(),
				url    = field.$el.find( 'input[type=hidden].input-url' ).val(),
				target = field.$el.find( 'input[type=hidden].input-target' ).val();

		field.content = '<a href="' + url + '" target="' + target + '">' + title + '</a>';
		return field;
	});
};

module.exports = Link;

},{}],10:[function(require,module,exports){
var Taxonomy = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'taxonomy' !== field.type ) {
			return field;
		}

		var terms = [];

		if ( field.$el.find( '.acf-taxonomy-field[data-type="multi_select"]' ).length > 0 ) {
			var select2Target = ( acf.select2.version >= 4 ) ? 'select' : 'input';

			terms = _.pluck( field.$el.find( '.acf-taxonomy-field[data-type="multi_select"] ' + select2Target ).select2( 'data' ) , 'text' );
		} else if ( field.$el.find( '.acf-taxonomy-field[data-type="checkbox"]' ).length > 0 ) {
			terms = _.pluck( field.$el.find( '.acf-taxonomy-field[data-type="checkbox"] input[type="checkbox"]:checked' ).next(), 'textContent' );
		} else if ( field.$el.find( 'input[type=checkbox]:checked' ).length > 0 ) {
			terms = _.pluck( field.$el.find( 'input[type=checkbox]:checked' ).parent(), 'textContent' );
		} else if ( field.$el.find( 'select option:checked' ).length > 0 ) {
			terms = _.pluck( field.$el.find( 'select option:checked' ), 'textContent' );
		}

		terms = _.map( terms, function( term ) {
			return term.trim();
		});

		if ( terms.length > 0 ) {
			field.content = '<ul>\n<li>' + terms.join( '</li>\n<li>' ) + '</li>\n</ul>';
		}

		return field;
	});

	return fields;
};

module.exports = Taxonomy;

},{}],11:[function(require,module,exports){
var Text = function( fields ) {
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

Text.prototype.wrapInHeadline = function( field ) {
	var level = this.isHeadline( field );

	if ( level ) {
		field.content = '<h' + level + '>' + field.content + '</h' + level + '>';
	} else {
		field.content = '<p>' + field.content + '</p>';
	}

	return field;
};

Text.prototype.isHeadline = function( field ) {

	var level = _.find( RankMathACFAnalysisConfig.headlines, function( value, key ) {
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

module.exports = Text;

},{}],12:[function(require,module,exports){
var TextArea = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'textarea' !== field.type ) {
			return field;
		}

		field.content = '<p>' + field.$el.find( 'textarea[id^=acf]' ).val() + '</p>';
		return field;
	});

	return fields;
};

module.exports = TextArea;

},{}],13:[function(require,module,exports){
var URL = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'url' !== field.type ) {
			return field;
		}

		var content = field.$el.find( 'input[type=url][id^=acf]' ).val();

		field.content = content ? '<a href="' + content + '">' + content + "</a>" : "";

		return field;
	});

	return fields;
};

module.exports = URL;

},{}],14:[function(require,module,exports){
var WYSIWYG = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'wysiwyg' !== field.type ) {
			return field;
		}
		field.content = getContentTinyMCE( field );

		return field;
	});

	return fields;
};

/**
 * Check if is TinyMCEAvailable
 *
 * @param {string} editorID TinyMCE identifier to look up.
 *
 * @returns {boolean} True if an editor exists for the supplied ID.
 */
var isTinyMCEAvailable = function( editorID ) {
	if ( 'undefined' === typeof tinyMCE ||
		 'undefined' === typeof tinyMCE.editors ||
		 0 === tinyMCE.editors.length  ||
		 null === tinyMCE.get( editorID ) ||
		 tinyMCE.get( editorID ).isHidden() ) {
		return false;
	}

	return true;
};

/**
 * Get content from the TinyMCE editor.
 *
 * @param {Object} field Field to get the content for.
 *
 * @returns {string} The content of the field.
 */
var getContentTinyMCE = function( field ) {
	var textarea = field.$el.find( 'textarea' )[ 0 ],
			editorID = textarea.id,
			val      = textarea.value;

	if ( isTinyMCEAvailable( editorID ) ) {
		val = tinyMCE.get( editorID ) && tinyMCE.get( editorID ).getContent() || '';
	}

	return val;
};

module.exports = WYSIWYG;

},{}]},{},[1]);
