<?php
$heading = $attributes['heading'] ?? '';
$subheading = $attributes['subheading'] ?? '';
$shortcode = $attributes['shortcode'] ?? '';
$wrapper_attributes = get_block_wrapper_attributes(['class' => 'contact-form']);
?>
<div <?php echo $wrapper_attributes; ?>>

	<?php if ($heading): ?>
		<h2 class="contact-form__heading"><?php echo esc_html($heading); ?></h2>
	<?php endif; ?>

	<?php if ($subheading): ?>
		<div class="contact-form__subheading"><?php echo wp_kses_post( wpautop( $subheading ) ); ?></div>
	<?php endif; ?>

	<?php if ($shortcode): ?>
		<div class="contact-form__form">
			<?php echo do_shortcode($shortcode); ?>
		</div>
	<?php endif; ?>

</div>
