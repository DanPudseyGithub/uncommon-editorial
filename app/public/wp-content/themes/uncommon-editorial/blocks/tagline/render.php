<?php
$intro = $attributes['intro'] ?? '';
$words = $attributes['words'] ?? [];

if ( count( $words ) > 0 ) {
    $words[] = $words[0]; // duplicate first word for seamless loop
}

$total    = count( $words );
$duration = $total * 2.5;
$step     = 100 / $total;

// Build keyframes: pause at each word for 75% of its slot, scroll for the remaining 25%
$frames = [];
for ( $i = 0; $i < $total; $i++ ) {
    $start     = round( $i * $step, 4 );
    $pause_end = round( $start + $step * 0.75, 4 );
    $y         = round( ( $i / $total ) * 100, 4 );
    $frames[]  = "{$start}%,{$pause_end}% { transform: translateY(-{$y}%); }";
}
$frames[] = '100% { transform: translateY(-' . round( ( ( $total - 1 ) / $total ) * 100, 4 ) . '%); }';

$uid      = 'tagline-' . wp_unique_id();
$keyframes = implode( ' ', $frames );
?>

<style>
    @keyframes <?php echo esc_attr( $uid ); ?> { <?php echo $keyframes; ?> }
</style>

<div class="tagline">
    <span class="tagline__intro"><?php echo esc_html( $intro ); ?></span>
    <span class="tagline__scroll-container">
        <span class="tagline__words" style="animation: <?php echo esc_attr( $uid ); ?> <?php echo esc_attr( $duration ); ?>s linear infinite">
            <?php foreach ( $words as $word ) : ?>
                <span class="tagline__word"><?php echo esc_html( $word ); ?></span>
            <?php endforeach; ?>
        </span>
    </span>
</div>
