<?php
/**
 * Front Page template for Sunil Kumar Bohara — SEO Executive WordPress Theme
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="primary" class="site-main">
    <?php
    get_template_part('template-parts/hero');
    get_template_part('template-parts/about');
    get_template_part('template-parts/services');
    get_template_part('template-parts/skills');
    get_template_part('template-parts/projects');
    get_template_part('template-parts/profile');
    get_template_part('template-parts/contact');
    ?>
</main>

<?php
get_footer();
