export default function isVideoAboutToEnd(domNetflixVideo, duration) {
  return new Promise(resolve => {
    const tick = e => {
      if (e.detail.currentTime > e.detail.duration - duration - .5) {
        resolve();
        domNetflixVideo.removeEventListener('video-time', tick);
      }
    };
    domNetflixVideo.addEventListener('video-time', tick);
  });
}
