<?php
/**
 * Footer template for Sunil Kumar Bohara — SEO Executive WordPress Theme
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$github_url    = get_theme_mod('skb_social_github', 'https://github.com/SunilKumarBohara');
$linkedin_url  = get_theme_mod('skb_social_linkedin', 'https://www.linkedin.com/in/sunil-kumar-bohara/');
$facebook_url  = get_theme_mod('skb_social_facebook', 'https://www.facebook.com/sunilkumarbohara99');
$instagram_url = get_theme_mod('skb_social_instagram', 'https://www.instagram.com/sunilkumarbohara7/');
$twitter_url   = get_theme_mod('skb_social_twitter', 'https://x.com/SunilBohara66');
?>

<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <!-- Brand & Identity Column -->
            <div class="footer-col">
                <div class="header-brand" style="margin-bottom: 14px;">
                    <div class="brand-avatar">
                        <div class="brand-avatar-inner">SKB</div>
                    </div>
                    <div class="brand-meta">
                        <span class="brand-name">SUNIL KUMAR BOHARA</span>
                        <span class="brand-role">SEO EXECUTIVE</span>
                    </div>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); max-width: 380px; line-height: 1.6; margin-bottom: 14px;">
                    Engineering sustainable organic search visibility, technical crawl integrity, and modern content architecture for forward-thinking enterprises.
                </p>
                <p style="font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; color: var(--brand-cyan); display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                    <span>📍</span> Kathmandu, Nepal (UTC+5:45)
                </p>
                <div style="font-size: 0.78rem; font-family: 'JetBrains Mono', monospace; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
                    <a href="mailto:sunilbohara3000@gmail.com" style="color: var(--text-secondary); text-decoration: none;">✉️ sunilbohara3000@gmail.com</a>
                    <a href="tel:+9779817268172" style="color: var(--text-secondary); text-decoration: none;">📞 +977 9817268172</a>
                </div>
            </div>

            <!-- Navigation Links Column -->
            <div class="footer-col">
                <h4>Navigation</h4>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url(home_url('/#about')); ?>" class="footer-link">About Sunil</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#services')); ?>" class="footer-link">SEO Services</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#skills')); ?>" class="footer-link">Skills & Stack</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#projects')); ?>" class="footer-link">Case Studies</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#insights')); ?>" class="footer-link">SEO Insights</a></li>
                    <li><a href="<?php echo esc_url(home_url('/#contact')); ?>" class="footer-link">Contact Consultation</a></li>
                </ul>
            </div>

            <!-- Social Links & Connect Column -->
            <div class="footer-col">
                <h4>Connect With Sunil</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">
                    Follow along for technical SEO frameworks, algorithmic updates, and search growth strategies.
                </p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <?php if (!empty($github_url)) : ?>
                        <a href="<?php echo esc_url($github_url); ?>" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub Profile" title="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($linkedin_url)) : ?>
                        <a href="<?php echo esc_url($linkedin_url); ?>" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn Profile" title="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z"/></svg>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($facebook_url)) : ?>
                        <a href="<?php echo esc_url($facebook_url); ?>" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Facebook Profile" title="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($instagram_url)) : ?>
                        <a href="<?php echo esc_url($instagram_url); ?>" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram Profile" title="Instagram">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($twitter_url)) : ?>
                        <a href="<?php echo esc_url($twitter_url); ?>" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="X (Twitter) Profile" title="X (Twitter)">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Bottom Copyright and Back to Top -->
        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Sunil Kumar Bohara. All rights reserved. Powered by WordPress.</p>
            <button type="button" id="back-to-top" class="back-to-top-btn" aria-label="<?php esc_attr_e('Back to top of page', 'sunil-seo-portfolio'); ?>">
                <span>Back to Top</span>
                <span aria-hidden="true">&uarr;</span>
            </button>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
