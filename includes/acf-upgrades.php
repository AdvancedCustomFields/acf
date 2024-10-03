<?php

namespace ACF\Upgrades;

/**
 * Initialize the checking for plugin updates for ACF non-PRO.
 */
function check_for_acf_upgrades() {
	$properties = array(
		// This must match the key in "https://wpe-plugin-updates.wpengine.com/plugins.json".
		'plugin_slug'     => 'advanced-custom-fields',
		'plugin_basename' => ACF_BASENAME,
	);

	new \ACF\Upgrades\PluginUpdater( $properties );
}
add_action( 'admin_init', __NAMESPACE__ . '\check_for_acf_upgrades' );
