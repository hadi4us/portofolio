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

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
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
