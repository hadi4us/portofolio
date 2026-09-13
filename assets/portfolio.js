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
