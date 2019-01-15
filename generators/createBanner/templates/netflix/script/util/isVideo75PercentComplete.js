export default function isVideo75PercentComplete(domNetflixVideo) {
  return new Promise(resolve => {
    const tick = e => {
      if (e.detail.currentTime / e.detail.duration > 0.75) {
        resolve();
        domNetflixVideo.removeEventListener('video-time', tick);
      }
    };
    domNetflixVideo.addEventListener('video-time', tick);
  });
}
