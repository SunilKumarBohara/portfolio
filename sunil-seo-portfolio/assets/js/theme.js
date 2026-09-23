/**
 * Sunil Kumar Bohara — SEO Executive WordPress Theme JS
 * Handles:
 * 1. Global Dark/Light Theme Switching with localStorage persistence
 * 2. Sticky Header with Scroll Detection
 * 3. Accessible Mobile Navigation Off-Canvas Drawer
 * 4. Active Section Highlighting
 * 5. Smooth Back-to-Top
 * 6. Contact Form AJAX Handler with WP Nonces
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light / System)
  // -------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'skb_theme_mode';

  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateThemeToggleIcons(theme);
  }

  function updateThemeToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // Live Nepal Time Clock (Asia/Kathmandu, UTC+5:45)
  // -------------------------------------------------------------------------
  function formatNepalClock() {
    const clockElements = document.querySelectorAll('#nepal-clock-display, .nepal-time-value');
    if (!clockElements.length) return;

    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const formatted = formatter.format(now);
      clockElements.forEach((el) => {
        el.textContent = formatted;
      });
    } catch (e) {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const nptDate = new Date(utc + (3600000 * 5.75));
      let hours = nptDate.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const mins = String(nptDate.getMinutes()).padStart(2, '0');
      const secs = String(nptDate.getSeconds()).padStart(2, '0');
      const formatted = `${String(hours).padStart(2, '0')}:${mins}:${secs} ${ampm}`;
      clockElements.forEach((el) => {
        el.textContent = formatted;
      });
    }
  }

  // Initialize Theme on DOM Ready
  document.addEventListener('DOMContentLoaded', function () {
    const currentTheme = getSavedTheme();
    applyTheme(currentTheme);

    // Start Live Nepal Clock
    formatNepalClock();
    setInterval(formatNepalClock, 1000);

    // Attach click listeners to all theme buttons
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const active = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = active === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    });

    // Listen for OS scheme changes if user hasn't explicitly locked a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    // -----------------------------------------------------------------------
    // 2. Sticky Header with Scroll Detection
    // -----------------------------------------------------------------------
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      const onScroll = () => {
        if (window.scrollY > 20) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll(); // initial check
    }

    // -----------------------------------------------------------------------
    // 3. Accessible Mobile Navigation Off-Canvas Drawer
    // -----------------------------------------------------------------------
    const drawer = document.getElementById('mobile-drawer');
    const openBtn = document.getElementById('open-mobile-drawer');
    const closeBtn = document.getElementById('close-mobile-drawer');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (openBtn) openBtn.focus();
    }

    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close when clicking outside drawer panel
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) {
          closeDrawer();
        }
      });
    }

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close drawer when any nav link inside is clicked
    document.querySelectorAll('.drawer-link').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // -----------------------------------------------------------------------
    // 4. Smooth Scrolling & Active Section Highlighting
    // -----------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
      const highlightActiveNav = () => {
        const scrollY = window.pageYOffset + 120;
        sections.forEach((current) => {
          const sectionHeight = current.offsetHeight;
          const sectionTop = current.offsetTop - 100;
          const sectionId = current.getAttribute('id');

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href').includes('#' + sectionId)) {
                link.classList.add('active');
              }
            });
          }
        });
      };
      window.addEventListener('scroll', highlightActiveNav, { passive: true });
    }

    // Smooth scrolling for internal anchor links with header offset
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        let targetId = null;
        if (href.startsWith('/#') && href.length > 2) {
          targetId = href.replace('/#', '');
        } else if (href.startsWith('#') && href.length > 1) {
          targetId = href.slice(1);
        }

        if (targetId) {
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            e.preventDefault();
            const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
            const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // -----------------------------------------------------------------------
    // 5. Back to Top Button
    // -----------------------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // -----------------------------------------------------------------------
    // 6. Contact Form AJAX Handler with WP Nonce
    // -----------------------------------------------------------------------
    const contactForm = document.getElementById('skb-contact-form');
    if (contactForm) {
      const alertBox = document.getElementById('contact-form-alert');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (alertBox) {
          alertBox.style.display = 'none';
          alertBox.className = 'form-alert';
          alertBox.textContent = '';
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Sending Message...</span>';
        }

        const formData = new FormData(contactForm);

        // Check if WP AJAX URL is localized
        const ajaxUrl = (typeof skbThemeData !== 'undefined' && skbThemeData.ajaxUrl)
          ? skbThemeData.ajaxUrl
          : '/wp-admin/admin-ajax.php';

        formData.append('action', 'submit_contact_enquiry');

        fetch(ajaxUrl, {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              if (alertBox) {
                alertBox.className = 'form-alert success';
                alertBox.textContent = data.data.message || 'Thank you! Your enquiry has been delivered successfully.';
                alertBox.style.display = 'block';
              }
              contactForm.reset();
            } else {
              if (alertBox) {
                alertBox.className = 'form-alert error';
                alertBox.textContent = data.data.message || 'Could not send message. Please try again or email directly.';
                alertBox.style.display = 'block';
              }
            }
          })
          .catch(() => {
            if (alertBox) {
              alertBox.className = 'form-alert error';
              alertBox.textContent = 'A connection error occurred. Please try again or email directly.';
              alertBox.style.display = 'block';
            }
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<span>Submit Consultation Request →</span>';
            }
          });
      });
    }
  });
})();
