<?php
$svg_path_desktop =
  get_stylesheet_directory() . '/assets/images/header-graphic-desktop.svg';
$svg_path_mobile =
  get_stylesheet_directory() . '/assets/images/header-graphic-mobile.svg';

if (file_exists($svg_path_desktop) && file_exists($svg_path_mobile)) {
  echo '<div class="site-header-graphic">';
  echo '<div class="site-header-graphic__mobile">';
  echo file_get_contents($svg_path_mobile);
  echo '</div>';
  echo '<div class="site-header-graphic__desktop">';
  echo file_get_contents($svg_path_desktop);
  echo '</div>';
  echo '</div>';
}
