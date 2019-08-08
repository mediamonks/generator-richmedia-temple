import playAnimation from './logoAnimation';

export default class Animation {
  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.container = container;
    this.logo = container.querySelector(".brandLogo")
  }

  async init() {
    this.introAnimation = new playAnimation(this.logo);
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async play() {
    const start = new TimelineLite({ paused: true });

    start.add(this.introAnimation.getTransitionIn())
    start.add(this.introAnimation.getTransitionOut())

    start.play();
  }
}