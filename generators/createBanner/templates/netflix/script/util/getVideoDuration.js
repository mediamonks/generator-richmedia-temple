export default function getVideoDuration(video) {
  return new Promise(function(resolve) {
    const el = video.querySelector('video');
    if (el.readyState > 0) {
      resolve(el.duration);
    } else {
      const loaded = e => {
        resolve(el.duration);
        el.removeEventListener('loadedmetadata', loaded);
      };
      el.addEventListener('loadedmetadata', loaded);
    }
  });
}
