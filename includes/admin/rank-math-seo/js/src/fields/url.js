var URL = function(){};
URL.prototype.analyze = function( fields ) {
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
