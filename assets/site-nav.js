(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
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
