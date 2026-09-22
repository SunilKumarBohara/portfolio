<?php
/**
 * 404 Error Page Template
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <div class="container error-404-wrap">
        <span class="error-code">404</span>
        <h1 style="font-size: 2rem; margin-bottom: 12px;">Page Not Found</h1>
        <p style="color: var(--text-secondary); max-width: 480px; margin-bottom: 28px; line-height: 1.6;">
            The page or SEO resource you are looking for might have been moved, renamed, or temporarily unavailable.
        </p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">
            <span>&larr; Return to Home</span>
        </a>
    </div>
</main>

<?php
get_footer();
