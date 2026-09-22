<?php
/**
 * Template part for Contact Section
 *
 * @package Sunil_Seo_Portfolio
 */

if (!defined('ABSPATH')) {
    exit;
}

$contact_email = get_theme_mod('skb_contact_email', 'sunilbohara3000@gmail.com');
?>

<section id="contact" class="contact-section">
    <div class="container">
        <div class="section-header">
            <div class="badge">
                <span>Direct Inquiries</span>
            </div>
            <h2 class="section-title">Let's Grow Your Search Presence</h2>
            <p class="section-subtitle">
                Have a website ready for higher visibility, cleaner technical architecture, and organic search traffic? Let's discuss your project.
            </p>
        </div>

        <div class="contact-grid">
            <!-- Left: Direct Contact Information -->
            <div class="contact-info-card">
                <div>
                    <h3 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px;">Direct Inquiries</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 24px;">
                        Whether you need a complete technical SEO audit, a keyword roadmap, or ongoing search optimization, feel free to reach out directly.
                    </p>

                    <!-- Status Pill -->
                    <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 16px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span class="badge-dot"></span>
                            <span style="font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--brand-cyan);">
                                Currently Available for Consultations
                            </span>
                        </div>
                        <p style="font-size: 0.75rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">
                            Location: Kathmandu, Nepal (UTC+5:45)
                        </p>
                    </div>

                    <!-- Email Display -->
                    <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <span style="font-size: 1.2rem; color: var(--brand-cyan);">✉️</span>
                        <div>
                            <span style="font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); display: block;">Official Email</span>
                            <a href="mailto:<?php echo esc_attr($contact_email); ?>" style="font-size: 0.9rem; font-family: 'JetBrains Mono', monospace; color: var(--text-primary); font-weight: 600;">
                                <?php echo esc_html($contact_email); ?>
                            </a>
                        </div>
                    </div>

                    <!-- Phone / WhatsApp Display -->
                    <div style="background-color: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 14px; padding: 14px 18px; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.2rem; color: var(--brand-blue);">📞</span>
                        <div>
                            <span style="font-size: 0.7rem; font-family: 'JetBrains Mono', monospace; color: var(--text-muted); display: block;">Phone / WhatsApp</span>
                            <a href="tel:+9779817268172" style="font-size: 0.9rem; font-family: 'JetBrains Mono', monospace; color: var(--text-primary); font-weight: 600;">
                                +977 9817268172
                            </a>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 32px; font-size: 0.8rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
                    ⚡ 100% Privacy Guaranteed. Zero spam.
                </div>
            </div>

            <!-- Right: Contact Form -->
            <div class="contact-form-card">
                <!-- Inline Feedback Alert Box -->
                <div id="contact-form-alert" class="form-alert"></div>

                <form id="skb-contact-form" method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                    <?php wp_nonce_field('skb_contact_nonce_action', 'skb_contact_nonce'); ?>
                    <input type="hidden" name="action" value="submit_contact_enquiry" />

                    <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                        <!-- Name -->
                        <div class="form-group">
                            <label for="skb-name" class="form-label">
                                Your Name <span class="req">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="skb-name" 
                                name="name" 
                                class="form-input" 
                                placeholder="e.g. Alex Morgan" 
                                required 
                            />
                        </div>

                        <!-- Email -->
                        <div class="form-group">
                            <label for="skb-email" class="form-label">
                                Email Address <span class="req">*</span>
                            </label>
                            <input 
                                type="email" 
                                id="skb-email" 
                                name="email" 
                                class="form-input" 
                                placeholder="alex@example.com" 
                                required 
                            />
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
                        <!-- Website / Company -->
                        <div class="form-group">
                            <label for="skb-website" class="form-label">
                                Website or Company (Optional)
                            </label>
                            <input 
                                type="url" 
                                id="skb-website" 
                                name="website" 
                                class="form-input" 
                                placeholder="https://example.com" 
                            />
                        </div>

                        <!-- Requested Focus -->
                        <div class="form-group">
                            <label for="skb-service" class="form-label">
                                Requested Focus
                            </label>
                            <select id="skb-service" name="service" class="form-select">
                                <option value="Technical SEO & Crawl Audit">Technical SEO & Crawl Audit</option>
                                <option value="Keyword & Search Intent Strategy">Keyword & Search Intent Strategy</option>
                                <option value="On-Page & Semantic Architecture">On-Page & Semantic Architecture</option>
                                <option value="Content Strategy & Pillar Mapping">Content Strategy & Pillar Mapping</option>
                                <option value="Core Web Vitals Remediation">Core Web Vitals Remediation</option>
                                <option value="Local SEO & Map Pack">Local SEO & Map Pack</option>
                                <option value="Ongoing SEO Executive Retainer">Ongoing SEO Executive Retainer</option>
                            </select>
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="form-group">
                        <label for="skb-message" class="form-label">
                            Project Details & Goals <span class="req">*</span>
                        </label>
                        <textarea 
                            id="skb-message" 
                            name="message" 
                            class="form-textarea" 
                            rows="4" 
                            placeholder="Share details about your site, target audience, or current SEO challenges..." 
                            required
                        ></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 14px 20px;">
                        <span>Submit Consultation Request &rarr;</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
