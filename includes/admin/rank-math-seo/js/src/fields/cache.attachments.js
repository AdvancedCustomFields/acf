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
