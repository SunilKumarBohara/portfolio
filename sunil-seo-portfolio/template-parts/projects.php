<?php
/**
 * Template part for Projects / Case Studies Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$projects = array(
    array(
        'title'        => 'Global SaaS Platform — Technical & Topical SEO Growth',
        'category'     => 'Technical SEO & Topical Authority',
        'industry'     => 'B2B Software / Cloud Services',
        'problem'      => 'The platform experienced flatlined organic traffic due to unoptimized JS rendering, messy URL parameters causing duplicate content, and disjointed product pages lacking topical depth.',
        'strategy'     => 'Restructured crawl architecture, eliminated parameterized duplicate indexation with canonical directives, and built 6 topical content hubs targeting high-intent software buyers.',
        'deliverables' => array(
            'Resolved 120+ indexation anomalies & parameterized URL duplicates in Google Search Console',
            'Created structured Schema.org SoftwareApplication and Breadcrumb graph across all core pages',
            'Mapped keyword search intent across 4 distinct customer buyer journeys',
            'Optimized Core Web Vitals to achieve all-green scores (LCP < 1.8s, CLS < 0.05)',
        ),
        'tools'        => array('Google Search Console', 'Screaming Frog', 'SEMrush', 'Schema.org', 'Next.js'),
    ),
    array(
        'title'        => 'E-Commerce Store — Multi-Category On-Page & Faceted Crawl Fix',
        'category'     => 'E-Commerce SEO & Hierarchy',
        'industry'     => 'Retail & Consumer Electronics',
        'problem'      => 'Faceted navigation generated 25,000+ thin filter URLs, wasting crawl budget and cannibalizing primary category rankings.',
        'strategy'     => 'Engineered a noindex/canonical filter governance system, consolidated variant product titles, and enriched parent category descriptions with semantic entity keywords.',
        'deliverables' => array(
            'Configured robots.txt directives and canonical links to stop faceted URL bloat',
            'Implemented Product & AggregateRating JSON-LD schema across 1,500+ SKUs',
            'Conducted extensive commercial search intent keyword mapping',
            'Boosted category page loading speed by 42% through responsive image optimization',
        ),
        'tools'        => array('Ahrefs', 'Google Analytics 4', 'PageSpeed Insights', 'HTML/CSS', 'JSON-LD'),
    ),
    array(
        'title'        => 'Regional Service Enterprise — Local SEO & Map Pack Optimization',
        'category'     => 'Local SEO & Geo-Targeting',
        'industry'     => 'Healthcare / Professional Services',
        'problem'      => 'Inconsistent NAP data across directories, neglected Google Business Profile, and zero localized service landing pages resulted in low local discovery.',
        'strategy'     => 'Audited citations, restructured GBP categories with local keyword anchors, generated city-specific service pages, and set up a systematic customer review process.',
        'deliverables' => array(
            'Cleaned up 40+ directory citations for 100% NAP consistency',
            'Authored localized landing pages with GeoCoordinates and LocalBusiness schema',
            'Established localized internal linking architecture',
            'Optimized Google Business Profile images, posts, and Q&A section',
        ),
        'tools'        => array('Google Business Profile', 'Google Maps', 'Local Schema', 'Google Search Console'),
    ),
    array(
        'title'        => 'Content Publisher — Decay Audit & Pillar-Cluster Restructure',
        'category'     => 'Content Strategy & Decay Remediation',
        'industry'     => 'Digital Media / Educational Blog',
        'problem'      => 'A library of 300+ legacy articles suffered from content decay, internal link voids, and declining organic impressions following recent search engine updates.',
        'strategy'     => 'Executed a comprehensive content audit, pruned obsolete articles, merged thin overlapping posts into high-authority pillar guides, and updated statistics.',
        'deliverables' => array(
            'Audited 300+ URLs classifying into Keep, Update, Merge, or 301 Redirect',
            'Built 4 comprehensive pillar articles with supporting topic clusters',
            'Implemented descriptive contextual anchor links across all published posts',
            'Standardized E-E-A-T author bios and editorial review credentials',
        ),
        'tools'        => array('Google Search Console', 'Google Trends', 'SEMrush', 'Looker Studio'),
    ),
);
?>

<section id="projects" class="projects-section">
    <div class="container">
        <div class="section-header">
            <div class="badge">
                <span>Case Blueprints</span>
            </div>
            <h2 class="section-title">Selected Case Studies</h2>
            <p class="section-subtitle">
                Real-world SEO frameworks, technical crawl resolutions, and search visibility strategies engineered for sustainable growth.
            </p>
        </div>

        <div class="projects-grid">
            <?php foreach ($projects as $project) : ?>
                <div class="project-card">
                    <div>
                        <div class="project-meta-bar">
                            <span class="badge" style="box-shadow: none; font-size: 0.7rem;">
                                <?php echo esc_html($project['category']); ?>
                            </span>
                            <span style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">
                                <?php echo esc_html($project['industry']); ?>
                            </span>
                        </div>

                        <h3 class="project-title"><?php echo esc_html($project['title']); ?></h3>

                        <div class="project-block">
                            <span class="project-block-title">The Challenge</span>
                            <p class="project-block-text"><?php echo esc_html($project['problem']); ?></p>
                        </div>

                        <div class="project-block" style="border-color: rgba(59,130,246,0.3); background-color: rgba(59,130,246,0.04);">
                            <span class="project-block-title" style="color: var(--brand-blue);">The SEO Strategy</span>
                            <p class="project-block-text"><?php echo esc_html($project['strategy']); ?></p>
                        </div>

                        <div style="margin-top: 16px;">
                            <span style="font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; color: var(--text-muted); display: block; margin-bottom: 8px;">
                                Completed Execution Milestones:
                            </span>
                            <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
                                <?php foreach ($project['deliverables'] as $item) : ?>
                                    <li style="font-size: 0.8rem; color: var(--text-secondary); display: flex; gap: 8px; align-items: flex-start;">
                                        <span style="color: var(--brand-cyan); font-weight: bold;">•</span>
                                        <span><?php echo esc_html($item); ?></span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>

                    <div class="project-tags">
                        <?php foreach ($project['tools'] as $tool) : ?>
                            <span class="project-tag"><?php echo esc_html($tool); ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
