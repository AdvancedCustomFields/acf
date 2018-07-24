(function($, undefined){
	
	acf.models.Postbox = acf.Model.extend({
		
		data: {
			id: 		'',
			key:		'',
			style: 		'default',
			label: 		'top',
			editLink:	'',
			editTitle:	'',
			visibility:	true
		},
		
		setup: function( props ){
			$.extend(this.data, props);
		},
		
		initialize: function(){
			
			// vars
			var id = this.get('id');
			var $postbox = $('#' + id);
			var $toggle = $('#' + id + '-hide');
			var $label = $toggle.parent();
			
			// add class
			$postbox.addClass('acf-postbox');
			$label.addClass('acf-postbox-toggle');
			
			// remove class
			$postbox.removeClass('hide-if-js');
			$label.removeClass('hide-if-js');
			
			// field group style
			var style = this.get('style');
			if( style !== 'default' ) {
				$postbox.addClass( style );
			}
			
			// .inside class
			$postbox.children('.inside').addClass('acf-fields').addClass('-' + this.get('label'));
			
				
			// visibility
			if( this.get('visibility') ) {
				$toggle.prop('checked', true);
			} else {
				$postbox.addClass('acf-hidden');
				$label.addClass('acf-hidden');
			}
			
			// edit link
			var editLink = this.get('editLink');
			var editTitle = this.get('editTitle');
			if( editLink ) {
				
				$postbox.children('.hndle').append('<a href="' + editLink + '" class="dashicons dashicons-admin-generic acf-hndle-cog acf-js-tooltip" title="' + editTitle + '"></a>');
			}
		}
	});
	
	acf.newPostbox = function( props ){
		return new acf.models.Postbox( props );
	};
			
})(jQuery);