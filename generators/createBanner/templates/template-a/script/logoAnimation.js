/**
 * A stagger animation
 */
import AbstractAnimation from '@mediamonks/temple/animation/AbstractAnimation';

export default class playAnimation extends AbstractAnimation {
  /**
   * Will return the transition Timeline
   * @return {TimelineLite}
   */
  getTransitionIn(complete = () => {}) {
    const tl = new TimelineLite();
    tl.call(() => this.show());

    tl.from(this.element, 1, {opacity: 0});

    tl.call(complete);
    return tl;
  }

  /**
   * Will return the transition Timeline
   * @return {TimelineLite}
   */
  getTransitionOut(complete = () => {}) {
    const tl = new TimelineLite();

    tl.to(this.element, 1, {xPercent: "100"});

    tl.call(() => this.hide());
    tl.call(complete);
    return tl;
  }
}
