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
