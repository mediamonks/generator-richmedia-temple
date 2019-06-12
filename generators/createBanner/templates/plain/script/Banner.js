import Entity from '@mediamonks/temple/Entity';
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";

export default class Banner extends Entity {

  constructor(config) {
    super();

    // add required components here
    if(config){
      this.addComponent(new ConfigComponent(config))
    }
  }

  async init() {
    await super.init();

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);
  }

  exit = () => {
    window.open('https://www.google.com', '_blank')
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.exit();
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

  async start(){
    await this.init();
  }
}

