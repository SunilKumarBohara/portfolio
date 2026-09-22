<?php
/**
 * Single Post Template for SEO Insights & Articles
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <?php while (have_posts()) : the_post();
        $categories = get_the_category();
        $cat_name = !empty($categories) ? $categories[0]->name : 'SEO Strategy';
    ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="single-post-header">
                <div class="container">
                    <div class="single-post-meta">
                        <span class="badge" style="box-shadow: none;"><?php echo esc_html($cat_name); ?></span>
                        <span>•</span>
                        <span><?php echo get_the_date('F j, Y'); ?></span>
                        <span>•</span>
                        <span>By <?php the_author(); ?></span>
                    </div>

                    <h1 class="single-post-title"><?php the_title(); ?></h1>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="container">
                    <div class="single-post-featured-img">
                        <?php the_post_thumbnail('skb-featured', array('alt' => the_title_attribute(array('echo' => false)))); ?>
                    </div>
                </div>
            <?php endif; ?>

            <div class="container">
                <div class="single-post-body">
                    <?php the_content(); ?>

                    <!-- Tags List -->
                    <?php
                    $tags = get_the_tags();
                    if ($tags) :
                    ?>
                        <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-color); display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Tags:</span>
                            <?php foreach ($tags as $tag) : ?>
                                <a href="<?php echo esc_url(get_tag_link($tag->term_id)); ?>" class="project-tag">
                                    #<?php echo esc_html($tag->name); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <!-- Author Bio Box -->
                    <div style="margin-top: 48px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 28px; display: flex; gap: 20px; align-items: center; box-shadow: var(--glass-shadow);">
                        <div class="brand-avatar" style="width: 56px; height: 56px;">
                            <div class="brand-avatar-inner" style="font-size: 1.1rem;">SKB</div>
                        </div>
                        <div>
                            <h4 style="font-size: 1.1rem; margin-bottom: 4px;">Sunil Kumar Bohara</h4>
                            <p style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; color: var(--brand-cyan); margin-bottom: 6px;">
                                SEO Executive · Nepal
                            </p>
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                                Specializing in Technical SEO, Core Web Vitals, Crawlability, and Modern Search Engine Optimization.
                            </p>
                        </div>
                    </div>

                    <!-- Post Navigation -->
                    <div style="margin-top: 40px; display: flex; justify-content: space-between; gap: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
                        <div>
                            <?php previous_post_link('&larr; %link', 'Previous Article'); ?>
                        </div>
                        <div>
                            <?php next_post_link('%link &rarr;', 'Next Article'); ?>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    <?php endwhile; ?>
</main>

<?php
get_footer();
