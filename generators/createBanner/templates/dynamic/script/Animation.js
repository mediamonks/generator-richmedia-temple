export default class Animation {

  constructor(container, config) {
    this.container = container;
    this.config = config;

    this.tl = gsap.timeline();

    this.tl.add("init")
      .set(".banner", {visibility:"visible"}, "init")

    this.tl.add("start")
      .from(".banner", {duration:1, opacity: 0}, "start")
  }


  /**
   *
   * @return {Promise<void>}
   * @private
   */

  play() {
    this.tl.play();
  }

}
