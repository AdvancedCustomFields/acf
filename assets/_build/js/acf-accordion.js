(function($, undefined){
	
	var i = 0;

	acf.fields.accordion = acf.field.extend({
		
		type: 'accordion',
		$el: null,
		$wrap: null,
		
		actions: {
			'prepare':	'initialize',
			'append':	'initialize',
		},
		
		focus: function(){
			
			
		},
		
		initialize: function(){
			
			// vars
			var $field = this.$field;
			var $label = $field.children('.acf-label');
			var $input = $field.children('.acf-input');
			var $wrap = $input.children('.acf-fields');
			var settings = $wrap.data();			
			
			
			// bail early if is cell
			if( $field.is('td') ) return;
			
			
			// enpoint
			if( settings.endpoint ) {
				$field.remove();
				return;
			}
			
			
			// force description into label
			var $instructions = $input.children('.description')
			if( $instructions.length ) {
				$label.append( $instructions );
			}
			
			
			// table
			if( $field.is('tr') ) {
				
				// vars
				var $table = $field.closest('table');
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
			if( settings.multi_expand ) {
				$field.data('multi-expand', 1);
			}
			
			
			// open
			var order = acf.getPreference('this.accordions') || [];
			if( order[i-1] !== undefined ) {
				settings.open = order[i-1];
			}
			if( settings.open ) {
				$field.addClass('-open');
				$input.css('display', 'block'); // needed for accordion to close smoothly
			}
			
			
			// add icon
			$label.prepend('<i class="acf-accordion-icon dashicons dashicons-arrow-' + (settings.open ? 'down' : 'right') + '"></i>');
			
			
			// classes
			// - remove 'inside' which is a #poststuff WP class
			var $parent = $field.parent();
			$wrap.addClass( $parent.hasClass('-left') ? '-left' : '' );
			$wrap.addClass( $parent.hasClass('-clear') ? '-clear' : '' );
			
			
			// append
			$wrap.append( $field.nextUntil('.acf-field-accordion', '.acf-field') );
			
			
			// clean up
			$wrap.removeAttr('data-open data-multi_expand data-endpoint');
		}
		
	});
	
	
	/*
	*  accordionManager
	*
	*  This model will handle adding accordions
	*
	*  @type	function
	*  @date	25/11/2015
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	var accordionManager = acf.model.extend({
		
		events: {
			'click .acf-accordion-title': '_click',
		},
		
		_click: function( e ){
			
			// prevent Defailt
			e.preventDefault();
			
			// open close
			this.toggle( e.$el.closest('.acf-accordion') );
			
		},
		
		isOpen: function( $el ) {
			return $el.hasClass('-open');
		},
		
		toggle: function( $el ){
			
			// is open
			if( this.isOpen($el) ) {
				this.close( $el );
			} else {
				this.open( $el );
			}
			
		},
		
		open: function( $el ){
			
			// open
			$el.find('.acf-accordion-content:first').slideDown().css('display', 'block');
			$el.find('.acf-accordion-icon:first').removeClass('dashicons-arrow-right').addClass('dashicons-arrow-down');
			$el.addClass('-open');
			
			// action
			acf.do_action('show', $el);
			
			// close siblings
			if( !$el.data('multi-expand') ) {
				$el.siblings('.acf-accordion.-open').each(function(){
					accordionManager.close( $(this) );
				});
			}
			
			// action
			acf.do_action('refresh', $el);
		},
		
		close: function( $el ){
			
			// close
			$el.find('.acf-accordion-content:first').slideUp();
			$el.find('.acf-accordion-icon:first').removeClass('dashicons-arrow-down').addClass('dashicons-arrow-right');
			$el.removeClass('-open');
			
			// action
			acf.do_action('hide', $el);
			
		}
		
	});
	
	$(window).on('unload', function(){
		
		var order = [];
		$('.acf-accordion').each(function(){
			var open = $(this).hasClass('-open') ? 1 : 0;
			order.push(open);
		});
		if( !order.length ) return;
		acf.setPreference('this.accordions', order);
		
	});
	
	
	/**
	*  accordionValidation
	*
	*  This model will handle validation of fields within an accordion
	*
	*  @date	20/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var accordionValidation = acf.model.extend({
		
		active: 1,
		
		events: {
			'invalidField .acf-accordion':	'invalidField'
		},
		
		invalidField: function( e ){
			
			// bail early if already focused
			if( !this.active ) return;
			
			// block
			this.block();
			
			// open
			accordionManager.open( e.$el );
			
		},
		
		block: function(){
			
			// reference
			var self = this;
			
			// disable functionality for 1sec (allow next validation to work)
			this.active = 0;
			
			// timeout
			setTimeout(function(){
				self.active = 1;
			}, 1000);
			
		}
		
	});

})(jQuery);