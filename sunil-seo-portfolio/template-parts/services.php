<?php
/**
 * Template part for Services Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$services = array(
    array(
        'num'          => '01',
        'title'        => 'Technical SEO',
        'tagline'      => 'Search-Engine-Accessible Architectures',
        'desc'         => 'Comprehensive website structure, crawlability, indexation mechanics, Core Web Vitals performance, canonicalization, and technical error elimination.',
        'deliverables' => array(
            'Crawl Budget & Indexation Optimization',
            'Core Web Vitals & PageSpeed Enhancement',
            'XML Sitemaps, Robots.txt & Canonical Directives',
            'Structured Data & Schema.org Graph Integration',
        ),
    ),
    array(
        'num'          => '02',
        'title'        => 'Keyword Research',
        'tagline'      => 'Uncovering High-Value Intent & Demand',
        'desc'         => 'Strategic keyword discovery based on commercial intent, long-tail revenue opportunities, semantic clusters, and competitor content gap analysis.',
        'deliverables' => array(
            'Search Intent Mapping (Informational & Commercial)',
            'Topical Keyword Clustering & Hierarchy',
            'Competitor Gap & Opportunity Matrix',
            'Long-Tail High-ROI Keyword Targets',
        ),
    ),
    array(
        'num'          => '03',
        'title'        => 'On-Page SEO',
        'tagline'      => 'Precision Relevance & Content Alignment',
        'desc'         => 'Granular optimization of title tags, heading hierarchies, body copy, internal linking graph, image metadata, and search entity signals.',
        'deliverables' => array(
            'CTR-Optimized Title Tags & Meta Descriptions',
            'Semantic H1-H6 Hierarchy & Keyword Placement',
            'Contextual Internal Linking Architecture',
            'Image Compression, Formats & Alt Text',
        ),
    ),
    array(
        'num'          => '04',
        'title'        => 'Content Strategy',
        'tagline'      => 'Topical Authority & Pillar Frameworks',
        'desc'         => 'Architecting user-first content frameworks designed around search demand, entity depth, pillar-cluster models, and sustained organic growth.',
        'deliverables' => array(
            'Topical Authority & Pillar-Cluster Mapping',
            'Data-Backed Content Briefs & Outlines',
            'Content Refresh & Decay Remediation',
            'E-E-A-T Optimization & Readability',
        ),
    ),
    array(
        'num'          => '05',
        'title'        => 'Off-Page SEO',
        'tagline'      => 'Domain Authority & Brand Trust Signals',
        'desc'         => 'Ethical backlink building strategies, digital PR outreach, entity brand mentions, and competitor link profile reverse-engineering.',
        'deliverables' => array(
            'Competitor Backlink Profiling & Gap Analysis',
            'High-Relevance Digital PR & Guest Outreach',
            'Unlinked Brand Mention Reclamation',
            'Entity Signal & Citation Consistency',
        ),
    ),
    array(
        'num'          => '06',
        'title'        => 'SEO Audits',
        'tagline'      => 'Deep Diagnostic Health Check & Roadmap',
        'desc'         => 'Multi-dimensional diagnostic audit uncovering hidden technical roadblocks, on-page gaps, UX friction, and missed organic search opportunities.',
        'deliverables' => array(
            'Comprehensive 100+ Point SEO Health Check',
            'Prioritized Action Matrix (High/Med/Low Impact)',
            'Crawl Error & Redirect Chain Diagnosis',
            'Thin & Duplicate Content Identification',
        ),
    ),
    array(
        'num'          => '07',
        'title'        => 'Local SEO',
        'tagline'      => 'Local Pack Dominance & Regional Reach',
        'desc'         => 'Hyper-targeted optimization for Google Business Profiles, localized landing pages, NAP consistency, and regional search intent.',
        'deliverables' => array(
            'Google Business Profile Setup & Optimization',
            'Local Citation Building & NAP Consistency Check',
            'Localized Schema Markup (LocalBusiness, GeoCoords)',
            'Location-Specific Service Landing Pages',
        ),
    ),
    array(
        'num'          => '08',
        'title'        => 'SEO Analytics & Reporting',
        'tagline'      => 'Data-Driven Visibility & Attribution',
        'desc'         => 'Tracking search engine performance, keyword trajectory, index coverage, Core Web Vitals, and organic conversion attribution.',
        'deliverables' => array(
            'Google Search Console & GA4 Custom Tracking',
            'Keyword Position & SERP Feature Tracking',
            'Organic Conversion Funnel & Goal Attribution',
            'Actionable Monthly Performance Dashboards',
        ),
    ),
);
?>

<section id="services" class="services-section">
    <div class="container">
        <div class="section-header">
            <div class="badge">
                <span>Solutions & Scope</span>
            </div>
            <h2 class="section-title">What I Do</h2>
            <p class="section-subtitle">
                Specialized, end-to-end SEO services engineered to capture qualified search demand, elevate domain authority, and scale revenue.
            </p>
        </div>

        <div class="services-grid">
            <?php foreach ($services as $service) : ?>
                <div class="service-card">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div class="service-icon-wrap">
                                <span>⚡</span>
                            </div>
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">
                                <?php echo esc_html($service['num']); ?>
                            </span>
                        </div>

                        <h3 class="service-title"><?php echo esc_html($service['title']); ?></h3>
                        <p class="service-tagline"><?php echo esc_html($service['tagline']); ?></p>
                        <p class="service-desc"><?php echo esc_html($service['desc']); ?></p>
                    </div>

                    <div>
                        <ul class="service-deliverables">
                            <?php foreach ($service['deliverables'] as $item) : ?>
                                <li class="service-deliverable-item"><?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
