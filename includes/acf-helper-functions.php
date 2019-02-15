<?php 

/**
 * acf_uniqid
 *
 * Returns a unique numeric based id.
 *
 * @date	9/1/19
 * @since	5.7.10
 *
 * @param	string $prefix The id prefix. Defaults to 'acf'.
 * @return	string
 */
function acf_uniqid( $prefix = 'acf' ) {
	
	// Instantiate global counter.
	global $acf_uniqid;
	if( !isset($acf_uniqid) ) {
		$acf_uniqid = 1;
	}
	
	// Return id.
	return $prefix . '-' . $acf_uniqid++;
}

/**
 * acf_merge_attributes
 *
 * Merges together two arrays but with extra functionality to append class names.
 *
 * @date	22/1/19
 * @since	5.7.10
 *
 * @param	array $array1 An array of attributes.
 * @param	array $array2 An array of attributes.
 * @return	array
 */
function acf_merge_attributes( $array1, $array2 ) {
	
	// Merge together attributes.
	$array3 = array_merge( $array1, $array2 );
	
	// Append together special attributes.
	foreach( array('class', 'style') as $key ) {
		if( isset($array1[$key]) && isset($array2[$key]) ) {
			$array3[$key] = trim($array1[$key]) . ' ' . trim($array2[$key]);
		}
	}
	
	// Return
	return $array3;
}

/**
 * acf_cache_key
 *
 * Returns a filtered cache key.
 *
 * @date	25/1/19
 * @since	5.7.11
 *
 * @param	string $key The cache key.
 * @return	string
 */
function acf_cache_key( $key = '' ) {
	
	/**
	 * Filters the cache key.
	 *
	 * @date	25/1/19
	 * @since	5.7.11
	 *
	 * @param	string $key The cache key.
	 * @param	string $original_key The original cache key.
	 */
	return apply_filters( "acf/get_cache_key", $key, $key );
}
