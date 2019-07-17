import StaggerAnimation from '@mediamonks/temple/animation/StaggerAnimation';

export default class Animation {

  hasEnded = false;
  hasVideo = false;

  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.container = container;
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async play() {

  }
}
