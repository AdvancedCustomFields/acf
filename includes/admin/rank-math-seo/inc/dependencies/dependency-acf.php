<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Checks wether ACF is installed.
 */
final class Yoast_ACF_Analysis_Dependency_ACF implements Yoast_ACF_Analysis_Dependency {

	/**
	 * Checks if ACF is active.
	 *
	 * @return bool
	 */
	public function is_met() {
		if ( ! class_exists( 'acf' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Registers the notification to show when the conditions are not met.
	 */
	public function register_notifications() {
		add_action( 'admin_notices', array( $this, 'message_plugin_not_activated' ) );
	}

	/**
	 * Notify that we need ACF to be installed and active.
	 */
	public function message_plugin_not_activated() {
		$message = sprintf(
			/* translators: %1$s resolves to ACF Content Analysis for Yoast SEO, %2$s resolves to Advanced Custom Fields */
			__( '%1$s requires %2$s (free or pro) to be installed and activated.', 'acf-content-analysis-for-rank-math-seo' ),
			'ACF Content Analysis for Yoast SEO',
			'Advanced Custom Fields'
		);

		printf( '<div class="error"><p>%s</p></div>', esc_html( $message ) );
	}
}
