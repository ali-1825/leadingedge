(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var header = document.querySelector('.le-header');
  var scrollTimer = null;
  var SCROLL_THRESHOLD = 20;

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  function updateScrolledState() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
      header.classList.remove('is-scrolling');
    }
  }

  if (header) {
    updateScrolledState();
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > SCROLL_THRESHOLD) {
          header.classList.add('is-scrolling');
        } else {
          header.classList.remove('is-scrolling');
        }
        updateScrolledState();
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
          header.classList.remove('is-scrolling');
        }, 140);
      },
      { passive: true }
    );
  }

  var path = window.location.pathname.replace(/\\/g, '/');
  var file = path.split('/').pop() || 'index.html';
  var map = {
    'index.html': 'home',
    'about.html': 'about',
    'communities.html': 'communities',
    'services.html': 'services',
    'contact.html': 'contact',
    'booking.html': 'booking',
    'faq.html': 'faq'
  };
  if (path.indexOf('/services/') !== -1) {
    map[file] = 'services';
  }
  var active = map[file];
  if (active && nav) {
    nav.querySelectorAll('a[data-nav]').forEach(function (link) {
      if (link.getAttribute('data-nav') === active) {
        link.classList.add('active');
      }
    });
  }
})();
