(function($){
	
	acf.fields.google_map = acf.field.extend({
		
		type: 'google_map',
		url: '',
		$el: null,
		$search: null,
		
		timeout: null,
		status : '', // '', 'loading', 'ready'
		geocoder : false,
		map : false,
		maps : {},
		$pending: $(),
		
		actions: {
			// have considered changing to 'load', however, could cause issues with devs expecting the API to exist earlier
			'ready':	'initialize',
			'append':	'initialize',
			'show':		'show'
		},
		
		events: {
			'click a[data-name="clear"]': 		'_clear',
			'click a[data-name="locate"]': 		'_locate',
			'click a[data-name="search"]': 		'_search',
			'keydown .search': 					'_keydown',
			'keyup .search': 					'_keyup',
			'focus .search': 					'_focus',
			'blur .search': 					'_blur',
			//'paste .search': 					'_paste',
			'mousedown .acf-google-map':		'_mousedown'
		},
		
		focus: function(){
			
			// get elements
			this.$el = this.$field.find('.acf-google-map');
			this.$search = this.$el.find('.search');
			
			
			// get options
			this.o = acf.get_data( this.$el );
			this.o.id = this.$el.attr('id');
			
			
			// get map
			if( this.maps[ this.o.id ] ) {
				
				this.map = this.maps[ this.o.id ];
				
			}
			
		},
		
		
		/*
		*  is_ready
		*
		*  This function will ensure google API is available and return a boolean for the current status
		*
		*  @type	function
		*  @date	19/11/2014
		*  @since	5.0.9
		*
		*  @param	n/a
		*  @return	(boolean)
		*/
		
		is_ready: function(){ 
			
			// reference
			var self = this;
			
			
			// ready
			if( this.status == 'ready' ) return true;
			
			
			// loading
			if( this.status == 'loading' ) return false;
			
			
			// check exists (optimal)
			if( acf.isset(window, 'google', 'maps', 'places') ) {
				
				this.status = 'ready';
				return true;
				
			}
			
			
			// check exists (ok)
			if( acf.isset(window, 'google', 'maps') ) {
				
				this.status = 'ready';
				
			}
			
			
			// attempt load google.maps.places
			if( this.url ) {
				
				// set status
				this.status = 'loading';
				
				
				// enqueue
				acf.enqueue_script(this.url, function(){
					
					// set status
			    	self.status = 'ready';
			    	
			    	
			    	// initialize pending
			    	self.initialize_pending();
			    	
				});
				
			}
			
			
			// ready
			if( this.status == 'ready' ) return true;
			
			
			// return
			return false;
			
		},
		
		
		/*
		*  initialize_pending
		*
		*  This function will initialize pending fields
		*
		*  @type	function
		*  @date	27/08/2016
		*  @since	5.4.0
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		initialize_pending: function(){
			
			// reference
			var self = this;
			
			this.$pending.each(function(){
				
				self.set('$field', $(this)).initialize();
				
			});
			
			
			// reset
			this.$pending = $();
			
		},
		
		
		/*
		*  actions
		*
		*  these functions are fired for this fields actions
		*
		*  @type	function
		*  @date	17/09/2015
		*  @since	5.2.3
		*
		*  @param	(mixed)
		*  @return	n/a
		*/
		
		initialize: function(){
			
			// add to pending
			if( !this.is_ready() ) {
				
				this.$pending = this.$pending.add( this.$field );
				
				return false;
				
			}
			
			
			// load geocode
			if( !this.geocoder ) {
				
				this.geocoder = new google.maps.Geocoder();
				
			}
			
			
			// reference
			var self = this,
				$field = this.$field,
				$el = this.$el,
				$search = this.$search;
			
			
			// input value may be cached by browser, so update the search input to match
			$search.val( this.$el.find('.input-address').val() );
			
			
			// map
			var map_args = acf.apply_filters('google_map_args', {
				
				scrollwheel:	false,
        		zoom:			parseInt(this.o.zoom),
        		center:			new google.maps.LatLng(this.o.lat, this.o.lng),
        		mapTypeId:		google.maps.MapTypeId.ROADMAP
        		
        	}, this.$field);
        	
			
			// create map	        	
        	this.map = new google.maps.Map( this.$el.find('.canvas')[0], map_args);
	        
	        
	        // search
	        if( acf.isset(window, 'google', 'maps', 'places', 'Autocomplete') ) {
		        
		        // vars
		        var autocomplete = new google.maps.places.Autocomplete( this.$search[0] );
				
				
				// bind
				autocomplete.bindTo('bounds', this.map);
				
				
				// event
				google.maps.event.addListener(autocomplete, 'place_changed', function( e ) {
				    
				    // vars
				    var place = this.getPlace();
				    
				    
				    // search
					self.search( place );
				    
				});
				
				
				// append
				this.map.autocomplete = autocomplete;
				
	        }
			
			
			// marker
			var marker_args = acf.apply_filters('google_map_marker_args', {
				
		        draggable: 		true,
		        raiseOnDrag: 	true,
		        map: 			this.map
		        
		    }, this.$field);
		    
		    
		    // add marker
	        this.map.marker = new google.maps.Marker( marker_args );
		    
		    
		    // add references
		    this.map.$el = $el;
		    this.map.$field = $field;
		    
		    
		    // value exists?
		    var lat = $el.find('.input-lat').val(),
		    	lng = $el.find('.input-lng').val();
		    
		    if( lat && lng ) {
			    
			    this.update(lat, lng).center();
			    
		    }
		    
		    
			// events
		    google.maps.event.addListener( this.map.marker, 'dragend', function(){
		    	
		    	// vars
				var position = this.map.marker.getPosition(),
					lat = position.lat(),
			    	lng = position.lng();
			    	
				self.update( lat, lng ).sync();
			    
			});
			
			
			google.maps.event.addListener( this.map, 'click', function( e ) {
				
				// vars
				var lat = e.latLng.lat(),
					lng = e.latLng.lng();
				
				
				self.update( lat, lng ).sync();
			
			});
			
			
			// action for 3rd party customization
			acf.do_action('google_map_init', this.map, this.map.marker, this.$field);
			
			
	        // add to maps
	        this.maps[ this.o.id ] = this.map;
	        
		},
		
		search: function( place ){
			
			// reference
			var self = this;
			
			
			// vars
		    var address = this.$search.val();
		    
		    
		    // bail ealry if no address
		    if( !address ) {
			    
			    return false;
			    
		    }
		    
		    
		    // update input
			this.$el.find('.input-address').val( address );
		    
		    
		    // is lat lng?
		    var latLng = address.split(',');
		    
		    if( latLng.length == 2 ) {
			    
			    var lat = latLng[0],
					lng = latLng[1];
			    
			   
			    if( $.isNumeric(lat) && $.isNumeric(lng) ) {
				    
				    // parse
				    lat = parseFloat(lat);
				    lng = parseFloat(lng);
				    
				    self.update( lat, lng ).center();
				    
				    return;
				    
			    }
			    
		    }
		    
		    
		    // if place exists
		    if( place && place.geometry ) {
			    
		    	var lat = place.geometry.location.lat(),
					lng = place.geometry.location.lng();
					
				
				// update
				self.update( lat, lng ).center();
			    
			    
			    // bail early
			    return;
			    
		    }
		    
		    
		    // add class
		    this.$el.addClass('-loading');
		    
		    self.geocoder.geocode({ 'address' : address }, function( results, status ){
		    	
		    	// remove class
		    	self.$el.removeClass('-loading');
		    	
		    	
		    	// validate
				if( status != google.maps.GeocoderStatus.OK ) {
					
					console.log('Geocoder failed due to: ' + status);
					return;
					
				} else if( !results[0] ) {
					
					console.log('No results found');
					return;
					
				}
				
				
				// get place
				place = results[0];
				
				var lat = place.geometry.location.lat(),
					lng = place.geometry.location.lng();
					
				
				self.update( lat, lng ).center();
			    
			});
				
		},
		
		update: function( lat, lng ){
			
			// vars
			var latlng = new google.maps.LatLng( lat, lng );
		    
		    
		    // update inputs
		    acf.val( this.$el.find('.input-lat'), lat );
		    acf.val( this.$el.find('.input-lng'), lng );
		    
			
		    // update marker
		    this.map.marker.setPosition( latlng );
		    
		    
			// show marker
			this.map.marker.setVisible( true );
		    
		    
		    // update class
		    this.$el.addClass('-value');
		    
		    
	        // validation
			this.$field.removeClass('error');
			
			
			// action
			acf.do_action('google_map_change', latlng, this.map, this.$field);
			
			
			// blur input
			this.$search.blur();
			
			
	        // return for chaining
	        return this;
	        
		},
		
		center: function(){
			
			// vars
			var position = this.map.marker.getPosition(),
				lat = this.o.lat,
				lng = this.o.lng;
			
			
			// if marker exists, center on the marker
			if( position ) {
				
				lat = position.lat();
				lng = position.lng();
				
			}
			
			
			var latlng = new google.maps.LatLng( lat, lng );
				
			
			// set center of map
	        this.map.setCenter( latlng );
	        
		},
		
		sync: function(){
			
			// reference
			var self = this;
				
			
			// vars
			var position = this.map.marker.getPosition(),
				latlng = new google.maps.LatLng( position.lat(), position.lng() );
			
			
			// add class
		    this.$el.addClass('-loading');
		    
		    
		    // load
			this.geocoder.geocode({ 'latLng' : latlng }, function( results, status ){
				
				// remove class
				self.$el.removeClass('-loading');
			    	
			    	
				// validate
				if( status != google.maps.GeocoderStatus.OK ) {
					
					console.log('Geocoder failed due to: ' + status);
					return;
					
				} else if( !results[0] ) {
					
					console.log('No results found');
					return;
					
				}
				
				
				// get location
				var location = results[0];
				
				
				// update title
				self.$search.val( location.formatted_address );

				
				// update input
				acf.val( self.$el.find('.input-address'), location.formatted_address );
		    
			});
			
			
			// return for chaining
	        return this;
	        
		},
		
		refresh: function(){
			
			// bail early if not ready
			if( !this.is_ready() ) {
				
				return false;
			
			}
			
			
			// trigger resize on map 
			google.maps.event.trigger(this.map, 'resize');
			
			
			
			// center map
			this.center();
			
		},
		
		show: function(){
			
			// vars
			var self = this,
				$field = this.$field;
			
			
			// center map when it is shown (by a tab / collapsed row)
			// - use delay to avoid rendering issues with browsers (ensures div is visible)
			setTimeout(function(){
				
				self.set('$field', $field).refresh();
				
			}, 10);
			
		},
		
		
		/*
		*  events
		*
		*  these functions are fired for this fields events
		*
		*  @type	function
		*  @date	17/09/2015
		*  @since	5.2.3
		*
		*  @param	e
		*  @return	n/a
		*/
		
		_clear: function( e ){ // console.log('_clear');
			
			// remove Class
			this.$el.removeClass('-value -loading -search');
		    
			
			// clear search
			this.$search.val('');
			
			
			// clear inputs
			acf.val( this.$el.find('.input-address'), '' );
			acf.val( this.$el.find('.input-lat'), '' );
			acf.val( this.$el.find('.input-lng'), '' );
						
			
			// hide marker
			this.map.marker.setVisible( false );
			
		},
		
		_locate: function( e ){ // console.log('_locate');
			
			// reference
			var self = this;
			
			
			// Try HTML5 geolocation
			if( !navigator.geolocation ) {
				
				alert( acf._e('google_map', 'browser_support') );
				return this;
				
			}
			
			
			// add class
		    this.$el.addClass('-loading');
		    
		    
		    // load
		    navigator.geolocation.getCurrentPosition(function(position){
		    	
		    	// remove class
				self.$el.removeClass('-loading');
		    
		    
		    	// vars
				var lat = position.coords.latitude,
			    	lng = position.coords.longitude;
			    	
				self.update( lat, lng ).sync().center();
				
			});
			
		},
		
		_search: function( e ){ // console.log('_search');
			
			this.search();
			
		},
		
		_focus: function( e ){ // console.log('_focus');
			
			// remove class
			this.$el.removeClass('-value');
			
			
			// toggle -search class
			this._keyup();
			
		},
		
		_blur: function( e ){ // console.log('_blur');
			
			// reference
			var self = this;
			
			
			// vars
			var val = this.$el.find('.input-address').val();
			
			
			// bail early if no val
			if( !val ) {
				
				return;
				
			}
			
			
			// revert search to hidden input value
			this.timeout = setTimeout(function(){
				
				self.$el.addClass('-value');
				self.$search.val( val );
				
			}, 100);
			
		},
		
/*
		_paste: function( e ){ console.log('_paste');
			
			// reference
			var $search = this.$search;
			
			
			// blur search
			$search.blur();
			
			
			// clear timeout
			this._mousedown(e);
			
			
			// focus on input
			setTimeout(function(){
				
				$search.focus();
				
			}, 1);
		},
*/
		
		_keydown: function( e ){ // console.log('_keydown');
			
			// prevent form from submitting
			if( e.which == 13 ) {
				
				e.preventDefault();
			    
			}
			
		},
		
		_keyup: function( e ){ // console.log('_keyup');
			
			// vars
			var val = this.$search.val();
			
			
			// toggle class
			if( val ) {
				
				this.$el.addClass('-search');
				
			} else {
				
				this.$el.removeClass('-search');
				
			}
			
		},
		
		_mousedown: function( e ){ // console.log('_mousedown');
			
			// reference
			var self = this;
			
			
			// clear timeout in 1ms (_mousedown will run before _blur)
			setTimeout(function(){
				
				clearTimeout( self.timeout );
				
			}, 1);
			
			
		}
		
	});

	
})(jQuery);