import FrameAnimation from "@mediamonks/temple/animation/FrameAnimation"

export default class Animation extends FrameAnimation {
  /**
   *
   * @param {HTMLDivElement} container
   * @param {null} config
   */
  constructor(container) {
    super();

    this.container = container;
  }

  /**
   *
   * @param {gsap.core.Timeline} tl
   */
  frame0(tl){
    tl.to('.content', {duration:1, opacity: 1})
  }
}
