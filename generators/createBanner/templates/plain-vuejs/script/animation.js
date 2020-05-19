export default class Animation {

  constructor(vueInstance) {
    this.banner = vueInstance;
    this.timeline = null;
  }

  onMouseoverAnimation = () => {
    console.log("onMouseoverAnimation");
  }

  onMouseleaveAnimation = () => {
    console.log("onMouseleaveAnimation");
  }

  onCompleteAnimation() {
    this.banner.animationEnd = true;
  };

  gotoEndframe = () => {
    this.timeline.progress(1);
  };

  createMainTimeline = () => {
    const { app } = this.banner.$refs;

    this.timeline = gsap.timeline({ onComplete: () => this.onCompleteAnimation() });

    this.timeline
      .add("init")
        .to(app, {
          visibility:'visible'
        });
  };

  async play() {
    this.timeline.play;
  }
}