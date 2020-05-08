//import config from "../.richmediarc";

export default class Animation {

  constructor(vueInstance) {
    this.banner = vueInstance;
  }

  loopAnimation() {
    this.randomiseLogo();
    this.banner.timeline.restart();
  };

  randomiseLogo() {
    const logosToSample = this.banner.logos.filter(logo => logo !== this.banner.currentLogo)
    this.banner.currentLogo = logosToSample[Math.floor(Math.random() * logosToSample.length)]
  };

  createMainTimeline = obj => {
    console.log("createMainTimeline");

    /* let mainTimeline = gsap.timeline();

    mainTimeline.add("init")
      .set(".banner", {visibility:"visible"}, "init")
    mainTimeline.add("start")
      .from(".banner", {duration:1, opacity: 0}, "start")

    return mainTimeline; */


    this.randomiseLogo()

    const { bubble, bubbleImage } = this.banner.$refs;
    this.banner.timeline = new TimelineLite({
      onComplete: () => {
        this.loopAnimation();
      }
    });

    this.banner.timeline.from(bubbleImage, 0.4, { opacity: 0 })
    this.banner.timeline.to(bubble, 0.4, {
      scale: 0.8,
      rotation: 16,
      ease: Back.easeOut.config(1.7)
    });
    this.banner.timeline.to(bubble, 1.2, {
      scale: 1,
      rotation: "-=16",
      ease: Elastic.easeOut.config(2.5, 0.5)
    });
    this.banner.timeline.to(bubbleImage, 0.2, { opacity: 0 })
  };

  /**
   *
   * @return {Promise<void>}
   * @private
   */

  async play() {
    console.log("play");
    //this.createMainTimeline().play;
  }
}