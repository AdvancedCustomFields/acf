(function($, undefined){
	
	var i = 0;
	
	var Field = acf.Field.extend({
		
		type: 'accordion',
		
		wait: '',
		
		$control: function(){
			return this.$('.acf-fields:first');
		},
		
		initialize: function(){
			
			// bail early if is cell
			if( this.$el.is('td') ) return;
			
			// enpoint
			if( this.get('endpoint') ) {
				return this.remove();
			}
			
			// vars
			var $field = this.$el;
			var $label = this.$labelWrap()
			var $input = this.$inputWrap();
			var $wrap = this.$control();
			var $instructions = $input.children('.description');
			
			// force description into label
			if( $instructions.length ) {
				$label.append( $instructions );
			}
			
			// table
			if( this.$el.is('tr') ) {
				
				// vars
				var $table = this.$el.closest('table');
				var $newLabel = $('<div class="acf-accordion-title"/>');
				var $newInput = $('<div class="acf-accordion-content"/>');
				var $newTable = $('<table class="' + $table.attr('class') + '"/>');
				var $newWrap = $('<tbody/>');
				
				// dom
				$newLabel.append( $label.html() );
				$newTable.append( $newWrap );
				$newInput.append( $newTable );
				$input.append( $newLabel );
				$input.append( $newInput );
				
				// modify
				$label.remove();
				$wrap.remove();
				$input.attr('colspan', 2);
				
				// update vars
				$label = $newLabel;
				$input = $newInput;
				$wrap = $newWrap;
			}
			
			// add classes
			$field.addClass('acf-accordion');
			$label.addClass('acf-accordion-title');
			$input.addClass('acf-accordion-content');
			
			// index
			i++;
			
			// multi-expand
			if( this.get('multi_expand') ) {
				$field.attr('multi-expand', 1);
			}
			
			// open
			var order = acf.getPreference('this.accordions') || [];
			if( order[i-1] !== undefined ) {
				this.set('open', order[i-1]);
			}
			
			if( this.get('open') ) {
				$field.addClass('-open');
				$input.css('display', 'block'); // needed for accordion to close smoothly
			}
			
			// add icon
			$label.prepend( accordionManager.iconHtml({ open: this.get('open') }) );
			
			// classes
			// - remove 'inside' which is a #poststuff WP class
			var $parent = $field.parent();
			$wrap.addClass( $parent.hasClass('-left') ? '-left' : '' );
			$wrap.addClass( $parent.hasClass('-clear') ? '-clear' : '' );
			
			// append
			$wrap.append( $field.nextUntil('.acf-field-accordion', '.acf-field') );
			
			// clean up
			$wrap.removeAttr('data-open data-multi_expand data-endpoint');
		},
		
	});
	
	acf.registerFieldType( Field );


	/**
	*  accordionManager
	*
	*  Events manager for the acf accordion
	*
	*  @date	14/2/18
	*  @since	5.6.9
	*
	*  @param	void
	*  @return	void
	*/
	
	var accordionManager = new acf.Model({
		
		actions: {
			'unload':	'onUnload'
		},
		
		events: {
			'click .acf-accordion-title': 'onClick',
			'invalidField .acf-accordion':	'onInvalidField'
		},
		
		isOpen: function( $el ) {
			return $el.hasClass('-open');
		},
		
		toggle: function( $el ){
			if( this.isOpen($el) ) {
				this.close( $el );
			} else {
				this.open( $el );
			}
		},
		
		iconHtml: function( props ){
			
			// Determine icon.
			//if( acf.isGutenberg() ) {
			//	var icon = props.open ? 'arrow-up-alt2' : 'arrow-down-alt2';
			//} else {
				var icon = props.open ? 'arrow-down' : 'arrow-right';
			//}
			
			// Return HTML.
			return '<i class="acf-accordion-icon dashicons dashicons-' + icon + '"></i>';
		},
		
		open: function( $el ){
			
			// open
			$el.find('.acf-accordion-content:first').slideDown().css('display', 'block');
			$el.find('.acf-accordion-icon:first').replaceWith( this.iconHtml({ open: true }) );
			$el.addClass('-open');
			
			// action
			acf.doAction('show', $el);
			
			// close siblings
			if( !$el.attr('multi-expand') ) {
				$el.siblings('.acf-accordion.-open').each(function(){
					accordionManager.close( $(this) );
				});
			}
		},
		
		close: function( $el ){
			
			// close
			$el.find('.acf-accordion-content:first').slideUp();
			$el.find('.acf-accordion-icon:first').replaceWith( this.iconHtml({ open: false }) );
			$el.removeClass('-open');
			
			// action
			acf.doAction('hide', $el);
		},
		
		onClick: function( e, $el ){
			
			// prevent Defailt
			e.preventDefault();
			
			// open close
			this.toggle( $el.parent() );
			
		},
		
		onInvalidField: function( e, $el ){
			
			// bail early if already focused
			if( this.busy ) {
				return;
			}
			
			// disable functionality for 1sec (allow next validation to work)
			this.busy = true;
			this.setTimeout(function(){
				this.busy = false;
			}, 1000);
			
			// open accordion
			this.open( $el );
		},
		
		onUnload: function( e ){
			
			// vars
			var order = [];
			
			// loop
			$('.acf-accordion').each(function(){
				var open = $(this).hasClass('-open') ? 1 : 0;
				order.push(open);
			});
			
			// set
			if( order.length ) {
				acf.setPreference('this.accordions', order);
			}
		}
	});

})(jQuery);