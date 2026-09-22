# Sunil Kumar Bohara — SEO Executive WordPress Theme

A premium, production-ready WordPress theme engineered for **Sunil Kumar Bohara — SEO Executive** based in Nepal. Built with modern WordPress architectural standards, an electric Blue + Crimson Red visual identity, native Dark/Light theme switching, Customizer controls, and zero heavy 3D dependencies.

---

## Key Highlights

- **Standard WordPress Hierarchy**: Fully modular templates with `front-page.php`, `single.php`, `page.php`, `archive.php`, `404.php`, and reusable `template-parts/`.
- **Zero 3D Overhead**: Replaces WebGL/Three.js canvases with a dedicated, responsive, customizable Hero Image area for optimal Core Web Vitals and lightning-fast loading.
- **Working Dark & Light Theme Switcher**: CSS custom properties with anti-FOUC inline detector in `<head>` and `localStorage` persistence.
- **WordPress Customizer Integration**:
  - Upload Hero Image directly via WordPress Media Library (`Appearance -> Customize -> Sunil Bohara Theme Settings -> Hero Section`).
  - Upload Profile Image (`Appearance -> Customize -> Sunil Bohara Theme Settings -> Profile Showcase`).
  - Edit Headlines, Bio, Taglines, and Call-to-Action buttons without touching code.
  - Configure 5 verified social profiles (GitHub, LinkedIn, Facebook, Instagram, X).
  - Set recipient notification email for consultation requests.
- **Dynamic SEO Insights**: Integrated with native WordPress Posts (`WP_Query`) with graceful fallback previews if no posts exist yet.
- **Secure Contact Form**: Uses WordPress nonces (`wp_nonce_field`), field sanitization (`sanitize_text_field`, `sanitize_email`), and asynchronous AJAX submission with instant inline feedback.
- **100% Responsive & Accessible**: Validated across mobile (320px), tablet, and desktop with zero horizontal overflow and `prefers-reduced-motion` compliance.

---

## Installation Instructions

### Option 1: Upload via WordPress Admin Dashboard (Recommended)
1. In your WordPress admin panel, go to **Appearance > Themes**.
2. Click **Add New** (or **Add New Theme**), then click **Upload Theme**.
3. Choose the `sunil-seo-portfolio.zip` archive file.
4. Click **Install Now**, then click **Activate**.

### Option 2: Upload via cPanel / FTP
1. Extract the `sunil-seo-portfolio/` folder.
2. In cPanel File Manager or FTP, navigate to:
   `/public_html/wp-content/themes/` (or your WordPress root installation).
3. Upload the `sunil-seo-portfolio/` folder into `wp-content/themes/`.
4. Go to **WordPress Admin > Appearance > Themes** and click **Activate** on **Sunil Kumar Bohara — SEO Executive**.

---

## Initial Setup & Customization

1. **Upload Hero & Profile Photos**:
   - Navigate to **Appearance > Customize > Sunil Bohara Theme Settings**.
   - Open **Hero Section** -> Upload your professional portrait photo.
   - Open **Profile Showcase** -> Upload your circular profile photo.
2. **Configure Social Media Profiles**:
   - In **Appearance > Customize > Sunil Bohara Theme Settings > Social Media Profiles**, verify or update your profile URLs.
3. **Configure Navigation Menu (Optional)**:
   - Go to **Appearance > Menus**.
   - Create a menu with custom links to the homepage sections (`#about`, `#services`, `#skills`, `#projects`, `#insights`, `#profile`, `#contact`) and assign it to the **Primary Header Menu** location. (The theme automatically generates these links if no menu is assigned!).
4. **Publish SEO Insights**:
   - Go to **Posts > Add New** in WordPress admin.
   - Add title, content, set a Featured Image, assign a Category, and click **Publish**. Your articles will automatically appear in the **SEO Insights & Analysis** section!

---

## File Structure

```
sunil-seo-portfolio/
├── style.css                 # Theme header & typography resets
├── functions.php             # Enqueues, Customizer, theme supports, AJAX handler
├── header.php                # Site header, anti-FOUC theme script, responsive navbar
├── footer.php                # Footer layout, 5 verified social links, back-to-top
├── front-page.php            # Homepage template
├── index.php                 # Blog archive fallback
├── single.php                # Single article post template
├── page.php                  # Standard page template
├── archive.php               # Category & tag archive template
├── 404.php                   # Branded 404 error page
├── template-parts/
│   ├── hero.php              # Hero section with uploaded image area
│   ├── about.php             # Narrative & verified credentials
│   ├── services.php          # 8 SEO services with deliverables
│   ├── skills.php            # Grouped skills matrix (SEO, Analytics, Web Tech)
│   ├── projects.php          # 4 case studies (problem, strategy, results, tools)
│   ├── insights.php          # Dynamic WordPress posts loop
│   ├── profile.php           # Profile showcase with rotating gradient halo
│   └── contact.php           # Secure contact form with WP nonces
├── assets/
│   ├── css/theme.css         # Complete Blue + Red design token system
│   ├── js/theme.js           # Theme switcher, mobile drawer, AJAX contact form
│   └── images/
│       ├── hero-placeholder.svg
│       └── profile-placeholder.svg
├── screenshot.png            # Theme preview image (1200x900)
└── README.md                 # Documentation
```

---

## License
GPL v2 or later. Designed for Sunil Kumar Bohara.
