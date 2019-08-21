<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Class Yoast_ACF_Analysis_Requirements
 */
class Yoast_ACF_Analysis_Requirements {

	/**
	 * List of registered dependencies.
	 *
	 * @var Yoast_ACF_Analysis_Dependency[]
	 */
	protected $dependencies = array();

	/**
	 * Adds a dependency.
	 *
	 * @param Yoast_ACF_Analysis_Dependency $dependency Dependency to add.
	 */
	public function add_dependency( Yoast_ACF_Analysis_Dependency $dependency ) {
		$this->dependencies[] = $dependency;
	}

	/**
	 * Checks if all depedencies are met.
	 *
	 * @return bool True if all requirements are met.
	 */
	public function are_met() {
		/*
		 * If the user cannot control plugin activation,
		 * we don't want to bother with requirements which cannot be resolved.
		 */
		$can_manage_plugins = current_user_can( 'activate_plugins' );

		$all_are_met = true;
		foreach ( $this->dependencies as $depencency ) {
			$is_met = $depencency->is_met();
			if ( ! $is_met && $can_manage_plugins ) {
				$depencency->register_notifications();
			}

			$all_are_met = $is_met && $all_are_met;
		}

		return $all_are_met;
	}
}
