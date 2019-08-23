<?php
/**
 * ACF Content Analysis for Rank Math SEO plugin file.
 */

class Rank_Math_SEO {

	/**
	 * The Constructor.
	 */
	public function __construct() {
		add_action( 'admin_init', array( $this, 'init' ) );
	}

	/**
	 * Initialize Rank Math code.
	 *
	 * @return void
	 */
	public function init() {
		$this->includes();
		$this->config();
		$this->register_config_filters();

		$assets = new RankMath_ACF_Analysis_Assets();
		$assets->init();
	}

	/**
	 * Include required files.
	 */
	public function includes() {
		acf_include( 'includes/admin/rank-math-seo/inc/facade.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/registry.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/configuration/configuration.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/configuration/string-store.php' );
		acf_include( 'includes/admin/rank-math-seo/inc/assets.php' );
	}

	/**
	 * Configure the plugin.
	 *
	 * @return void
	 */
	public function config() {
		$registry      = RankMath_ACF_Analysis_Facade::get_registry();
		$configuration = $registry->get( 'config' );

		if ( null !== $configuration && $configuration instanceof RankMath_ACF_Analysis_Configuration ) {
			return;
		}

		$configuration = new RankMath_ACF_Analysis_Configuration(
			$this->get_blacklist_type(),
			$this->get_blacklist_name(),
			$this->get_field_selectors()
		);

		/**
		 * Filters the plugin configuration instance.
		 *
		 * @param RankMath_ACF_Analysis_Configuration $configuration Plugin configuration instance
		 */
		$custom_configuration = apply_filters( RankMath_ACF_Analysis_Facade::get_filter_name( 'config' ), $configuration );
		if ( $custom_configuration instanceof RankMath_ACF_Analysis_Configuration ) {
			$configuration = $custom_configuration;
		}

		$registry->add( 'config', $configuration );
	}

	/**
	 * Filters the Scraper Configuration to add the headlines configuration for the text scraper.
	 *
	 * @return void
	 */
	protected function register_config_filters() {
		add_filter( RankMath_ACF_Analysis_Facade::get_filter_name( 'scraper_config' ), [ $this, 'filter_scraper_config' ]
		);
	}

	/**
	 * Enhances the scraper config with headlines configuration.
	 *
	 * @param array $scraper_config The scraper configuration.
	 *
	 * @return array The enhanched scraper config.
	 */
	public function filter_scraper_config( $scraper_config ) {
		$scraper_config['text'] = [
			'headlines' => apply_filters( RankMath_ACF_Analysis_Facade::get_filter_name( 'headlines' ), [] ),
		];
		return $scraper_config;
	}

	/**
	 * Retrieves the default field selectors for ACF4.
	 *
	 * @return RankMath_ACF_Analysis_String_Store The blacklist string store.
	 */
	protected function get_field_selectors() {
		$field_selectors = new RankMath_ACF_Analysis_String_Store();

		$default_field_selectors = [
			'input[type=text][id^=acf]',
			'textarea[id^=acf]',
			'input[type=email][id^=acf]',
			'input[type=url][id^=acf]',
			'textarea[id^=wysiwyg-acf]',
			'input[type=hidden].acf-image-value',
			'.acf-taxonomy-field',
		];

		foreach ( $default_field_selectors as $field_selector ) {
			$field_selectors->add( $field_selector );
		}

		return $field_selectors;
	}

	/**
	 * Retrieves the default blacklist.
	 *
	 * @return RankMath_ACF_Analysis_String_Store The blacklist string store.
	 */
	protected function get_blacklist_type() {

		$blacklist = new RankMath_ACF_Analysis_String_Store();

		$default_blacklist = [
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

		foreach ( $default_blacklist as $type ) {
			$blacklist->add( $type );
		}

		return $blacklist;
	}

	/**
	 * Gets a new string store.
	 *
	 * @return RankMath_ACF_Analysis_String_Store A new blacklist string store.
	 */
	protected function get_blacklist_name() {
		return new RankMath_ACF_Analysis_String_Store();
	}
}

new Rank_Math_SEO();
