export default function isVideoComplete(domNetflixVideo){
  return new Promise(resolve => {
    const complete = () => {
      resolve();

      domNetflixVideo.removeEventListener('video-complete', complete);
      domNetflixVideo.removeEventListener('video-close', complete);
    };

    domNetflixVideo.addEventListener('video-close', complete);
    domNetflixVideo.addEventListener('video-complete', complete);
  })
}
