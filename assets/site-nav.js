(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var header = document.querySelector('.le-header');
  var SCROLL_DOWN = 32;
  var SCROLL_UP = 10;
  var isScrolled = false;
  var ticking = false;

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  function updateHeader() {
    if (!header) return;
    var y = window.scrollY;
    if (!isScrolled && y > SCROLL_DOWN) {
      isScrolled = true;
      header.classList.add('is-scrolled');
    } else if (isScrolled && y < SCROLL_UP) {
      isScrolled = false;
      header.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  if (header) {
    updateHeader();
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateHeader);
        }
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
