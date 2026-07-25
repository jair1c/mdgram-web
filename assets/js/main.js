/* MDGram — interacciones del sitio */
(function () {
  'use strict';

  /* --- Tema claro / oscuro ------------------------------------------- */
  var root = document.documentElement;
  var STORE = 'mdgram-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#101915' : '#ffffff');
  }

  var stored = null;
  try { stored = localStorage.getItem(STORE); } catch (e) { /* modo privado */ }
  applyTheme(stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignorado */ }
    });
  }

  /* --- Menú móvil ------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* --- Sombra de la cabecera al hacer scroll --------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Aparición progresiva de secciones ------------------------------- */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

  Array.prototype.forEach.call(revealables, function (el, i) {
    el.style.transitionDelay = Math.min(i % 4, 3) * 90 + 'ms';
    observer.observe(el);
  });

  // Red de seguridad: si el observer no llega a dispararse (pestaña en segundo
  // plano, navegador atípico), nada debe quedarse invisible.
  setTimeout(function () {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
    observer.disconnect();
  }, 2500);
})();
