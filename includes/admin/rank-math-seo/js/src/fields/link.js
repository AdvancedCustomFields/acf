var Link = function( fields ) {
	/**
	 * Set content for all link fields as a-tag with title, url and target.
	 * Return the fields object containing all fields.
	 */
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
