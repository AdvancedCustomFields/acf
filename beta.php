<?php 

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( ! class_exists('acf_beta') ) :

class acf_beta {
	

	/*
	*  __construct
	*
	*  Initialize filters, action, variables and includes
	*
	*  @type	function
	*  @date	23/06/12
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function __construct() {
		
		// filters
		add_filter('acf/get_remote_plugin_info', 			array($this, 'get_remote_plugin_info'), 10, 1);
		add_filter('acf/updates/plugin_details', 			array($this, 'plugin_details'), 10, 3);
		add_filter('acf/updates/plugin_update', 			array($this, 'plugin_update'), 10, 2);
					
	}
	
	
	/*
	*  get_remote_url
	*
	*  description
	*
	*  @type	function
	*  @date	29/3/17
	*  @since	5.5.10
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	function get_remote_url( $action = '', $args = array() ) {
		
		// vars
		$url = 'https://connect.advancedcustomfields.com';
		//$url = 'http://connect';
		
		
		// defaults
		$args = wp_parse_args($args, array(
			'a'				=> $action,
			'p'				=> 'acf',
			'v'				=> acf_get_setting('version'),
			'wp_name'		=> get_bloginfo('name'),
			'wp_url'		=> home_url(),
			'wp_version'	=> get_bloginfo('version'),
			'wp_language'	=> get_bloginfo('language'),
			'wp_timezone'	=> get_option('timezone_string'),
			
		));
		
		
		// return
		return $url . '/index.php?' . build_query($args);
		
	}
	
	
	/*
	*  acf_pro_get_remote_response
	*
	*  description
	*
	*  @type	function
	*  @date	16/01/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	function get_remote_response( $action = '', $post = array() ) {
		
		// vars
		$url = $this->get_remote_url( $action );
		
		
		// connect
		$request = wp_remote_post( $url, array(
			'body' => $post
		));
		
		
		// success
		if( !is_wp_error($request) || wp_remote_retrieve_response_code($request) === 200) {
	    	
	        return $request['body'];
	    
	    }
	    
	    
	    // return
	    return 0;
	    
	}
	
	
	/*
	*  get_remote_plugin_info
	*
	*  This function will return an array of data from the plugin's readme.txt file (remote)
	*  The data returned will be stored in a transient and used to display plugin update info
	*
	*  @type	function
	*  @date	8/06/2016
	*  @since	5.3.8
	*
	*  @param	$info (array)
	*  @return	$info
	*/
	
	function get_remote_plugin_info( $info ) {
		
		// vars
		$info = $this->get_remote_response('get-info');
        
        
        // bail ealry if no info
        if( empty($info) ) return 0;
        
        
        // json decode
        $info = json_decode($info, true);
        
        
        // remove unused data to save DB transient space
		unset( $info['description'] );
		unset( $info['installation'] );
		unset( $info['tags'] );
	
	
        // return
		return $info;
		
	}
	
	
	/*
	*  plugin_details
	*
	*  This function will populate the plugin data visible in the 'View details' popup
	*
	*  @type	function
	*  @date	8/06/2016
	*  @since	5.3.8
	*
	*  @param	$result (bool|object)
	*  @param	$action (string)
	*  @param	$args (object)
	*  @return	$result
	*/
	
	function plugin_details( $result = false, $action = null, $args = null ) {
		
		// vars
		$slug = acf_get_setting('slug');
        $info = $this->get_remote_response('get-info');
        
        
        // bail ealry if no info
        if( empty($info) ) return false;
        
        
        // json decode
        $info = json_decode($info);
        
        
        // sections
        $sections = array(
        	'description' => '',
        	'installation' => '',
        	'changelog' => '',
        	'upgrade_notice' => ''
        );
        
        foreach( $sections as $k => $v ) {
	        
	        $sections[ $k ] = $info->$k;
	        
	        unset( $info->$k );
	        
        }
        
        $info->sections = $sections;
        
        
    	// return        
        return $info;
		
	}
	
	
	/*
	*  is_update_available
	*
	*  description
	*
	*  @type	function
	*  @date	31/3/17
	*  @since	5.5.10
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/
	
	function is_update_available() {
		
		// vars
		$info = acf_get_remote_plugin_info();
		$version = acf_get_setting('version');
		 
		
		// return false if no info
		if( empty($info['version']) ) return false;
		
	    
	    // return false if the external version is '<=' the current version
		if( version_compare($info['version'], $version, '<=') ) {
			
	    	return false;
	    
	    }
	    
		
		// return
		return true;	
		
	}
	
	
	/*
	*  plugin_update
	*
	*  This function will return an object of data saved in transient and used by WP do perform an update
	*
	*  @type	function
	*  @date	16/01/2014
	*  @since	5.0.0
	*
	*  @param	$update (object)
	*  @param	$transient (object)
	*  @return	$update
	*/
	
	function plugin_update( $update, $transient ) {
		
		// bail early if no update available
		if( !$this->is_update_available() ) return false;
		
		
		// vars
		$info = acf_get_remote_plugin_info();
		$basename = acf_get_setting('basename');
		$slug = acf_get_setting('slug');
		
		
        // create new object for update
        $obj = new stdClass();
        $obj->slug = $slug;
        $obj->plugin = $basename;
        $obj->new_version = $info['version'];
        $obj->url = $info['homepage'];
		$obj->package = $this->get_remote_url('download');
		
		
		// return 
        return $obj;
        
	}
	
	
}


// initialize
new acf_beta();

endif; // class_exists check

?>