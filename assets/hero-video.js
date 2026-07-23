(function () {
  'use strict';

  var wrap = document.getElementById('heroBg');
  var video = document.getElementById('heroVideo');
  if (!wrap || !video) return;

  function useFallback() {
    wrap.classList.remove('is-video-ready');
  }

  function useVideo() {
    wrap.classList.add('is-video-ready');
  }

  video.addEventListener('loadeddata', useVideo);
  video.addEventListener('canplay', useVideo);
  video.addEventListener('error', useFallback);

  if (video.readyState >= 2) {
    useVideo();
  }

  var playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === 'function') {
    playAttempt.catch(useFallback);
  }
})();
