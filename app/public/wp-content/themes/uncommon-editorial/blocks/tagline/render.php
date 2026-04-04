<?php
$intro = $attributes['intro'] ?? '';
$words = $attributes['words'] ?? [];

if (count($words) > 0) {
  $words[] = $words[0]; // duplicate first word for seamless loop
}

$total    = count($words);           // includes duplicate
$actual   = $total - 1;              // real word count
$duration = $actual * 1;
$step     = 100 / $actual;           // equal slot per real word

// Build keyframes: pause at each real word for 75% of its slot, scroll for 25%.
// The duplicate arrives at 99.99% (same transition length as others), then
// instantly resets to 0% at 100% — invisible because both positions show the same word.
$frames = [];
for ($i = 0; $i < $actual; $i++) {
  $start     = round($i * $step, 4);
  $pause_end = round($start + $step * 0.75, 4);
  $y         = round(($i / $total) * 100, 4);
  $frames[]  = "{$start}%,{$pause_end}% { transform: translateY(-{$y}%); }";
}
// Place the duplicate one thousandth of a step before 100% so CSS treats it as a
// distinct frame from the reset. The gap is imperceptible but scales with word count.
$dup_y      = round((($total - 1) / $total) * 100, 4);
$dup_arrive = round(100 - ($step * 0.001), 4);
$frames[]   = "{$dup_arrive}% { transform: translateY(-{$dup_y}%); }";
$frames[]   = "100% { transform: translateY(0%); }";

$uid = 'tagline-' . wp_unique_id();
$keyframes = implode(' ', $frames);
?>

<style>
    @keyframes <?php echo esc_attr($uid); ?> { <?php echo $keyframes; ?> }
</style>

<div class="tagline">
    <span class="tagline__intro"><?php echo esc_html($intro); ?></span>
    <span class="tagline__scroll-container">
        <span class="tagline__words" style="animation: <?php echo esc_attr(
          $uid,
        ); ?> <?php echo esc_attr($duration); ?>s linear infinite">
            <?php foreach ($words as $word): ?>
                <span class="tagline__word"><?php echo esc_html(
                  $word,
                ); ?></span>
            <?php endforeach; ?>
        </span>
    </span>
</div>
