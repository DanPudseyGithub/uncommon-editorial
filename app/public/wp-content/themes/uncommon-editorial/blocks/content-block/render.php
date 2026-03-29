<?php
$heading = $attributes['heading'] ?? '';
$body = $attributes['body'] ?? '';
$items = $attributes['items'] ?? [];
$theme = $attributes['theme'] ?? 'theme-1';

$wrapper_attributes = get_block_wrapper_attributes([
  'class' => 'content-block ' . esc_attr($theme),
]);
?>
<div <?php echo $wrapper_attributes; ?>>

	<?php if ($heading): ?>
		<header class="content-block__header">
			<h2 class="content-block__heading"><?php echo esc_html($heading); ?></h2>
  		</header>
	<?php endif; ?>

	<div class="content-block__content-wrapper">
		<?php if ($body): ?>
				<div class="content-block__body"><?php echo wpautop(
      str_replace(['<br>', '<br/>', '<br />'], "\n\n", wp_kses_post($body)),
    ); ?></div>
		<?php endif; ?>

		<?php if (!empty($items)): ?>
			<p><b>Our services include</b></p>
			<ul class="content-block__items">
				<?php foreach ($items as $item): ?>
					<li class="content-block__item"><?php echo esc_html($item); ?></li>
				<?php endforeach; ?>
				</ul>
		<?php endif; ?>
	</div>
</div>
