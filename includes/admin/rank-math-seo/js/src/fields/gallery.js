var attachmentCache = require( './cache.attachments.js' );
var Gallery = function() {};

Gallery.prototype.analyze = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		console.log(field);
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
