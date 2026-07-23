(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  if (!video) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection;
  var saveData = conn && conn.saveData;
  var slow = conn && /2g|slow-2g|3g/.test(conn.effectiveType || '');

  if (reduced || saveData || slow) {
    video.removeAttribute('autoplay');
    video.preload = 'none';
    return;
  }

  video.preload = 'metadata';

  function startVideo() {
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () { /* autoplay blocked */ });
    }
  }

  function loadAndPlay() {
    if (video.readyState >= 2) {
      startVideo();
    } else {
      video.addEventListener('loadeddata', startVideo, { once: true });
      if (video.preload === 'metadata') video.preload = 'auto';
      video.load();
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadAndPlay, { timeout: 2000 });
  } else {
    window.addEventListener('load', loadAndPlay, { once: true });
  }
})();
