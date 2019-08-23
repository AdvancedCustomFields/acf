<?php
/**
 * Class RankMath_ACF_Analysis_Frontend
 */
class RankMath_ACF_Analysis_Assets {

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
	 * Enqueue JavaScript file to feed data to RankMath Content Analyses.
	 */
	public function enqueue_scripts() {
		global $pagenow;

		/**
		 * RankMath ACF plugin configuration.
		 *
		 * @var \RankMath_ACF_Analysis_Configuration
		 */
		$config = RankMath_ACF_Analysis_Facade::get_registry()->get( 'config' );

		// Post page enqueue.
		wp_enqueue_script(
			'rank-math-acf-analysis-post',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			[ 'jquery', 'rank-math-post-metabox', 'underscore' ],
			acf_get_setting('version'),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-post', 'RankMathACFAnalysisConfig', $config->to_array() );

		// Term page enqueue.
		wp_enqueue_script(
			'rank-math-acf-analysis-term',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			[ 'jquery', 'rank-math-term-metabox' ],
			acf_get_setting('version'),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-term', 'RankMathACFAnalysisConfig', $config->to_array() );
	}
}
