(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  if (!video) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conn = navigator.connection;
  var saveData = conn && conn.saveData;
  var slow = conn && /2g|slow-2g/.test(conn.effectiveType || '');

  if (reduced || saveData || slow) {
    video.removeAttribute('autoplay');
    video.preload = 'none';
    return;
  }

  function startVideo() {
    var playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(function () { /* autoplay blocked */ });
    }
  }

  function beginLoad() {
    video.preload = 'auto';
    video.addEventListener('canplay', startVideo, { once: true });
    if (video.readyState >= 3) {
      startVideo();
    } else {
      video.load();
    }
  }

  if (document.readyState === 'complete') {
    beginLoad();
  } else {
    window.addEventListener('load', beginLoad, { once: true });
  }
})();
