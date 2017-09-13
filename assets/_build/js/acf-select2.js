(function($){
	
	// globals
	var _select2,
		_select23,
		_select24;
	
	
	/*
	*  acf.select2
	*
	*  all logic to create select2 instances
	*
	*  @type	function
	*  @date	16/12/2015
	*  @since	5.3.2
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	_select2 = acf.select2 = acf.model.extend({
		
		// vars
		version: 0,
		version3: null,
		version4: null,
		
		
		// actions
		actions: {
			'ready 1': 'ready'
		},
		
		
		/*
		*  ready
		*
		*  This function will run on document ready
		*
		*  @type	function
		*  @date	21/06/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		ready: function(){
			
			// determine Select2 version
			this.version = this.get_version();
			
			
			// ready
			this.do_function('ready');
			
		},
		
		
		/*
		*  get_version
		*
		*  This function will return the Select2 version
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		get_version: function(){
			
			if( acf.maybe_get(window, 'Select2') ) return 3;
			if( acf.maybe_get(window, 'jQuery.fn.select2.amd') ) return 4;
			return 0;
			
		},
		
		
		/*
		*  do_function
		*
		*  This function will call the v3 or v4 equivelant function
		*
		*  @type	function
		*  @date	28/4/17
		*  @since	5.5.13
		*
		*  @param	name (string)
		*  @param	args (array)
		*  @return	(mixed)
		*/
		
		do_function: function( name, args ){
			
			// defaults
			args = args || [];
			
			
			// vars
			var model = 'version'+this.version;
			
			
			// bail early if not set
			if( typeof this[model] === 'undefined' ||
				typeof this[model][name] === 'undefined' ) return false;
			
			
			// run
			return this[model][name].apply( this, args );
			
		},
				
		
		/*
		*  get_data
		*
		*  This function will look at a $select element and return an object choices 
		*
		*  @type	function
		*  @date	24/12/2015
		*  @since	5.3.2
		*
		*  @param	$select (jQuery)
		*  @return	(array)
		*/
		
		get_data: function( $select, data ){
			
			// reference
			var self = this;
			
			
			// defaults
			data = data || [];
			
			
			// loop over children
			$select.children().each(function(){
				
				// vars
				var $el = $(this);
				
				
				// optgroup
				if( $el.is('optgroup') ) {
					
					data.push({
						'text':		$el.attr('label'),
						'children':	self.get_data( $el )
					});
				
				// option
				} else {
					
					data.push({
						'id':	$el.attr('value'),
						'text':	$el.text()
					});
					
				}
				
			});
			
			
			// return
			return data;
			
		},
		
				
		/*
		*  decode_data
		*
		*  This function will take an array of choices and decode the text
		*  Changes '&amp;' to '&' which fixes a bug (in Select2 v3 )when searching for '&'
		*
		*  @type	function
		*  @date	24/12/2015
		*  @since	5.3.2
		*
		*  @param	$select (jQuery)
		*  @return	(array)
		*/
		
		decode_data: function( data ) {
			
			// bail ealry if no data
			if( !data ) return [];
			
			
			//loop
			$.each(data, function(k, v){
				
				// text
				data[ k ].text = acf.decode( v.text );
				
				
				// children
				if( typeof v.children !== 'undefined' ) {
					
					data[ k ].children = _select2.decode_data(v.children);
					
				}
				
			});
			
			
			// return
			return data;
			
		},
		
		
		/*
		*  count_data
		*
		*  This function will take an array of choices and return the count
		*
		*  @type	function
		*  @date	24/12/2015
		*  @since	5.3.2
		*
		*  @param	data (array)
		*  @return	(int)
		*/
		
		count_data: function( data ) {
			
			// vars
			var i = 0;
			
			
			// bail ealry if no data
			if( !data ) return i;
			
			
			//loop
			$.each(data, function(k, v){
				
				// increase
				i++;
				
				
				// children
				if( typeof v.children !== 'undefined' ) {
					
					i += v.children.length;
					
				}
				
			});
			
			
			// return
			return i;
			
		},
		
		
		/*
		*  get_ajax_data
		*
		*  This function will return an array of data to send via AJAX
		*
		*  @type	function
		*  @date	19/07/2016
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		get_ajax_data: function( args, params, $el, $field ){
			
			// vars
			var data = acf.prepare_for_ajax({
				action: 	args.ajax_action,
				field_key: 	args.key,
				s: 			params.term || '',
				paged: 		params.page || 1
			});
			
			
			// filter
			data = acf.apply_filters( 'select2_ajax_data', data, args, $el, $field );
			
			
			// return
			return data;
			
		},
		
		
		/*
		*  get_ajax_results
		*
		*  This function will return a valid AJAX response
		*
		*  @type	function
		*  @date	19/07/2016
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		get_ajax_results: function( data, params ){
			
			// vars
			var valid = {
				results: []
			};
			
			
			// bail early if no data
			if( !data ) {
				
				data = valid;
				
			}
			
			
			// allow for an array of choices
			if( typeof data.results == 'undefined' ) {
				
				valid.results = data;
				
				data = valid;
				
			}
			
			
			// decode
			data.results = this.decode_data(data.results);
			
			
			// filter
			data = acf.apply_filters( 'select2_ajax_results', data, params );
			
			
			// return
			return data;
			
		},
		
		
		/*
		*  get_value
		*
		*  This function will return the selected options in a Select2 format
		*
		*  @type	function
		*  @date	5/01/2016
		*  @since	5.3.2
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		get_value: function( $select ){
		
			// vars
			var val = [],
				$selected = $select.find('option:selected');
			
			
			// bail early if no selected
			if( !$selected.exists() ) return val;
			
			
			// sort
			$selected = $selected.sort(function(a, b) {
				
			    return +a.getAttribute('data-i') - +b.getAttribute('data-i');
			    
			});
			
			
			// loop
			$selected.each(function(){
				
				// vars
				var $el = $(this);
				
				
				// append
				val.push({
					'id':	$el.attr('value'),
					'text':	$el.text(),
					'$el':	$el
				});
				
			});
			
			
			// return
			return val;
			
		},
		
		
		/*
		*  get_input_value
		*
		*  This function will return an array of values as per the hidden input
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	$input (jQuery)
		*  @return	(array)
		*/
		
		get_input_value: function( $input ) {
			
			return $input.val().split('||');
			
		},
		
		
		/*
		*  sync_input_value
		*
		*  This function will save the current selected values into the hidden input
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	$input (jQuery)
		*  @param	$select (jQuery)
		*  @return	n/a
		*/
		
		sync_input_value: function( $input, $select ) {
			
			$input.val( $select.val().join('||') );
			
		},
		
		
		/*
		*  add_option
		*
		*  This function will add an <option> element to a select (if it doesn't already exist)
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	$select (jQuery)
		*  @param	value (string)
		*  @param	label (string)
		*  @return	n/a
		*/
		
		add_option: function( $select, value, label ){
			
			if( !$select.find('option[value="'+value+'"]').length ) {
				
				$select.append('<option value="'+value+'">'+label+'</option>');
				
			}
			
		},
		
		
		/*
		*  select_option
		*
		*  This function will select an option
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	$select (jQuery)
		*  @param	value (string)
		*  @return	n/a
		*/
		
		select_option: function( $select, value ){
			
			$select.find('option[value="'+value+'"]').prop('selected', true);
			$select.trigger('change');
			
		},
		
		
		/*
		*  unselect_option
		*
		*  This function will unselect an option
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.13
		*
		*  @param	$select (jQuery)
		*  @param	value (string)
		*  @return	n/a
		*/
		
		unselect_option: function( $select, value ){
			
			$select.find('option[value="'+value+'"]').prop('selected', false);
			$select.trigger('change');
			
		},
		
		
		/*
		*  Select2 v3 or v4 functions
		*
		*  description
		*
		*  @type	function
		*  @date	29/4/17
		*  @since	5.5.10
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		init: function( $select, args, $field ){
			
			this.do_function( 'init', arguments );
					
		},
		
		destroy: function( $select ){
			
			this.do_function( 'destroy', arguments );
			
		},
		
		add_value: function( $select, value, label ){
			
			this.do_function( 'add_value', arguments );
			
		},
		
		remove_value: function( $select, value ){
			
			this.do_function( 'remove_value', arguments );
			
		}
		
	});
	
	
	/*
	*  Select2 v3
	*
	*  This model contains the Select2 v3 functions
	*
	*  @type	function
	*  @date	28/4/17
	*  @since	5.5.10
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	_select23 = _select2.version3 = {
		
		ready: function(){
			
			// vars
			var locale = acf.get('locale'),
				rtl = acf.get('rtl')
				l10n = acf._e('select');
			
			
			// bail ealry if no l10n
			if( !l10n ) return;
			
			
			// vars
			var l10n_functions = {
				formatMatches: function( matches ) {
					
					if ( 1 === matches ) {
						return l10n.matches_1;
					}
	
					return l10n.matches_n.replace('%d', matches);
				},
				formatNoMatches: function() {
					return l10n.matches_0;
				},
				formatAjaxError: function() {
					return l10n.load_fail;
				},
				formatInputTooShort: function( input, min ) {
					var number = min - input.length;
	
					if ( 1 === number ) {
						return l10n.input_too_short_1;
					}
	
					return l10n.input_too_short_n.replace( '%d', number );
				},
				formatInputTooLong: function( input, max ) {
					var number = input.length - max;
	
					if ( 1 === number ) {
						return l10n.input_too_long_1;
					}
	
					return l10n.input_too_long_n.replace( '%d', number );
				},
				formatSelectionTooBig: function( limit ) {
					if ( 1 === limit ) {
						return l10n.selection_too_long_1;
					}
	
					return l10n.selection_too_long_n.replace( '%d', limit );
				},
				formatLoadMore: function() {
					return l10n.load_more;
				},
				formatSearching: function() {
					return l10n.searching;
				}
		    };
			
			
			// ensure locales exists
			// older versions of Select2 did not have a locale storage
			$.fn.select2.locales = acf.maybe_get(window, 'jQuery.fn.select2.locales', {});
			
			
			// append
			$.fn.select2.locales[ locale ] = l10n_functions;
			$.extend($.fn.select2.defaults, l10n_functions);
			
		},
		
		set_data: function( $select, data ){
			
			// v3
			if( this.version == 3 ) {
				
				$select = $select.siblings('input');
				
			}
			
			
			// set data
			$select.select2('data', data);
			
		},
		
		append_data: function( $select, data ){
			
			// v3
			if( this.version == 3 ) {
				
				$select = $select.siblings('input');
				
			}
			
			
			
			// vars
			var current = $select.select2('data') || [];
			
			
			// append
			current.push( data );
			
			
			// set data
			$select.select2('data', current);
			
		},
		
		
		/*
		*  init_v3
		*
		*  This function will create a new Select2 for v3
		*
		*  @type	function
		*  @date	24/12/2015
		*  @since	5.3.2
		*
		*  @param	$select (jQuery)
		*  @return	args (object)
		*/
		
		init: function( $select, args, $field ){
			
			// defaults
			args = args || {};
			$field = $field || null;
			
			
			// merge
			args = $.extend({
				allow_null:		false,
				placeholder:	'',
				multiple:		false,
				ajax:			false,
				ajax_action:	''
			}, args);
			
				
			// vars
			var $input = $select.siblings('input');
			
			
			// bail early if no input
			if( !$input.exists() ) return;
			
			
			// select2 args
			var select2_args = {
				width:				'100%',
				containerCssClass:	'-acf',
				allowClear:			args.allow_null,
				placeholder:		args.placeholder,
				multiple:			args.multiple,
				separator:			'||',
				data:				[],
				escapeMarkup:		function( m ){ return m; },
				formatResult:		function( result, container, query, escapeMarkup ){
					
					// run default formatResult
					var text = $.fn.select2.defaults.formatResult( result, container, query, escapeMarkup );
					
										
					// append description
					if( result.description ) {
						
						text += ' <span class="select2-result-description">' + result.description + '</span>';
						
					}
					
					
					// return
					return text;
					
				}
			};
			
			
			// value
			var value = this.get_value( $select );
			
			
			// multiple
			if( args.multiple ) {
				
				// vars
				var name = $select.attr('name');
				
				
				// add hidden input to each multiple selection
				select2_args.formatSelection = function( object, $div ){
					
					// vars
					var html = '<input type="hidden" class="select2-search-choice-hidden" name="' + name + '" value="' + object.id + '"' + ($input.prop('disabled') ? 'disabled="disabled"' : '') + ' />';
					
					
					// append input
					$div.parent().append(html);
					
					
					// return
					return object.text;
					
				}
				
			} else {
				
				// change array to single object
				value = acf.maybe_get(value, 0, false);
				
				
				// if no allow_null, this single select must contain a selection
				if( !args.allow_null && value ) {
					
					$input.val( value.id );
					
				}
			}
			
			
			// remove the blank option as we have a clear all button!
			if( args.allow_null ) {
				
				$select.find('option[value=""]').remove();
				
			}
			
			
			// get data
			select2_args.data = this.get_data( $select );
			
		    
		    // initial selection
		    select2_args.initSelection = function( element, callback ) {
				
				callback( value );
		        
		    };
		    
		    
			// ajax
			if( args.ajax ) {
				
				select2_args.ajax = {
					url:			acf.get('ajaxurl'),
					dataType: 		'json',
					type: 			'post',
					cache: 			false,
					quietMillis:	250,
					data: function( term, page ) {
						
						// vars
						var params = { 'term': term, 'page': page };
						
						
						// return
						return _select2.get_ajax_data(args, params, $input, $field);
						
					},
					results: function( data, page ){
						
						// vars
						var params = { 'page': page };
						
						
						// merge together groups
						setTimeout(function(){
							
							_select23.merge_results();
							
						}, 1);
						
						
						// return
						return _select2.get_ajax_results(data, params);
						
					}
				};
				
			}
			
			
			// attachment z-index fix
			select2_args.dropdownCss = {
				'z-index' : '999999999'
			};
			
			
			// append args
			select2_args.acf = args;
			
			
			// filter for 3rd party customization
			select2_args = acf.apply_filters( 'select2_args', select2_args, $select, args, $field );
			
			
			// add select2
			$input.select2( select2_args );
			
			
			// vars
			var $container = $input.select2('container');
			
			
			// reorder DOM
			// - this order is very important so don't change it
			// - $select goes first so the input can override it. Fixes issue where conditional logic will enable the select
			// - $input goes second to reset the input data
			// - container goes last to allow multiple hidden inputs to override $input
			$container.before( $select );
			$container.before( $input );
			
			
			// multiple
			if( args.multiple ) {
				
				// sortable
				$container.find('ul.select2-choices').sortable({
					 start: function() {
					 	$input.select2("onSortStart");
					 },
					 stop: function() {
					 	$input.select2("onSortEnd");
					 }
				});
				
			}
			
			
			// disbale select
			$select.prop('disabled', true).addClass('acf-disabled acf-hidden');
			
			
			// update select value
			// this fixes a bug where select2 appears blank after duplicating a post_object field (field settings).
			// the $select is disabled, so setting the value won't cause any issues (this is what select2 v4 does anyway).
			$input.on('change', function(e) {
				
				// add new data
				if( e.added ) {
					
					// add item
					_select2.add_option($select, e.added.id, e.added.text);
					
				}
				
				
				// select
				_select2.select_option($select, e.val);
				
			});
			
			
			// action for 3rd party customization
			acf.do_action('select2_init', $input, select2_args, args, $field);
			
		},
		
		
		/*
		*  merge_results_v3
		*
		*  description
		*
		*  @type	function
		*  @date	20/07/2016
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		merge_results: function(){
			
			// vars
			var label = '',
				$list = null;
			
			
			// loop
			$('#select2-drop .select2-result-with-children').each(function(){
				
				// vars
				var $label = $(this).children('.select2-result-label'),
					$ul = $(this).children('.select2-result-sub');
				
				
				// append group to previous
				if( $label.text() == label ) {
					
					$list.append( $ul.children() );
					
					$(this).remove();
					
					return;
					
				}
				
				
				// update vars
				label = $label.text();
				$list = $ul;
				
			});
			
		},
		
		
		/*
		*  destroy
		*
		*  This function will destroy a Select2
		*
		*  @type	function
		*  @date	24/12/2015
		*  @since	5.3.2
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		destroy: function( $select ){
			
			// vars
			var $input = $select.siblings('input');
			
			
			// destroy via api
			if( $input.data('select2') ) {
				$input.select2('destroy');
			}
			
			
			// destory via HTML (duplicating HTML deos not contain data)
			$select.siblings('.select2-container').remove();
			
			
			// enable select
			$select.prop('disabled', false).removeClass('acf-disabled acf-hidden');
			$input.attr('style', ''); // fixes bug causing hidden select2 element
			
		},
		
		add_value: function( $select, value, label ){
			
			// add and select item
			_select2.add_option($select, value, label);
			_select2.select_option($select, value);
			
			
			// vars
			var $input = $select.siblings('input');
			
			
			// new item
			var item = {
				'id':	value,
				'text':	label
			};
			
			
			// single
			if( !$select.data('multiple') ) {
				
				return $input.select2('data', item);
				
			}
			
			
			// get existing value
			var values = $input.select2('data') || [];
			
			
			// append
			values.push(item);
			
			
			// set data
			return $input.select2('data', values);
			
		},
		
		remove_value: function( $select, value ){
			
			// unselect option
			_select2.unselect_option($select, value);
			
			
			// vars
			var $input = $select.siblings('input'),
				current = $input.select2('data');
			
			
			// single
			if( !$select.data('multiple') ) {
				
				if( current && current.id == value ) {
					
					$input.select2('data', null);
					
				}
			
			// multiple	
			} else {
				
				// filter
				current = $.grep(current, function( item ) {
				    return item.id != value;
				});
				
				
				// set data
				$input.select2('data', current);
				
			}
			
		}
		
		
	};
	
	
	/*
	*  Select2 v4
	*
	*  This model contains the Select2 v4 functions
	*
	*  @type	function
	*  @date	28/4/17
	*  @since	5.5.10
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	_select24 = _select2.version4 = {
		
		init: function( $select, args, $field ){
			
			// defaults
			args = args || {};
			$field = $field || null;
			
			
			// merge
			args = $.extend({
				allow_null:		false,
				placeholder:	'',
				multiple:		false,
				ajax:			false,
				ajax_action:	''
			}, args);
			
			
			// vars
			var $input = $select.siblings('input');
			
			
			// bail early if no input
			if( !$input.exists() ) return;
			
			
			// select2 args
			var select2_args = {
				width:				'100%',
				allowClear:			args.allow_null,
				placeholder:		args.placeholder,
				multiple:			args.multiple,
				separator:			'||',
				data:				[],
				escapeMarkup:		function( m ){ return m; }
			};
			
			
			// value
			var value = this.get_value( $select );
			
			
			// multiple
			if( args.multiple ) {
				
				// reorder opts
				$.each(value, function( k, item ){
					
					// detach and re-append to end
					item.$el.detach().appendTo( $select );
						
				});
				
			} else {
				
				// change array to single object
				value = acf.maybe_get(value, 0, '');
				
			}
			
			
/*
			// removed - Select2 does not show this value by default!
			// remove the blank option as we have a clear all button!
			if( args.allow_null ) {
				
				$select.find('option[value=""]').remove();
				
			}
*/
			
		    
		    // remove conflicting atts
			if( !args.ajax ) {
				
				$select.removeData('ajax');
				$select.removeAttr('data-ajax');
				
			} else {
				
				select2_args.ajax = {
					url:		acf.get('ajaxurl'),
					delay: 		250,
					dataType: 	'json',
					type: 		'post',
					cache: 		false,
					data: function( params ) {
						
						// return
						return _select2.get_ajax_data(args, params, $select, $field);
						
					},
					processResults: function( data, params ){
						
						// vars
						var results = _select2.get_ajax_results(data, params);
						
						
						// change to more
						if( results.more ) {
							
							results.pagination = { more: true };
							
						}
						
						
						// merge together groups
						setTimeout(function(){
							
							_select24.merge_results();
							
						}, 1);
						
						
						// return
						return results
						
					}
					
				};
				
			}
		    
			
			// filter for 3rd party customization
			select2_args = acf.apply_filters( 'select2_args', select2_args, $select, args, $field );
			
			
			// add select2
			$select.select2( select2_args );
			
			
			// get container (Select2 v4 deos not return this from constructor)
			var $container = $select.next('.select2-container');
			
			
			// reorder DOM
			// - no need to reorder, the select field is needed to $_POST values
			
			
			// multiple
			if( args.multiple ) {
				
				// vars
				var $ul = $container.find('ul');
				
				
				// sortable
				$ul.sortable({
					
		            stop: function( e ) {
			            
			            $ul.find('.select2-selection__choice').each(function() {
				            
				            // vars
							var $option = $( $(this).data('data').element );
							
							
							// detach and re-append to end
							$option.detach().appendTo( $select );
		                    
		                    
		                    // trigger change on input (JS error if trigger on select)
		                    $input.trigger('change');
		                    // update input
		                    //_select2.sync_input_value( $input, $select );
		                    
		                });
		                
		            }

				});
				
				
				// on select, move to end
				$select.on('select2:select', function( e ){
					
					// vars
					var $option = $(e.params.data.element);
					
					
					// detach and re-append to end
					$option.detach().appendTo( $select );
					
					 
					// trigger change
					//$select.trigger('change');
					
				});
				
			}
			
			
/*
			// update input
			$select.on('select2:select', function( e ){
				
				// update input
	            _select2.sync_input_value( $input, $select );
				
			});
			
			$select.on('select2:unselect', function( e ){
				
				// update input
	            _select2.sync_input_value( $input, $select );
				
			});
*/
			
			
			// clear value (allows null to be saved)
			$input.val('');
			
			
			// add class
			$container.addClass('-acf');
			
			
			// action for 3rd party customization
			acf.do_action('select2_init', $select, select2_args, args, $field);
			
		},
		
		
		/*
		*  merge_results_v4
		*
		*  description
		*
		*  @type	function
		*  @date	20/07/2016
		*  @since	5.4.0
		*
		*  @param	$post_id (int)
		*  @return	$post_id (int)
		*/
		
		merge_results: function(){
			
			// vars
			var $prev_options = null,
				$prev_group = null;
			
			
			// loop
			$('.select2-results__option[role="group"]').each(function(){
				
				// vars
				var $options = $(this).children('ul'),
					$group = $(this).children('strong');
				
				
				// compare to previous
				if( $prev_group !== null && $group.text() == $prev_group.text() ) {
					
					$prev_options.append( $options.children() );
					
					$(this).remove();
					
					return;
					
				}
				
				
				// update vars
				$prev_options = $options;
				$prev_group = $group;
				
			});
			
		},
		
		add_value: function( $select, value, label ){
			
			// add and select item
			_select2.add_option($select, value, label);
			_select2.select_option($select, value);
			
		},
		
		remove_value: function( $select, value ){
			
			// unselect
			_select2.unselect_option($select, value);
			
		},
		
		destroy: function( $select ){
			
			// destroy via api
			if( $select.data('select2') ) {
				$select.select2('destroy');
			}
			
			
			// destory via HTML (duplicating HTML deos not contain data)
			$select.siblings('.select2-container').remove();
			
		}
		
	};
	
	
	/*
	*  depreciated
	*
	*  These functions have moved since v5.3.3 
	*
	*  @type	function
	*  @date	11/12/2015
	*  @since	5.3.2
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	acf.add_select2 = function( $select, args ) {
		
		_select2.init( $select, args );

	}
	
	acf.remove_select2 = function( $select ) {
		
		_select2.destroy( $select );
		
	}

})(jQuery);