<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Interface Yoast_ACF_Analysis_Dependency.
 */
interface Yoast_ACF_Analysis_Dependency {

	/**
	 * Checks if this dependency is met.
	 *
	 * @return bool True when met, False when not met.
	 */
	public function is_met();

	/**
	 * Registers the notifications to communicate the depedency is not met.
	 *
	 * @return void
	 */
	public function register_notifications();
}
