<?php
$image_id    = $attributes['imageId'] ?? 0;
$image_url   = $attributes['imageUrl'] ?? '';
$image_alt   = $attributes['imageAlt'] ?? '';
$name        = $attributes['name'] ?? '';
$role        = $attributes['role'] ?? '';
$description = $attributes['description'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'staff-member' ] );
?>
<div <?php echo $wrapper_attributes; ?>>

	<?php if ( $image_url ) : ?>
		<div class="staff-member__image">
			<?php if ( $image_id ) : ?>
				<?php echo wp_get_attachment_image( $image_id, 'medium', false, [ 'alt' => $image_alt, 'class' => 'staff-member__photo' ] ); ?>
			<?php else : ?>
				<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" class="staff-member__photo">
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="staff-member__info">
		<?php if ( $name ) : ?>
			<h3 class="staff-member__name"><?php echo esc_html( $name ); ?></h3>
		<?php endif; ?>
		<?php if ( $role ) : ?>
			<p class="staff-member__role"><?php echo esc_html( $role ); ?></p>
		<?php endif; ?>
		<?php if ( $description ) : ?>
			<div class="staff-member__description"><?php echo wpautop( str_replace( [ '<br>', '<br/>', '<br />' ], "\n\n", wp_kses_post( $description ) ) ); ?></div>
		<?php endif; ?>
	</div>

</div>
