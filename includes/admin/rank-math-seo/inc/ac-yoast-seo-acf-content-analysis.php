<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Adds ACF data to the content analyses of WordPress SEO.
 */
class AC_Yoast_SEO_ACF_Content_Analysis {

	/**
	 * Yoast_ACF_Analysis init.
	 *
	 * Add hooks and filters.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'admin_init', array( $this, 'admin_init' ) );
	}

	/**
	 * Check if all requirements are met and boot plugin if so.
	 *
	 * @return void
	 */
	public function admin_init() {
		$dependencies = new Yoast_ACF_Analysis_Requirements();
		$dependencies->add_dependency( new Yoast_ACF_Analysis_Dependency_Yoast_SEO() );
		$dependencies->add_dependency( new Yoast_ACF_Analysis_Dependency_ACF() );

		if ( ! $dependencies->are_met() ) {
			return;
		}

		$this->boot();

		$this->register_config_filters();

		$assets = new Yoast_ACF_Analysis_Assets();
		$assets->init();
	}

	/**
	 * Boots the plugin.
	 *
	 * @return void
	 */
	public function boot() {
		$registry = Yoast_ACF_Analysis_Facade::get_registry();

		$configuration = $registry->get( 'config' );

		if ( null !== $configuration && $configuration instanceof Yoast_ACF_Analysis_Configuration ) {
			return;
		}

		$configuration = new Yoast_ACF_Analysis_Configuration(
			$this->get_blacklist_type(),
			$this->get_blacklist_name(),
			$this->get_field_selectors()
		);

		/**
		 * Filters the plugin configuration instance.
		 *
		 * You can replace the whole plugin configuration with a custom instance.
		 * Only use this as a last resort as there are multiple more specific filters in the default configuration.
		 *
		 * @see Yoast_ACF_Analysis_Configuration
		 *
		 * @since 2.0.0
		 *
		 * @param Yoast_ACF_Analysis_Configuration $configuration Plugin configuration instance
		 */
		$custom_configuration = apply_filters( Yoast_ACF_Analysis_Facade::get_filter_name( 'config' ), $configuration );
		if ( $custom_configuration instanceof Yoast_ACF_Analysis_Configuration ) {
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
		add_filter(
			Yoast_ACF_Analysis_Facade::get_filter_name( 'scraper_config' ),
			array( $this, 'filter_scraper_config' )
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
		$scraper_config['text'] = array(
			/**
			 * Filters which ACF text fields are to be treated as a headline by the text scraper.
			 *
			 * The array has the ACF field key as the array key and the value should be an integer from 1 to 6
			 * that corresponds to the 6 possible HTML tags <h1> to <h6>.
			 *
			 * So this is how to make the field with the key "field_591eb45f2be86" a <h3>:
			 *
			 *     $headlines_config = array(
			 *          'field_591eb45f2be86' => 3
			 *     );
			 *
			 * @since 2.0.0
			 *
			 * @param array $headlines_config {
			 *      @type string $field_name     Name of the ACF field
			 *      @type int    $headline_level Headline level 1 to 6
			 * }
			 */
			'headlines' => apply_filters( Yoast_ACF_Analysis_Facade::get_filter_name( 'headlines' ), array() ),
		);

		return $scraper_config;
	}

	/**
	 * Retrieves the default field selectors for ACF4.
	 *
	 * @return Yoast_ACF_Analysis_String_Store The blacklist string store.
	 */
	protected function get_field_selectors() {
		$field_selectors = new Yoast_ACF_Analysis_String_Store();

		$default_field_selectors = array(
			// Text.
			'input[type=text][id^=acf]',

			// Textarea.
			'textarea[id^=acf]',

			// Email.
			'input[type=email][id^=acf]',

			// URL.
			'input[type=url][id^=acf]',

			// WYSIWYG.
			'textarea[id^=wysiwyg-acf]',

			// Image.
			'input[type=hidden].acf-image-value',

			// Taxonomy.
			'.acf-taxonomy-field',
		);

		foreach ( $default_field_selectors as $field_selector ) {
			$field_selectors->add( $field_selector );
		}

		return $field_selectors;
	}

	/**
	 * Retrieves the default blacklist.
	 *
	 * @return Yoast_ACF_Analysis_String_Store The blacklist string store.
	 */
	protected function get_blacklist_type() {

		$blacklist = new Yoast_ACF_Analysis_String_Store();

		$default_blacklist = array(
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
		);

		foreach ( $default_blacklist as $type ) {
			$blacklist->add( $type );
		}

		/**
		 * Disable Pro fields for anything but ACF 5 pro.
		 *
		 * - It is not worth supporting the Pro Addons to v4, as Pro users can just switch to v5.
		 * - ACF v5 FREE on the other hand does not support these fields either.
		 */
		if ( ! defined( 'ACF_PRO' ) || ! ACF_PRO ) {

			$blacklist->remove( 'gallery' );
			$blacklist->remove( 'repeater' );
			$blacklist->remove( 'flexible_content' );
		}

		return $blacklist;
	}

	/**
	 * Gets a new string store.
	 *
	 * @return Yoast_ACF_Analysis_String_Store A new blacklist string store.
	 */
	protected function get_blacklist_name() {
		return new Yoast_ACF_Analysis_String_Store();
	}
}
