(function () {
  'use strict';

  var video = document.getElementById('heroVideo');
  if (!video) return;

  var playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === 'function') {
    playAttempt.catch(function () {
      /* Autoplay blocked — video still visible; user gesture may start it */
    });
  }
})();
