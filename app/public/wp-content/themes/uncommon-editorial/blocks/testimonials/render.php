<?php
$heading            = $attributes['heading'] ?? '';
$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'testimonials' ] );
?>
<div <?php echo $wrapper_attributes; ?>>

	<?php if ( $heading ) : ?>
		<h2 class="testimonials__heading"><?php echo esc_html( $heading ); ?></h2>
	<?php endif; ?>

	<div class="testimonials__grid">
		<?php echo $content; ?>
	</div>

</div>
