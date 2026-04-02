<?php
$image_id = $attributes['imageId'] ?? 0;
$image_url = $attributes['imageUrl'] ?? '';
$image_alt = $attributes['imageAlt'] ?? '';
$quote = $attributes['quote'] ?? '';
$author = $attributes['author'] ?? '';
$role = $attributes['role'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'testimonial']);
?>
<figure <?php echo $wrapper_attributes; ?>>

	<div class="testimonial__upper">

		<?php if ($image_url): ?>
			<div class="testimonial__image">
				<?php if ($image_id): ?>
					<?php echo wp_get_attachment_image($image_id, 'thumbnail', false, [
       'alt' => $image_alt,
       'class' => 'testimonial__photo',
     ]); ?>
				<?php else: ?>
					<img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr(
  $image_alt,
); ?>" class="testimonial__photo">
				<?php endif; ?>
			</div>
		<?php endif; ?>

		<?php if ($quote): ?>
			<blockquote class="testimonial__quote">"<?php echo wp_kses_post(
     $quote,
   ); ?>"</blockquote>
		<?php endif; ?>

	</div>

	<figcaption class="testimonial__attribution">
		<?php if ($author): ?>
			<p class="testimonial__author"><?php echo wp_kses_post($author); ?></p>
		<?php endif; ?>
		<?php if ($role): ?>
			<cite class="testimonial__role"><?php echo esc_html($role); ?></cite>
		<?php endif; ?>
	</figcaption>

</figure>
