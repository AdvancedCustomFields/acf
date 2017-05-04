<?php 

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// register update
acf_register_plugin_update(array(
	'id'		=> 'acf',
	'key'		=> 'acfbeta5',
	'slug'		=> acf_get_setting('slug'),
	'basename'	=> acf_get_setting('basename'),
	'version'	=> acf_get_setting('version'),
));

?>