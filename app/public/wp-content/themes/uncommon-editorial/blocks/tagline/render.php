<?php
$intro = $attributes['intro'] ?? '';
$words = $attributes['words'] ?? [];

if (count($words) > 0) {
  $words[] = $words[0]; // duplicate first word for smooth looping
}
?>

<div class="tagline">
    <span class="intro"><?php echo esc_html($intro); ?></span>
    <span class="scroll-container">
        <span class="words">
            <?php foreach ($words as $word): ?>
                <span class="word"><?php echo esc_html($word); ?></span>
            <?php endforeach; ?>
        </span>
    </span>
</div>