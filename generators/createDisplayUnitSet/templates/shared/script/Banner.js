import fitText from '@mediamonks/temple/util/fitText';

export default class Banner {

  constructor(config) {

    // add required components here
    this.config = config;
  }

  async init() {
    await super.init();

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
    this.animation.progress(1);
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

