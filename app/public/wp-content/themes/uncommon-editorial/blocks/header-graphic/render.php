<?php
$svg_path = get_stylesheet_directory() . '/assets/images/header-graphic.svg';

if ( file_exists( $svg_path ) ) {
    echo '<div class="site-header-graphic">';
    echo file_get_contents( $svg_path );
    echo '</div>';
}
