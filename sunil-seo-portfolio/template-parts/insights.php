<?php
/**
 * Template part for SEO Insights / Blog Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$insights_query = new WP_Query(array(
    'posts_per_page'      => 3,
    'post_status'         => 'publish',
    'ignore_sticky_posts' => 1,
));
?>

<section id="insights" class="insights-section">
    <div class="container">
        <div class="section-header">
            <div class="badge">
                <span>Written Research</span>
            </div>
            <h2 class="section-title">SEO Insights & Analysis</h2>
            <p class="section-subtitle">
                In-depth technical breakdowns, keyword intent analysis, and structured search methodologies authored by Sunil Kumar Bohara.
            </p>
        </div>

        <div class="posts-grid">
            <?php
            if ($insights_query->have_posts()) :
                while ($insights_query->have_posts()) : $insights_query->the_post();
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

                                <h3 class="post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>

                                <p class="post-excerpt">
                                    <?php echo esc_html(wp_strip_all_tags(get_the_excerpt())); ?>
                                </p>
                            </div>

                            <div>
                                <a href="<?php the_permalink(); ?>" class="post-read-more">
                                    <span>Read Full Insight</span>
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </article>
                <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Graceful Sample Fallbacks for Clean Onboarding
                $sample_posts = array(
                    array(
                        'title'    => 'Mastering Core Web Vitals & INP: How Technical Speed Directly Influences Search Rankings',
                        'category' => 'Core Web Vitals',
                        'date'     => 'Aug 12, 2024',
                        'excerpt'  => 'A technical deep dive into Google\'s Interaction to Next Paint (INP) metric, JavaScript execution bottlenecks, and actionable steps to achieve sub-200ms responsiveness.',
                    ),
                    array(
                        'title'    => 'Beyond Single Keywords: How Semantic Clustering and Search Intent Drive Modern SERP Dominance',
                        'category' => 'Keyword Strategy',
                        'date'     => 'Jul 28, 2024',
                        'excerpt'  => 'Why chasing isolated high-volume keywords fails and how to build structured topical clusters that satisfy informational, commercial, and transactional user intent.',
                    ),
                    array(
                        'title'    => 'Crawl Budget Optimization: Engineering Server Health and Technical Architecture for Large Websites',
                        'category' => 'Technical SEO',
                        'date'     => 'Jun 15, 2024',
                        'excerpt'  => 'Understanding how search bots budget their crawling activity and how to eliminate spider traps, redirect chains, and waste.',
                    ),
                );

                foreach ($sample_posts as $sample) :
                    ?>
                    <article class="post-card">
                        <div class="post-thumb-wrap">
                            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(239,68,68,0.1));">
                                <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--brand-cyan); font-weight: 700;">
                                    <?php echo esc_html(strtoupper($sample['category'])); ?>
                                </span>
                            </div>
                        </div>

                        <div class="post-body">
                            <div>
                                <div class="post-meta">
                                    <span style="color: var(--brand-cyan); font-weight: 600;"><?php echo esc_html($sample['category']); ?></span>
                                    <span>•</span>
                                    <span><?php echo esc_html($sample['date']); ?></span>
                                </div>

                                <h3 class="post-title"><?php echo esc_html($sample['title']); ?></h3>
                                <p class="post-excerpt"><?php echo esc_html($sample['excerpt']); ?></p>
                            </div>

                            <div>
                                <a href="#contact" class="post-read-more">
                                    <span>Publish via WP Admin</span>
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </article>
                    <?php
                endforeach;
            endif;
            ?>
        </div>

        <div style="text-align: center; margin-top: 48px;">
            <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts')) ?: home_url('/?post_type=post')); ?>" class="btn btn-secondary">
                <span>Browse Full Insights Library &rarr;</span>
            </a>
        </div>
    </div>
</section>
