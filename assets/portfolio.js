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


// Native share menu: includes Instagram and other installed apps when supported
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
        setTimeout(function() { btn.textContent = 'Aplikasi lain'; }, 1800);
      });
    } else {
      window.prompt('Salin tautan ini:', data.url);
    }
  });
});
