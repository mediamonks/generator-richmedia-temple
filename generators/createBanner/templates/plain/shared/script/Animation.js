export default class Animation {
  /**
   *
   * @param {HTMLDivElement} container
   * @param {null} config
   */
  constructor(container, config) {
    this.container = container;
    this.config = config;
  }

  createTimeline = obj => {
    var tl = gsap.timeline(obj);
    tl.to('.banner', {duration:1, opacity: 1})
    return tl;
  };
}
