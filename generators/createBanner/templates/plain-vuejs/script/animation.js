export default class Animation {

  constructor(vueInstance) {
    this.banner = vueInstance;
    this.timeline = null;
  }

  onCompleteAnimation() {
    console.log("onCompleteAnimation");
  };

  createMainTimeline = () => {
    console.log("createMainTimeline");

    const { app } = this.banner.$refs;

    this.timeline = new TimelineLite({ onComplete: () => this.onCompleteAnimation() });

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