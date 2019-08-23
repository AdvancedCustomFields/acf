<?php
/**
 * Class RankMath_ACF_Analysis_Registry
 */
class RankMath_ACF_Analysis_Registry {

	/**
	 * Registry storage array
	 *
	 * @var array
	 */
	private $storage = [];

	/**
	 * Adds an item to the registry.
	 *
	 * @param string|int $id   Registry index.
	 * @param mixed      $item Item to store in the registry.
	 */
	public function add( $id, $item ) {
		$this->storage[ $id ] = $item;
	}

	/**
	 * Retrieves an item from the registry.
	 *
	 * @param string|int $id Registry index.
	 *
	 * @return object|null Object if a class is registered for the ID, otherwise null.
	 */
	public function get( $id ) {
		return array_key_exists( $id, $this->storage ) ? $this->storage[ $id ] : null;
	}
}
