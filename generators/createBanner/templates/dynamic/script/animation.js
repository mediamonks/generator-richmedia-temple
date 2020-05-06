export default class Animation {

  constructor(container, config) {
    this.container = container;
    this.config = config;
  }

  createMainTimeline = obj => {

    let mainTimeline = gsap.timeline();

    mainTimeline.add("init")
      .set(".banner", {visibility:"visible"}, "init")
    mainTimeline.add("start")
      .from(".banner", {duration:1, opacity: 0}, "start")

    return mainTimeline;
  };

  /**
   *
   * @return {Promise<void>}
   * @private
   */

  async play() {
  }

}
