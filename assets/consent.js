(() => {
  'use strict';

  const measurementId = 'G-91ZDJ6LH28';
  const storageKey = 'portfolio-analytics-consent';
  const consent = localStorage.getItem(storageKey);

  function loadAnalytics() {
    if (window.__portfolioAnalyticsLoaded) return;
    window.__portfolioAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('consent', 'default', { analytics_storage: 'granted' });
    window.gtag('config', measurementId, { anonymize_ip: true });
    enableInteractionTracking();

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  function track(eventName, parameters = {}) {
    if (!window.__portfolioAnalyticsLoaded || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  }

  function projectName(link) {
    const work = link.closest('.work');
    return work?.querySelector('h3')?.textContent.trim() || 'Proyek portofolio';
  }

  function enableInteractionTracking() {
    if (window.__portfolioInteractionTrackingEnabled) return;
    window.__portfolioInteractionTrackingEnabled = true;

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const label = link.textContent.trim();

      if (link.classList.contains('detail-link')) {
        track('select_content', {
          content_type: 'project_detail',
          item_name: projectName(link),
          link_location: 'portfolio_list'
        });
      } else if (href.startsWith('mailto:')) {
        track('generate_lead', {
          lead_type: 'email',
          link_location: link.closest('footer') ? 'footer' : 'contact_section'
        });
      } else if (href.includes('saweria.co')) {
        track('support_link_click', {
          link_location: link.closest('footer') ? 'footer' : 'page_content'
        });
      } else if (link.closest('.share-links')) {
        track('share', {
          method: label || 'social',
          content_type: 'portfolio'
        });
      }
    });
  }

  function dismissBanner() {
    document.getElementById('cookie-consent')?.remove();
  }

  function saveConsent(value) {
    localStorage.setItem(storageKey, value);
    if (value === 'accepted') loadAnalytics();
    dismissBanner();
  }

  function renderBanner() {
    const banner = document.createElement('section');
    banner.id = 'cookie-consent';
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-description');
    banner.innerHTML = `
      <div class="cookie-consent__content">
        <div>
          <h2 id="cookie-consent-title">Pilihan privasi</h2>
          <p id="cookie-consent-description">Kami dapat memakai analitik Google Analytics untuk melihat penggunaan situs secara agregat. Anda boleh menolak; situs tetap berfungsi normal. Baca <a href="${document.body.dataset.assetPrefix || ''}privacy.html">Kebijakan Privasi</a>.</p>
        </div>
        <div class="cookie-consent__actions">
          <button class="button secondary" type="button" data-consent="rejected">Tolak analitik</button>
          <button class="button primary" type="button" data-consent="accepted">Terima analitik</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelectorAll('[data-consent]').forEach((button) => {
      button.addEventListener('click', () => saveConsent(button.dataset.consent));
    });
  }

  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'rejected') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderBanner, { once: true });
    } else {
      renderBanner();
    }
  }
})();
