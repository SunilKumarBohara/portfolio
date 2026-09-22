<?php
/**
 * Main Template File (Blog Index / Fallback)
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main" style="padding-top: 120px; padding-bottom: 80px;">
    <div class="container">
        <div class="section-header text-left" style="margin-bottom: 40px;">
            <div class="badge">
                <span>SEO Blog & Research</span>
            </div>
            <h1 class="section-title">Latest SEO Insights</h1>
            <p class="section-subtitle" style="margin-left: 0;">
                Actionable search engine optimization articles, algorithmic updates, and technical guides.
            </p>
        </div>

        <?php if (have_posts()) : ?>
            <div class="posts-grid">
                <?php
                while (have_posts()) : the_post();
                    $categories = get_the_category();
                    $category_name = !empty($categories) ? $categories[0]->name : 'SEO Strategy';
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>
                        <div class="post-thumb-wrap">
                            <?php if (has_post_thumbnail()) : ?>
                                <?php the_post_thumbnail('skb-thumb', array('alt' => the_title_attribute(array('echo' => false)))); ?>
                            <?php else : ?>
                                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(239,68,68,0.1));">
                                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--brand-cyan); font-weight: 700;">
                                        SEO INSIGHT
                                    </span>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="post-body">
                            <div>
                                <div class="post-meta">
                                    <span style="color: var(--brand-cyan); font-weight: 600;"><?php echo esc_html($category_name); ?></span>
                                    <span>•</span>
                                    <span><?php echo get_the_date('M j, Y'); ?></span>
                                </div>

                                <h2 class="post-title" style="font-size: 1.15rem;">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h2>

                                <p class="post-excerpt">
                                    <?php echo esc_html(wp_strip_all_tags(get_the_excerpt())); ?>
                                </p>
                            </div>

                            <div>
                                <a href="<?php the_permalink(); ?>" class="post-read-more">
                                    <span>Read Full Article</span>
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Pagination -->
            <div style="margin-top: 48px; display: flex; justify-content: center; gap: 8px;">
                <?php
                the_posts_pagination(array(
                    'prev_text' => esc_html__('&larr; Previous', 'sunil-seo-portfolio'),
                    'next_text' => esc_html__('Next &rarr;', 'sunil-seo-portfolio'),
                ));
                ?>
            </div>

        <?php else : ?>
            <div class="about-card" style="text-align: center; padding: 60px 20px;">
                <h3>No articles found</h3>
                <p style="color: var(--text-secondary); margin-top: 10px;">
                    Publish your first SEO insight in WordPress Admin &gt; Posts &gt; Add New.
                </p>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
