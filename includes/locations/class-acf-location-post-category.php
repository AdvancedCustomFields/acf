<?php 

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if( ! class_exists('ACF_Location_Post_Category') ) :

class ACF_Location_Post_Category extends ACF_Location {
	
	/**
	 * Initializes props.
	 *
	 * @date	5/03/2014
	 * @since	5.0.0
	 *
	 * @param	void
	 * @return	void
	 */
	public function initialize() {
		$this->name = 'post_category';
		$this->label = __( "Post Category", 'acf' );
		$this->category = 'post';
    	$this->object_type = 'post';
	}
	
	/**
	 * Matches the provided rule against the screen args returning a bool result.
	 *
	 * @date	9/4/20
	 * @since	5.9.0
	 *
	 * @param	array $rule The location rule.
	 * @param	array $screen The screen args.
	 * @param	array $field_group The field group settings.
	 * @return	bool
	 */
	public function match( $rule, $screen, $field_group ) {
		return acf_get_location_type( 'post_taxonomy' )->match( $rule, $screen, $field_group );
	}
	
	/**
	 * Returns an array of possible values for this rule type.
	 *
	 * @date	9/4/20
	 * @since	5.9.0
	 *
	 * @param	array $rule A location rule.
	 * @return	array
	 */
	public function get_values( $rule ) {
		
		// Get grouped terms.
		$groups = acf_get_grouped_terms(array(
			'taxonomy' => array( 'category' )
		));
		
		// Convert grouped terms into grouped choices.
		$grouped_choices = acf_get_choices_from_grouped_terms( $groups, 'slug' );
		
		// Return first group.
		return reset( $grouped_choices );
	}
	
	/**
	 * Returns the object_subtype connected to this location.
	 *
	 * @date	1/4/20
	 * @since	5.9.0
	 *
	 * @param	array $rule A location rule.
	 * @return	string|array
	 */
	public function get_object_subtype( $rule ) {
		return acf_get_location_type( 'post_taxonomy' )->get_object_subtype( $rule );
	}
}

// initialize
acf_register_location_rule( 'ACF_Location_Post_Category' );

endif; // class_exists check
