(function () {
  'use strict';

  document.documentElement.classList.add('has-3d');
  if (document.body) {
    document.body.classList.add('has-3d');
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('has-3d');
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;

  var CARD_SEL = [
    '.service-card', '.expertise-item', '.offer-card', '.benefit-card',
    '.blog-card', '.blog-featured-card', '.related-card', '.why-feature'
  ].join(', ');

  var REVEAL_SEL = [
    'section.expertise', 'section.services', 'section.why', 'section.cta',
    'section.blog-featured', 'section.blog-listing', 'section.blog-newsletter',
    '.sd-hero .container', 'main > section', '.section', '.legal-content'
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
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  function autoEnhance() {
    document.querySelectorAll(REVEAL_SEL).forEach(function (el, i) {
      if (el.classList.contains('hero') || el.closest('.hero')) return;
      if (!el.classList.contains('reveal-3d') && !el.classList.contains('reveal')) {
        el.classList.add('reveal-3d');
        var delay = i % 4;
        if (delay) el.classList.add('delay-' + delay);
      }
    });

    document.querySelectorAll(CARD_SEL).forEach(function (card) {
      if (!card.classList.contains('tilt-card')) {
        card.classList.add('tilt-card');
      }
    });

    document.querySelectorAll('.hero-video, .sd-hero-bg img, .hero-image').forEach(function (el) {
      if (!el.hasAttribute('data-parallax')) {
        el.setAttribute('data-parallax', '0.2');
      }
    });
  }

  function initTilt() {
    if (!canHover || reduced) return;
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      if (!card.querySelector('.tilt-shine')) {
        var shine = document.createElement('div');
        shine.className = 'tilt-shine';
        if (getComputedStyle(card).position === 'static') {
          card.style.position = 'relative';
        }
        card.appendChild(shine);
      }
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotateX = ((y - cy) / cy) * -7;
        var rotateY = ((x - cx) / cx) * 7;
        card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(14px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  function initParallax() {
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length || reduced) return;
    var ticking = false;
    var isMobile = window.innerWidth < 768;
    function update() {
      var scrollY = window.scrollY;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.25;
        var parent = el.parentElement;
        var rect = parent ? parent.getBoundingClientRect() : { top: 0, bottom: 0 };
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          var y = scrollY * speed * 0.12;
          var scale = isMobile ? 1 : 1.05;
          el.style.transform = 'translate3d(0,' + y + 'px,0) scale(' + scale + ')';
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
    update();
  }

  function initGlow() {
    if (!canHover || reduced || window.innerWidth < 980) return;
    var orb = document.createElement('div');
    orb.className = 'glow-orb';
    orb.setAttribute('aria-hidden', 'true');
    document.body.appendChild(orb);
    document.body.classList.add('glow-active');
    document.addEventListener('mousemove', function (e) {
      orb.style.left = e.clientX + 'px';
      orb.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  function initHeroStagger() {
    if (reduced) return;
    var hero = document.querySelector('.hero-inner');
    if (!hero) return;
    var items = hero.querySelectorAll('.eyebrow, h1, p, .hero-btns');
    items.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px) translateZ(0)';
      setTimeout(function () {
        el.style.transition = 'opacity 0.75s ease, transform 0.75s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) translateZ(' + (20 - i * 4) + 'px)';
      }, 180 + i * 100);
    });
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
    initTilt();
    initParallax();
    initGlow();
    initHeroStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
