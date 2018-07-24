(function($, undefined){
	
	acf.newTooltip = function( props ){
		
		// ensure object
		if( typeof props !== 'object' ) {
			props = { text: props };
		}
		
		// confirmRemove
		if( props.confirmRemove !== undefined ) {
			
			props.textConfirm = acf.__('Remove');
			props.textCancel = acf.__('Cancel');
			return new TooltipConfirm( props );
			
		// confirm
		} else if( props.confirm !== undefined ) {
			
			return new TooltipConfirm( props );
		
		// default
		} else {
			return new Tooltip( props );
		}
		
	};
	
	var Tooltip = acf.Model.extend({
		
		data: {
			text: '',
			timeout: 0,
			target: null
		},
		
		tmpl: function(){
			return '<div class="acf-tooltip"></div>';
		},
		
		setup: function( props ){
			$.extend(this.data, props);
			this.$el = $(this.tmpl());
		},
		
		initialize: function(){
			
			// render
			this.render();
			
			// append
			this.show();
			
			// position
			this.position();
			
			// timeout
			var timeout = this.get('timeout');
			if( timeout ) {
				setTimeout( $.proxy(this.fade, this), timeout );
			}
		},
		
		update: function( props ){
			$.extend(this.data, props);
			this.initialize();
		},
		
		render: function(){
			this.html( this.get('text') );
		},
		
		show: function(){
			$('body').append( this.$el );
		},
		
		hide: function(){
			this.$el.remove();
		},
		
		fade: function(){
			
			// add class
			this.$el.addClass('acf-fade-up');
			
			// remove
			this.setTimeout(function(){
				this.remove();
			}, 250);
		},
		
		html: function( html ){
			this.$el.html( html );
		},
		
		position: function(){
			
			// vars
			var $tooltip = this.$el;
			var $target = this.get('target');
			if( !$target ) return;
			
			// reset class
			$tooltip.removeClass('right left bottom top');
			
			// position
			var tolerance = 10;
			var target_w = $target.outerWidth();
			var target_h = $target.outerHeight();
			var target_t = $target.offset().top;
			var target_l = $target.offset().left;
			var tooltip_w = $tooltip.outerWidth();
			var tooltip_h = $tooltip.outerHeight();
			
			// calculate top
			var top = target_t - tooltip_h;
			var left = target_l + (target_w / 2) - (tooltip_w / 2);
			
			// too far left
			if( left < tolerance ) {
				
				$tooltip.addClass('right');
				left = target_l + target_w;
				top = target_t + (target_h / 2) - (tooltip_h / 2);
			
			// too far right
			} else if( (left + tooltip_w + tolerance) > $(window).width() ) {
				
				$tooltip.addClass('left');
				left = target_l - tooltip_w;
				top = target_t + (target_h / 2) - (tooltip_h / 2);
			
			// too far top
			} else if( top - $(window).scrollTop() < tolerance ) {
				
				$tooltip.addClass('bottom');
				top = target_t + target_h;

			} else {
				
				$tooltip.addClass('top');
				
			}
			
			// update css
			$tooltip.css({ 'top': top, 'left': left });	
		}
	});
	
	var TooltipConfirm = Tooltip.extend({
		
		data: {
			text: '',
			textConfirm: '',
			textCancel: '',
			target: null,
			targetConfirm: true,
			confirm: function(){},
			cancel: function(){},
			context: false
		},
		
		events: {
			'click [data-event="cancel"]': 'onCancel',
			'click [data-event="confirm"]': 'onConfirm',
		},
		
		addEvents: function(){
			
			// add events
			acf.Model.prototype.addEvents.apply(this);
			
			// vars
			var $document = $(document);
			var $target = this.get('target');
			
			// add global 'cancel' click event
			// - use timeout to avoid the current 'click' event triggering the onCancel function
			this.setTimeout(function(){
				this.on( $document, 'click', 'onCancel' );
			});
			
			// add target 'confirm' click event
			// - allow setting to control this feature
			if( this.get('targetConfirm') ) {
				this.on( $target, 'click', 'onConfirm' );
			}
		},
		
		removeEvents: function(){
			
			// remove events
			acf.Model.prototype.removeEvents.apply(this);
			
			// vars
			var $document = $(document);
			var $target = this.get('target');
			
			// remove custom events
			this.off( $document, 'click' );
			this.off( $target, 'click' );
		},
		
		render: function(){
			
			// defaults
			var text = this.get('text') || acf.__('Are you sure?');
			var textConfirm = this.get('textConfirm') || acf.__('Yes');
			var textCancel = this.get('textCancel') || acf.__('No');
			
			// html
			var html = [
				text,
				'<a href="#" data-event="confirm">' + textConfirm + '</a>',
				'<a href="#" data-event="cancel">' + textCancel + '</a>'
			].join(' ');
			
			// html
			this.html( html );
			
			// class
			this.$el.addClass('-confirm');
		},
		
		onCancel: function( e, $el ){
			
			// prevent default
			e.preventDefault();
			e.stopImmediatePropagation();
			
			// callback
			var callback = this.get('cancel');
			var context = this.get('context') || this;
			callback.apply( context, arguments );
			
			//remove
			this.remove();
		},
		
		onConfirm: function( e, $el ){
			
			// prevent default
			e.preventDefault();
			e.stopImmediatePropagation();
			
			// callback
			var callback = this.get('confirm');
			var context = this.get('context') || this;
			callback.apply( context, arguments );
			
			//remove
			this.remove();
		}
	});
	
	// storage
	acf.models.Tooltip = Tooltip;
	acf.models.TooltipConfirm = TooltipConfirm;
	
	
	/**
	*  tooltipManager
	*
	*  description
	*
	*  @date	17/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var tooltipHoverHelper = new acf.Model({
		
		tooltip: false,
		
		events: {
			'mouseenter .acf-js-tooltip':	'showTitle',
			'mouseup .acf-js-tooltip':		'hideTitle',
			'mouseleave .acf-js-tooltip':	'hideTitle'
		},
		
		showTitle: function( e, $el ){
			
			// vars
			var title = $el.attr('title');
			
			// bail ealry if no title
			if( !title ) {
				return;
			}
			
			// clear title to avoid default browser tooltip
			$el.attr('title', '');
			
			// create
			if( !this.tooltip ) {
				this.tooltip = acf.newTooltip({
					text: title,
					target: $el
				});
			
			// update
			} else {
				this.tooltip.update({
					text: title,
					target: $el
				});
			}
			
		},
		
		hideTitle: function( e, $el ){
			
			// hide tooltip
			this.tooltip.hide();
			
			// restore title
			$el.attr('title', this.tooltip.get('text'));
		}
	});
	
})(jQuery);