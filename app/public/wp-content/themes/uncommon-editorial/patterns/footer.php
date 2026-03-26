<?php
/**
 * Title: Footer
 * Slug: uncommon-editorial/footer
 * Categories: footer
 * Block Types: core/template-part/footer
 * Description: Footer with heading, subheading, contact form and copyright.
 *
 * @package WordPress
 * @subpackage Uncommon_Editorial
 */
?>
<!-- wp:group {"tagName":"footer","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|50"}}},"layout":{"type":"constrained"}} -->
<footer class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--50)">

	<!-- wp:heading {"level":2} -->
	<h2 class="wp-block-heading"><?php esc_html_e( 'Footer Header', 'uncommon-editorial' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph -->
	<p><?php esc_html_e( 'Subheading text goes here.', 'uncommon-editorial' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:shortcode -->
	[contact-form-7 id="" title="Contact Form"]
	<!-- /wp:shortcode -->

	<!-- wp:paragraph {"fontSize":"small"} -->
	<p class="has-small-font-size">&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php esc_html_e( 'Uncommon Editorial. All rights reserved.', 'uncommon-editorial' ); ?></p>
	<!-- /wp:paragraph -->

</footer>
<!-- /wp:group -->
