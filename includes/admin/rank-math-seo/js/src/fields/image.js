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
