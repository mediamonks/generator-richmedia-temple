export default class Animation {
  /**
   *
   * @param {HTMLDivElement} container
   * @param {null} config
   */
  constructor(container, config) {
    this.container = container;
    this.config = config;

    this.fadeIn = new TimelineMax({pause: true});
    this.fadeIn.to(".banner", 1, {opacity: 1});



  }

  playFadeIn() {
    this.fadeIn.play();
  }

  playFadeOut() {
    this.fadeOut.play();
  }
}
