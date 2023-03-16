<?php

global $acf_taxonomy;

acf_render_field_wrap(
	array(
		'label'       => __( 'Plural Label', 'acf' ),
		/* translators: example taxonomy */
		'placeholder' => __( 'Genres', 'acf' ),
		'type'        => 'text',
		'key'         => 'name',
		'name'        => 'name',
		'class'       => 'acf_plural_label',
		'prefix'      => 'acf_taxonomy[labels]',
		'value'       => $acf_taxonomy['labels']['name'],
		'required'    => 1,
	),
	'div',
	'field'
);

acf_render_field_wrap(
	array(
		'label'       => __( 'Singular Label', 'acf' ),
		/* translators: example taxonomy */
		'placeholder' => __( 'Genre', 'acf' ),
		'type'        => 'text',
		'key'         => 'singular_name',
		'name'        => 'singular_name',
		'class'       => 'acf_slugify_to_key acf_singular_label',
		'prefix'      => 'acf_taxonomy[labels]',
		'value'       => $acf_taxonomy['labels']['singular_name'],
		'required'    => 1,
	),
	'div',
	'field'
);

acf_render_field_wrap(
	array(
		'label'        => __( 'Taxonomy Key', 'acf' ),
		'instructions' => __( 'Lower case letters, underscores and dashes only, Max 20 characters.', 'acf' ),
		/* translators: example taxonomy */
		'placeholder'  => __( 'genre', 'acf' ),
		'type'         => 'text',
		'key'          => 'taxonomy',
		'name'         => 'taxonomy',
		'maxlength'    => 20,
		'class'        => 'acf_slugified_key',
		'prefix'       => 'acf_taxonomy',
		'value'        => $acf_taxonomy['taxonomy'],
		'required'     => 1,
	),
	'div',
	'field'
);

// Allow preselecting the linked post types based on previously created post type.
$acf_use_post_type = acf_request_arg( 'use_post_type', false );
if ( $acf_use_post_type && wp_verify_nonce( acf_request_arg( '_wpnonce' ), 'create-taxonomy-' . $acf_use_post_type ) ) {
	$acf_linked_post_type = acf_get_internal_post_type( (int) $acf_use_post_type, 'acf-post-type' );

	if ( $acf_linked_post_type && isset( $acf_linked_post_type['post_type'] ) ) {
		$acf_taxonomy['object_type'] = array( $acf_linked_post_type['post_type'] );
	}
}

acf_render_field_wrap(
	array(
		'label'        => __( 'Post Types', 'acf' ),
		'type'         => 'select',
		'name'         => 'object_type',
		'prefix'       => 'acf_taxonomy',
		'value'        => $acf_taxonomy['object_type'],
		'choices'      => acf_get_pretty_post_types(),
		'multiple'     => 1,
		'ui'           => 1,
		'allow_null'   => 1,
		'instructions' => __( 'One or many post types that can be classified with this taxonomy.', 'acf' ),
	),
	'div',
	'field'
);

acf_render_field_wrap( array( 'type' => 'seperator' ) );

acf_render_field_wrap(
	array(
		'type'         => 'true_false',
		'key'          => 'public',
		'name'         => 'public',
		'prefix'       => 'acf_taxonomy',
		'value'        => $acf_taxonomy['public'],
		'label'        => __( 'Public', 'acf' ),
		'instructions' => __( 'Makes a taxonomy visible on the frontend and in the admin dashboard.', 'acf' ),
		'ui'           => true,
		'default'      => 1,
	)
);

acf_render_field_wrap(
	array(
		'type'         => 'true_false',
		'key'          => 'hierarchical',
		'name'         => 'hierarchical',
		'class'        => 'acf_hierarchical_switch',
		'prefix'       => 'acf_taxonomy',
		'value'        => $acf_taxonomy['hierarchical'],
		'label'        => __( 'Hierarchical', 'acf' ),
		'instructions' => __( 'Hierarchical taxonomies can have descendants (like categories).', 'acf' ),
		'ui'           => true,
	),
	'div'
);

do_action( 'acf/taxonomy/basic_settings', $acf_taxonomy );

acf_render_field_wrap( array( 'type' => 'seperator' ) );

acf_render_field_wrap(
	array(
		'label'        => __( 'Advanced Configuration', 'acf' ),
		'instructions' => __( 'I know what I\'m doing, show me all the options.', 'acf' ),
		'type'         => 'true_false',
		'key'          => 'advanced_configuration',
		'name'         => 'advanced_configuration',
		'prefix'       => 'acf_taxonomy',
		'value'        => $acf_taxonomy['advanced_configuration'],
		'ui'           => 1,
		'class'        => 'acf-advanced-settings-toggle',
	)
);

?>
	<div class="acf-hidden">
		<input type="hidden" name="acf_taxonomy[key]" value="<?php echo esc_attr( $acf_taxonomy['key'] ); ?>" />
		<input type="hidden" name="acf_taxonomy[import_source]" value="<?php echo esc_attr( $acf_taxonomy['import_source'] ); ?>" />
		<input type="hidden" name="acf_taxonomy[import_date]" value="<?php echo esc_attr( $acf_taxonomy['import_date'] ); ?>" />
	</div>
<?php
