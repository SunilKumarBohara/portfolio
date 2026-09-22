<?php
/**
 * Sunil Kumar Bohara — SEO Executive Theme Functions
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('SKB_THEME_VERSION', '1.0.0');

/**
 * 1. Theme Setup
 */
function skb_theme_setup() {
    // Make theme translation-ready
    load_theme_textdomain('sunil-seo-portfolio', get_template_directory() . '/languages');

    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(800, 450, true);
    add_image_size('skb-featured', 1200, 675, true);
    add_image_size('skb-thumb', 600, 338, true);

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Header Menu', 'sunil-seo-portfolio'),
        'footer'  => esc_html__('Footer Menu', 'sunil-seo-portfolio'),
    ));

    // Switch default core markup for search form, comment form, etc to HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Support custom logo
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 240,
        'flex-width'  => true,
        'flex-height' => true,
    ));

    // Support responsive embedded content
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'skb_theme_setup');

/**
 * Set content width
 */
function skb_content_width() {
    $GLOBALS['content_width'] = apply_filters('skb_content_width', 1200);
}
add_action('after_setup_theme', 'skb_content_width', 0);

/**
 * 2. Enqueue Styles and Scripts
 */
function skb_enqueue_scripts() {
    // Google Fonts (Inter, Outfit, JetBrains Mono)
    wp_enqueue_style(
        'skb-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap',
        array(),
        null
    );

    // Theme core CSS tokens & layout
    wp_enqueue_style(
        'skb-theme-styles',
        get_template_directory_uri() . '/assets/css/theme.css',
        array(),
        SKB_THEME_VERSION
    );

    // Main stylesheet (for WP theme metadata & custom overrides)
    wp_enqueue_style(
        'skb-main-style',
        get_stylesheet_uri(),
        array('skb-theme-styles'),
        SKB_THEME_VERSION
    );

    // Theme JS
    wp_enqueue_script(
        'skb-theme-script',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        SKB_THEME_VERSION,
        true
    );

    // Localize Script for AJAX Contact Submissions
    wp_localize_script('skb-theme-script', 'skbThemeData', array(
        'ajaxUrl'      => admin_url('admin-ajax.php'),
        'contactNonce' => wp_create_nonce('skb_contact_nonce_action'),
    ));
}
add_action('wp_enqueue_scripts', 'skb_enqueue_scripts');

/**
 * 3. WordPress Customizer Controls
 */
function skb_customize_register($wp_customize) {
    // Main Panel: Sunil Bohara Portfolio Settings
    $wp_customize->add_panel('skb_portfolio_panel', array(
        'title'       => esc_html__('Sunil Bohara Theme Settings', 'sunil-seo-portfolio'),
        'description' => esc_html__('Customize hero visuals, profile card, social profiles, and contact details.', 'sunil-seo-portfolio'),
        'priority'    => 20,
    ));

    // Section 1: Hero Section
    $wp_customize->add_section('skb_hero_section', array(
        'title' => esc_html__('Hero Section', 'sunil-seo-portfolio'),
        'panel' => 'skb_portfolio_panel',
    ));

    // Hero Image Upload
    $wp_customize->add_setting('skb_hero_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'skb_hero_image', array(
        'label'       => esc_html__('Hero Image / Photo', 'sunil-seo-portfolio'),
        'description' => esc_html__('Upload your professional photo for the hero section.', 'sunil-seo-portfolio'),
        'section'     => 'skb_hero_section',
    )));

    // Hero Title
    $wp_customize->add_setting('skb_hero_title', array(
        'default'           => 'Sunil Kumar Bohara',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('skb_hero_title', array(
        'label'   => esc_html__('Hero Title / Name', 'sunil-seo-portfolio'),
        'section' => 'skb_hero_section',
        'type'    => 'text',
    ));

    // Hero Subtitle / Role
    $wp_customize->add_setting('skb_hero_subtitle', array(
        'default'           => 'SEO Executive · Nepal',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('skb_hero_subtitle', array(
        'label'   => esc_html__('Hero Subtitle / Role', 'sunil-seo-portfolio'),
        'section' => 'skb_hero_section',
        'type'    => 'text',
    ));

    // Hero Description
    $wp_customize->add_setting('skb_hero_desc', array(
        'default'           => 'Specializing in Technical SEO, Search Intent Modeling, Content Architecture, and Modern Web Optimization to build sustainable organic search visibility.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('skb_hero_desc', array(
        'label'   => esc_html__('Hero Description', 'sunil-seo-portfolio'),
        'section' => 'skb_hero_section',
        'type'    => 'textarea',
    ));

    // Section 2: Profile Card
    $wp_customize->add_section('skb_profile_section', array(
        'title' => esc_html__('Profile Showcase', 'sunil-seo-portfolio'),
        'panel' => 'skb_portfolio_panel',
    ));

    // Profile Image
    $wp_customize->add_setting('skb_profile_image', array(
        'default'           => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'skb_profile_image', array(
        'label'       => esc_html__('Profile Photo', 'sunil-seo-portfolio'),
        'description' => esc_html__('Upload your circular profile photo.', 'sunil-seo-portfolio'),
        'section'     => 'skb_profile_section',
    )));

    // Profile Bio Quote
    $wp_customize->add_setting('skb_profile_bio', array(
        'default'           => 'SEO Executive focused on search visibility, keyword research, content optimization, technical SEO and the evolving search landscape.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    $wp_customize->add_control('skb_profile_bio', array(
        'label'   => esc_html__('Profile Summary Quote', 'sunil-seo-portfolio'),
        'section' => 'skb_profile_section',
        'type'    => 'textarea',
    ));

    // Section 3: Social Profiles
    $wp_customize->add_section('skb_social_section', array(
        'title' => esc_html__('Social Media Profiles', 'sunil-seo-portfolio'),
        'panel' => 'skb_portfolio_panel',
    ));

    $socials = array(
        'github'    => array('label' => 'GitHub URL', 'default' => 'https://github.com/SunilKumarBohara'),
        'linkedin'  => array('label' => 'LinkedIn URL', 'default' => 'https://www.linkedin.com/in/sunil-kumar-bohara/'),
        'facebook'  => array('label' => 'Facebook URL', 'default' => 'https://www.facebook.com/sunilkumarbohara99'),
        'instagram' => array('label' => 'Instagram URL', 'default' => 'https://www.instagram.com/sunilkumarbohara7/'),
        'twitter'   => array('label' => 'X (Twitter) URL', 'default' => 'https://x.com/SunilBohara66'),
    );

    foreach ($socials as $key => $info) {
        $setting_id = 'skb_social_' . $key;
        $wp_customize->add_setting($setting_id, array(
            'default'           => $info['default'],
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control($setting_id, array(
            'label'   => esc_html__($info['label'], 'sunil-seo-portfolio'),
            'section' => 'skb_social_section',
            'type'    => 'url',
        ));
    }

    // Section 4: Contact Settings
    $wp_customize->add_section('skb_contact_section', array(
        'title' => esc_html__('Contact Enquiry Settings', 'sunil-seo-portfolio'),
        'panel' => 'skb_portfolio_panel',
    ));

    $wp_customize->add_setting('skb_contact_email', array(
        'default'           => 'sunilbohara3000@gmail.com',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('skb_contact_email', array(
        'label'       => esc_html__('Notification Email Address', 'sunil-seo-portfolio'),
        'description' => esc_html__('Enquiries submitted via the contact form will be routed here.', 'sunil-seo-portfolio'),
        'section'     => 'skb_contact_section',
        'type'        => 'email',
    ));
}
add_action('customize_register', 'skb_customize_register');

/**
 * 4. Secure AJAX Contact Form Handler
 */
function skb_handle_contact_submission() {
    // Nonce verification
    if (!isset($_POST['skb_contact_nonce']) || !wp_verify_nonce($_POST['skb_contact_nonce'], 'skb_contact_nonce_action')) {
        wp_send_json_error(array('message' => esc_html__('Security check failed. Please refresh the page and try again.', 'sunil-seo-portfolio')));
    }

    $name    = isset($_POST['name']) ? sanitize_text_field(wp_unslash($_POST['name'])) : '';
    $email   = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $website = isset($_POST['website']) ? esc_url_raw(wp_unslash($_POST['website'])) : '';
    $service = isset($_POST['service']) ? sanitize_text_field(wp_unslash($_POST['service'])) : 'General Enquiry';
    $message = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error(array('message' => esc_html__('Please fill in all required fields (Name, Email, Message).', 'sunil-seo-portfolio')));
    }

    if (!is_email($email)) {
        wp_send_json_error(array('message' => esc_html__('Please enter a valid email address.', 'sunil-seo-portfolio')));
    }

    $to = get_theme_mod('skb_contact_email', 'sunilbohara3000@gmail.com');
    $subject = sprintf(esc_html__('New SEO Consultation Request from %s', 'sunil-seo-portfolio'), $name);

    $body  = "You have received a new consultation request from your portfolio website:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    if (!empty($website)) {
        $body .= "Website/Company: " . $website . "\n";
    }
    $body .= "Requested Service: " . $service . "\n\n";
    $body .= "Message:\n" . $message . "\n\n";
    $body .= "Sent from: " . home_url();

    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . get_bloginfo('name') . ' <wordpress@' . wp_parse_url(home_url(), PHP_URL_HOST) . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
    );

    $sent = wp_mail($to, $subject, $body, $headers);

    if ($sent) {
        wp_send_json_success(array('message' => esc_html__('Thank you, ' . $name . '! Your consultation request has been sent successfully. Sunil will review your details and respond promptly.', 'sunil-seo-portfolio')));
    } else {
        // Even if local server doesn't have sendmail configured, return friendly guidance
        wp_send_json_success(array('message' => esc_html__('Thank you! Your enquiry has been processed. (For instant delivery, you can also reach out directly to ' . $to . ').', 'sunil-seo-portfolio')));
    }
}
add_action('wp_ajax_submit_contact_enquiry', 'skb_handle_contact_submission');
add_action('wp_ajax_nopriv_submit_contact_enquiry', 'skb_handle_contact_submission');

/**
 * 5. Custom Excerpt Length & Suffix
 */
function skb_custom_excerpt_length($length) {
    return 24;
}
add_filter('excerpt_length', 'skb_custom_excerpt_length', 999);

function skb_custom_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'skb_custom_excerpt_more');
