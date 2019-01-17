(function($, undefined){
	
	/**
	*  acf.newSelect2
	*
	*  description
	*
	*  @date	13/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	acf.newSelect2 = function( $select, props ){
		
		// defaults
		props = acf.parseArgs(props, {
			allowNull:		false,
			placeholder:	'',
			multiple:		false,
			field: 			false,
			ajax:			false,
			ajaxAction:		'',
			ajaxData:		function( data ){ return data; },
			ajaxResults:	function( json ){ return json; },
		});
		
		// initialize
		if( getVersion() == 4 ) {
			var select2 = new Select2_4( $select, props );
		} else {
			var select2 = new Select2_3( $select, props );
		}
		
		// actions
		acf.doAction('new_select2', select2);
		
		// return
		return select2;
	};
	
	/**
	*  getVersion
	*
	*  description
	*
	*  @date	13/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	function getVersion() {
		
		// v4
		if( acf.isset(window, 'jQuery', 'fn', 'select2', 'amd') ) {
			return 4;
		}
		
		// v3
		if( acf.isset(window, 'Select2') ) {
			return 3;
		}
		
		// return
		return false;
	}
	
	/**
	*  Select2
	*
	*  description
	*
	*  @date	13/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var Select2 = acf.Model.extend({
		
		setup: function( $select, props ){
			$.extend(this.data, props);
			this.$el = $select;
		},
		
		initialize: function(){
			
		},
		
		selectOption: function( value ){
			var $option = this.getOption( value );
			if( !$option.prop('selected') ) {
				$option.prop('selected', true).trigger('change');
			}
		},
		
		unselectOption: function( value ){
			var $option = this.getOption( value );
			if( $option.prop('selected') ) {
				$option.prop('selected', false).trigger('change');
			}
		},
		
		getOption: function( value ){
			return this.$('option[value="' + value + '"]');
		},
		
		addOption: function( option ){
			
			// defaults
			option = acf.parseArgs(option, {
				id: '',
				text: '',
				selected: false
			});
			
			// vars
			var $option = this.getOption( option.id );
			
			// append
			if( !$option.length ) {
				$option = $('<option></option>');
				$option.html( option.text );
				$option.attr('value', option.id);
				$option.prop('selected', option.selected);
				this.$el.append($option);
			}
						
			// chain
			return $option;
		},
		
		getValue: function(){
			
			// vars
			var val = [];
			var $options = this.$el.find('option:selected');
			
			// bail early if no selected
			if( !$options.exists() ) {
				return val;
			}
			
			// sort by attribute
			$options = $options.sort(function(a, b) {
			    return +a.getAttribute('data-i') - +b.getAttribute('data-i');
			});
			
			// loop
			$options.each(function(){
				var $el = $(this);
				val.push({
					$el:	$el,
					id:		$el.attr('value'),
					text:	$el.text(),
				});
			});
			
			// return
			return val;
			
		},
		
		mergeOptions: function(){
				
		},
		
		getChoices: function(){
			
			// callback
			var crawl = function( $parent ){
				
				// vars
				var choices = [];
				
				// loop
				$parent.children().each(function(){
					
					// vars
					var $child = $(this);
					
					// optgroup
					if( $child.is('optgroup') ) {
						
						choices.push({
							text:		$child.attr('label'),
							children:	crawl( $child )
						});
					
					// option
					} else {
						
						choices.push({
							id:		$child.attr('value'),
							text:	$child.text()
						});
					}
				});
				
				// return
				return choices;
			};
			
			// crawl
			return crawl( this.$el );
		},
		
		decodeChoices: function( choices ){
			
			// callback
			var crawl = function( items ){
				items.map(function( item ){
					item.text = acf.decode( item.text );
					if( item.children ) {
						item.children = crawl( item.children );
					}
					return item;
				});
				return items;
			};
			
			// crawl
			return crawl( choices );
		},
		
		getAjaxData: function( params ){
			
			// vars
			var ajaxData = {
				action: 	this.get('ajaxAction'),
				s: 			params.term || '',
				paged: 		params.page || 1
			};
			
			// field helper
			var field = this.get('field');
			if( field ) {
				ajaxData.field_key = field.get('key');
			}
			
			// callback
			var callback = this.get('ajaxData');
			if( callback ) {
				ajaxData = callback.apply( this, [ajaxData, params] );
			}
			
			// filter
			ajaxData = acf.applyFilters( 'select2_ajax_data', ajaxData, this.data, this.$el, (field || false), this );
			
			// return
			return acf.prepareForAjax(ajaxData);
		},
		
		getAjaxResults: function( json, params ){
			
			// defaults
			json = acf.parseArgs(json, {
				results: false,
				more: false,
			});
			
			// decode
			if( json.results ) {
				json.results = this.decodeChoices(json.results);
			}
			
			// callback
			var callback = this.get('ajaxResults');
			if( callback ) {
				json = callback.apply( this, [json, params] );
			}
			
			// filter
			json = acf.applyFilters( 'select2_ajax_results', json, params, this );
			
			// return
			return json;
		},
		
		processAjaxResults: function( json, params ){
			
			// vars
			var json = this.getAjaxResults( json, params );
			
			// change more to pagination
			if( json.more ) {
				json.pagination = { more: true };
			}
			
			// merge together groups
			setTimeout($.proxy(this.mergeOptions, this), 1);
			
			// return
			return json;
		},
		
		destroy: function(){
			
			// destroy via api
			if( this.$el.data('select2') ) {
				this.$el.select2('destroy');
			}
			
			// destory via HTML (duplicating HTML does not contain data)
			this.$el.siblings('.select2-container').remove();
		}
		
	});
	
	
	/**
	*  Select2_4
	*
	*  description
	*
	*  @date	13/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var Select2_4 = Select2.extend({
		
		initialize: function(){
			
			// vars
			var $select = this.$el;
			var options = {
				width:				'100%',
				allowClear:			this.get('allowNull'),
				placeholder:		this.get('placeholder'),
				multiple:			this.get('multiple'),
				data:				[],
				escapeMarkup:		function( m ){ return m; }
			};
			
			// multiple
			if( options.multiple ) {
				
				// reorder options
				this.getValue().map(function( item ){
					item.$el.detach().appendTo( $select );
				});
			}
			
		    // remove conflicting atts
		    $select.removeData('ajax');
			$select.removeAttr('data-ajax');
			
			// ajax
			if( this.get('ajax') ) {
				
				options.ajax = {
					url:			acf.get('ajaxurl'),
					delay: 			250,
					dataType: 		'json',
					type: 			'post',
					cache: 			false,
					data:			$.proxy(this.getAjaxData, this),
					processResults:	$.proxy(this.processAjaxResults, this),
				};
			}
		    
			// filter for 3rd party customization
			//options = acf.applyFilters( 'select2_args', options, $select, this );
			var field = this.get('field');
			options = acf.applyFilters( 'select2_args', options, $select, this.data, (field || false), this );
			
			// add select2
			$select.select2( options );
			
			// get container (Select2 v4 does not return this from constructor)
			var $container = $select.next('.select2-container');
			
			// multiple
			if( options.multiple ) {
				
				// vars
				var $ul = $container.find('ul');
				
				// sortable
				$ul.sortable({
		            stop: function( e ) {
			            
			            // loop
			            $ul.find('.select2-selection__choice').each(function() {
				            
				            // vars
							var $option = $( $(this).data('data').element );
							
							// detach and re-append to end
							$option.detach().appendTo( $select );
		                });
		                
		                // trigger change on input (JS error if trigger on select)
	                    $select.trigger('change');
		            }
				});
				
				// on select, move to end
				$select.on('select2:select', this.proxy(function( e ){
					this.getOption( e.params.data.id ).detach().appendTo( this.$el );
				}));
			}
			
			// add class
			$container.addClass('-acf');
			
			// action for 3rd party customization
			acf.doAction('select2_init', $select, options, this.data, (field || false), this);
		},
		
		mergeOptions: function(){
			
			// vars
			var $prevOptions = false;
			var $prevGroup = false;
			
			// loop
			$('.select2-results__option[role="group"]').each(function(){
				
				// vars
				var $options = $(this).children('ul');
				var $group = $(this).children('strong');
				
				// compare to previous
				if( $prevGroup && $prevGroup.text() === $group.text() ) {
					$prevOptions.append( $options.children() );
					$(this).remove();
					return;
				}
				
				// update vars
				$prevOptions = $options;
				$prevGroup = $group;
				
			});
		},
		
	});
	
	/**
	*  Select2_3
	*
	*  description
	*
	*  @date	13/1/18
	*  @since	5.6.5
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var Select2_3 = Select2.extend({
		
		initialize: function(){
			
			// vars
			var $select = this.$el;
			var value = this.getValue();
			var multiple  = this.get('multiple');
			var options = {
				width:				'100%',
				allowClear:			this.get('allowNull'),
				placeholder:		this.get('placeholder'),
				separator:			'||',
				multiple:			this.get('multiple'),
				data:				this.getChoices(),
				escapeMarkup:		function( m ){ return m; },
				dropdownCss:		{
					'z-index': '999999999'
				},
				initSelection:		function( element, callback ) {
					if( multiple ) {
						callback( value );
					} else {
						callback( value.shift() );
					}
			    }
			};
			
			// get hidden input
			var $input = $select.siblings('input');
			if( !$input.length ) {
				$input = $('<input type="hidden" />');
				$select.before( $input );
			}
			
			// set input value
			inputValue = value.map(function(item){ return item.id }).join('||');
			$input.val( inputValue );
			
			// multiple
			if( options.multiple ) {
				
				// reorder options
				value.map(function( item ){
					item.$el.detach().appendTo( $select );
				});
			}
			
			// remove blank option as we have a clear all button
			if( options.allowClear ) {
				options.data = options.data.filter(function(item){
					return item.id !== '';
				});
			}
			
		    // remove conflicting atts
		    $select.removeData('ajax');
			$select.removeAttr('data-ajax');
			
			// ajax
			if( this.get('ajax') ) {
				
				options.ajax = {
					url:			acf.get('ajaxurl'),
					quietMillis: 	250,
					dataType: 		'json',
					type: 			'post',
					cache: 			false,
					data:			$.proxy(this.getAjaxData, this),
					results:		$.proxy(this.processAjaxResults, this),
				};
			}
		    
			// filter for 3rd party customization
			var field = this.get('field');
			options = acf.applyFilters( 'select2_args', options, $select, this.data, (field || false), this );
			
			// add select2
			$input.select2( options );
			
			// get container
			var $container = $input.select2('container');
			
			// helper to find this select's option
			var getOption = $.proxy(this.getOption, this);
				
			// multiple
			if( options.multiple ) {
			
				// vars
				var $ul = $container.find('ul');
				
				// sortable
				$ul.sortable({
		            stop: function() {
			            
			            // loop
			            $ul.find('.select2-search-choice').each(function() {
				            
				            // vars
				            var data = $(this).data('select2Data');
				            var $option = getOption( data.id );
				            
							// detach and re-append to end
							$option.detach().appendTo( $select );
		                });
		                
		                // trigger change on input (JS error if trigger on select)
	                    $select.trigger('change');
		            }
				});
			}
			
			// on select, create option and move to end
			$input.on('select2-selecting', function( e ){
				
				// vars
				var item = e.choice;
				var $option = getOption( item.id );
				
				// create if doesn't exist
				if( !$option.length ) {
					$option = $('<option value="' + item.id + '">' + item.text + '</option>');
				}
				
				// detach and re-append to end
				$option.detach().appendTo( $select );
			});
			
			// add class
			$container.addClass('-acf');
			
			// action for 3rd party customization
			acf.doAction('select2_init', $select, options, this.data, (field || false), this);
			
			// change
			$input.on('change', function(){
				var val = $input.val();
				if( val.indexOf('||') ) {
					val = val.split('||');
				}
				$select.val( val ).trigger('change');
			});
			
			// hide select
			$select.hide();
		},
		
		mergeOptions: function(){
			
			// vars
			var $prevOptions = false;
			var $prevGroup = false;
			
			// loop
			$('#select2-drop .select2-result-with-children').each(function(){
				
				// vars
				var $options = $(this).children('ul');
				var $group = $(this).children('.select2-result-label');
				
				// compare to previous
				if( $prevGroup && $prevGroup.text() === $group.text() ) {
					$prevGroup.append( $options.children() );
					$(this).remove();
					return;
				}
				
				// update vars
				$prevOptions = $options;
				$prevGroup = $group;
				
			});
			
		},
		
		getAjaxData: function( term, page ){
			
			// create Select2 v4 params
			var params = {
				term: term,
				page: page
			}
			
			// return
			return Select2.prototype.getAjaxData.apply(this, [params]);
		},
		
	});
	
	
	// manager
	var select2Manager = new acf.Model({
		priority: 5,
		wait: 'prepare',
		initialize: function(){
			
			// vars
			var locale = acf.get('locale');
			var rtl = acf.get('rtl');
			var l10n = acf.get('select2L10n');
			var version = getVersion();
			
			// bail ealry if no l10n
			if( !l10n ) {
				return false;
			}
			
			// bail early if 'en'
			if( locale.indexOf('en') === 0 ) {
				return false;
			}
			
			// initialize
			if( version == 4 ) {
				this.addTranslations4();
			} else if( version == 3 ) {
				this.addTranslations3();
			}
		},
		
		addTranslations4: function(){
			
			// vars
			var l10n = acf.get('select2L10n');
			var locale = acf.get('locale');
			
			// modify local to match html[lang] attribute (used by Select2)
			locale = locale.replace('_', '-');
			
			// select2L10n
			var select2L10n = {
				errorLoading: function () {
					return l10n.load_fail;
				},
				inputTooLong: function (args) {
					var overChars = args.input.length - args.maximum;
					if( overChars > 1 ) {
						return l10n.input_too_long_n.replace( '%d', overChars );
					}
					return l10n.input_too_long_1;
				},
				inputTooShort: function( args ){
					var remainingChars = args.minimum - args.input.length;
					if( remainingChars > 1 ) {
						return l10n.input_too_short_n.replace( '%d', remainingChars );
					}
					return l10n.input_too_short_1;
				},
				loadingMore: function () {
					return l10n.load_more;
				},
				maximumSelected: function( args ) {
					var maximum = args.maximum;
					if( maximum > 1 ) {
						return l10n.selection_too_long_n.replace( '%d', maximum );
					}
					return l10n.selection_too_long_1;
				},
				noResults: function () {
					return l10n.matches_0;
				},
				searching: function () {
					return l10n.searching;
				}
			};
				
			// append
			jQuery.fn.select2.amd.define('select2/i18n/' + locale, [], function(){
				return select2L10n;
			});
		},
		
		addTranslations3: function(){
			
			// vars
			var l10n = acf.get('select2L10n');
			var locale = acf.get('locale');
			
			// modify local to match html[lang] attribute (used by Select2)
			locale = locale.replace('_', '-');
			
			// select2L10n
			var select2L10n = {
				formatMatches: function( matches ) {
					if( matches > 1 ) {
						return l10n.matches_n.replace( '%d', matches );
					}
					return l10n.matches_1;
				},
				formatNoMatches: function() {
					return l10n.matches_0;
				},
				formatAjaxError: function() {
					return l10n.load_fail;
				},
				formatInputTooShort: function( input, min ) {
					var remainingChars = min - input.length;
					if( remainingChars > 1 ) {
						return l10n.input_too_short_n.replace( '%d', remainingChars );
					}
					return l10n.input_too_short_1;
				},
				formatInputTooLong: function( input, max ) {
					var overChars = input.length - max;
					if( overChars > 1 ) {
						return l10n.input_too_long_n.replace( '%d', overChars );
					}
					return l10n.input_too_long_1;
				},
				formatSelectionTooBig: function( maximum ) {
					if( maximum > 1 ) {
						return l10n.selection_too_long_n.replace( '%d', maximum );
					}
					return l10n.selection_too_long_1;
				},
				formatLoadMore: function() {
					return l10n.load_more;
				},
				formatSearching: function() {
					return l10n.searching;
				}
		    };
		    
		    // ensure locales exists
			$.fn.select2.locales = $.fn.select2.locales || {};
			
			// append
			$.fn.select2.locales[ locale ] = select2L10n;
			$.extend($.fn.select2.defaults, select2L10n);
		}
		
	});
	
})(jQuery);