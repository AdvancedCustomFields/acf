(function($){
	
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
	
	acf.select2 = acf.model.extend({
		
		// vars
		version: 0,
		
		
		// actions
		actions: {
			'ready 1': 'ready'
		},
		
		
		/*
		*  ready
		*
		*  This function will setup vars
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
			if( acf.maybe_get(window, 'Select2') ) {
				
				this.version = 3;
				
				this.l10n_v3();
				
			} else if( acf.maybe_get(window, 'jQuery.fn.select2.amd') ) {
				
				this.version = 4;
				
			}
			
		},
		
		
		/*
		*  l10n_v3
		*
		*  This function will set l10n for Select2 v3
		*
		*  @type	function
		*  @date	21/06/2016
		*  @since	5.3.8
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		l10n_v3: function(){
			
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
		
		
		/*
		*  init
		*
		*  This function will initialize a Select2 instance
		*
		*  @type	function
		*  @date	21/06/2016
		*  @since	5.3.8
		*
		*  @param	$select (jQuery object)
		*  @param	args (object)
		*  @return	(mixed)
		*/
		
		init: function( $select, args, $field ){
			
			// bail early if no version found
			if( !this.version ) return;
			
			
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
			
			
			// v3
			if( this.version == 3 ) {
				
				return this.init_v3( $select, args, $field );
			
			// v4
			} else if( this.version == 4 ) {
				
				return this.init_v4( $select, args, $field );
				
			}
			
			
			// return
			return false;
					
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
					
					data[ k ].children = acf.select2.decode_data(v.children);
					
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
					'text':	$el.text()
				});
				
			});
			
			
			// return
			return val;
			
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
		
		init_v3: function( $select, args, $field ){
					
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
						return acf.select2.get_ajax_data(args, params, $input, $field);
						
					},
					results: function( data, page ){
						
						// vars
						var params = { 'page': page };
						
						
						// merge together groups
						setTimeout(function(){
							
							acf.select2.merge_results_v3();
							
						}, 1);
						
						
						// return
						return acf.select2.get_ajax_results(data, params);
						
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
					
					$select.append('<option value="' + e.added.id + '">' + e.added.text + '</option>');
					
				}
				
				
				// update val
				$select.val( e.val );
				
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
		
		merge_results_v3: function(){
			
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
		
		
		init_v4: function( $select, args, $field ){
					
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
/*
				sorter: function (data) { console.log('sorter %o', data);
			        return data;
			      },
*/
			};
			
			
			// value
			var value = this.get_value( $select );
			
			
			// multiple
			if( args.multiple ) {
				
/*
				// vars
				var name = $select.attr('name');
				
				
				// add hidden input to each multiple selection
				select2_args.templateSelection = function( selection ){
					
					return selection.text + '<input type="hidden" class="select2-search-choice-hidden" name="' + name + '" value="' + selection.id + '" />';
										
				}
*/
				
			} else {
				
				// change array to single object
				value = acf.maybe_get(value, 0, '');
				
			}
			
			
			// remove the blank option as we have a clear all button!
			if( args.allow_null ) {
				
				$select.find('option[value=""]').remove();
				
			}
			
			
			// get data
			select2_args.data = this.get_data( $select );
			
		    
		    // initial selection
/*
		    select2_args.initSelection = function( element, callback ) {
				
				callback( value );
		        
		    };
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
						return acf.select2.get_ajax_data(args, params, $select, $field);
						
					},
					processResults: function( data, params ){
						
						// vars
						var results = acf.select2.get_ajax_results(data, params);
						
						
						// change to more
						if( results.more ) {
							
							results.pagination = { more: true };
							
						}
						
						
						// merge together groups
						setTimeout(function(){
							
							acf.select2.merge_results_v4();
							
						}, 1);
						
						
						// return
						return results
						
					}
					
				};
				
				
				
			}
		    
		
			
			// multiple
/*
			if( args.multiple ) {
				

				
				$select.on('select2:select', function( e ){
					
					console.log( 'select2:select %o &o', $(this), e );
					
					// vars
					var $option = $(e.params.data.element);
					
					
					// move option to begining of select
					//$(this).prepend( $option );
					
				});
				
			}
			
*/
			

			
			// reorder DOM
			// - no need to reorder, the select field is needed to $_POST values

			
			// filter for 3rd party customization
			select2_args = acf.apply_filters( 'select2_args', select2_args, $select, args, $field );
			
			
			// add select2
			var $container = $select.select2( select2_args );
			
			
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
		
		merge_results_v4: function(){
			
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
			
			// remove select2 container
			$select.siblings('.select2-container').remove();
			
			
			// show input so that select2 can correctly render visible select2 container
			$select.siblings('input').show();
			
			
			// enable select
			$select.prop('disabled', false).removeClass('acf-disabled acf-hidden');
			
		}
		
	});
	
	
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
		
		acf.select2.init( $select, args );

	}
	
	acf.remove_select2 = function( $select ) {
		
		acf.select2.destroy( $select );
		
	}
	
	
	// select
	acf.fields.select = acf.field.extend({
		
		type: 'select',
		
		$select: null,
		
		actions: {
			'ready':	'render',
			'append':	'render',
			'remove':	'remove'
		},

		focus: function(){
			
			// focus on $select
			this.$select = this.$field.find('select');
			
			
			// bail early if no select field
			if( !this.$select.exists() ) return;
			
			
			// get options
			this.o = acf.get_data( this.$select );
			
			
			// customize o
			this.o = acf.parse_args(this.o, {
				'ajax_action':	'acf/fields/'+this.type+'/query',
				'key':			this.$field.data('key')
			});
			
		},
		
		render: function(){
			
			// validate ui
			if( !this.$select.exists() || !this.o.ui ) {
				
				return false;
				
			}
			
			
			acf.select2.init( this.$select, this.o, this.$field );
			
		},
		
		remove: function(){
			
			// validate ui
			if( !this.$select.exists() || !this.o.ui ) {
				
				return false;
				
			}
			
			
			// remove select2
			acf.select2.destroy( this.$select );
			
		}
		 
	});
	
		
	// user
	acf.fields.user = acf.fields.select.extend({
		
		type: 'user'
		
	});	
	
	
	// post_object
	acf.fields.post_object = acf.fields.select.extend({
		
		type: 'post_object'
		
	});
	
	
	// page_link
	acf.fields.page_link = acf.fields.select.extend({
		
		type: 'page_link'
		
	});
	

})(jQuery);