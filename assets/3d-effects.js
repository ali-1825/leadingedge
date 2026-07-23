(function () {
  'use strict';

  /* Scroll reveal */
  function initReveal() {
    var els = document.querySelectorAll('.reveal-3d');
    if (!els.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* 3D tilt on cards */
  function initTilt() {
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      if (!card.querySelector('.tilt-shine')) {
        var shine = document.createElement('div');
        shine.className = 'tilt-shine';
        card.style.position = card.style.position || 'relative';
        card.appendChild(shine);
      }
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotateX = ((y - cy) / cy) * -8;
        var rotateY = ((x - cx) / cx) * 8;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(12px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  /* Parallax */
  function initParallax() {
    var layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;
    var ticking = false;
    function update() {
      var scrollY = window.scrollY;
      layers.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        var rect = el.parentElement ? el.parentElement.getBoundingClientRect() : { top: 0 };
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = 'translate3d(0, ' + (scrollY * speed * 0.15) + 'px, 0) scale(1.08)';
        }
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* Glass nav on scroll */
  function initNavScroll() {
    var header = document.querySelector('header.glass-nav');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* Hero text stagger */
  function initHeroStagger() {
    var hero = document.querySelector('.hero-inner');
    if (!hero) return;
    hero.querySelectorAll('.stagger-item').forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(function () {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 120);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initTilt();
    initParallax();
    initNavScroll();
    initHeroStagger();
  });
})();
