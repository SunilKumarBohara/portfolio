<?php
/**
 * Header template for Sunil Kumar Bohara — SEO Executive WordPress Theme
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">

    <!-- Anti-FOUC Theme Detection Script (Prevents flash of wrong theme) -->
    <script>
        (function() {
            try {
                var savedTheme = localStorage.getItem('skb_theme_mode');
                if (savedTheme === 'light' || savedTheme === 'dark') {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                }
            } catch (e) {}
        })();
    </script>

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="site-header" class="site-header">
    <div class="container header-container">
        <!-- Brand Identity -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="header-brand" aria-label="<?php bloginfo('name'); ?>">
            <div class="brand-avatar">
                <div class="brand-avatar-inner">SKB</div>
            </div>
            <div class="brand-meta">
                <span class="brand-name">SUNIL KUMAR BOHARA</span>
                <span class="brand-role">SEO EXECUTIVE</span>
            </div>
        </a>

        <!-- Desktop Navigation Menu -->
        <nav class="desktop-nav" aria-label="<?php esc_attr_e('Primary Navigation', 'sunil-seo-portfolio'); ?>">
            <?php
            if (has_nav_menu('primary')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'items_wrap'     => '%3$s',
                    'fallback_cb'    => false,
                ));
            } else {
                ?>
                <a href="<?php echo esc_url(home_url('/#hero')); ?>" class="nav-link">Home</a>
                <a href="<?php echo esc_url(home_url('/#about')); ?>" class="nav-link">About</a>
                <a href="<?php echo esc_url(home_url('/#services')); ?>" class="nav-link">Services</a>
                <a href="<?php echo esc_url(home_url('/#skills')); ?>" class="nav-link">Skills</a>
                <a href="<?php echo esc_url(home_url('/#projects')); ?>" class="nav-link">Projects</a>
                <a href="<?php echo esc_url(home_url('/#insights')); ?>" class="nav-link">Insights</a>
                <a href="<?php echo esc_url(home_url('/#profile')); ?>" class="nav-link">Profile</a>
                <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="nav-link">Contact</a>
                <?php
            }
            ?>
        </nav>

        <!-- Header Actions: Theme Switcher & Contact CTA -->
        <div class="header-actions">
            <!-- Theme Toggle Button -->
            <button type="button" class="theme-toggle-btn" aria-label="<?php esc_attr_e('Toggle Theme Mode', 'sunil-seo-portfolio'); ?>" title="<?php esc_attr_e('Toggle Light/Dark Theme', 'sunil-seo-portfolio'); ?>">
                <!-- Sun Icon (for Dark mode, click to switch to Light) -->
                <svg class="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <!-- Moon Icon (for Light mode, click to switch to Dark) -->
                <svg class="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>

            <!-- Contact CTA button -->
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn-primary btn-sm hidden sm:inline-flex">
                <span>Contact Me</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button type="button" id="open-mobile-drawer" class="hamburger-btn" aria-label="<?php esc_attr_e('Open Mobile Menu', 'sunil-seo-portfolio'); ?>">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
        </div>
    </div>
</header>

<!-- Mobile Navigation Off-Canvas Drawer -->
<div id="mobile-drawer" class="mobile-drawer" aria-hidden="true">
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e('Mobile Navigation Menu', 'sunil-seo-portfolio'); ?>">
        <div class="drawer-header">
            <div class="brand-meta">
                <span class="brand-name">SUNIL KUMAR BOHARA</span>
                <span class="brand-role">SEO EXECUTIVE</span>
            </div>
            <button type="button" id="close-mobile-drawer" class="drawer-close-btn" aria-label="<?php esc_attr_e('Close Navigation', 'sunil-seo-portfolio'); ?>">
                &times;
            </button>
        </div>

        <nav class="drawer-nav">
            <a href="<?php echo esc_url(home_url('/#hero')); ?>" class="drawer-link">Home</a>
            <a href="<?php echo esc_url(home_url('/#about')); ?>" class="drawer-link">About Sunil</a>
            <a href="<?php echo esc_url(home_url('/#services')); ?>" class="drawer-link">SEO Services</a>
            <a href="<?php echo esc_url(home_url('/#skills')); ?>" class="drawer-link">Skills & Tools</a>
            <a href="<?php echo esc_url(home_url('/#projects')); ?>" class="drawer-link">Case Studies</a>
            <a href="<?php echo esc_url(home_url('/#insights')); ?>" class="drawer-link">SEO Insights</a>
            <a href="<?php echo esc_url(home_url('/#profile')); ?>" class="drawer-link">Profile Card</a>
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="drawer-link">Get In Touch</a>
        </nav>

        <div class="drawer-footer" style="margin-top: auto; pt-6; border-top: 1px solid var(--border-color);">
            <a href="<?php echo esc_url(home_url('/#contact')); ?>" class="btn btn-primary" style="width: 100%; margin-top: 16px;">
                <span>Start Consultation</span>
            </a>
        </div>
    </div>
</div>
