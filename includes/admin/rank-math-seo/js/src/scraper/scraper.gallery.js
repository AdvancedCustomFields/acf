var attachmentCache = require( './../cache/cache.attachments.js' );

var Scraper = function() {};

Scraper.prototype.scrape = function( fields ) {
	var attachment_ids = [];

	fields = _.map( fields, function( field ) {
		if ( 'gallery' !== field.type ) {
			return field;
		}

		field.content = '';

		field.$el.find( '.acf-gallery-attachment input[type=hidden]' ).each( function() {
			// TODO: Is this the best way to get the attachment id?
			var attachment_id = jQuery( this ).val();

			// Collect all attachment ids for cache refresh
			attachment_ids.push( attachment_id );

			// If we have the attachment data in the cache we can return a useful value
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

module.exports = Scraper;
