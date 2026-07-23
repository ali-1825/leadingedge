(function () {
  'use strict';

  document.documentElement.classList.add('has-3d');
  if (document.body) document.body.classList.add('has-3d');
  else document.addEventListener('DOMContentLoaded', function () { document.body.classList.add('has-3d'); });

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var isMobile = window.innerWidth < 768;
  var isLowPower = isMobile ||
    window.innerWidth < 1024 ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4);

  var CARD_SEL = [
    '.service-card', '.expertise-item', '.offer-card', '.benefit-card',
    '.blog-card', '.blog-featured-card', '.related-card', '.why-feature'
  ].join(', ');

  var REVEAL_SEL = [
    'section.expertise', 'section.services', 'section.why', 'section.cta',
    'section.blog-featured', 'section.blog-listing', 'section.blog-newsletter',
    '.blog-hero-split', '.sd-hero', '.section', '.legal-content'
  ].join(', ');

  function initReveal() {
    var els = document.querySelectorAll('.reveal-3d, .reveal');
    if (!els.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  function autoEnhance() {
    document.querySelectorAll(REVEAL_SEL).forEach(function (el, i) {
      if (el.classList.contains('hero') || el.closest('.hero')) return;
      if (!el.classList.contains('reveal-3d') && !el.classList.contains('reveal')) {
        el.classList.add('reveal-3d');
        if (i % 4) el.classList.add('delay-' + (i % 4));
      }
    });

    if (!isLowPower) {
      document.querySelectorAll(CARD_SEL).forEach(function (card) {
        if (!card.classList.contains('tilt-card')) card.classList.add('tilt-card');
      });
    }

    if (!isMobile && !isLowPower) {
      document.querySelectorAll('.sd-hero-bg img, .hero-image').forEach(function (el) {
        if (!el.hasAttribute('data-parallax')) el.setAttribute('data-parallax', '0.15');
      });
    }
  }

  function initTilt() {
    if (!canHover || reduced || isLowPower) return;

    document.querySelectorAll('.tilt-card').forEach(function (card) {
      if (!card.querySelector('.tilt-shine')) {
        var shine = document.createElement('div');
        shine.className = 'tilt-shine';
        if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
        card.appendChild(shine);
      }

      var pending = false;
      var lastX = 0;
      var lastY = 0;

      card.addEventListener('mousemove', function (e) {
        lastX = e.clientX;
        lastY = e.clientY;
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
          pending = false;
          var rect = card.getBoundingClientRect();
          var x = lastX - rect.left;
          var y = lastY - rect.top;
          var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
          var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
          card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
        });
      }, { passive: true });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  function initParallax() {
    if (isMobile || isLowPower || reduced) return;
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;

    var ticking = false;
    function update() {
      var scrollY = window.scrollY;
      layers.forEach(function (el) {
        var parent = el.parentElement;
        if (!parent) return;
        var rect = parent.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
          el.style.transform = 'translate3d(0,' + (scrollY * speed * 0.08) + 'px,0)';
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }

  function initGlow() {
    if (!canHover || reduced || isLowPower) return;
    var orb = document.createElement('div');
    orb.className = 'glow-orb';
    orb.setAttribute('aria-hidden', 'true');
    document.body.appendChild(orb);
    document.body.classList.add('glow-active');

    var pending = false;
    var lx = 0;
    var ly = 0;
    document.addEventListener('mousemove', function (e) {
      lx = e.clientX;
      ly = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        orb.style.transform = 'translate(' + lx + 'px,' + ly + 'px) translate(-50%,-50%)';
        pending = false;
      });
    }, { passive: true });
  }

  function boot() {
    if (reduced) {
      document.querySelectorAll('.reveal-3d, .reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    autoEnhance();
    initReveal();

    if ('requestIdleCallback' in window) {
      requestIdleCallback(function () {
        initTilt();
        initParallax();
        initGlow();
      }, { timeout: 1200 });
    } else {
      setTimeout(function () {
        initTilt();
        initParallax();
        initGlow();
      }, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
