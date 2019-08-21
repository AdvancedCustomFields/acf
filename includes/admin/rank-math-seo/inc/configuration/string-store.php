<?php
/**
 * ACF Content Analysis for Yoast SEO plugin file.
 *
 * @package YoastACFAnalysis
 */

/**
 * Class Yoast_ACF_Analysis_String_Store
 *
 * Stores a collection of strings.
 */
class Yoast_ACF_Analysis_String_Store {

	/**
	 * List of stored items.
	 *
	 * @var array
	 */
	protected $items = array();

	/**
	 * Adds an item to the store.
	 *
	 * @param string $item Item to add.
	 *
	 * @return bool True if the item was added, False if it failed.
	 */
	public function add( $item ) {
		if ( ! is_string( $item ) ) {
			return false;
		}

		if ( ! in_array( $item, $this->items, true ) ) {
			$this->items[] = $item;
			sort( $this->items );
		}

		return true;
	}

	/**
	 * Removes an item from the store.
	 *
	 * @param string $item Item to remove from the store.
	 *
	 * @return bool True if the item was removed, false if it failed.
	 */
	public function remove( $item ) {
		if ( ! is_string( $item ) ) {
			return false;
		}

		if ( ! in_array( $item, $this->items, true ) ) {
			return false;
		}

		$items       = array_diff( $this->items, array( $item ) );
		$this->items = array_values( $items );
		sort( $this->items );

		return true;
	}

	/**
	 * Returns the list as array.
	 *
	 * @return array List of items in the store.
	 */
	public function to_array() {
		return $this->items;
	}
}
