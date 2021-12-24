import fitText from '@mediamonks/temple/util/fitText';
const WebFont = require('webfontloader');


export default class Banner {

  constructor(config) {
    // add required components here
    this.config = config;
  }

  // fontLoading module for the lazy loading of fonts - default is openSans
  async loadFonts() {
    let webFontConfig = {}

    webFontConfig = {
      custom: {
        families: this.config.content.defaultFonts,
        urls: [this.config.content.defaultFontUrl]
      }
    }

    webFontConfig.timeout = 2000;
    webFontConfig.fontactive = (e) => {
      // console.log(`${e}, was detected. The document is ready and font loading is active`)
    }

    const prom = new Promise(resolve => {
      webFontConfig.active = resolve
    });

    WebFont.load(webFontConfig);
    return prom;
  }

  async init() {
    await this.loadFonts(); //need to wait until fonts are loaded. Otherwise we will run fitText on the wrong fonts

    const title = document.body.querySelector('.title');
    const ctaCopy = document.body.querySelector('.cta_copy');
    fitText([title, ctaCopy]);

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);
  }

  setAnimation(animation){
    this.animation = animation;
  }

  handleExit = () => {
    window.open(window.clickTag, '_blank');
    this.animation.getTimeline().progress(1);
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.handleExit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {

  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {

  };

  async start() {
    await this.init();

    this.animation.play();
  }
}

