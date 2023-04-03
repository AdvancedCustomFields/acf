<?php
global $title, $post_new_file, $post_type_object, $post;
$acf_title_placeholder = apply_filters( 'enter_title_here', __( 'Add title' ), $post );
$acf_post_type         = is_object( $post_type_object ) ? $post_type_object->name : '';
$acf_publish_btn_name  = 'save';

if ( 'publish' !== $post->post_status ) {
	$acf_publish_btn_name = 'publish';
}
?>
<div class="acf-headerbar acf-headerbar-field-editor">
	<div class="acf-headerbar-inner">

		<div class="acf-headerbar-content">
			<h1 class="acf-page-title">
			<?php
			echo esc_html( $title );
			?>
			</h1>
			<?php if ( 'acf-field-group' === $acf_post_type ) : ?>
			<div class="acf-title-wrap">
				<label class="screen-reader-text" id="title-prompt-text" for="title"><?php echo $acf_title_placeholder; ?></label>
				<input form="post" type="text" name="post_title" size="30" value="<?php echo esc_attr( $post->post_title ); ?>" id="title" class="acf-headerbar-title-field" spellcheck="true" autocomplete="off" placeholder="<?php esc_attr_e( 'Field Group Title', 'acf' ); ?>" />
			</div>
			<?php endif; ?>
		</div>

		<div class="acf-headerbar-actions" id="submitpost">
			<?php if ( 'acf-field-group' === $acf_post_type ) : ?>
				<a href="#" class="acf-btn acf-btn-secondary add-field">
					<i class="acf-icon acf-icon-plus"></i>
					<?php esc_html_e( 'Add Field', 'acf' ); ?>
				</a>
			<?php endif; ?>
			<button form="post" class="acf-btn acf-publish" name="<?php echo esc_attr( $acf_publish_btn_name ); ?>" type="submit">
				<?php esc_html_e( 'Save Changes', 'acf' ); ?>
			</button>
		</div>

	</div>
</div>
