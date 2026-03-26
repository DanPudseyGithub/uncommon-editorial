<?php
$svg_path = get_stylesheet_directory() . '/assets/images/logo.svg';

if ( file_exists( $svg_path ) ) {
    echo '<div class="site-logo">';
    echo file_get_contents( $svg_path );
    echo '</div>';
}