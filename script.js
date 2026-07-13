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

  // ===== LIGHTBOX =====
  var lightboxSelectors = '.gallery-item img, .photo-strip img, .bio-grid img, .legacy-grid img';
  var lightboxImgs = document.querySelectorAll(lightboxSelectors);
  if (lightboxImgs.length === 0) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img class="lightbox-img" src="" alt="">';
  document.body.appendChild(overlay);

  var lightboxImg = overlay.querySelector('.lightbox-img');
  var closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    overlay.classList.add('lightbox-open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    overlay.classList.remove('lightbox-open');
    document.body.style.overflow = '';
  }

  lightboxImgs.forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      openLightbox(img.src, img.alt);
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === closeBtn) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ===== HAMBURGER MENU =====
  var navToggle = document.querySelector('.nav-toggle');
  var navLinksEl = document.querySelector('.nav-links');
  var navBackdrop = document.querySelector('.nav-backdrop');

  function closeMenu() {
    if (navLinksEl) navLinksEl.classList.remove('nav-open');
    if (navBackdrop) navBackdrop.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    var isOpen = navLinksEl && navLinksEl.classList.contains('nav-open');
    if (isOpen) { closeMenu(); }
    else {
      if (navLinksEl) navLinksEl.classList.add('nav-open');
      if (navBackdrop) navBackdrop.classList.add('nav-open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (navToggle) navToggle.addEventListener('click', toggleMenu);
  if (navBackdrop) navBackdrop.addEventListener('click', closeMenu);
  if (navLinksEl) {
    navLinksEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
});
