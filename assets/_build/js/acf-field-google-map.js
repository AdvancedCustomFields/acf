(function($, undefined){
	
	var Field = acf.Field.extend({
		
		type: 'google_map',
		
		map: false,
		
		wait: 'load',
		
		events: {
			'click a[data-name="clear"]': 		'onClickClear',
			'click a[data-name="locate"]': 		'onClickLocate',
			'click a[data-name="search"]': 		'onClickSearch',
			'keydown .search': 					'onKeydownSearch',
			'keyup .search': 					'onKeyupSearch',
			'focus .search': 					'onFocusSearch',
			'blur .search': 					'onBlurSearch',
			'showField':						'onShow'
		},
		
		$control: function(){
			return this.$('.acf-google-map');
		},
		
		$input: function( name ){
			return this.$('input[data-name="' + (name || 'address') + '"]');
		},
		
		$search: function(){
			return this.$('.search');
		},
		
		$canvas: function(){
			return this.$('.canvas');
		},
		
		addClass: function( name ){
			this.$control().addClass( name );
		},
		
		removeClass: function( name ){
			this.$control().removeClass( name );
		},
		
		getValue: function(){
			
			// defaults
			var val = {
				lat: '',
				lng: '',
				address: ''
			};
			
			// loop
			this.$('input[type="hidden"]').each(function(){
				val[ $(this).data('name') ] = $(this).val();
			});
			
			// return false if no address
			if( !val.address ) {
				val = false;
			}
			
			// return
			return val;
		},
		
		setValue: function( val ){
			
			// defaults
			val = acf.parseArgs(val, {
				lat: '',
				lng: '',
				address: ''
			});
			
			// loop
			for( var name in val ) {
				acf.val( this.$input(name), val[name] );
			}
			
			// return false if no address
			if( !val.address ) {
				val = false;
			}
			
			// render
			this.renderVal( val );
		},
		
		renderVal: function( val ){
			
		    // has value
		    if( val ) {
			     this.addClass('-value');
			     this.setPosition( val.lat, val.lng );
			     this.map.marker.setVisible( true );
			     
		    // no value
		    } else {
			     this.removeClass('-value');
			     this.map.marker.setVisible( false );
		    }
		    
		    // search
		    this.$search().val( val.address );
		},
		
		setPosition: function( lat, lng ){
			
			// vars
			var latLng = this.newLatLng( lat, lng );
			
			// update marker
			this.map.marker.setPosition( latLng );
			
			// show marker
			this.map.marker.setVisible( true );
			
			// action
			acf.doAction('google_map_change', latLng, this.map, this);
			
			// center
			this.center();
			
			// return
			return this;
		},
		
		center: function(){
			
			// vars
			var position = this.map.marker.getPosition();
			var lat = this.get('lat');
			var lng = this.get('lng');
			
			// if marker exists, center on the marker
			if( position ) {
				lat = position.lat();
				lng = position.lng();
			}
			
			// latlng
			var latLng = this.newLatLng( lat, lng );
				
			// set center of map
	        this.map.setCenter( latLng );
		},
		
		getSearchVal: function(){
			return this.$search().val();
		},
		
		initialize: function(){
			
			// bail early if too early
			if( !api.isReady() ) {
				api.ready( this.initializeMap, this );
				return;
			}
			
			// initializeMap
			this.initializeMap();
		},
		
		newLatLng: function( lat, lng ){
			return new google.maps.LatLng( parseFloat(lat), parseFloat(lng) );
		},
		
		initializeMap: function(){
			
			// vars
			var zoom = this.get('zoom');
			var lat = this.get('lat');
			var lng = this.get('lng');
			
			
			// map
			var mapArgs = {
				scrollwheel:	false,
        		zoom:			parseInt( zoom ),
        		center:			this.newLatLng(lat, lng),
        		mapTypeId:		google.maps.MapTypeId.ROADMAP,
        		marker:			{
			        draggable: 		true,
			        raiseOnDrag: 	true
		    	},
		    	autocomplete: {}
        	};
        	mapArgs = acf.applyFilters('google_map_args', mapArgs, this);       	
        	var map = new google.maps.Map( this.$canvas()[0], mapArgs );
        	this.addMapEvents( map, this );
        	
        	
        	// marker
        	var markerArgs = acf.parseArgs(mapArgs.marker, {
				draggable: 		true,
				raiseOnDrag: 	true,
				map:			map
        	});
		    markerArgs = acf.applyFilters('google_map_marker_args', markerArgs, this);
			var marker = new google.maps.Marker( markerArgs );
        	this.addMarkerEvents( marker, this );
        	
        	
        	// reference
        	map.acf = this;
        	map.marker = marker;
        	this.map = map;
        	
        	// action for 3rd party customization
			acf.doAction('google_map_init', map, marker, this);
        	
        	// set position
		    var val = this.getValue();
		    this.renderVal( val );
		},
		
		addMapEvents: function( map, field ){
			
			// autocomplete
	        if( acf.isset(window, 'google', 'maps', 'places', 'Autocomplete') ) {
		        
		        // vars
		        var autocompleteArgs = map.autocomplete || {};
		        var autocomplete = new google.maps.places.Autocomplete( this.$search()[0], autocompleteArgs );
				
				// bind
				autocomplete.bindTo('bounds', map);
				
				// autocomplete event place_changed is triggered each time the input changes
				// customize the place object with the current "search value" to allow users controll over the address text
				google.maps.event.addListener(autocomplete, 'place_changed', function() {
					var place = this.getPlace();
					place.address = field.getSearchVal();
				    field.setPlace( place );
				});
	        }
	        
	        // click
	        google.maps.event.addListener( map, 'click', function( e ) {
				// vars
				var lat = e.latLng.lat();
				var lng = e.latLng.lng();
				
				 // search
				field.searchPosition( lat, lng );
			});
		},
		
		addMarkerEvents: function( marker, field ){
			
			// dragend
		    google.maps.event.addListener( marker, 'dragend', function(){
		    	// vars
				var position = this.getPosition();
				var lat = position.lat();
			    var lng = position.lng();
			    
			    // search
				field.searchPosition( lat, lng );
			});
		},
		
		searchPosition: function( lat, lng ){
			
			// vars
			var latLng = this.newLatLng( lat, lng );
			var $wrap = this.$control();
			
			// set position
			this.setPosition( lat, lng );
			
			// add class
		    $wrap.addClass('-loading');
		    
		    // callback
		    var callback = $.proxy(function( results, status ){
			    
			    // remove class
			    $wrap.removeClass('-loading');
			    
			    // vars
			    var address = '';
			    
			    // validate
				if( status != google.maps.GeocoderStatus.OK ) {
					console.log('Geocoder failed due to: ' + status);
				} else if( !results[0] ) {
					console.log('No results found');
				} else {
					address = results[0].formatted_address;
				}
				
				// update val
				this.val({
					lat: lat,
					lng: lng,
					address: address
				});
				
		    }, this);
		    
		    // query
		    api.geocoder.geocode({ 'latLng' : latLng }, callback);
		},
		
		setPlace: function( place ){
			
			// bail if no place
			if( !place ) return this;
			
			// search name if no geometry
			// - possible when hitting enter in search address
			if( place.name && !place.geometry ) {
				this.searchAddress(place.name);
				return this;
			}
			
			// vars
			var lat = place.geometry.location.lat();
			var lng = place.geometry.location.lng();
			var address = place.address || place.formatted_address;
			
			// update
			this.setValue({
				lat: lat,
				lng: lng,
				address: address
			});
			
		    // return
		    return this;
		},
		
		searchAddress: function( address ){
			
		    // is address latLng?
		    var latLng = address.split(',');
		    if( latLng.length == 2 ) {
			    
			    // vars
			    var lat = latLng[0];
				var lng = latLng[1];
			    
				// check
			    if( $.isNumeric(lat) && $.isNumeric(lng) ) {
				    return this.searchPosition( lat, lng );
			    }
		    }
		    
		    // vars
		    var $wrap = this.$control();
		    
		    // add class
		    $wrap.addClass('-loading');
		    
		    // callback
		    var callback = this.proxy(function( results, status ){
			    
			    // remove class
			    $wrap.removeClass('-loading');
			    
			    // vars
			    var lat = '';
			    var lng = '';
			    
			    // validate
				if( status != google.maps.GeocoderStatus.OK ) {
					console.log('Geocoder failed due to: ' + status);
				} else if( !results[0] ) {
					console.log('No results found');
				} else {
					lat = results[0].geometry.location.lat();
					lng = results[0].geometry.location.lng();
					//address = results[0].formatted_address;
				}
				
				// update val
				this.val({
					lat: lat,
					lng: lng,
					address: address
				});
				
				//acf.doAction('google_map_geocode_results', results, status, this.$el, this);
				
		    });
		    
		    // query
		    api.geocoder.geocode({ 'address' : address }, callback);
		},
		
		searchLocation: function(){
			
			// Try HTML5 geolocation
			if( !navigator.geolocation ) {
				return alert( acf.__('Sorry, this browser does not support geolocation') );
			}
			
			// vars
		    var $wrap = this.$control();
			
			// add class
		    $wrap.addClass('-loading');
		    
		    // callback
		    var onSuccess = $.proxy(function( results, status ){
			    
			    // remove class
			    $wrap.removeClass('-loading');
			    
			    // vars
				var lat = results.coords.latitude;
			    var lng = results.coords.longitude;
			    
			    // search;
			    this.searchPosition( lat, lng );
				
		    }, this);
		    
		    var onFailure = function( error ){
			    $wrap.removeClass('-loading');
		    }
		    
		    // try query
			navigator.geolocation.getCurrentPosition( onSuccess, onFailure );
		},
		
		onClickClear: function( e, $el ){
			this.val( false );
		},
		
		onClickLocate: function( e, $el ){
			this.searchLocation();
		},
		
		onClickSearch: function( e, $el ){
			this.searchAddress( this.$search().val() );
		},
		
		onFocusSearch: function( e, $el ){
			this.removeClass('-value');
			this.onKeyupSearch.apply(this, arguments);
		},
		
		onBlurSearch: function( e, $el ){
			
			// timeout to allow onClickLocate event
			this.setTimeout(function(){
				this.removeClass('-search');
				if( $el.val() ) {
					this.addClass('-value');
				}
			}, 100);			
		},
		
		onKeyupSearch: function( e, $el ){
			if( $el.val() ) {
				this.addClass('-search');
			} else {
				this.removeClass('-search');
			}
		},
		
		onKeydownSearch: function( e, $el ){
			
			// prevent form from submitting
			if( e.which == 13 ) {
				e.preventDefault();
			}
		},
		
		onMousedown: function(){
			
/*
			// clear timeout in 1ms (onMousedown will run before onBlurSearch)
			this.setTimeout(function(){
				clearTimeout( this.get('timeout') );
			}, 1);
*/
		},
		
		onShow: function(){
			
			// bail early if no map
			// - possible if JS API was not loaded
			if( !this.map ) {
				return false;
			}
			
			// center map when it is shown (by a tab / collapsed row)
			// - use delay to avoid rendering issues with browsers (ensures div is visible)
			this.setTimeout( this.center, 10 );
		}
	});
	
	acf.registerFieldType( Field );
	
	var api = new acf.Model({
		
		geocoder: false,
		
		data: {
			status: false,
		},
		
		getStatus: function(){
			return this.get('status');
		},
		
		setStatus: function( status ){
			return this.set('status', status);
		},
		
		isReady: function(){
			
			// loaded
			if( this.getStatus() == 'ready' ) {
				return true;
			}
			
			// loading
			if( this.getStatus() == 'loading' ) {
				return false;
			}
			
			// check exists (optimal)
			if( acf.isset(window, 'google', 'maps', 'places') ) {
				this.setStatus('ready');
				return true;
			}
			
			// load api
			var url = acf.get('google_map_api');
			if( url ) {
				this.setStatus('loading');
				
				// enqueue
				$.ajax({
					url: url,
					dataType: 'script',
					cache: true,
					context: this,
					success: function(){
						
						// ready
						this.setStatus('ready');
						
						// geocoder
						this.geocoder = new google.maps.Geocoder();
						
						// action						
						acf.doAction('google_map_api_loaded');
					}
				});
			}
			
			// return
			return false;
		},
		
		ready: function( callback, context ){
			acf.addAction('google_map_api_loaded', callback, 10, context);
		}
	});
	
})(jQuery);