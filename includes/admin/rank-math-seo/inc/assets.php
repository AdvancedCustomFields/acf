<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Class Yoast_ACF_Analysis_Frontend
 */
class Yoast_ACF_Analysis_Assets {

	/**
	 * Plugin information.
	 *
	 * @var array
	 */
	protected $plugin_data;

	/**
	 * Initialize.
	 */
	public function init() {
		add_filter( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
	}

	/**
	 * Enqueue JavaScript file to feed data to Yoast Content Analyses.
	 */
	public function enqueue_scripts() {
		global $pagenow;

		/**
		 * Yoast ACF plugin configuration.
		 *
		 * @var \Yoast_ACF_Analysis_Configuration
		 */
		$config = Yoast_ACF_Analysis_Facade::get_registry()->get( 'config' );

		// Post page enqueue.
		// wp_register_script( 'require', 'https://requirejs.org/docs/release/2.3.5/minified/require.js', [ 'backbone', 'underscore' ] );
		wp_enqueue_script(
			'rank-math-acf-analysis-post',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			array( 'jquery', 'rank-math-post-metabox', 'underscore' ),
			acf_get_setting('version'),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-post', 'YoastACFAnalysisConfig', $config->to_array() );

		// Term page enqueue.
		wp_enqueue_script(
			'rank-math-acf-analysis-term',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			array( 'jquery', 'rank-math-term-metabox' ),
			acf_get_setting('version'),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-term', 'YoastACFAnalysisConfig', $config->to_array() );
	}
}
