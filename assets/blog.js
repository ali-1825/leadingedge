(function () {
  'use strict';

  var filterBtns = document.querySelectorAll('.blog-filter-btn');
  var cards = document.querySelectorAll('.blog-card[data-category]');
  var featured = document.querySelector('.blog-featured-card[data-category]');
  var viewAllBtn = document.querySelector('.blog-view-all-btn');

  function applyFilter(category) {
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });

    if (featured) {
      var showFeatured = category === 'all' || featured.getAttribute('data-category') === category;
      featured.closest('.blog-featured').style.display = showFeatured ? '' : 'none';
    }

    cards.forEach(function (card) {
      var match = category === 'all' || card.getAttribute('data-category') === category;
      card.classList.toggle('is-hidden', !match);
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function () {
      applyFilter('all');
      document.querySelector('.blog-listing').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
