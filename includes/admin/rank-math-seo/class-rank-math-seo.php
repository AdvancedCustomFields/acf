<?php
/**
 * The Rank_Math_SEO Class
 */
class Rank_Math_SEO {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_filter( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 11 );
		$this->includes();
	}

	/**
	 * Include required files.
	 */
	public function includes() {
		acf_include( 'includes/admin/rank-math-seo/inc/registry.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/configuration/configuration.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/configuration/string-store.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/assets.php' );
	}

	/**
	 * Enqueue JavaScript file.
	 */
	public function enqueue_scripts() {
		// Post page enqueue.
		wp_enqueue_script(
			'rank-math-acf-analysis-post',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			[ 'jquery', 'rank-math-post-metabox', 'underscore' ],
			acf_get_setting( 'version' ),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-post', 'RankMathACFAnalysisConfig', $this->get_config() );

		// Term page enqueue.
		wp_enqueue_script(
			'rank-math-acf-analysis-term',
			acf_get_url( 'includes/admin/rank-math-seo/js/rank-math-acf-analysis.js' ),
			[ 'jquery', 'rank-math-term-metabox' ],
			acf_get_setting( 'version' ),
			true
		);

		wp_localize_script( 'rank-math-acf-analysis-term', 'RankMathACFAnalysisConfig', $this->get_config() );
	}

	/**
	 * Get Config data
	 *
	 * @return array The config data.
	 */
	private function get_config() {
		$config = [
			'pluginName'         => 'rank-math-acf',
			'refreshRate'        => apply_filters( 'rank_math_acf/refresh_rate', 1000 ),
			'headlines'          => apply_filters( 'rank_math_acf/headlines', [] ),
			'enableReload' => apply_filters( 'rank_math_acf/enable_reload', false ),
			'blacklistFields'    => $this->get_blacklist_fields(),
		];

		return apply_filters( 'rank_math_acf/config', $config );
	}

	/**
	 * Get blacklisted fields.
	 *
	 * @return array The Blacklisted fields.
	 */
	private function get_blacklist_fields() {
		$blacklist_type = [
			'number',
			'password',
			'file',
			'select',
			'checkbox',
			'radio',
			'true_false',
			'post_object',
			'page_link',
			'relationship',
			'user',
			'date_picker',
			'color_picker',
			'message',
			'tab',
			'repeater',
			'flexible_content',
			'group',
		];

		return [
			'type' => apply_filters( 'rank_math_acf/blacklist_type', $blacklist_type ),
			'name' => apply_filters( 'rank_math_acf/blacklist_name', [] ),
		];
	}

}

new Rank_Math_SEO();
