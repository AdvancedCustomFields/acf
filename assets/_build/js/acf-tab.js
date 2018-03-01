(function($){
	
	// vars
	var CLASS = 'hidden-by-conditional-logic';
	var groupIndex = 0;
	var tabIndex = 0;
	
	
	/*
	*  tabs
	*
	*  This model will handle adding tabs and groups
	*
	*  @type	function
	*  @date	25/11/2015
	*  @since	5.3.2
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	var tabs = acf.model.extend({
		
		$fields: [],
		
		actions: {
			'prepare 15': 	'initialize',
			'append 15': 	'initialize',
			'refresh 15': 	'refresh'
		},
		
		events: {
			'click .acf-tab-button': '_click'
		},
		
		_click: function( e ){
			
			// prevent Defailt
			e.preventDefault();
			
			// toggle
			this.toggle( e.$el );
			
		},
		
		isOpen: function( $el ) {
			return $el.hasClass('-open');
		},
		
		toggle: function( $a ){
			
			// vars
			var key = $a.data('key');
			var $li = $a.parent();
			var $wrap = $a.closest('.acf-tab-wrap');
			var $active = $wrap.find('.active a');
			var $field = $wrap.siblings('.acf-field[data-key="' + key + '"]');
			
			
			// bail early if already open
			if( this.isOpen($field) ) return;
			
			
			// close
			if( $active.length ) {
				
				// vars
				var activeKey = $active.data('key');
				var $activeli = $active.parent();
				var $activeField = $wrap.siblings('.acf-field[data-key="' + activeKey + '"]');
				
				// hide
				$activeli.removeClass('active');
				this.close( $activeField );
				
			}
			
			
			// open
			$li.addClass('active');
			this.open( $field );
			
			
			// action
			// - allows acf.layout to fix floating field's min-height
			acf.do_action('refresh', $wrap.parent() );
			
		},
		
		getFields: function( $field ){
			return $field.nextUntil('.acf-field-tab', '.acf-field');
		},
		
		getWrap: function( $field ){
			return $field.prevAll('.acf-tab-wrap:first');
		},
		
		getTab: function( $wrap, key ){
			return $wrap.find('a[data-key="' + key + '"]');
		},
		
		open: function( $field ){
			
			// show
			this.getFields( $field ).each(function(){
				
				$(this).removeClass('hidden-by-tab');
				acf.do_action('show_field', $(this), 'tab');
				
			});
			
		},
		
		close: function( $field ){
			
			// show
			this.getFields( $field ).each(function(){
				
				$(this).addClass('hidden-by-tab');
				acf.do_action('hide_field', $(this), 'tab');
				
			});
			
		},
		
		addTab: function( $field ){
			this.$fields.push( $field );
		},
		
		initialize: function(){
			
			// bail ealry if no fields
			if( !this.$fields.length ) return;	
			
			// loop
			for( var i = 0; i < this.$fields.length; i++) {
				this.createTab( this.$fields[ i ] );
			}
			
			// reset
			this.$fields = [];
			
		},
			
		createTab: function( $field ){
			
			// bail early if is cell
			if( $field.is('td') ) return false;
			
			
			// vars
			var $label = $field.children('.acf-label');
			var $input = $field.children('.acf-input');	
			var $wrap = this.getWrap( $field );
			var $button = $field.find('.acf-tab-button');
			var settings = $button.data();
			var open = false;
			
			
			// remove
			$field.hide();
			$label.remove();
			$input.remove();
			
			
			// create wrap
			if( !$wrap.exists() || settings.endpoint ) {
				$wrap = this.createTabWrap( $field, settings );
				open = true;
			}
			
			
			// create tab
			var $tab = $('<li></li>').append( $button );
			
			
			// open
			if( open ) {
				$tab.addClass('active');
				this.open( $field );
			} else {
				this.close( $field );
			}
			
			
			// hide li
			if( $button.html() == '' ) $tab.hide();
			
			
			// append
			$wrap.find('ul').append( $tab );
			
			
			// toggle active tab
			// previous attempts to integrate with above 'open' variable were uncessefull
			// this separate toggle logic ensures the tab exists
			tabIndex++;
			var order = acf.getPreference('this.tabs') || [];
			var index = order[ groupIndex-1 ] || 0;
			if( index == tabIndex-1 && !open ) {
				this.toggle( $button );
			}
			
			
			// return
			return $tab;
		},
		
		createTabWrap: function( $field, settings ){
			
			// vars
			var $parent = $field.parent();
			var $wrap = false;
			
			
			// add sidebar for left placement
			if( $parent.hasClass('acf-fields') && settings.placement == 'left' ) {
				$parent.addClass('-sidebar');
			}
			
			
			// create wrap
			if( $field.is('tr') ) {
				$wrap = $('<tr class="acf-tab-wrap"><td colspan="2"><ul class="acf-hl acf-tab-group"></ul></td></tr>');
			} else {
				$wrap = $('<div class="acf-tab-wrap -' + settings.placement + '"><ul class="acf-hl acf-tab-group"></ul></div>');
			}
			
			
			// append
			$field.before( $wrap );
			
			
			// index
			groupIndex++;
			tabIndex = 0;
			
			
			// return
			return $wrap;
			
		},
		
		refresh: function( $el ){
			
			// loop
			$('.acf-tab-wrap', $el).each(function(){
				
				// vars
				var $wrap = $(this);
				
				
				// fix left aligned min-height
				if( $wrap.hasClass('-left') ) {
					
					// vars
					var $parent = $wrap.parent();
					var attribute = $parent.is('td') ? 'height' : 'min-height';
					
					// find height (minus 1 for border-bottom)
					var height = $wrap.position().top + $wrap.children('ul').outerHeight(true) - 1;
					
					// add css
					$parent.css(attribute, height);
					
				}
						
			});
			
		}
		
	});
	
	
	
	/**
	*  acf.fields.tab
	*
	*  description
	*
	*  @date	17/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	acf.fields.tab = acf.field.extend({
		
		type: 'tab',
		$el: null,
		$wrap: null,
		
		actions: {
			'prepare':	'initialize',
			'append':	'initialize',
			'hide':		'hide',
			'show':		'show'
		},
		
		focus: function(){
			
		},
		
		initialize: function(){
			
			// add tab
			tabs.addTab( this.$field );
			
		},
		
		hide: function( $field, context ){
			
			// bail early if not conditional logic
			if( context != 'conditional_logic' ) return;
			
			
			// vars
			var key = $field.data('key');
			var $wrap = tabs.getWrap( $field );
			var $tab = tabs.getTab( $wrap, key );
			var $li = $tab.parent();
			
			// bail early if $group does not exist (clone field)
			if( !$wrap.exists() ) return;
			
			
			// hide li
			$li.addClass( CLASS );
			
				
			// hide fields
			tabs.getFields( $field ).each(function(){
				acf.conditional_logic.hide_field( $(this), key );
			});
			
			
			// select other tab if active
			if( $li.hasClass('active') ) {
				$wrap.find('li:not(.'+CLASS+'):first a').trigger('click');
			}
			
		},
		
		show: function( $field, context ){
			
			// bail early if not conditional logic
			if( context != 'conditional_logic' ) return;
			
			
			// vars
			var key = $field.data('key');
			var $wrap = tabs.getWrap( $field );
			var $tab = tabs.getTab( $wrap, key );
			var $li = $tab.parent();
			
			
			// bail early if $group does not exist (clone field)
			if( !$wrap.exists() ) return;
			
			
			// show li
			$li.removeClass( CLASS );
			
			
			// hide fields
			tabs.getFields( $field ).each(function(){
				acf.conditional_logic.show_field( $(this), key );
			});
			
			
			// select tab if no other active
			var $active = $li.siblings('.active');
			if( !$active.exists() || $active.hasClass(CLASS) ) {
				tabs.toggle( $tab );
			}
			
		}
		
	});
	
	
	$(window).on('unload', function(){
		
		var order = [];
		$('.acf-tab-wrap').each(function(){
			var active = $(this).find('.active').index() || 0;
			order.push(active);
		});
		if( !order.length ) return;
		acf.setPreference('this.tabs', order);
		
	});
	
	
	/*
	*  tab_validation
	*
	*  This model will handle validation of fields within a tab group
	*
	*  @type	function
	*  @date	25/11/2015
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	var tab_validation = acf.model.extend({
		
		active: 1,
		
		actions: {
			'invalid_field': 'invalid_field',
		},
		
		invalid_field: function( $field ){
			
			// bail early if already focused
			if( !this.active ) {
				return;
			}
			
			
			// bail early if not hidden by tab
			if( !$field.hasClass('hidden-by-tab') ) {
				return;
			}
			
			
			// reference
			var self = this;
			
			
			// vars
			var $tab = $field.prevAll('.acf-field-tab:first'),
				$group = $field.prevAll('.acf-tab-wrap:first');
			
			
			// focus
			$group.find('a[data-key="' + $tab.data('key') + '"]').trigger('click');
			
			
			// disable functionality for 1sec (allow next validation to work)
			this.active = 0;
			
			setTimeout(function(){
				
				self.active = 1;
				
			}, 1000);
			
		}
		
	});	
	

})(jQuery);