<?php
$heading = $attributes['heading'] ?? '';
$wrapper_attributes = get_block_wrapper_attributes(['class' => 'testimonials']);
?>
<div <?php echo $wrapper_attributes; ?>>

	<h2 class="testimonials__heading">Testimonials</h2>

	<div class="testimonials__runner">
		<div class="testimonials__grid">
			<?php echo $content; ?>
		</div>
	</div>

	<div class="testimonials__scrollbar-wrapper">
		<div class="testimonials__scrollbar">
			<div class="testimonials__scrollbar-thumb"></div>
		</div>
	</div>

</div>
