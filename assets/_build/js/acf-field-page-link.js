(function($, undefined){
	
	var Field = acf.models.SelectField.extend({
		type: 'page_link',	
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);