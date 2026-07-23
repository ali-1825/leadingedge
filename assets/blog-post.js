(function () {
  'use strict';

  var sidebar = document.querySelector('.bp-sidebar');
  var header = document.querySelector('.le-header');
  if (!sidebar || !header) return;

  function syncSidebar() {
    var offset = header.offsetHeight + 16;
    sidebar.style.top = offset + 'px';
    sidebar.style.maxHeight = 'calc(100vh - ' + (offset + 8) + 'px)';
  }

  syncSidebar();
  window.addEventListener('resize', syncSidebar, { passive: true });
  window.addEventListener('scroll', syncSidebar, { passive: true });

  if (window.ResizeObserver) {
    new ResizeObserver(syncSidebar).observe(header);
  }
})();
