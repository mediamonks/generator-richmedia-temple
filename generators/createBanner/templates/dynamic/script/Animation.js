export default class Animation {
  /**
   *
   * @param {HTMLDivElement} container
   * @param {null} config
   */
  constructor(container) {
    this.container = container;
  }

  createTimeline = obj => {
    var tl = gsap.timeline(obj);
    tl.to(this.container, {duration:1, opacity: 1})
    return tl;
  };
}
