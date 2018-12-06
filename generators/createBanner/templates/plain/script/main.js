import Entity from '@mediamonks/temple/Entity';
import "./GSDevTools.js"

class Banner extends Entity {

  constructor() {
    super();


  }

  async init() {
    await super.init();
    global.GSDevTools.create();
    this.setUpTimeLine();
    this.onBannerShow();
  }

  setUpTimeLine = () => {
    this.masterTL = new TimelineMax({ paused: true, repeat:3, yoyo:true });
    this.masterTL
      .to(document.querySelector(".characters"), 0.5, { y: -100, ease: Power4.easeNone }, 1);
  };

  onBannerShow = () => {
    this.masterTL.play(0);
  };
}

const banner = new Banner();
banner.init();
