<?php
/**
 * Template part for Skills Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$skill_categories = array(
    array(
        'title' => 'Search Engine Optimization',
        'desc'  => 'Core pillars of organic search visibility and search engine mechanics',
        'skills' => array(
            array('name' => 'Technical SEO', 'focus' => 'Crawlability, Indexing, Sitemaps, Canonicalization & Core Web Vitals'),
            array('name' => 'Keyword Research', 'focus' => 'Search Intent Mapping, Search Volume, Keyword Difficulty & Gaps'),
            array('name' => 'On-Page SEO', 'focus' => 'Title Tags, Meta Descriptions, Semantic H1-H6, Content Tuning'),
            array('name' => 'Off-Page SEO', 'focus' => 'Ethical Link Building, Digital PR, Authority Signals & Mentions'),
            array('name' => 'Content SEO', 'focus' => 'Topical Clustering, Pillar Pages, E-E-A-T & Readability'),
            array('name' => 'Local SEO', 'focus' => 'Google Business Profile, Local Citations, NAP Consistency'),
            array('name' => 'SEO Auditing', 'focus' => 'Full-Site Diagnostics, Broken Links, Redirect Chains & Hierarchy'),
            array('name' => 'Internal Linking', 'focus' => 'PageRank Flow, Contextual Anchor Text & Silo Architecture'),
        ),
    ),
    array(
        'title' => 'Analytics & SEO Platforms',
        'desc'  => 'Platforms used for data extraction, ranking tracking, and performance diagnostics',
        'skills' => array(
            array('name' => 'Google Search Console', 'focus' => 'Index Coverage, Query Analysis, Sitemaps & Enhancements'),
            array('name' => 'Google Analytics 4', 'focus' => 'Traffic Acquisition, User Behavior, Events & Conversion Paths'),
            array('name' => 'Competitor Analysis', 'focus' => 'SERP Dominance, Keyword Overlap & Content Gaps'),
            array('name' => 'Keyword Analysis', 'focus' => 'Long-Tail Discovery, Commercial Intent & SERP Features'),
            array('name' => 'Website Optimization', 'focus' => 'PageSpeed, Image Compression, Asset Minification & UX'),
        ),
    ),
    array(
        'title' => 'Web Technologies & Development',
        'desc'  => 'Technical foundation for SEO-first development and code-level optimization',
        'skills' => array(
            array('name' => 'HTML5', 'focus' => 'Semantic Markup, Meta Directives, OpenGraph & Schema.org'),
            array('name' => 'CSS3 / Modern CSS', 'focus' => 'Responsive Layouts, Critical CSS & Layout Shift (CLS) Prevention'),
            array('name' => 'JavaScript', 'focus' => 'DOM Optimization, Asynchronous Scripts & Client-Side SEO'),
            array('name' => 'PHP', 'focus' => 'Server-side Rendering, Dynamic Meta Generation & CMS Architecture'),
            array('name' => 'MySQL', 'focus' => 'Database Query Efficiency, CMS Data Structure & Speed Optimization'),
        ),
    ),
);
?>

<section id="skills" class="skills-section">
    <div class="container">
        <div class="section-header">
            <div class="badge">
                <span>Capabilities & Code</span>
            </div>
            <h2 class="section-title">Skills & Proficiencies</h2>
            <p class="section-subtitle">
                A structured breakdown of search engine optimization disciplines, analytical platforms, and foundational web engineering technologies.
            </p>
        </div>

        <div class="skills-container-grid">
            <?php foreach ($skill_categories as $cat) : ?>
                <div class="skill-category-card">
                    <h3 class="skill-cat-title"><?php echo esc_html($cat['title']); ?></h3>
                    <p class="skill-cat-desc"><?php echo esc_html($cat['desc']); ?></p>

                    <div class="skill-pills">
                        <?php foreach ($cat['skills'] as $skill) : ?>
                            <div class="skill-pill">
                                <span class="skill-name"><?php echo esc_html($skill['name']); ?></span>
                                <span class="skill-focus"><?php echo esc_html($skill['focus']); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- Technical Assurance Callout -->
        <div style="margin-top: 48px; background-color: var(--bg-card); border: 1px solid var(--border-color); border-radius: 20px; padding: 24px 30px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start; box-shadow: var(--glass-shadow);">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.5rem;">⚙️</span>
                <div>
                    <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">SEO & Web Development Synergy</h4>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 2px;">
                        Equipped to audit, diagnose, and directly execute fixes in code without handing off ambiguous requests to third-party engineers.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
