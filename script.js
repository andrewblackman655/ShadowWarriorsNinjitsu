document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var selectors = [
    '.head', '.section-head', '.cat-block', '.tier', '.program-card',
    '.cred-card', '.gallery-item', '.offer-card', '.pillar-card',
    '.legacy-grid', '.bio-grid', '.testimonial-inner', '.interest-grid',
    '.detail-grid', '.contact-grid'
  ];
  var targets = document.querySelectorAll(selectors.join(','));

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(function (el) {
    observer.observe(el);
  });
});
