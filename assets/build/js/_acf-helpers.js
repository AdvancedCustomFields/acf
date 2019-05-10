(function($, undefined){
	
	/**
	*  refreshHelper
	*
	*  description
	*
	*  @date	1/7/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var refreshHelper = new acf.Model({
		priority: 90,
		timeout: 0,
		actions: {
			'new_field':	'refresh',
			'show_field':	'refresh',
			'hide_field':	'refresh',
			'remove_field':	'refresh'
		},
		refresh: function(){
			clearTimeout( this.timeout );
			this.timeout = setTimeout(function(){
				acf.doAction('refresh');
			}, 0);
		}
	});
	
	/**
	 * mountHelper
	 *
	 * Adds compatiblity for the 'unmount' and 'remount' actions added in 5.8.0
	 *
	 * @date	7/3/19
	 * @since	5.7.14
	 *
	 * @param	void
	 * @return	void
	 */
	var mountHelper = new acf.Model({
		priority: 1,
		actions: {
			'sortstart': 'onSortstart',
			'sortstop': 'onSortstop'
		},
		onSortstart: function( $item ){
			acf.doAction('unmount', $item);
		},
		onSortstop: function( $item ){
			acf.doAction('remount', $item);
		}
	});
	
	/**
	*  sortableHelper
	*
	*  Adds compatibility for sorting a <tr> element
	*
	*  @date	6/3/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
		
	var sortableHelper = new acf.Model({
		actions: {
			'sortstart': 'onSortstart'
		},
		onSortstart: function( $item, $placeholder ){
			
			// if $item is a tr, apply some css to the elements
			if( $item.is('tr') ) {
				
				// replace $placeholder children with a single td
				// fixes "width calculation issues" due to conditional logic hiding some children
				$placeholder.html('<td style="padding:0;" colspan="' + $placeholder.children().length + '"></td>');
				
				// add helper class to remove absolute positioning
				$item.addClass('acf-sortable-tr-helper');
				
				// set fixed widths for children		
				$item.children().each(function(){
					$(this).width( $(this).width() );
				});
				
				// mimic height
				$placeholder.height( $item.height() + 'px' );
				
				// remove class 
				$item.removeClass('acf-sortable-tr-helper');
			}
		}
	});
	
	/**
	*  duplicateHelper
	*
	*  Fixes browser bugs when duplicating an element
	*
	*  @date	6/3/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	var duplicateHelper = new acf.Model({
		actions: {
			'after_duplicate': 'onAfterDuplicate'
		},
		onAfterDuplicate: function( $el, $el2 ){
			
			// get original values
			var vals = [];
			$el.find('select').each(function(i){
				vals.push( $(this).val() );
			});
			
			// set duplicate values
			$el2.find('select').each(function(i){
				$(this).val( vals[i] );
			});
		}
	});
	
	/**
	*  tableHelper
	*
	*  description
	*
	*  @date	6/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var tableHelper = new acf.Model({
		
		id: 'tableHelper',
		
		priority: 20,
		
		actions: {
			'refresh': 	'renderTables'
		},
		
		renderTables: function( $el ){ 
			
			// loop
			var self = this;
			$('.acf-table:visible').each(function(){
				self.renderTable( $(this) );
			});
		},
		
		renderTable: function( $table ){
			
			// vars
			var $ths = $table.find('> thead > tr:visible > th[data-key]');
			var $tds = $table.find('> tbody > tr:visible > td[data-key]');
			
			// bail early if no thead
			if( !$ths.length || !$tds.length ) {
				return false;
			}
			
			
			// visiblity
			$ths.each(function( i ){
				
				// vars
				var $th = $(this);
				var key = $th.data('key');
				var $cells = $tds.filter('[data-key="' + key + '"]');
				var $hidden = $cells.filter('.acf-hidden');
				
				// always remove empty and allow cells to be hidden
				$cells.removeClass('acf-empty');
				
				// hide $th if all cells are hidden
				if( $cells.length === $hidden.length ) {
					acf.hide( $th );
					
				// force all hidden cells to appear empty
				} else {
					acf.show( $th );
					$hidden.addClass('acf-empty');
				}
			});
			
			
			// clear width
			$ths.css('width', 'auto');
			
			// get visible
			$ths = $ths.not('.acf-hidden');
			
			// vars
			var availableWidth = 100;
			var colspan = $ths.length;
			
			// set custom widths first
			var $fixedWidths = $ths.filter('[data-width]');
			$fixedWidths.each(function(){
				var width = $(this).data('width');
				$(this).css('width', width + '%');
				availableWidth -= width;
			});
			
			// set auto widths
			var $auoWidths = $ths.not('[data-width]');
			if( $auoWidths.length ) {
				var width = availableWidth / $auoWidths.length;
				$auoWidths.css('width', width + '%');
				availableWidth = 0;
			}
			
			// avoid stretching issue
			if( availableWidth > 0 ) {
				$ths.last().css('width', 'auto');
			}
			
			
			// update colspan on collapsed
			$tds.filter('.-collapsed-target').each(function(){
				
				// vars
				var $td = $(this);
				
				// check if collapsed
				if( $td.parent().hasClass('-collapsed') ) {
					$td.attr('colspan', $ths.length);
				} else {
					$td.removeAttr('colspan');
				}
			});
		}
	});
	
	
	/**
	*  fieldsHelper
	*
	*  description
	*
	*  @date	6/3/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var fieldsHelper = new acf.Model({
		
		id: 'fieldsHelper',
		
		priority: 30,
		
		actions: {
			'refresh': 	'renderGroups'
		},
		
		renderGroups: function(){
			
			// loop
			var self = this;
			$('.acf-fields:visible').each(function(){
				self.renderGroup( $(this) );
			});
		},
		
		renderGroup: function( $el ){
			
			// vars
			var top = 0;
			var height = 0;
			var $row = $();
			
			// get fields
			var $fields = $el.children('.acf-field[data-width]:visible');
			
			// bail early if no fields
			if( !$fields.length ) {
				return false;
			}
			
			// bail ealry if is .-left
			if( $el.hasClass('-left') ) {
				$fields.removeAttr('data-width');
				$fields.css('width', 'auto');
				return false;
			}
			
			// reset fields
			$fields.removeClass('-r0 -c0').css({'min-height': 0});
			
			// loop
			$fields.each(function( i ){
				
				// vars
				var $field = $(this);
				var position = $field.position();
				var thisTop = Math.ceil( position.top );
				var thisLeft = Math.ceil( position.left );
				
				// detect change in row
				if( $row.length && thisTop > top ) {

					// set previous heights
					$row.css({'min-height': height+'px'});
					
					// update position due to change in row above
					position = $field.position();
					thisTop = Math.ceil( position.top );
					thisLeft = Math.ceil( position.left );
				
					// reset vars
					top = 0;
					height = 0;
					$row = $();
				}
				
				// rtl
				if( acf.get('rtl') ) {
					thisLeft = Math.ceil( $field.parent().width() - (position.left + $field.outerWidth()) );
				}
				
				// add classes
				if( thisTop == 0 ) {
					$field.addClass('-r0');
				} else if( thisLeft == 0 ) {
					$field.addClass('-c0');
				}
				
				// get height after class change
				// - add 1 for subpixel rendering
				var thisHeight = Math.ceil( $field.outerHeight() ) + 1;
				
				// set height
				height = Math.max( height, thisHeight );
				
				// set y
				top = Math.max( top, thisTop );
				
				// append
				$row = $row.add( $field );
			});
			
			// clean up
			if( $row.length ) {
				$row.css({'min-height': height+'px'});
			}
		}
	});
		
})(jQuery);