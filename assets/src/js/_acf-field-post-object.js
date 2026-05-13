( function ( $, undefined ) {
	var Field = acf.models.SelectField.extend( {
		type: 'post_object',
	} );

	acf.registerFieldType( Field );
} )( jQuery );
