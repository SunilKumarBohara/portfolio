<?php
/**
 * Standard Page Template
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <?php while (have_posts()) : the_post(); ?>
        <article id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="single-post-header">
                <div class="container">
                    <h1 class="single-post-title"><?php the_title(); ?></h1>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="container">
                    <div class="single-post-featured-img">
                        <?php the_post_thumbnail('skb-featured'); ?>
                    </div>
                </div>
            <?php endif; ?>

            <div class="container">
                <div class="single-post-body">
                    <?php the_content(); ?>
                </div>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php
get_footer();
