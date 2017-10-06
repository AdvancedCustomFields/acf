<?php

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( !class_exists('acf_early_access') ):

class acf_early_access {
	
	/** @var string The plugin basename */
	var $basename = 'advanced-custom-fields/acf.php';
	
	
	/** @var string The early access value */
	var $access = '';
	
	
	/** @var boolean If the transient has been checked */
	var $checked = false;
	
	
	/**
	*  __construct
	*
	*  This function will setup the class functionality
	*
	*  @type	function
	*  @date	12/9/17
	*  @since	1.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function __construct() {
		
		// bail early if no access
		if( !ACF_EARLY_ACCESS ) return;
		
		
		// vars
		$this->access = (string) ACF_EARLY_ACCESS;
		//$this->basename = apply_filters('acf/get_info', 'basename');
		
		
		// modify plugins transient
		add_filter( 'pre_set_site_transient_update_plugins',	array($this, 'modify_plugins_transient'), 10, 1 );
		add_filter( 'site_transient_update_plugins', 			array($this, 'check_plugins_transient'), 10, 1 );
		
		
		// admin
		if( is_admin() ) {
			
			// modify plugin update message
			add_action('in_plugin_update_message-' . $this->basename, array($this, 'modify_plugin_update_message'), 10, 2 );
			
		}
		
	}
	
	
	/**
	*  request
	*
	*  This function will make a request to an external server
	*
	*  @type	function
	*  @date	8/4/17
	*  @since	1.0.0
	*
	*  @param	$url (string)
	*  @param	$body (array)
	*  @return	(mixed)
	*/
	
	function request( $url = '', $body = null ) {
		
		// post
		$raw_response = wp_remote_post($url, array(
			'timeout'	=> 10,
			'body'		=> $body
		));
		
		
		// wp error
		if( is_wp_error($raw_response) ) {
			
			return $raw_response;
		
		// http error
		} elseif( wp_remote_retrieve_response_code($raw_response) != 200 ) {
			
			return new WP_Error( 'server_error', wp_remote_retrieve_response_message($raw_response) );
			
		}
		
		
		// vars
		$raw_body = wp_remote_retrieve_body($raw_response);
		
		
		// attempt object
		$obj = @unserialize( $raw_body );
		if( $obj ) return $obj;
		
		
		// attempt json
		$json = json_decode( $raw_body, true );
		if( $json ) return $json;
		
		
		// return
		return $json;
		
	}
	
	
	/**
	*  get_plugin_info
	*
	*  This function will get plugin info and save as transient
	*
	*  @type	function
	*  @date	9/4/17
	*  @since	1.0.0
	*
	*  @param	n/a
	*  @return	(array)
	*/
	
	function get_plugin_info() {
		
		// var
		$transient_name = 'acf_early_access_info';
		
		
		// delete transient (force-check is used to refresh)
		if( !empty($_GET['force-check']) ) {
		
			delete_transient($transient_name);
			
		}
	
	
		// try transient
		$transient = get_transient($transient_name);
		if( $transient !== false ) return $transient;
		
		
		// connect
		$response = $this->request('http://api.wordpress.org/plugins/info/1.0/advanced-custom-fields');
		
		
		// ensure response is expected object
		if( !is_wp_error($response) ) {
			
			// store minimal data
			$info = array(
				'version'	=> $response->version,
				'versions'	=> array_keys( $response->versions ),
				'tested'	=> $response->tested
			);
			
			
			// order versions (latest first)
			$info['versions'] = array_reverse($info['versions']);
			
			
			// update var
			$response = $info;
			
		}
		
		
		// update transient
		set_transient($transient_name, $response, HOUR_IN_SECONDS);
		
		
		// return
		return $response;
		
	}
	
	
	/**
	*  check_plugins_transient
	*
	*  This function will check the 'update_plugins' transient and maybe modify it's value
	*
	*  @date	19/9/17
	*  @since	5.6.3
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function check_plugins_transient( $transient ) {
		
		// bail ealry if has been checked
		if( $this->checked ) return $transient;
		$this->checked = true;
		
		
		// vars
		$basename = $this->basename;
		
		
		// bail early if empty
		if( !$transient || empty($transient->checked) ) return $transient;
		
		
		// bail early if acf was not checked
		// - rules out possible included file in theme / plugin
		if( !isset($transient->checked[ $basename ]) ) return $transient;
		
		
		// flush cache if no 'acf' update exists
		// flush cache if 'acf' update does not contain early access info
		// flush cache if 'acf' update contains different early access info
		if( empty($transient->response[ $basename ]) ||
			empty($transient->response[ $basename ]->early_access) ||
			$transient->response[ $basename ]->early_access !== $this->access ) {
			wp_clean_plugins_cache();		
		}
		
		
		// return 
		return $transient;
				
	}
	
	
	
	/**
	*  modify_plugins_transient
	*
	*  This function will modify the 'update_plugins' transient with custom data
	*
	*  @type	function
	*  @date	11/9/17
	*  @since	1.0.0
	*
	*  @param	$transient (object)
	*  @return	$transient
	*/
	
	function modify_plugins_transient( $transient ) {
		
		// vars
		$basename = $this->basename;
		
		
		// bail early if empty
		if( !$transient || empty($transient->checked) ) return $transient;
		
		
		// bail early if acf was not checked
		// - rules out possible included file in theme / plugin
		if( !isset($transient->checked[ $basename ]) ) return $transient;
		
		
		// bail early if already modified
		if( !empty($transient->response[ $basename ]->early_access) ) return $transient;
		
		
		// vars
		$info = $this->get_plugin_info();
		$old_version = $transient->checked[ $basename ];
		$new_version = '';
		
		
		// attempt to find latest tag
		foreach( $info['versions'] as $version ) {
			
			// ignore trunk
			if( $version == 'trunk' ) continue;
			
			
			// restirct versions that don't start with '5'
			if( strpos($version, $this->access) !== 0 ) continue;
			
			
			// ignore if $version is older than $old_version
			if( version_compare($version, $old_version, '<=') ) continue;
			
			
			// ignore if $version is older than $new_version
			if( version_compare($version, $new_version, '<=') ) continue;
			
			
			// this tag is a newer version!
			$new_version = $version;
			
		}
				
		
		// bail ealry if no $new_version
		if( !$new_version ) return $transient;
		
		
		// response
		$response = new stdClass();
		$response->id = 'w.org/plugins/advanced-custom-fields';
		$response->slug = 'advanced-custom-fields';
		$response->plugin = $basename;
		$response->new_version = $new_version;
		$response->url = 'https://wordpress.org/plugins/advanced-custom-fields/';
		$response->package = 'https://downloads.wordpress.org/plugin/advanced-custom-fields.'.$new_version.'.zip';
		$response->tested = $info['tested'];
		$response->early_access = $this->access;
		
		
		// append
		$transient->response[ $basename ] = $response;
		
		
		// return 
        return $transient;
        
	}
	
	
	/*
	*  modify_plugin_update_message
	*
	*  Displays an update message for plugin list screens.
	*
	*  @type	function
	*  @date	14/06/2016
	*  @since	5.3.8
	*
	*  @param	$message (string)
	*  @param	$plugin_data (array)
	*  @param	$r (object)
	*  @return	$message
	*/
	
	function modify_plugin_update_message( $plugin_data, $response ) {
		
		// display message
		echo ' <em>' . __('(Early access enabled)', 'acf') . '</em>';
		
	}
	
}

// instantiate
new acf_early_access();

endif; // class_exists check

?>