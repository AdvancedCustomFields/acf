(function($){
	
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
			
			// get elements
			this.$el = this.$field.find('.acf-tab');
			
			
			// get options
			this.o = this.$el.data();
			this.o.key = this.$field.data('key');
			this.o.text = this.$el.html();
			
		},
		
		initialize: function(){
			
			// bail early if is td
			if( this.$field.is('td') ) return;
			
			
			// add tab
			tab_manager.add_tab( this.$field, this.o );
			
		},
		
		hide: function( $field, context ){
			
			// bail early if not conditional logic
			if( context != 'conditional_logic' ) return;
			
			
			// vars
			var key = $field.data('key'),
				$group = $field.prevAll('.acf-tab-wrap'),
				$a = $group.find('a[data-key="' + key + '"]'),
				$li = $a.parent();
			
			
			// bail early if $group does not exist (clone field)
			if( !$group.exists() ) return;
			
			
			// hide li
			$li.addClass('hidden-by-conditional-logic');
			
			
			// set timout to allow proceeding fields to hide first
			// without this, the tab field will hide all fields, regarless of if that field has it's own conditional logic rules
			setTimeout(function(){
				
			// if this tab field was hidden by conditional_logic, disable it's children to prevent validation
			$field.nextUntil('.acf-field-tab', '.acf-field').each(function(){
				
				// bail ealry if already hidden
				if( $(this).hasClass('hidden-by-conditional-logic') ) return;
				
				
				// hide field
				acf.conditional_logic.hide_field( $(this) );
				
				
				// add parent reference
				$(this).addClass('-hbcl-' + key);
				
			});
			
			
			// select other tab if active
			if( $li.hasClass('active') ) {
				
				$group.find('li:not(.hidden-by-conditional-logic):first a').trigger('click');
				
			}
			
			}, 0);
			
		},
		
		show: function( $field, context ){
			
			// bail early if not conditional logic
			if( context != 'conditional_logic' ) return;
			
			// vars
			var key = $field.data('key'),
				$group = $field.prevAll('.acf-tab-wrap'),
				$a = $group.find('a[data-key="' + key + '"]'),
				$li = $a.parent();
			
			
			// bail early if $group does not exist (clone field)
			if( !$group.exists() ) return;
			
			
			// show li
			$li.removeClass('hidden-by-conditional-logic');
			
			
			// set timout to allow proceeding fields to hide first
			// without this, the tab field will hide all fields, regarless of if that field has it's own conditional logic rules
			setTimeout(function(){
				
			// if this tab field was shown by conditional_logic, enable it's children to allow validation
			$field.siblings('.acf-field.-hbcl-' + key).each(function(){
				
				// show field
				acf.conditional_logic.show_field( $(this) );
				
				
				// remove parent reference
				$(this).removeClass('-hbcl-' + key);
				
			});
			
			
			// select tab if no other active
			var $active = $li.siblings('.active');
			if( !$active.exists() || $active.hasClass('hidden-by-conditional-logic') ) {
				
				$a.trigger('click');
				
			}
			
			}, 0);
			
		}
		
	});
	
	
	/*
	*  tab_manager
	*
	*  This model will handle adding tabs and groups
	*
	*  @type	function
	*  @date	25/11/2015
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	var tab_manager = acf.model.extend({
		
		actions: {
			'prepare 15':	'render',
			'append 15':	'render',
			'refresh 15': 	'render'
		},
		
		events: {
			'click .acf-tab-button': '_click'
		},
		
		
		render: function( $el ){
			
			// find visible tab wraps
			$('.acf-tab-wrap', $el).each(function(){
				
				// vars
				var $group = $(this),
					$wrap = $group.parent();
				
				
				// trigger click
				if( !$group.find('li.active').exists() ) {
					
					$group.find('li:not(.hidden-by-conditional-logic):first a').trigger('click');
					
				}
				
				
				if( $wrap.hasClass('-sidebar') ) {
					
					// vars
					var attribute = $wrap.is('td') ? 'height' : 'min-height';
					
					
					// find height (minus 1 for border-bottom)
					var height = $group.position().top + $group.children('ul').outerHeight(true) - 1;
					
					
					// add css
					$wrap.css(attribute, height);
					
				}
						
			});
			
		},
		
		add_group: function( $field, settings ){
			
			// vars
			var $wrap = $field.parent(),
				html = '';
			
			
			// add sidebar to wrap
			if( $wrap.hasClass('acf-fields') && settings.placement == 'left' ) {
				
				$wrap.addClass('-sidebar');
			
			// can't have side tab without sidebar	
			} else {
				
				settings.placement = 'top';
				
			}
			
			
			// generate html
			if( $wrap.is('tbody') ) {
				
				html = '<tr class="acf-tab-wrap"><td colspan="2"><ul class="acf-hl acf-tab-group"></ul></td></tr>';
			
			} else {
			
				html = '<div class="acf-tab-wrap -' + settings.placement + '"><ul class="acf-hl acf-tab-group"></ul></div>';
				
			}
			
			
			// save
			$group = $(html);
			
			
			// append
			$field.before( $group );
			
			
			// return
			return $group;
		},
		
		add_tab: function( $field, settings ){ //console.log('add_tab(%o, %o)', $field, settings);
			
			// vars
			var $group = $field.siblings('.acf-tab-wrap').last();
			
			
			// add tab group if no group exists
			if( !$group.exists() ) {
			
				$group = this.add_group( $field, settings );
			
			// add tab group if is endpoint	
			} else if( settings.endpoint ) {
				
				$group = this.add_group( $field, settings );
				
			}
			
			
			// vars
			var $li = $('<li><a class="acf-tab-button" href="#" data-key="' + settings.key + '">' + settings.text + '</a></li>');
			
			
			// hide li
			if( settings.text === '' ) $li.hide();
			
			
			// add tab
			$group.find('ul').append( $li );
			
			
			// conditional logic
			if( $field.hasClass('hidden-by-conditional-logic') ) {
				
				$li.addClass('hidden-by-conditional-logic');
				
			}
			
		},
		
		_click: function( e ){
			
			// prevent default
			e.preventDefault();
			
			
			// reference
			var self = this;
			
			
			// vars
			var $a = e.$el,
				$group = $a.closest('.acf-tab-wrap'),
				show = $a.data('key'),
				current = '';
			
			
			// add and remove classes
			$a.parent().addClass('active').siblings().removeClass('active');
			
			
			// loop over all fields until you hit another group
			$group.nextUntil('.acf-tab-wrap', '.acf-field').each(function(){
				
				// vars
				var $field = $(this);
				
				
				// set current
				if( $field.data('type') == 'tab' ) {
					
					current = $field.data('key');
					
					// bail early if endpoint is found
					if( $field.hasClass('endpoint') ) {
						
						// stop loop - current tab group is complete
						return false;
						
					}
					
				}
				
				
				// show
				if( current === show ) {
					
					// only show if hidden
					if( $field.hasClass('hidden-by-tab') ) {
						
						$field.removeClass('hidden-by-tab');
						
						acf.do_action('show_field', $(this), 'tab');
						
					}
				
				// hide
				} else {
					
					// only hide if not hidden
					if( !$field.hasClass('hidden-by-tab') ) {
						
						$field.addClass('hidden-by-tab');
						
						acf.do_action('hide_field', $(this), 'tab');
						
					}
					
				}
				
			});
			
			
			// action for 3rd party customization
			acf.do_action('refresh', $group.parent() );
			
			
			// blur
			$a.trigger('blur');
			
		}
	
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
			'add_field_error': 'add_field_error'
		},
		
		add_field_error: function( $field ){
			
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