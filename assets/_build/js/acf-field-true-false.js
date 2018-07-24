(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'true_false',
		
		events: {
			'change .acf-switch-input': 	'onChange',
			'focus .acf-switch-input': 		'onFocus',
			'blur .acf-switch-input': 		'onBlur',
			'keypress .acf-switch-input':	'onKeypress'
		},
		
		$input: function(){
			return this.$('input[type="checkbox"]');
		},
		
		$switch: function(){
			return this.$('.acf-switch');
		},
		
		getValue: function(){
			return this.$input().prop('checked') ? 1 : 0;
		},
		
		initialize: function(){
			this.render();
		},
		
		render: function(){
			
			// vars
			var $switch = this.$switch();
				
			// bail ealry if no $switch
			if( !$switch.length ) return;
			
			// vars
			var $on = $switch.children('.acf-switch-on');
			var $off = $switch.children('.acf-switch-off');
			var width = Math.max( $on.width(), $off.width() );
			
			// bail ealry if no width
			if( !width ) return;
			
			// set widths
			$on.css( 'min-width', width );
			$off.css( 'min-width', width );
				
		},
		
		switchOn: function() {
			this.$input().prop('checked', true);
			this.$switch().addClass('-on');
		},
		
		switchOff: function() {
			this.$input().prop('checked', false);
			this.$switch().removeClass('-on');
		},
		
		onChange: function( e, $el ){
			if( $el.prop('checked') ) {
				this.switchOn();
			} else {
				this.switchOff();
			}
		},
		
		onFocus: function( e, $el ){
			this.$switch().addClass('-focus');
		},
		
		onBlur: function( e, $el ){
			this.$switch().removeClass('-focus');
		},
		
		onKeypress: function( e, $el ){
			
			// left
			if( e.keyCode === 37 ) {
				return this.switchOff();
			}	
			
			// right
			if( e.keyCode === 39 ) {
				return this.switchOn();
			}
			
		}
	});
	
	acf.registerFieldType( Field );
	
})(jQuery);