<?php
/**
 * Uncommon Editorial functions and definitions.
 *
 * @package WordPress
 * @subpackage Uncommon_Editorial
 */

// Adds theme support for post formats.
if ( ! function_exists( 'uncommon_editorial_post_format_setup' ) ) :
	function uncommon_editorial_post_format_setup() {
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
	}
endif;
add_action( 'after_setup_theme', 'uncommon_editorial_post_format_setup' );

// Enqueues editor-style.css in the editors.
if ( ! function_exists( 'uncommon_editorial_editor_style' ) ) :
	function uncommon_editorial_editor_style() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
endif;
add_action( 'after_setup_theme', 'uncommon_editorial_editor_style' );

// Enqueues the theme stylesheet on the front.
if ( ! function_exists( 'uncommon_editorial_enqueue_styles' ) ) :
	function uncommon_editorial_enqueue_styles() {
		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$src    = 'style' . $suffix . '.css';

		wp_enqueue_style(
			'uncommon-editorial-style',
			get_parent_theme_file_uri( $src ),
			array(),
			wp_get_theme()->get( 'Version' )
		);
		wp_style_add_data(
			'uncommon-editorial-style',
			'path',
			get_parent_theme_file_path( $src )
		);

		wp_enqueue_style(
			'uncommon-editorial-furniture',
			get_parent_theme_file_uri( 'assets/css/furniture.css' ),
			array(),
			wp_get_theme()->get( 'Version' )
		);
	}
endif;
add_action( 'wp_enqueue_scripts', 'uncommon_editorial_enqueue_styles' );

// Registers custom block styles.
if ( ! function_exists( 'uncommon_editorial_block_styles' ) ) :
	function uncommon_editorial_block_styles() {
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'uncommon-editorial' ),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
	}
endif;
add_action( 'init', 'uncommon_editorial_block_styles' );

// Registers pattern categories.
if ( ! function_exists( 'uncommon_editorial_pattern_categories' ) ) :
	function uncommon_editorial_pattern_categories() {
		register_block_pattern_category(
			'uncommon_editorial_page',
			array(
				'label'       => __( 'Pages', 'uncommon-editorial' ),
				'description' => __( 'A collection of full page layouts.', 'uncommon-editorial' ),
			)
		);
	}
endif;
add_action( 'init', 'uncommon_editorial_pattern_categories' );

// -----------------------------------------
// CUSTOM BLOCKS
// -----------------------------------------

add_action( 'init', function() {
	foreach ( glob( __DIR__ . '/blocks/*', GLOB_ONLYDIR ) as $dir ) {
		if ( file_exists( $dir . '/block.json' ) ) {
			register_block_type_from_metadata( $dir );
		}
	}
}, 0 );
