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
    this.fadeIn.to(".content", 1, {opacity: 1});

    this.fadeOut = new TimelineMax({pause: true});
    this.fadeOut.to(".content", 1, {opacity: 0});

  }

  playFadeIn() {
    this.fadeIn.play();
  }

  playFadeOut() {
    this.fadeOut.play();
  }
}
