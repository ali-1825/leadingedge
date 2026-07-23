(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var header = document.querySelector('.le-header');
  var SCROLL_DOWN = 32;
  var SCROLL_UP = 10;
  var isScrolled = false;
  var ticking = false;

  function setMenuOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && nav) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', function () {
      setMenuOpen(!nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenuOpen(false);
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
  if (file === '' || file.indexOf('.') === -1) file = 'index.html';
  var map = {
    'index.html': 'home',
    'about.html': 'about',
    'blog.html': 'blog',
    'services.html': 'services',
    'contact.html': 'contact',
    'booking.html': 'booking',
    'faq.html': 'faq'
  };
  if (path.indexOf('/services/') !== -1) {
    map[file] = 'services';
  }
  if (path.indexOf('/blog/') !== -1) {
    map[file] = 'blog';
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
