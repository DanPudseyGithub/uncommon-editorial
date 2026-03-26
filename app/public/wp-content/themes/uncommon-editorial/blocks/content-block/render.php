<?php
$heading = $attributes['heading'] ?? '';
$body    = $attributes['body'] ?? '';
$items   = $attributes['items'] ?? [];
$theme   = $attributes['theme'] ?? 'theme-1';

$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'content-block ' . esc_attr( $theme ) ] );
?>
<div <?php echo $wrapper_attributes; ?>>

	<?php if ( $heading ) : ?>
		<h2 class="content-block__heading"><?php echo esc_html( $heading ); ?></h2>
	<?php endif; ?>

	<?php if ( $body ) : ?>
		<div class="content-block__body"><?php echo wp_kses_post( $body ); ?></div>
	<?php endif; ?>

	<?php if ( ! empty( $items ) ) : ?>
		<div class="content-block__items">
			<?php foreach ( $items as $item ) : ?>
				<div class="content-block__item"><?php echo esc_html( $item ); ?></div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>

</div>
