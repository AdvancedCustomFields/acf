var acf;

(function($){
	
	
	/*
	*  exists
	*
	*  This function will return true if a jQuery selection exists
	*
	*  @type	function
	*  @date	8/09/2014
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	(boolean)
	*/
	
	$.fn.exists = function() {
	
		return $(this).length>0;
		
	};
	
	
	/*
	*  outerHTML
	*
	*  This function will return a string containing the HTML of the selected element
	*
	*  @type	function
	*  @date	19/11/2013
	*  @since	5.0.0
	*
	*  @param	$.fn
	*  @return	(string)
	*/
	
	$.fn.outerHTML = function() {
	    
	    return $(this).get(0).outerHTML;
	    
	};
	
	
	acf = {
		
		// vars
		l10n:	{},
		o:		{},
		
		
		/*
		*  update
		*
		*  This function will update a value found in acf.o
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	k (string) the key
		*  @param	v (mixed) the value
		*  @return	n/a
		*/
		
		update: function( k, v ){
				
			this.o[ k ] = v;
			
		},
		
		
		/*
		*  get
		*
		*  This function will return a value found in acf.o
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	k (string) the key
		*  @return	v (mixed) the value
		*/
		
		get: function( k ){
			
			if( typeof this.o[ k ] !== 'undefined' ) {
				
				return this.o[ k ];
				
			}
			
			return null;
			
		},
		
		
		/*
		*  _e
		*
		*  This functiln will return a string found in acf.l10n
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	k1 (string) the first key to look for
		*  @param	k2 (string) the second key to look for
		*  @return	string (string)
		*/
		
		_e: function( k1, k2 ){
			
			// defaults
			k2 = k2 || false;
			
			
			// get context
			var string = this.l10n[ k1 ] || '';
			
			
			// get string
			if( k2 ) {
			
				string = string[ k2 ] || '';
				
			}
			
			
			// return
			return string;
			
		},
		
		
		/*
		*  add_action
		*
		*  This function uses wp.hooks to mimics WP add_action
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		add_action: function() {
			
			// vars
			var a = arguments[0].split(' '),
				l = a.length;
			
			
			// loop
			for( var i = 0; i < l; i++) {
				
/*
				// allow for special actions
				if( a[i].indexOf('initialize') !== -1 ) {
					
					a.push( a[i].replace('initialize', 'ready') );
					a.push( a[i].replace('initialize', 'append') );
					l = a.length;
					
					continue;
				}
*/
				
				
				// prefix action
				arguments[0] = 'acf/' + a[i];
			
			
				// add
				wp.hooks.addAction.apply(this, arguments);
					
			}
			
			
			// return
			return this;
			
		},
		
		
		/*
		*  remove_action
		*
		*  This function uses wp.hooks to mimics WP remove_action
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		remove_action: function() {
			
			// prefix action
			arguments[0] = 'acf/' + arguments[0];
			
			wp.hooks.removeAction.apply(this, arguments);
			
			return this;
			
		},
		
		
		/*
		*  do_action
		*
		*  This function uses wp.hooks to mimics WP do_action
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		do_action: function() { //console.log('acf.do_action(%o)', arguments);
			
			// prefix action
			arguments[0] = 'acf/' + arguments[0];
			
			wp.hooks.doAction.apply(this, arguments);
			
			return this;
			
		},
		
		
		/*
		*  add_filter
		*
		*  This function uses wp.hooks to mimics WP add_filter
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		add_filter: function() {
			
			// prefix action
			arguments[0] = 'acf/' + arguments[0];
			
			wp.hooks.addFilter.apply(this, arguments);
			
			return this;
			
		},
		
		
		/*
		*  remove_filter
		*
		*  This function uses wp.hooks to mimics WP remove_filter
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		remove_filter: function() {
			
			// prefix action
			arguments[0] = 'acf/' + arguments[0];
			
			wp.hooks.removeFilter.apply(this, arguments);
			
			return this;
			
		},
		
		
		/*
		*  apply_filters
		*
		*  This function uses wp.hooks to mimics WP apply_filters
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	
		*  @return
		*/
		
		apply_filters: function() { //console.log('acf.apply_filters(%o)', arguments);
			
			// prefix action
			arguments[0] = 'acf/' + arguments[0];
			
			return wp.hooks.applyFilters.apply(this, arguments);
			
		},
		
		
		/*
		*  get_selector
		*
		*  This function will return a valid selector for finding a field object
		*
		*  @type	function
		*  @date	15/01/2015
		*  @since	5.1.5
		*
		*  @param	s (string)
		*  @return	(string)
		*/
		
		get_selector: function( s ) {
			
			// defaults
			s = s || '';
			
			
			// vars
			var selector = '.acf-field';
			
			
			// compatibility with object
			if( $.isPlainObject(s) ) {
				
				if( $.isEmptyObject(s) ) {
				
					s = '';
					
				} else {
					
					for( k in s ) { s = s[k]; break; }
					
				}
				
			}


			// search
			if( s ) {
				
				// append
				selector += '-' + s;
				
				
				// replace underscores (split/join replaces all and is faster than regex!)
				selector = selector.split('_').join('-');
				
				
				// remove potential double up
				selector = selector.split('field-field-').join('field-');
			
			}
			
			
			// return
			return selector;
			
		},
		
		
		/*
		*  get_fields
		*
		*  This function will return a jQuery selection of fields
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	args (object)
		*  @param	$el (jQuery) element to look within
		*  @param	all (boolean) return all fields or allow filtering (for repeater)
		*  @return	$fields (jQuery)
		*/
		
		get_fields: function( s, $el, all ){
			
			// debug
			//console.log( 'acf.get_fields(%o, %o, %o)', args, $el, all );
			//console.time("acf.get_fields");
			
			
			// defaults
			s = s || '';
			$el = $el || false;
			all = all || false;
			
			
			// vars
			var selector = this.get_selector(s);
			
			
			// get child fields
			var $fields = $( selector, $el );
			
			
			// append context to fields if also matches selector.
			// * Required for field group 'change_filed_type' append $tr to work
			if( $el !== false ) {
				
				$el.each(function(){
					
					if( $(this).is(selector) ) {
					
						$fields = $fields.add( $(this) );
						
					}
					
				});
				
			}
			
			
			// filter out fields
			if( !all ) {
				
				// remove clone fields
				$fields = $fields.not('.acf-clone .acf-field');
				
				
				// filter
				$fields = acf.apply_filters('get_fields', $fields);
								
			}
			
			
			//console.log('get_fields(%o, %o, %o) %o', s, $el, all, $fields);
			//console.log('acf.get_fields(%o):', this.get_selector(s) );
			//console.timeEnd("acf.get_fields");
			
			
			// return
			return $fields;
							
		},
		
		
		/*
		*  get_field
		*
		*  This function will return a jQuery selection based on a field key
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	field_key (string)
		*  @param	$el (jQuery) element to look within
		*  @return	$field (jQuery)
		*/
		
		get_field: function( s, $el ){
			
			// defaults
			s = s || '';
			$el = $el || false;
			
			
			// get fields
			var $fields = this.get_fields(s, $el, true);
			
			
			// check if exists
			if( $fields.exists() ) {
			
				return $fields.first();
				
			}
			
			
			// return
			return false;
			
		},
		
		
		/*
		*  get_closest_field
		*
		*  This function will return the closest parent field
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery) element to start from
		*  @param	args (object)
		*  @return	$field (jQuery)
		*/
		
		get_closest_field : function( $el, s ){
			
			// defaults
			s = s || '';
			
			
			// return
			return $el.closest( this.get_selector(s) );
			
		},
		
		
		/*
		*  get_field_wrap
		*
		*  This function will return the closest parent field
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery) element to start from
		*  @return	$field (jQuery)
		*/
		
		get_field_wrap: function( $el ){
			
			return $el.closest( this.get_selector() );
			
		},
		
		
		/*
		*  get_field_key
		*
		*  This function will return the field's key
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$field (jQuery)
		*  @return	(string)
		*/
		
		get_field_key: function( $field ){
		
			return $field.data('key');
			
		},
		
		
		/*
		*  get_field_type
		*
		*  This function will return the field's type
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$field (jQuery)
		*  @return	(string)
		*/
		
		get_field_type: function( $field ){
		
			return $field.data('type');
			
		},
		
		
		/*
		*  get_data
		*
		*  This function will return attribute data for a given elemnt
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery)
		*  @param	name (mixed)
		*  @return	(mixed)
		*/
		
		get_data: function( $el, defaults ){
			
			// get data
			var data = $el.data();
			
			
			// defaults
			if( typeof defaults === 'object' ) {
				
				data = this.parse_args( data, defaults );
				
			}
			
			
			// return
			return data;
							
		},
		
		
		/*
		*  get_uniqid
		*
		*  This function will return a unique string ID
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	prefix (string)
		*  @param	more_entropy (boolean)
		*  @return	(string)
		*/
		
		get_uniqid : function( prefix, more_entropy ){
		
			// + original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// + revised by: Kankrelune (http://www.webfaktory.info/)
			// % note 1: Uses an internal counter (in php_js global) to avoid collision
			// * example 1: uniqid();
			// * returns 1: 'a30285b160c14'
			// * example 2: uniqid('foo');
			// * returns 2: 'fooa30285b1cd361'
			// * example 3: uniqid('bar', true);
			// * returns 3: 'bara20285b23dfd1.31879087'
			if (typeof prefix === 'undefined') {
				prefix = "";
			}
			
			var retId;
			var formatSeed = function (seed, reqWidth) {
				seed = parseInt(seed, 10).toString(16); // to hex str
				if (reqWidth < seed.length) { // so long we split
					return seed.slice(seed.length - reqWidth);
				}
				if (reqWidth > seed.length) { // so short we pad
					return Array(1 + (reqWidth - seed.length)).join('0') + seed;
				}
				return seed;
			};
			
			// BEGIN REDUNDANT
			if (!this.php_js) {
				this.php_js = {};
			}
			// END REDUNDANT
			if (!this.php_js.uniqidSeed) { // init seed with big random int
				this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
			}
			this.php_js.uniqidSeed++;
			
			retId = prefix; // start with prefix, add current milliseconds hex string
			retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
			retId += formatSeed(this.php_js.uniqidSeed, 5); // add seed hex string
			if (more_entropy) {
				// for more entropy we add a float lower to 10
				retId += (Math.random() * 10).toFixed(8).toString();
			}
			
			return retId;
			
		},
		
		
		/*
		*  serialize_form
		*
		*  This function will create an object of data containing all form inputs within an element
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery selection)
		*  @return	$post_id (int)
		*/
		
		serialize_form: function(){
			
			return this.serialize.apply( this, arguments );
			
		},
		
		serialize: function( $el, prefix ){
			
			// defaults
			prefix = prefix || '';
			
			
			// vars
			var data = {};
			var names = {};
			var values = $el.find('select, textarea, input').serializeArray();
			
			
			// populate data
			$.each( values, function( i, pair ) {
				
				// vars
				var name = pair.name;
				var value = pair.value;
				
				
				// prefix
				if( prefix ) {
					
					// bail early if does not contain
					if( name.indexOf(prefix) !== 0 ) return;
					
					
					// remove prefix
					name = name.slice(prefix.length);
					
					
					// name must not start as array piece
					if( name.slice(0, 1) == '[' ) {
						
						name = name.slice(1).replace(']', '');
						
					}
					
				}
				
				
				// initiate name
				if( name.slice(-2) === '[]' ) {
					
					// remove []
					name = name.slice(0, -2);
					
					
					// initiate counter
					if( typeof names[ name ] === 'undefined'){
						
						names[ name ] = -1;
						
					}
					
					
					// increase counter
					names[ name ]++;
					
					
					// add key
					name += '[' + names[ name ] +']';
				}
				
				
				// append to data
				data[ name ] = value;
				
			});
			
			
			//console.log('serialize', data);
			
			
			// return
			return data;
			
		},
		
/*
		serialize: function( $el, prefix ){
			
			// defaults
			prefix = prefix || '';
			
			
			// vars
			var data = {};
			var $inputs = $el.find('select, textarea, input');
			
			
			// loop
			$inputs.each(function(){
				
				// vars
				var $el = $(this);
				var name = $el.attr('name');
				var val = $el.val();
				
				
				// is array
				var is_array = ( name.slice(-2) === '[]' );
				if( is_array ) {
					name = name.slice(0, -2);
				}
				
				
				// explode name
				var bits = name.split('[');
				var depth = bits.length;
				
				
				// loop
				for( var i = 0; i < depth; i++ ) {
					
					// vars
					var k = bits[i];
										
					
					// end
					if( i == depth-1 ) {
						
						
						
						
					// not end
					} else {
						
						// must be object
						if( typeof data[k] !== 'object' ) {
							data[k] = {};
						} 
						
					}
					
					
				}
				
				
				bits.map(function( s ){ return s.replace(']', ''); })
				
				
			});
			
		},
*/
		
		
		/*
		*  disable
		*
		*  This function will disable an input
		*
		*  @type	function
		*  @date	22/09/2016
		*  @since	5.4.0
		*
		*  @param	$el (jQuery)
		*  @param	context (string)
		*  @return	n/a
		*/
		
		disable: function( $input, context ){
			
			// defaults
			context = context || '';
			
			
			// bail early if is .acf-disabled
			if( $input.hasClass('acf-disabled') ) return false;
			
			
			// always disable input
			$input.prop('disabled', true);
			
			
			// context
			if( context ) {
				
				// vars
				var disabled = $input.data('acf_disabled') || [],
					i = disabled.indexOf(context);
					
				
				// append context if not found
				if( i < 0 ) {
					
					// append
					disabled.push( context );
					
					
					// update
					$input.data('acf_disabled', disabled);
					
				}
			}
			
			
			// return
			return true;
			
		}, 
		
		
		/*
		*  enable
		*
		*  This function will enable an input
		*
		*  @type	function
		*  @date	22/09/2016
		*  @since	5.4.0
		*
		*  @param	$el (jQuery)
		*  @param	context (string)
		*  @return	n/a
		*/
		
		enable: function( $input, context ){
			
			// defaults
			context = context || '';
			
			
			// bail early if is .acf-disabled
			if( $input.hasClass('acf-disabled') ) return false;
			
			
			// vars
			var disabled = $input.data('acf_disabled') || [];
				
				
			// context
			if( context ) {
				
				// vars
				var i = disabled.indexOf(context);
				
				
				// remove context if found
				if( i > -1 ) {
					
					// delete
					disabled.splice(i, 1);
					
					
					// update
					$input.data('acf_disabled', disabled);
					
				}
			}
			
			
			// bail early if other disabled exist
			if( disabled.length ) return false;
			
			
			// enable input
			$input.prop('disabled', false);
			
			
			// return
			return true;
			
		},
		
		
		/*
		*  disable_el
		*
		*  This function will disable all inputs within an element
		*
		*  @type	function
		*  @date	22/09/2016
		*  @since	5.4.0
		*
		*  @param	$el (jQuery)
		*  @param	context (string)
		*  @return	na
		*/
		
		disable_el: function( $el, context ) {
			
			// defaults
			context = context || '';
			
			
			// loop
			$el.find('select, textarea, input').each(function(){
				
				acf.disable( $(this), context );
				
			});
			
		},
		
		disable_form: function( $el, context ) {
			
			this.disable_el.apply( this, arguments );
			
		},
		
		
		/*
		*  enable_el
		*
		*  This function will enable all inputs within an element
		*
		*  @type	function
		*  @date	22/09/2016
		*  @since	5.4.0
		*
		*  @param	$el (jQuery)
		*  @param	context (string)
		*  @return	na
		*/
		
		enable_el: function( $el, context ) {
			
			// defaults
			context = context || '';
			
			
			// loop
			$el.find('select, textarea, input').each(function(){
				
				acf.enable( $(this), context );
				
			});
			
		},
		
		enable_form: function( $el, context ) {
			
			this.enable_el.apply( this, arguments );
			
		},
		
		
		/*
		*  remove_tr
		*
		*  This function will remove a tr element with animation
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$tr (jQuery selection)
		*  @param	callback (function) runs on complete
		*  @return	n/a
		*/
		
		remove_tr : function( $tr, callback ){
			
			// vars
			var height = $tr.height(),
				children = $tr.children().length;
			
			
			// add class
			$tr.addClass('acf-remove-element');
			
			
			// after animation
			setTimeout(function(){
				
				// remove class
				$tr.removeClass('acf-remove-element');
				
				
				// vars
				$tr.html('<td style="padding:0; height:' + height + 'px" colspan="' + children + '"></td>');
				
				
				$tr.children('td').animate({ height : 0}, 250, function(){
					
					$tr.remove();
					
					if( typeof(callback) == 'function' ) {
					
						callback();
					
					}
					
					
				});
				
					
			}, 250);
			
		},
		
		
		/*
		*  remove_el
		*
		*  This function will remove an element with animation
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery selection)
		*  @param	callback (function) runs on complete
		*  @param	end_height (int)
		*  @return	n/a
		*/
		
		remove_el : function( $el, callback, end_height ){
			
			// defaults
			end_height = end_height || 0;
			
			
			// vars
			var height = $el.height(),
				width = $el.width(),
				margin = $el.css('margin'),
				outer_height = $el.outerHeight(true);
			
			
			// action
			acf.do_action('remove', $el);
			
			
			// create wrap
			$el.wrap('<div class="acf-temp-remove" style="height:' + outer_height + 'px"></div>');
			var $wrap = $el.parent();
			
			
			// set pos
			$el.css({
				height:		height,
				width:		width,
				margin:		margin,
				position:	'absolute'
			});
			
			
			// fade
			setTimeout(function(){
				
				// aniamte
				$wrap.css({
					opacity:	0,
					height:		end_height
				});
				
			}, 50);
			
			
			// animate complete
			setTimeout(function(){
				
				// remove wrap
				$wrap.remove();
				
				
				// callback
				if( typeof(callback) == 'function' ) {
					callback.apply(this, arguments);
				}
			
			}, 301);
			
		},
		
		
		/*
		*  isset
		*
		*  This function will return true if an object key exists
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	(object)
		*  @param	key1 (string)
		*  @param	key2 (string)
		*  @param	...
		*  @return	(boolean)
		*/
		
		isset : function(){
			
			var a = arguments,
		        l = a.length,
		        c = null,
		        undef;
			
		    if (l === 0) {
		        throw new Error('Empty isset');
		    }
			
			c = a[0];
			
		    for (i = 1; i < l; i++) {
		    	
		        if (a[i] === undef || c[ a[i] ] === undef) {
		            return false;
		        }
		        
		        c = c[ a[i] ];
		        
		    }
		    
		    return true;	
			
		},
		
		
		/*
		*  maybe_get
		*
		*  This function will attempt to return a value and return null if not possible
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	obj (object) the array to look within
		*  @param	key (key) the array key to look for. Nested values may be found using '/'
		*  @param	value (mixed) the value returned if not found
		*  @return	(mixed)
		*/
		
		maybe_get: function( obj, key, value ){
			
			// default
			if( typeof value == 'undefined' ) value = null;
						
			
			// convert type to string and split
			keys = String(key).split('.');
			
			
			// loop through keys
			for( var i in keys ) {
				
				// vars
				var key = keys[i];
				
				
				// bail ealry if not set
				if( typeof obj[ key ] === 'undefined' ) {
					
					return value;
					
				}
				
				
				// update obj
				obj = obj[ key ];
				
			}
			
			
			// return
			return obj;
			
		},
		
		
		/*
		*  open_popup
		*
		*  This function will create and open a popup modal
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	args (object)
		*  @return	n/a
		*/
		
		open_popup : function( args ){
			
			// vars
			$popup = $('body > #acf-popup');
			
			
			// already exists?
			if( $popup.exists() ) {
			
				return update_popup(args);
				
			}
			
			
			// template
			var tmpl = [
				'<div id="acf-popup">',
					'<div class="acf-popup-box acf-box">',
						'<div class="title"><h3></h3><a href="#" class="acf-icon -cancel grey acf-close-popup"></a></div>',
						'<div class="inner"></div>',
						'<div class="loading"><i class="acf-loading"></i></div>',
					'</div>',
					'<div class="bg"></div>',
				'</div>'
			].join('');
			
			
			// append
			$('body').append( tmpl );
			
			
			$('#acf-popup').on('click', '.bg, .acf-close-popup', function( e ){
				
				e.preventDefault();
				
				acf.close_popup();
				
			});
			
			
			// update
			return this.update_popup(args);
			
		},
		
		
		/*
		*  update_popup
		*
		*  This function will update the content within a popup modal
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	args (object)
		*  @return	n/a
		*/
		
		update_popup : function( args ){
			
			// vars
			$popup = $('#acf-popup');
			
			
			// validate
			if( !$popup.exists() )
			{
				return false
			}
			
			
			// defaults
			args = $.extend({}, {
				title	: '',
				content : '',
				width	: 0,
				height	: 0,
				loading : false
			}, args);
			
			
			if( args.title ) {
			
				$popup.find('.title h3').html( args.title );
			
			}
			
			if( args.content ) {
				
				$inner = $popup.find('.inner:first');
				
				$inner.html( args.content );
				
				acf.do_action('append', $inner);
				
				// update height
				$inner.attr('style', 'position: relative;');
				args.height = $inner.outerHeight();
				$inner.removeAttr('style');
				
			}
			
			if( args.width ) {
			
				$popup.find('.acf-popup-box').css({
					'width'			: args.width,
					'margin-left'	: 0 - (args.width / 2)
				});
				
			}
			
			if( args.height ) {
				
				// add h3 height (44)
				args.height += 44;
				
				$popup.find('.acf-popup-box').css({
					'height'		: args.height,
					'margin-top'	: 0 - (args.height / 2)
				});	
				
			}
			
			
			if( args.loading ) {
			
				$popup.find('.loading').show();
				
			} else {
			
				$popup.find('.loading').hide();
				
			}
			
			return $popup;
		},
		
		
		/*
		*  close_popup
		*
		*  This function will close and remove a popup modal
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		close_popup : function(){
			
			// vars
			$popup = $('#acf-popup');
			
			
			// already exists?
			if( $popup.exists() )
			{
				$popup.remove();
			}
			
		},
		
		
		/*
		*  update_user_setting
		*
		*  This function will send an AJAX request to update a user setting
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		update_user_setting : function( name, value ) {
			
			// ajax
			$.ajax({
		    	url			: acf.get('ajaxurl'),
				dataType	: 'html',
				type		: 'post',
				data		: acf.prepare_for_ajax({
					'action'	: 'acf/update_user_setting',
					'name'		: name,
					'value'		: value
				})
			});
			
		},
		
		
		/*
		*  prepare_for_ajax
		*
		*  This function will prepare data for an AJAX request
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	args (object)
		*  @return	args
		*/
		
		prepare_for_ajax : function( args ) {
			
			// vars
			var data = {
				nonce	: acf.get('nonce'),
				post_id	: acf.get('post_id')
			};
			
			
			// $.ajax() expects all args to be 'non-nested'
			$.each(args, function(k,v){
				
				// object
				if( $.isPlainObject(v) && !$.isEmptyObject(v) ) {
					
					// loop
					$.each(v, function(k2,v2){
						
						// convert string
						k2 = k2 + '';
						
						
						// vars
						var i = k2.indexOf('[');
						
						
						// starts with [
						if( i == 0 ) {
							
							k2 = k + k2;
						
						// contains [	
						} else if( i > 0 ) {
							
							k2 = k + '[' + k2.slice(0, i) + ']' + k2.slice(i);
						
						// no [	
						} else {
							
							k2 = k + '[' + k2 + ']';
							
						}
						
						
						// append
						data[k2] = v2;
							
					});
				
				// else	
				} else {
					
					data[k] = v;
					
				}
				
			});
			
			
			// filter for 3rd party customization
			data = acf.apply_filters('prepare_for_ajax', data);	
			
			
			//console.log( 'prepare_for_ajax', data );
			
			
			// return
			return data;
			
		},
		
		
		/*
		*  is_ajax_success
		*
		*  This function will return true for a successful WP AJAX response
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	json (object)
		*  @return	(boolean)
		*/
		
		is_ajax_success : function( json ) {
			
			if( json && json.success ) {
				
				return true;
				
			}
			
			return false;
			
		},
		
		
		/*
		*  get_ajax_message
		*
		*  This function will return an object containing error/message information
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	json (object)
		*  @return	(boolean)
		*/
		
		get_ajax_message: function( json ) {
			
			// vars
			var message = {
				text: '',
				type: 'error'
			};
			
			
			// bail early if no json
			if( !json ) {
				
				return message;
				
			}
			
			
			// PHP error (too may themes will have warnings / errors. Don't show these in ACF taxonomy popup)
/*
			if( typeof json === 'string' ) {
				
				message.text = json;
				return message;
					
			}
*/
			
			
			// success
			if( json.success ) {
				
				message.type = 'success';

			}
			
						
			// message
			if( json.data && json.data.message ) {
				
				message.text = json.data.message;
				
			}
			
			
			// error
			if( json.data && json.data.error ) {
				
				message.text = json.data.error;
				
			}
			
			
			// return
			return message;
			
		},
		
		
		/*
		*  is_in_view
		*
		*  This function will return true if a jQuery element is visible in browser
		*
		*  @type	function
		*  @date	8/09/2014
		*  @since	5.0.0
		*
		*  @param	$el (jQuery)
		*  @return	(boolean)
		*/
		
		is_in_view: function( $el ) {
			
			// vars
		    var elemTop = $el.offset().top,
		    	elemBottom = elemTop + $el.height();
		    
		    
			// bail early if hidden
			if( elemTop === elemBottom ) {
				
				return false;
				
			}
			
			
			// more vars
			var docViewTop = $(window).scrollTop(),
				docViewBottom = docViewTop + $(window).height();
			
			
			// return
		    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
					
		},
		
		
		/*
		*  val
		*
		*  This function will update an elements value and trigger the change event if different
		*
		*  @type	function
		*  @date	16/10/2014
		*  @since	5.0.9
		*
		*  @param	$el (jQuery)
		*  @param	val (mixed)
		*  @return	n/a
		*/
		
		val: function( $el, val ){
			
			// vars
			var orig = $el.val();
			
			
			// update value
			$el.val( val );
			
			
			// trigger change
			if( val != orig ) {
				
				$el.trigger('change');
				
			}
			
		},
		
		
		/*
		*  str_replace
		*
		*  This function will perform a str replace similar to php function str_replace
		*
		*  @type	function
		*  @date	1/05/2015
		*  @since	5.2.3
		*
		*  @param	$search (string)
		*  @param	$replace (string)
		*  @param	$subject (string)
		*  @return	(string)
		*/
		
		str_replace: function( search, replace, subject ) {
			
			return subject.split(search).join(replace);
			
		},
		
		
		/*
		*  str_sanitize
		*
		*  description
		*
		*  @type	function
		*  @date	4/06/2015
		*  @since	5.2.3
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		str_sanitize: function( string ) {
			
			// chars (https://jsperf.com/replace-foreign-characters)
			var map = {
	            "À": "A",
	            "Á": "A",
	            "Â": "A",
	            "Ã": "A",
	            "Ä": "A",
	            "Å": "A",
	            "Æ": "AE",
	            "Ç": "C",
	            "È": "E",
	            "É": "E",
	            "Ê": "E",
	            "Ë": "E",
	            "Ì": "I",
	            "Í": "I",
	            "Î": "I",
	            "Ï": "I",
	            "Ð": "D",
	            "Ñ": "N",
	            "Ò": "O",
	            "Ó": "O",
	            "Ô": "O",
	            "Õ": "O",
	            "Ö": "O",
	            "Ø": "O",
	            "Ù": "U",
	            "Ú": "U",
	            "Û": "U",
	            "Ü": "U",
	            "Ý": "Y",
	            "ß": "s",
	            "à": "a",
	            "á": "a",
	            "â": "a",
	            "ã": "a",
	            "ä": "a",
	            "å": "a",
	            "æ": "ae",
	            "ç": "c",
	            "è": "e",
	            "é": "e",
	            "ê": "e",
	            "ë": "e",
	            "ì": "i",
	            "í": "i",
	            "î": "i",
	            "ï": "i",
	            "ñ": "n",
	            "ò": "o",
	            "ó": "o",
	            "ô": "o",
	            "õ": "o",
	            "ö": "o",
	            "ø": "o",
	            "ù": "u",
	            "ú": "u",
	            "û": "u",
	            "ü": "u",
	            "ý": "y",
	            "ÿ": "y",
	            "Ā": "A",
	            "ā": "a",
	            "Ă": "A",
	            "ă": "a",
	            "Ą": "A",
	            "ą": "a",
	            "Ć": "C",
	            "ć": "c",
	            "Ĉ": "C",
	            "ĉ": "c",
	            "Ċ": "C",
	            "ċ": "c",
	            "Č": "C",
	            "č": "c",
	            "Ď": "D",
	            "ď": "d",
	            "Đ": "D",
	            "đ": "d",
	            "Ē": "E",
	            "ē": "e",
	            "Ĕ": "E",
	            "ĕ": "e",
	            "Ė": "E",
	            "ė": "e",
	            "Ę": "E",
	            "ę": "e",
	            "Ě": "E",
	            "ě": "e",
	            "Ĝ": "G",
	            "ĝ": "g",
	            "Ğ": "G",
	            "ğ": "g",
	            "Ġ": "G",
	            "ġ": "g",
	            "Ģ": "G",
	            "ģ": "g",
	            "Ĥ": "H",
	            "ĥ": "h",
	            "Ħ": "H",
	            "ħ": "h",
	            "Ĩ": "I",
	            "ĩ": "i",
	            "Ī": "I",
	            "ī": "i",
	            "Ĭ": "I",
	            "ĭ": "i",
	            "Į": "I",
	            "į": "i",
	            "İ": "I",
	            "ı": "i",
	            "Ĳ": "IJ",
	            "ĳ": "ij",
	            "Ĵ": "J",
	            "ĵ": "j",
	            "Ķ": "K",
	            "ķ": "k",
	            "Ĺ": "L",
	            "ĺ": "l",
	            "Ļ": "L",
	            "ļ": "l",
	            "Ľ": "L",
	            "ľ": "l",
	            "Ŀ": "L",
	            "ŀ": "l",
	            "Ł": "l",
	            "ł": "l",
	            "Ń": "N",
	            "ń": "n",
	            "Ņ": "N",
	            "ņ": "n",
	            "Ň": "N",
	            "ň": "n",
	            "ŉ": "n",
	            "Ō": "O",
	            "ō": "o",
	            "Ŏ": "O",
	            "ŏ": "o",
	            "Ő": "O",
	            "ő": "o",
	            "Œ": "OE",
	            "œ": "oe",
	            "Ŕ": "R",
	            "ŕ": "r",
	            "Ŗ": "R",
	            "ŗ": "r",
	            "Ř": "R",
	            "ř": "r",
	            "Ś": "S",
	            "ś": "s",
	            "Ŝ": "S",
	            "ŝ": "s",
	            "Ş": "S",
	            "ş": "s",
	            "Š": "S",
	            "š": "s",
	            "Ţ": "T",
	            "ţ": "t",
	            "Ť": "T",
	            "ť": "t",
	            "Ŧ": "T",
	            "ŧ": "t",
	            "Ũ": "U",
	            "ũ": "u",
	            "Ū": "U",
	            "ū": "u",
	            "Ŭ": "U",
	            "ŭ": "u",
	            "Ů": "U",
	            "ů": "u",
	            "Ű": "U",
	            "ű": "u",
	            "Ų": "U",
	            "ų": "u",
	            "Ŵ": "W",
	            "ŵ": "w",
	            "Ŷ": "Y",
	            "ŷ": "y",
	            "Ÿ": "Y",
	            "Ź": "Z",
	            "ź": "z",
	            "Ż": "Z",
	            "ż": "z",
	            "Ž": "Z",
	            "ž": "z",
	            "ſ": "s",
	            "ƒ": "f",
	            "Ơ": "O",
	            "ơ": "o",
	            "Ư": "U",
	            "ư": "u",
	            "Ǎ": "A",
	            "ǎ": "a",
	            "Ǐ": "I",
	            "ǐ": "i",
	            "Ǒ": "O",
	            "ǒ": "o",
	            "Ǔ": "U",
	            "ǔ": "u",
	            "Ǖ": "U",
	            "ǖ": "u",
	            "Ǘ": "U",
	            "ǘ": "u",
	            "Ǚ": "U",
	            "ǚ": "u",
	            "Ǜ": "U",
	            "ǜ": "u",
	            "Ǻ": "A",
	            "ǻ": "a",
	            "Ǽ": "AE",
	            "ǽ": "ae",
	            "Ǿ": "O",
	            "ǿ": "o",
	            
	            // extra
	            ' ': '_',
				'\'': '',
				'?': '',
				'/': '',
				'\\': '',
				'.': '',
				',': '',
				'`': '',
				'>': '',
				'<': '',
				'"': '',
				'[': '',
				']': '',
				'|': '',
				'{': '',
				'}': '',
				'(': '',
				')': ''
	        };
			
		    
		    // vars
		    var regexp = /\W/g,
		        mapping = function (c) { return (typeof map[c] !== 'undefined') ? map[c] : c; };
			
			
			// replace
			string = string.replace(regexp, mapping);
			
			
			// lower case
			string = string.toLowerCase();
			
			
			// return
			return string;
						
		},
		
		
		/*
		*  addslashes
		*
		*  This function mimics the PHP addslashes function. 
		*  Returns a string with backslashes before characters that need to be escaped.
		*
		*  @type	function
		*  @date	9/1/17
		*  @since	5.5.0
		*
		*  @param	text (string)
		*  @return	(string)
		*/
		
		addslashes: function(text){
			
			return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			
		},
		
		
		/*
		*  render_select
		*
		*  This function will update a select field with new choices
		*
		*  @type	function
		*  @date	8/04/2014
		*  @since	5.0.0
		*
		*  @param	$select
		*  @param	choices
		*  @return	n/a
		*/
		
		render_select: function( $select, choices ){
			
			// vars
			var value = $select.val();
			
			
			// clear choices
			$select.html('');
			
			
			// bail early if no choices
			if( !choices ) {
				
				return;
				
			}
			
			
			// populate choices
			$.each(choices, function( i, item ){
				
				// vars
				var $optgroup = $select;
				
				
				// add group
				if( item.group ) {
					
					$optgroup = $select.find('optgroup[label="' + item.group + '"]');
					
					if( !$optgroup.exists() ) {
						
						$optgroup = $('<optgroup label="' + item.group + '"></optgroup>');
						
						$select.append( $optgroup );
						
					}
					
				}
				
				
				// append select
				$optgroup.append( '<option value="' + item.value + '">' + item.label + '</option>' );
				
				
				// selectedIndex
				if( value == item.value ) {
					
					 $select.prop('selectedIndex', i);
					 
				}
				
			});
			
		},
		
		
		/*
		*  duplicate
		*
		*  This function will duplicate and return an element
		*
		*  @type	function
		*  @date	22/08/2015
		*  @since	5.2.3
		*
		*  @param	$el (jQuery) object to be duplicated
		*  @param	attr (string) attrbute name where $el id can be found
		*  @return	$el2 (jQuery)
		*/
		
		duplicate: function( args ){
			
			//console.time('duplicate');
			
			
			// backwards compatibility
			// - array of settings added in v5.4.6
			if( typeof args.length !== 'undefined' ) args = { $el: args };
			
			
			// defaults
			args = acf.parse_args(args, {
				$el: false,
				search: '',
				replace: '',
				before: function( $el ){},
				after: function( $el, $el2 ){},
				append: function( $el, $el2 ){ $el.after( $el2 ); }
			});
			
			
			// vars
			var $el = args.$el,
				$el2;
			
			
			// search
			if( !args.search ) args.search = $el.attr('data-id');
			
			
			// replace
			if( !args.replace ) args.replace = acf.get_uniqid();
			
			
			// before
			// - allow acf to modify DOM
			// - fixes bug where select field option is not selected
			args.before.apply( this, [$el] );
			acf.do_action('before_duplicate', $el);
			
			
			// clone
			var	$el2 = $el.clone();
			
			
			// remove acf-clone (may be a clone)
			$el2.removeClass('acf-clone');
			
			
			// remove JS functionality
			acf.do_action('remove', $el2);
			
			
			// find / replace
			if( args.search ) {
				
				// replace data
				$el2.attr('data-id', args.replace);
				
				
				// replace ids
				$el2.find('[id*="' + args.search + '"]').each(function(){	
				
					$(this).attr('id', $(this).attr('id').replace(args.search, args.replace) );
					
				});
				
				
				// replace names
				$el2.find('[name*="' + args.search + '"]').each(function(){	
				
					$(this).attr('name', $(this).attr('name').replace(args.search, args.replace) );
					
				});
				
				
				// replace label for
				$el2.find('label[for*="' + args.search + '"]').each(function(){
				
					$(this).attr('for', $(this).attr('for').replace(args.search, args.replace) );
					
				});
				
			}
			
			
			// remove ui-sortable
			$el2.find('.ui-sortable').removeClass('ui-sortable');
			
			
			// after
			// - allow acf to modify DOM
			acf.do_action('after_duplicate', $el, $el2 );
			args.after.apply( this, [$el, $el2] );
			
			
			// append
			args.append.apply( this, [$el, $el2] );
			
			
			// add JS functionality
			// - allow element to be moved into a visible position before fire action
			setTimeout(function(){
				
				acf.do_action('append', $el2);
				
			}, 1);
			
			
			//console.timeEnd('duplicate');
			
			
			// return
			return $el2;
			
		},
		
		decode: function( string ){
			
			return $('<textarea/>').html( string ).text();
			
		},
		
		
		/*
		*  parse_args
		*
		*  This function will merge together defaults and args much like the WP wp_parse_args function
		*
		*  @type	function
		*  @date	11/04/2016
		*  @since	5.3.8
		*
		*  @param	args (object)
		*  @param	defaults (object)
		*  @return	args
		*/
		
		parse_args: function( args, defaults ) {
			
			// defaults
			if( typeof args !== 'object' ) args = {};
			if( typeof defaults !== 'object' ) defaults = {};
			
			
			// return
			return $.extend({}, defaults, args);
			
		},
		
		
		/*
		*  enqueue_script
		*
		*  This function will append a script to the page
		*
		*  @source	https://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
		*  @type	function
		*  @date	27/08/2016
		*  @since	5.4.0
		*
		*  @param	url (string)
		*  @param	callback (function)
		*  @return	na
		*/
		
		enqueue_script: function( url, callback ) {
			
			// vars
		    var script = document.createElement('script');
		    
		    
		    // atts
		    script.type = "text/javascript";
			script.src = url;
		    script.async = true;
			
			
			// ie
		    if( script.readyState ) {
			    
		        script.onreadystatechange = function(){
			        
		            if( script.readyState == 'loaded' || script.readyState == 'complete' ){
			            
		                script.onreadystatechange = null;
		                callback();
		                
		            }
		            
		        };
		    
		    // normal browsers
		    } else {
			    
		        script.onload = function(){
		            callback();
		        };
		        
		    }
		    
		    
		    // append
		    document.body.appendChild(script);
			
		}
		
	};
	
	
	/*
	*  acf.model
	*
	*  This model acts as a scafold for action.event driven modules
	*
	*  @type	object
	*  @date	8/09/2014
	*  @since	5.0.0
	*
	*  @param	(object)
	*  @return	(object)
	*/
	
	acf.model = {
		
		// vars
		actions:	{},
		filters:	{},
		events:		{},
		
		extend: function( args ){
			
			// extend
			var model = $.extend( {}, this, args );
			
			
			// setup actions
			$.each(model.actions, function( name, callback ){
				
				model._add_action( name, callback );
			
			});
			
			
			// setup filters
			$.each(model.filters, function( name, callback ){
				
				model._add_filter( name, callback );
			
			});
			
			
			// setup events
			$.each(model.events, function( name, callback ){
				
				model._add_event( name, callback );
				
			});
			
			
			// return
			return model;
			
		},
		
		_add_action: function( name, callback ) {
			
			// split
			var model = this,
				data = name.split(' ');
			
			
			// add missing priority
			var name = data[0] || '',
				priority = data[1] || 10;
			
			
			// add action
			acf.add_action(name, model[ callback ], priority, model);
			
		},
		
		_add_filter: function( name, callback ) {
			
			// split
			var model = this,
				data = name.split(' ');
			
			
			// add missing priority
			var name = data[0] || '',
				priority = data[1] || 10;
			
			
			// add action
			acf.add_filter(name, model[ callback ], priority, model);
			
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this,
				i = name.indexOf(' '),
				event = (i > 0) ? name.substr(0,i) : name,
				selector = (i > 0) ? name.substr(i+1) : '';
			
			
			// event
			var fn = function( e ){
				
				// append $el to event object
				e.$el = $(this);
				
				
				// event
				if( typeof model.event === 'function' ) {
					e = model.event( e );
				}
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			};
			
			
			// add event
			if( selector ) {
				$(document).on(event, selector, fn);
			} else {
				$(document).on(event, fn);
			}
			
		},
		
		get: function( name, value ){
			
			// defaults
			value = value || null;
			
			
			// get
			if( typeof this[ name ] !== 'undefined' ) {
				
				value = this[ name ];
					
			}
			
			
			// return
			return value;
			
		},
		
		
		set: function( name, value ){
			
			// set
			this[ name ] = value;
			
			
			// function for 3rd party
			if( typeof this[ '_set_' + name ] === 'function' ) {
				
				this[ '_set_' + name ].apply(this);
				
			}
			
			
			// return for chaining
			return this;
			
		}
		
	};
	
	
	/*
	*  field
	*
	*  This model sets up many of the field's interactions
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	acf.field = acf.model.extend({
		
		// vars
		type:		'',
		o:			{},
		$field:		null,
		
		_add_action: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// update name
			name = name + '_field/type=' + model.type;
			
			
			// add action
			acf.add_action(name, function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_filter: function( name, callback ) {
			
			// vars
			var model = this;
			
			
			// update name
			name = name + '_field/type=' + model.type;
			
			
			// add action
			acf.add_filter(name, function( $field ){
				
				// focus
				model.set('$field', $field);
				
				
				// callback
				model[ callback ].apply(model, arguments);
				
			});
			
		},
		
		_add_event: function( name, callback ) {
			
			// vars
			var model = this,
				event = name.substr(0,name.indexOf(' ')),
				selector = name.substr(name.indexOf(' ')+1),
				context = acf.get_selector(model.type);
			
			
			// add event
			$(document).on(event, context + ' ' + selector, function( e ){
				
				// vars
				var $el = $(this);
				var $field = acf.get_closest_field( $el, model.type );
				
				
				// bail early if no field
				if( !$field.length ) return;
				
				
				// focus
				if( !$field.is(model.$field) ) {
					model.set('$field', $field);
				}
				
				
				// append to event
				e.$el = $el;
				e.$field = $field;
				
				
				// callback
				model[ callback ].apply(model, [e]);
				
			});
			
		},
		
		_set_$field: function(){
			
			// callback
			if( typeof this.focus === 'function' ) {
				this.focus();
			}
			
		},
		
		// depreciated
		doFocus: function( $field ){
			
			return this.set('$field', $field);
			
		}
		
	});
	
	
	/*
	*  field
	*
	*  This model fires actions and filters for registered fields
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	acf.fields = acf.model.extend({
		
		actions: {
			'prepare'			: '_prepare',
			'prepare_field'		: '_prepare_field',
			'ready'				: '_ready',
			'ready_field'		: '_ready_field',
			'append'			: '_append',
			'append_field'		: '_append_field',
			'load'				: '_load',
			'load_field'		: '_load_field',
			'remove'			: '_remove',
			'remove_field'		: '_remove_field',
			'sortstart'			: '_sortstart',
			'sortstart_field'	: '_sortstart_field',
			'sortstop'			: '_sortstop',
			'sortstop_field'	: '_sortstop_field',
			'show'				: '_show',
			'show_field'		: '_show_field',
			'hide'				: '_hide',
			'hide_field'		: '_hide_field'
		},
		
		// prepare
		_prepare: function( $el ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('prepare_field', $(this));
				
			});
			
		},
		
		_prepare_field: function( $el ){
			
			acf.do_action('prepare_field/type=' + $el.data('type'), $el);
			
		},
		
		// ready
		_ready: function( $el ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('ready_field', $(this));
				
			});
			
		},
		
		_ready_field: function( $el ){
			
			acf.do_action('ready_field/type=' + $el.data('type'), $el);
			
		},
		
		// append
		_append: function( $el ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('append_field', $(this));
				
			});
			
		},
		
		_append_field: function( $el ){
		
			acf.do_action('append_field/type=' + $el.data('type'), $el);
			
		},
		
		// load
		_load: function( $el ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('load_field', $(this));
				
			});
			
		},
		
		_load_field: function( $el ){
		
			acf.do_action('load_field/type=' + $el.data('type'), $el);
			
		},
		
		// remove
		_remove: function( $el ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('remove_field', $(this));
				
			});
			
		},
		
		_remove_field: function( $el ){
		
			acf.do_action('remove_field/type=' + $el.data('type'), $el);
			
		},
		
		// sortstart
		_sortstart: function( $el, $placeholder ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('sortstart_field', $(this), $placeholder);
				
			});
			
		},
		
		_sortstart_field: function( $el, $placeholder ){
		
			acf.do_action('sortstart_field/type=' + $el.data('type'), $el, $placeholder);
			
		},
		
		// sortstop
		_sortstop: function( $el, $placeholder ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('sortstop_field', $(this), $placeholder);
				
			});
			
		},
		
		_sortstop_field: function( $el, $placeholder ){
		
			acf.do_action('sortstop_field/type=' + $el.data('type'), $el, $placeholder);
			
		},
		
		
		// hide
		_hide: function( $el, context ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('hide_field', $(this), context);
				
			});
			
		},
		
		_hide_field: function( $el, context ){
		
			acf.do_action('hide_field/type=' + $el.data('type'), $el, context);
			
		},
		
		// show
		_show: function( $el, context ){
		
			acf.get_fields('', $el).each(function(){
				
				acf.do_action('show_field', $(this), context);
				
			});
			
		},
		
		_show_field: function( $el, context ){
		
			acf.do_action('show_field/type=' + $el.data('type'), $el, context);
			
		}
		
	});
	
	
	/*
	*  ready
	*
	*  description
	*
	*  @type	function
	*  @date	19/02/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	$(document).ready(function(){
		
		// action for 3rd party customization
		acf.do_action('ready', $('body'));
		
	});
	
	
	/*
	*  load
	*
	*  description
	*
	*  @type	function
	*  @date	19/02/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	$(window).on('load', function(){
		
		// action for 3rd party customization
		acf.do_action('load', $('body'));
		
	});
	
	
	/*
	*  layout
	*
	*  This model handles the width layout for fields
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
		
	acf.layout = acf.model.extend({
		
		active: 0,
		
		actions: {
			'prepare 99': 	'prepare',
			'refresh': 		'refresh'
		},
		
		prepare: function(){
			
			// vars
			this.active = 1;
			
			
			// render
			this.refresh();
			
		},
		
		refresh: function( $el ){ 
			
			// bail early if not yet active
			if( !this.active ) return;
			
			
			// defaults
			$el = $el || $('body');
			
			
			// reference
			var self = this;
			
			
			// render
			this.render_tables( $el );
			this.render_groups( $el );
			
		},
		
		render_tables: function( $el ){ 
			
			// reference
			var self = this;
			
			
			// vars
			var $tables = $el.find('.acf-table:visible');
			
			
			// appent self if is tr
			if( $el.is('tr') ) {
				
				$tables = $el.parent().parent();
				
			}
			
			
			// loop
			$tables.each(function(){
				
				self.render_table( $(this) );
				
			});
			
		},
		
		render_table: function( $table ){
			
			// vars
			var $ths = $table.find('> thead th.acf-th'),
				colspan = 1,
				available_width = 100;
			
			
			// bail early if no $ths
			if( !$ths.exists() ) return;
			
			
			// vars
			var $trs = $table.find('> tbody > tr'),
				$tds = $trs.find('> td.acf-field');
			
			
			// remove clones if has visible rows
			if( $trs.hasClass('acf-clone') && $trs.length > 1 ) {
				
				$tds = $trs.not('.acf-clone').find('> td.acf-field');
				
			}
			
			
			// render th/td visibility
			$ths.each(function(){
				
				// vars
				var $th = $(this),
					key = $th.attr('data-key'),
					$td = $tds.filter('[data-key="'+key+'"]');
				
				// clear class
				$td.removeClass('appear-empty');
				$th.removeClass('hidden-by-conditional-logic');
				
				
				// no td
				if( !$td.exists() ) {
					
					// do nothing
				
				// if all td are hidden
				} else if( $td.not('.hidden-by-conditional-logic').length == 0 ) {
					
					$th.addClass('hidden-by-conditional-logic');
				
				// if 1 or more td are visible
				} else {
					
					$td.filter('.hidden-by-conditional-logic').addClass('appear-empty');
					
				}
				
			});
			
			
			
			// clear widths
			$ths.css('width', 'auto');
			
			
			// update $ths
			$ths = $ths.not('.hidden-by-conditional-logic');
			
			
			// set colspan
			colspan = $ths.length;
			
			
			// set custom widths first
			$ths.filter('[data-width]').each(function(){
				
				// vars
				var width = parseInt( $(this).attr('data-width') );
				
				
				// remove from available
				available_width -= width;
				
				
				// set width
				$(this).css('width', width + '%');
				
			});
			
			
			// update $ths
			$ths = $ths.not('[data-width]');
			
			
			// set custom widths first
			$ths.each(function(){
				
				// cal width
				var width = available_width / $ths.length;
				
				
				// set width
				$(this).css('width', width + '%');
				
			});
			
			
			// update colspan
			$table.find('.acf-row .acf-field.-collapsed-target').removeAttr('colspan');
			$table.find('.acf-row.-collapsed .acf-field.-collapsed-target').attr('colspan', colspan);
			
		},
		
		render_groups: function( $el ){
			
			// reference
			var self = this;
			
			
			// vars
			var $groups = $el.find('.acf-fields:visible');
			
			
			// appent self if is '.acf-fields'
			if( $el && $el.is('.acf-fields') ) {
				
				$groups = $groups.add( $el );
				
			}
			
			
			// loop
			$groups.each(function(){
				
				self.render_group( $(this) );
				
			});
			
		},
		
		render_group: function( $el ){
			
			// vars
			var $els = $(),
				top = 0,
				height = 0,
				cell = -1;
			
			
			// get fields
			var $fields = $el.children('.acf-field[data-width]:visible');
			
			
			// bail early if no fields
			if( !$fields.exists() ) return;
			
			
			// bail ealry if is .-left
			if( $el.hasClass('-left') ) {
				
				$fields.removeAttr('data-width');
				$fields.css('width', 'auto');
				return;
				
			}
			
			
			// reset fields
			$fields.removeClass('acf-r0 acf-c0').css({'min-height': 0});
			
			
			// loop
			$fields.each(function( i ){
				
				// vars
				var $el = $(this),
					this_top = $el.position().top;
				
				
				// set top
				if( i == 0 ) top = this_top;
				
				
				// detect new row
				if( this_top != top ) {
					
					// set previous heights
					$els.css({'min-height': (height+1)+'px'});
					
					// reset
					$els = $();
					top = $el.position().top; // don't use variable as this value may have changed due to min-height css
					height = 0;
					cell = -1;
					
				}
				
								
				// increase
				cell++;
				
				
				// set height
				height = ($el.outerHeight() > height) ? $el.outerHeight() : height;
				
				
				// append
				$els = $els.add( $el );
				
				
				// add classes
				if( this_top == 0 ) {
					
					$el.addClass('acf-r0');
					
				} else if( cell == 0 ) {
					
					$el.addClass('acf-c0');
					
				}
				
			});
			
			
			// clean up
			if( $els.exists() ) {
				
				$els.css({'min-height': (height+1)+'px'});
				
			}
			
		}
		
	});
	
	
	/*
	*  Force revisions
	*
	*  description
	*
	*  @type	function
	*  @date	19/02/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	$(document).on('change', '.acf-field input, .acf-field textarea, .acf-field select', function(){
		
		// preview hack
		var $input = $('#_acf_changed');
		if( $input.length ) $input.val(1);
		
		
		// action for 3rd party customization
		acf.do_action('change', $(this));
		
	});
	
	
	/*
	*  preventDefault helper
	*
	*  This function will prevent default of any link with an href of #
	*
	*  @type	function
	*  @date	24/07/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	$(document).on('click', '.acf-field a[href="#"]', function( e ){
		
		e.preventDefault();
		
	});
	
	
	/*
	*  unload
	*
	*  This model handles the unload prompt
	*
	*  @type	function
	*  @date	21/02/2014
	*  @since	3.5.1
	*
	*  @param	n/a
	*  @return	n/a
	*/
		
	acf.unload = acf.model.extend({
		
		locked: 1,
		active: 1,
		changed: 0,
		
		filters: {
			'validation_complete': 'validation_complete'
		},
		
		actions: {
			'ready':	'ready',
			'change':	'on',
		},
		
		ready: function(){
			
			// unlock in 1s to avoid JS 'trigger change' bugs
			setTimeout(function(){
				
				acf.unload.locked = 0;
				
			}, 1000);
			
		},
		
		events: {
			'submit form':	'off'
		},
		
		validation_complete: function( json, $form ){
			
			if( json && json.errors ) {
				
				this.on();
				
			}
			
			// return
			return json;
			
		},
		
		on: function(){
			
			// bail ealry if already changed, not active, or still locked
			if( this.changed || !this.active || this.locked ) {
				
				return;
				
			}
			
			
			// update 
			this.changed = 1;
			
			
			// add event
			$(window).on('beforeunload', this.unload);
			
		},
		
		off: function(){
			
			// update 
			this.changed = 0;
			
			
			// remove event
			$(window).off('beforeunload', this.unload);
			
		},
		
		unload: function(){
			
			// alert string
			return acf._e('unload');
			
		}
		 
	});
	
	
	acf.tooltip = acf.model.extend({
		
		events: {
			'mouseenter .acf-js-tooltip':	'_on',
			'mouseup .acf-js-tooltip':		'_off',
			'mouseleave .acf-js-tooltip':	'_off'
		},
		
		tooltip: function( text, $el ){
			
			// vars
			var $tooltip = $('<div class="acf-tooltip">' + text + '</div>');
			
			
			// append
			$('body').append( $tooltip );
			
			
			// position
			var tolerance = 10;
				target_w = $el.outerWidth(),
				target_h = $el.outerHeight(),
				target_t = $el.offset().top,
				target_l = $el.offset().left,
				tooltip_w = $tooltip.outerWidth(),
				tooltip_h = $tooltip.outerHeight();
			
			
			// calculate top
			var top = target_t - tooltip_h,
				left = target_l + (target_w / 2) - (tooltip_w / 2);
			
			
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
			
			
			// return
			return $tooltip;
			
		},
		
		confirm: function( $el, callback, text, button_y, button_n ){
			
			// defaults
			text = text || acf._e('are_you_sure');
			button_y = button_y || '<a href="#" class="acf-confirm-y">'+acf._e('yes')+'</a>';
			button_n = button_n || '<a href="#" class="acf-confirm-n">'+acf._e('No')+'</a>';
			
			
			// vars
			var $tooltip = this.tooltip( text + ' ' + button_y + ' ' + button_n , $el);
			
			
			// add class
			$tooltip.addClass('-confirm');
			
			
			// events
			var event = function( e, result ){
				
				// prevent all listeners
				e.preventDefault();
				e.stopImmediatePropagation();
				
				
				// remove events
				$el.off('click', event_y);
				$tooltip.off('click', '.acf-confirm-y', event_y);
				$tooltip.off('click', '.acf-confirm-n', event_n);
				$('body').off('click', event_n);
				
				
				// remove tooltip
				$tooltip.remove();
				
				
				// callback
				callback.apply(null, [result]);
				
			};
			
			var event_y = function( e ){
				event( e, true );
			};
			
			var event_n = function( e ){
				event( e, false );
			};
			
			
			// add events
			$tooltip.on('click', '.acf-confirm-y', event_y);
			$tooltip.on('click', '.acf-confirm-n', event_n);
			$el.on('click', event_y);
			$('body').on('click', event_n);
			
		},
		
		confirm_remove: function( $el, callback ){
			
			// vars
			text = false; // default
			button_y = '<a href="#" class="acf-confirm-y -red">'+acf._e('remove')+'</a>';
			button_n = '<a href="#" class="acf-confirm-n">'+acf._e('cancel')+'</a>';
			
			
			// confirm
			this.confirm( $el, callback, false, button_y, button_n );
			
		},
		
		_on: function( e ){
			
			// vars
			var title = e.$el.attr('title');
			
			
			// bail ealry if no title
			if( !title ) return;
			
			
			// create tooltip
			var $tooltip = this.tooltip( title, e.$el );
			
			
			// store as data
			e.$el.data('acf-tooltip', {
				'title': title,
				'$el': $tooltip
			});
			
			
			// clear title to avoid default browser tooltip
			e.$el.attr('title', '');
			
		},
		
		_off: function( e ){
			
			// vars
			var tooltip = e.$el.data('acf-tooltip');
			
			
			// bail early if no data
			if( !tooltip ) return;
			
			
			// remove tooltip
			tooltip.$el.remove();
			
			
			// restore title
			e.$el.attr('title', tooltip.title);
		}
		
	});
	
	
	acf.postbox = acf.model.extend({
		
		events: {
			'mouseenter .acf-postbox .handlediv':	'on',
			'mouseleave .acf-postbox .handlediv':	'off'
		},

		on: function( e ){
			
			e.$el.siblings('.hndle').addClass('hover');
			
		},
		
		off: function( e ){
			
			e.$el.siblings('.hndle').removeClass('hover');
			
		},
		
		render: function( args ){
			
			// defaults
			args = $.extend({}, {
				id: 		'',
				key:		'',
				style: 		'default',
				label: 		'top',
				edit_url:	'',
				edit_title:	'',
				visibility:	true
			}, args);
			
			
			// vars
			var $postbox = $('#' + args.id),
				$toggle = $('#' + args.id + '-hide'),
				$label = $toggle.parent();
			
			
			
			// add class
			$postbox.addClass('acf-postbox');
			$label.addClass('acf-postbox-toggle');
			
			
			// remove class
			$postbox.removeClass('hide-if-js');
			$label.removeClass('hide-if-js');
			
			
			// field group style
			if( args.style !== 'default' ) {
				
				$postbox.addClass( args.style );
				
			}
			
			
			// .inside class
			$postbox.children('.inside').addClass('acf-fields').addClass('-' + args.label);
			
				
			// visibility
			if( args.visibility ) {
				
				$toggle.prop('checked', true);
				
			} else {
				
				$postbox.addClass('acf-hidden');
				$label.addClass('acf-hidden');
				
			}
			
			
			// edit_url
			if( args.edit_url ) {
				
				$postbox.children('.hndle').append('<a href="' + args.edit_url + '" class="dashicons dashicons-admin-generic acf-hndle-cog acf-js-tooltip" title="' + args.edit_title + '"></a>');

			}
			
		}
		
	});
			
	
	/*
	*  Sortable
	*
	*  These functions will hook into the start and stop of a jQuery sortable event and modify the item and placeholder
	*
	*  @type	function
	*  @date	12/11/2013
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	acf.add_action('sortstart', function( $item, $placeholder ){
		
		// if $item is a tr, apply some css to the elements
		if( $item.is('tr') ) {
			
			// temp set as relative to find widths
			$item.css('position', 'relative');
			
			
			// set widths for td children		
			$item.children().each(function(){
			
				$(this).width($(this).width());
				
			});
			
			
			// revert position css
			$item.css('position', 'absolute');
			
			
			// add markup to the placeholder
			$placeholder.html('<td style="height:' + $item.height() + 'px; padding:0;" colspan="' + $item.children('td').length + '"></td>');
		
		}
		
	});
	
	
	
	/*
	*  before & after duplicate
	*
	*  This function will modify the DOM before it is cloned. Primarily fixes a cloning issue with select elements
	*
	*  @type	function
	*  @date	16/05/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	acf.add_action('before_duplicate', function( $orig ){
		
		// add 'selected' class
		$orig.find('select option:selected').addClass('selected');
		
	});
	
	acf.add_action('after_duplicate', function( $orig, $duplicate ){
		
		// set select values
		$duplicate.find('select').each(function(){
			
			// vars
			var $select = $(this);
			
			
			// bail early if is 'Stylized UI'
			//if( $select.data('ui') ) return;


			// vars
			var val = [];
			
			
			// loop
			$select.find('option.selected').each(function(){
				
				val.push( $(this).val() );
				
		    });
		    
		    
		    // set val
			$select.val( val );
			
		});
		
		
		// remove 'selected' class
		$orig.find('select option.selected').removeClass('selected');
		$duplicate.find('select option.selected').removeClass('selected');
		
	});
	
	
	
/*
	acf.test_rtl = acf.model.extend({
		
		actions: {
			'ready':	'ready',
		},
		
		ready: function(){
			
			$('html').attr('dir', 'rtl');
			
		}
		
	});
*/
	
	
	
/*
	
	
	console.time("acf_test_ready");
	console.time("acf_test_load");
	
	acf.add_action('ready', function(){
		
		console.timeEnd("acf_test_ready");
		
	}, 999);
	
	acf.add_action('load', function(){
		
		console.timeEnd("acf_test_load");
		
	}, 999);
*/


	/*
	*  indexOf
	*
	*  This function will provide compatibility for ie8
	*
	*  @type	function
	*  @date	5/3/17
	*  @since	5.5.10
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	if( !Array.prototype.indexOf ) {
		
	    Array.prototype.indexOf = function(val) {
	        return $.inArray(val, this);
	    };
	    
	}
	
})(jQuery);