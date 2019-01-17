(function($, undefined){
	
	var Field = acf.models.SelectField.extend({
		type: 'user',	
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);