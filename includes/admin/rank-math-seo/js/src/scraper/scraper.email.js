var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	fields = _.map( fields, function( field ) {
		if ( 'email' !== field.type ) {
			return field;
		}

		field.content = field.$el.find( 'input[type=email][id^=acf]' ).val();

		return field;
	});

	return fields;
};

module.exports = Scraper;
