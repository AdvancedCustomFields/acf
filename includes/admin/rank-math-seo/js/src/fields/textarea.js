var TextArea = function() {}
TextArea.prototype.analyze = function( fields ) {
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
