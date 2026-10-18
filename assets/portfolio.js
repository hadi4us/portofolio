// Shared navigation keeps portfolio, project, and insight pages in one hierarchy.
(function() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  var inProject = window.location.pathname.indexOf('/projects/') !== -1;
  var isHome = /(?:^|\/)index\.html?$/.test(window.location.pathname) || window.location.pathname.endsWith('/portofolio/');
  var root = inProject ? '../' : '';
  var home = root + 'index.html';
  nav.querySelector('.brand').setAttribute('href', home + (isHome ? '#beranda' : ''));
  var links = [
    ['Karya', home + '#inovasi'],
    ['Cara kerja', home + '#pendekatan'],
    ['Tentang', home + '#tentang'],
    ['Wawasan', root + 'asisten-ai.html'],
    ['Kontak', home + '#kontak']
  ];
  var linksEl = nav.querySelector('.navlinks');
  if (!linksEl) return;
  linksEl.innerHTML = links.map(function(item, i) {
    return '<a' + (i === 4 ? ' class="contact"' : '') + ' href="' + item[1] + '">' + item[0] + '</a>';
  }).join('');
})();

// Year
 document.getElementById('year').textContent = new Date().getFullYear();

// Accordion toggle for work items
document.querySelectorAll('.work-toggle').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var article = btn.closest('.work');
    var open = article.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    var targetId = btn.getAttribute('aria-controls');
    if (targetId) {
      var detail = document.getElementById(targetId);
      if (detail) {
        detail.hidden = !open;
      }
    }
  });
});

// Native share menu: includes installed apps such as Instagram when supported
document.querySelectorAll('.share-native').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var data = { title: btn.dataset.shareTitle, url: btn.dataset.shareUrl };
    if (navigator.share) {
      navigator.share(data).catch(function() {});
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.url).then(function() {
        btn.textContent = 'Tautan tersalin';
        setTimeout(function() { btn.textContent = 'Bagikan'; }, 1800);
      });
    } else {
      window.prompt('Salin tautan ini:', data.url);
    }
  });
});

document.querySelectorAll('.share-copy').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var url = btn.dataset.shareUrl;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function() {
        btn.textContent = 'Tautan tersalin';
        setTimeout(function() { btn.textContent = 'Salin tautan'; }, 1800);
      });
    } else {
      window.prompt('Salin tautan ini:', url);
    }
  });
});
