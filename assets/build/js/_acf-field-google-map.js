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
			'showField':						'onShow',
		},
		
		$control: function(){
			return this.$('.acf-google-map');
		},
		
		$search: function(){
			return this.$('.search');
		},
		
		$canvas: function(){
			return this.$('.canvas');
		},
		
		setState: function( state ){
			
			// Remove previous state classes.
			this.$control().removeClass( '-value -loading -searching' );
			
			// Determine auto state based of current value.
			if( state === 'default' ) {
				state = this.val() ? 'value' : '';
			}
			
			// Update state class.
			if( state ) {
				this.$control().addClass( '-' + state );
			}
		},
		
		getValue: function(){
			var val = this.$input().val();
			if( val ) {
				return JSON.parse( val )
			} else {
				return false;
			}
		},
		
		setValue: function( val, silent ){
			
			// Convert input value.
			var valAttr = '';
			if( val ) {
				valAttr = JSON.stringify( val );
			}
			
			// Update input (with change).
			acf.val( this.$input(), valAttr );
			
			// Bail early if silent update.
			if( silent ) {
				return;
			}
			
			// Render.
			this.renderVal( val );
			
			/**
			 * Fires immediately after the value has changed.
			 *
			 * @date	12/02/2014
			 * @since	5.0.0
			 *
			 * @param	object|string val The new value.
			 * @param	object map The Google Map isntance.
			 * @param	object field The field instance.
			 */
			acf.doAction('google_map_change', val, this.map, this);
		},
		
		renderVal: function( val ){
			
			// Value.
			if( val ) {
				this.setState( 'value' );
				this.$search().val( val.address );
				this.setPosition( val.lat, val.lng );
			
			// No value.
			} else {
				this.setState( '' );
				this.$search().val( '' );
				this.map.marker.setVisible( false );
			}
		},
		
		newLatLng: function( lat, lng ){
			return new google.maps.LatLng( parseFloat(lat), parseFloat(lng) );
		},
		
		setPosition: function( lat, lng ){
			
			// Update marker position.
			this.map.marker.setPosition({
				lat: parseFloat(lat), 
				lng: parseFloat(lng)
			});
			
			// Show marker.
			this.map.marker.setVisible( true );
			
			// Center map.
			this.center();
		},
		
		center: function(){
			
			// Find marker position.
			var position = this.map.marker.getPosition();
			if( position ) {
				var lat = position.lat();
				var lng = position.lng();
				
			// Or find default settings.
			} else {
				var lat = this.get('lat');
				var lng = this.get('lng');
			}
			
			// Center map.
			this.map.setCenter({
				lat: parseFloat(lat), 
				lng: parseFloat(lng)
			});
		},
		
		initialize: function(){
			
			// Ensure Google API is loaded and then initialize map.
			withAPI( this.initializeMap.bind(this) );
		},
		
		initializeMap: function(){
			
			// Get value ignoring conditional logic status.
			var val = this.getValue();
			
			// Construct default args.
			var args = acf.parseArgs(val, {
				zoom: this.get('zoom'),
				lat: this.get('lat'),
				lng: this.get('lng')
			});
			
			// Create Map.
			var mapArgs = {
				scrollwheel:	false,
        		zoom:			parseInt( args.zoom ),
        		center:			{
					lat: parseFloat( args.lat ), 
					lng: parseFloat( args.lng )
				},
        		mapTypeId:		google.maps.MapTypeId.ROADMAP,
        		marker:			{
			        draggable: 		true,
			        raiseOnDrag: 	true
		    	},
		    	autocomplete: {}
        	};
        	mapArgs = acf.applyFilters('google_map_args', mapArgs, this);       	
        	var map = new google.maps.Map( this.$canvas()[0], mapArgs );
        	
        	// Create Marker.
        	var markerArgs = acf.parseArgs(mapArgs.marker, {
				draggable: 		true,
				raiseOnDrag: 	true,
				map:			map
        	});
		    markerArgs = acf.applyFilters('google_map_marker_args', markerArgs, this);
			var marker = new google.maps.Marker( markerArgs );
        	
        	// Maybe Create Autocomplete.
        	var autocomplete = false;
	        if( acf.isset(google, 'maps', 'places', 'Autocomplete') ) {
		        var autocompleteArgs = mapArgs.autocomplete || {};
		        autocompleteArgs = acf.applyFilters('google_map_autocomplete_args', autocompleteArgs, this);
		        autocomplete = new google.maps.places.Autocomplete( this.$search()[0], autocompleteArgs );
		        autocomplete.bindTo('bounds', map);
	        }
	        
	        // Add map events.
	        this.addMapEvents( this, map, marker, autocomplete );
        	
        	// Append references.
        	map.acf = this;
        	map.marker = marker;
        	map.autocomplete = autocomplete;
        	this.map = map;
        	
        	// Set position.
		    if( val ) {
			    this.setPosition( val.lat, val.lng );
		    }
		    
        	/**
			 * Fires immediately after the Google Map has been initialized.
			 *
			 * @date	12/02/2014
			 * @since	5.0.0
			 *
			 * @param	object map The Google Map isntance.
			 * @param	object marker The Google Map marker isntance.
			 * @param	object field The field instance.
			 */
			acf.doAction('google_map_init', map, marker, this);
		},
		
		addMapEvents: function( field, map, marker, autocomplete ){
			
			// Click map.
	        google.maps.event.addListener( map, 'click', function( e ) {
				var lat = e.latLng.lat();
				var lng = e.latLng.lng();
				field.searchPosition( lat, lng );
			});
			
			// Drag marker.
		    google.maps.event.addListener( marker, 'dragend', function(){
				var lat = this.getPosition().lat();
			    var lng = this.getPosition().lng();
				field.searchPosition( lat, lng );
			});
			
			// Autocomplete search.
	        if( autocomplete ) {
				google.maps.event.addListener(autocomplete, 'place_changed', function() {
					var place = this.getPlace();
					field.searchPlace( place );
				});
	        }
	        
	        // Detect zoom change.
		    google.maps.event.addListener( map, 'zoom_changed', function(){
			    var val = field.val();
			    if( val ) {
				    val.zoom = map.getZoom();
				    field.setValue( val, true );
			    }
			});
		},
		
		searchPosition: function( lat, lng ){
			//console.log('searchPosition', lat, lng );
			
			// Start Loading.
			this.setState( 'loading' );
			
			// Query Geocoder.
			var latLng = { lat: lat, lng: lng };
			geocoder.geocode({ location: latLng }, function( results, status ){
			    //console.log('searchPosition', arguments );
			    
			    // End Loading.
			    this.setState( '' );
			    
			    // Status failure.
				if( status !== 'OK' ) {
					this.showNotice({
						text: acf.__('Location not found: %s').replace('%s', status),
						type: 'warning'
					});

				// Success.
				} else {
					var val = this.parseResult( results[0] );
					
					// Override lat/lng to match user defined marker location.
					// Avoids issue where marker "snaps" to nearest result.
					val.lat = lat;
					val.lng = lng;
					this.val( val );
				}
					
			}.bind( this ));
		},
		
		searchPlace: function( place ){
			//console.log('searchPlace', place );
			
			// Bail early if no place.
			if( !place ) {
				return;
			}
			
			// Selecting from the autocomplete dropdown will return a rich PlaceResult object.
			// Be sure to over-write the "formatted_address" value with the one displayed to the user for best UX.
			if( place.geometry ) {
				place.formatted_address = this.$search().val();
				var val = this.parseResult( place );
				this.val( val );
			
			// Searching a custom address will return an empty PlaceResult object.
			} else if( place.name ) {
				this.searchAddress( place.name );
			}
		},
		
		searchAddress: function( address ){
			//console.log('searchAddress', address );
			
			// Bail early if no address.
			if( !address ) {
				return;
			}
			
		    // Allow "lat,lng" search.
		    var latLng = address.split(',');
		    if( latLng.length == 2 ) {
			    var lat = parseFloat(latLng[0]);
				var lng = parseFloat(latLng[1]);
			    if( lat && lng ) {
				    return this.searchPosition( lat, lng );
			    }
		    }
		    
			// Start Loading.
			this.setState( 'loading' );
		    
		    // Query Geocoder.
		    geocoder.geocode({ address: address }, function( results, status ){
			    //console.log('searchPosition', arguments );
			    
			    // End Loading.
			    this.setState( '' );
			    
			    // Status failure.
				if( status !== 'OK' ) {
					this.showNotice({
						text: acf.__('Location not found: %s').replace('%s', status),
						type: 'warning'
					});
					
				// Success.
				} else {
					var val = this.parseResult( results[0] );
					
					// Override address data with parameter allowing custom address to be defined in search.
					val.address = address;
					
					// Update value.
					this.val( val );
				}
					
			}.bind( this ));
		},
		
		searchLocation: function(){
			//console.log('searchLocation' );
			
			// Check HTML5 geolocation.
			if( !navigator.geolocation ) {
				return alert( acf.__('Sorry, this browser does not support geolocation') );
			}
			
			// Start Loading.
			this.setState( 'loading' );
			
		    // Query Geolocation.
			navigator.geolocation.getCurrentPosition(
				
				// Success.
				function( results ){
				    
				    // End Loading.
					this.setState( '' );
				    
				    // Search position.
					var lat = results.coords.latitude;
				    var lng = results.coords.longitude;
				    this.searchPosition( lat, lng );
					
				}.bind(this),
				
				// Failure.
				function( error ){
				    this.setState( '' );
				}.bind(this)
			);	
		},
		
		/**
		 * parseResult
		 *
		 * Returns location data for the given GeocoderResult object.
		 *
		 * @date	15/10/19
		 * @since	5.8.6
		 *
		 * @param	object obj A GeocoderResult object.
		 * @return	object
		 */
		parseResult: function( obj ) {
			
			// Construct basic data.
			var result = {
				address: obj.formatted_address,
				lat: obj.geometry.location.lat(),
				lng: obj.geometry.location.lng(),
			};
			
			// Add zoom level.
			result.zoom = this.map.getZoom();
			
			// Add place ID.
			if( obj.place_id ) {
				result.place_id = obj.place_id;
			}
			
			// Add place name.
			if( obj.name ) {
				result.name = obj.name;
			}
				
			// Create search map for address component data.
			var map = {
		        street_number: [ 'street_number' ],
		        street_name: [ 'street_address', 'route' ],
		        city: [ 'locality' ],
		        state: [
					'administrative_area_level_1',
					'administrative_area_level_2',
					'administrative_area_level_3',
					'administrative_area_level_4',
					'administrative_area_level_5'
		        ],
		        post_code: [ 'postal_code' ],
		        country: [ 'country' ]
			};
			
			// Loop over map.
			for( var k in map ) {
				var keywords = map[ k ];
				
				// Loop over address components.
				for( var i = 0; i < obj.address_components.length; i++ ) {
					var component = obj.address_components[ i ];
					var component_type = component.types[0];
					
					// Look for matching component type.
					if( keywords.indexOf(component_type) !== -1 ) {
						
						// Append to result.
						result[ k ] = component.long_name;
						
						// Append short version.
						if( component.long_name !== component.short_name ) {
							result[ k + '_short' ] = component.short_name;
						}
					}
				}
			}
			
			/**
			 * Filters the parsed result.
			 *
			 * @date	18/10/19
			 * @since	5.8.6
			 *
			 * @param	object result The parsed result value.
			 * @param	object obj The GeocoderResult object.
			 */
			return acf.applyFilters('google_map_result', result, obj, this.map, this);
		},
		
		onClickClear: function(){
			this.val( false );
		},
		
		onClickLocate: function(){
			this.searchLocation();
		},
		
		onClickSearch: function(){
			this.searchAddress( this.$search().val() );
		},
		
		onFocusSearch: function( e, $el ){
			this.setState( 'searching' );
		},
		
		onBlurSearch: function( e, $el ){
			
			// Get saved address value.
			var val = this.val();
			var address = val ? val.address : '';
			
			// Remove 'is-searching' if value has not changed.
			if( $el.val() === address ) {
				this.setState( 'default' );
			}
		},
		
		onKeyupSearch: function( e, $el ){
			
			// Clear empty value.
			if( !$el.val() ) {
				this.val( false );
			}
		},
		
		// Prevent form from submitting.
		onKeydownSearch: function( e, $el ){
			if( e.which == 13 ) {
				e.preventDefault();
				$el.blur();
			}
		},
		
		// Center map once made visible.
		onShow: function(){
			if( this.map ) {
				this.setTimeout( this.center );
			}
		},
	});
	
	acf.registerFieldType( Field );
	
	// Vars.
	var loading = false;
	var geocoder = false;
	
	/**
	 * withAPI
	 *
	 * Loads the Google Maps API library and troggers callback.
	 *
	 * @date	28/3/19
	 * @since	5.7.14
	 *
	 * @param	function callback The callback to excecute.
	 * @return	void
	 */
	
	function withAPI( callback ) {
		
		// Check if geocoder exists.
		if( geocoder ) {
			return callback();
		}
		
		// Check if geocoder API exists.
		if( acf.isset(window, 'google', 'maps', 'Geocoder') ) {
			geocoder = new google.maps.Geocoder();
			return callback();
		}
		
		// Geocoder will need to be loaded. Hook callback to action.
		acf.addAction( 'google_map_api_loaded', callback );
		
		// Bail early if already loading API.
		if( loading ) {
			return;
		}
		
		// load api
		var url = acf.get('google_map_api');
		if( url ) {
			
			// Set loading status.
			loading = true;
			
			// Load API
			$.ajax({
				url: url,
				dataType: 'script',
				cache: true,
				success: function(){
					geocoder = new google.maps.Geocoder();
					acf.doAction('google_map_api_loaded');
				}
			});
		}
	}
	
})(jQuery);