<?php
/**
 * Template part for Hero Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$hero_image    = get_theme_mod('skb_hero_image', '');
$hero_title    = get_theme_mod('skb_hero_title', 'Sunil Kumar Bohara');
$hero_subtitle = get_theme_mod('skb_hero_subtitle', 'SEO Executive · Nepal');
$hero_desc     = get_theme_mod(
    'skb_hero_desc',
    'Specializing in Technical SEO, Search Intent Modeling, Content Architecture, and Modern Web Optimization to build sustainable organic search visibility and revenue.'
);

if (empty($hero_image)) {
    $hero_image = get_template_directory_uri() . '/assets/images/hero-placeholder.svg';
}
?>

<section id="hero" class="hero-section">
    <!-- Ambient Background Glows -->
    <div class="hero-glow-1"></div>
    <div class="hero-glow-2"></div>

    <div class="container">
        <div class="hero-grid">
            <!-- Left: Hero Text Content & CTAs -->
            <div class="hero-content">
                <div class="badge">
                    <span class="badge-dot"></span>
                    <span>Available for SEO Consultations</span>
                </div>

                <h1 class="hero-title">
                    <span class="hero-title-gradient"><?php echo esc_html($hero_title); ?></span>
                </h1>

                <p class="hero-subtitle">
                    <?php echo esc_html($hero_subtitle); ?>
                </p>

                <p class="hero-description">
                    <?php echo esc_html($hero_desc); ?>
                </p>

                <div class="hero-ctas">
                    <a href="#projects" class="btn btn-primary">
                        <span>Explore My Work</span>
                        <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a href="#contact" class="btn btn-secondary">
                        <span>Contact Me</span>
                    </a>
                </div>

                <!-- Verified Key Performance Indicators -->
                <div class="hero-stats">
                    <div class="hero-stat-item">
                        <span class="hero-stat-val">8+</span>
                        <span class="hero-stat-lbl">Core Disciplines</span>
                    </div>
                    <div class="hero-stat-item">
                        <span class="hero-stat-val">100%</span>
                        <span class="hero-stat-lbl">White-Hat SEO</span>
                    </div>
                    <div class="hero-stat-item">
                        <span class="hero-stat-val">&lt;200ms</span>
                        <span class="hero-stat-lbl">Core Web Vitals</span>
                    </div>
                </div>
            </div>

            <!-- Right: Hero Image Area (Uploaded Image or Placeholder) -->
            <div class="hero-image-wrap">
                <div class="hero-image-frame">
                    <div class="hero-image-inner">
                        <img 
                            src="<?php echo esc_url($hero_image); ?>" 
                            alt="<?php echo esc_attr($hero_title); ?> — <?php echo esc_attr($hero_subtitle); ?>"
                            loading="eager"
                            width="540"
                            height="540"
                        />
                    </div>
                </div>

                <!-- Floating Verification Badge -->
                <div class="hero-floating-badge">
                    <span style="color: var(--brand-red);">★</span>
                    <span>SEO Executive · Verified Portfolio</span>
                </div>
            </div>
        </div>
    </div>
</section>
