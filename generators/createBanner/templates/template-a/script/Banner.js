const FontFaceObserver = require('fontfaceobserver');
import Entity from '@mediamonks/temple/Entity';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";
import EventDispatcherComponent from "@mediamonks/temple/component/EventDispatcherComponent";

import fitText from "@mediamonks/temple/util/fitText";
import Browser from '@mediamonks/temple/util/Browser';

import DoubleClickEventEnum from "@mediamonks/temple/event/DoubleClickEventEnum";
import Animation from "./Animation";

export default class Banner extends Entity {

  constructor(config = null) {
    super();

    if(config){
      this.addComponent(new ConfigComponent(config))
    }
    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  /**
   *
   * @return {Promise<void>}
   */
  async init() {
    await super.init();
    await this.handleCopy();

    // EventDispatcherComponent is added by DoubleClickPlatformComponent
    const dispatcher = this.getComponent(EventDispatcherComponent);

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleExit);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new Animation(document.querySelector('.banner'))
    this.animation.init();
  }

  async handleCopy() {
    // Using fittext for font-size resize.
    const fitTextArray = [
      document.body.querySelector('.cta span')
    ];

    this.fontMedium = new FontFaceObserver('Amiko');
    this.fontBold = new FontFaceObserver('Amiko');

    Promise.all([this.fontMedium.load(), this.fontBold.load()]).then(() => {
      fitText(fitTextArray);
    }).catch(() => {
      console.log('error occurred when loading fonts')
    })
  }

  /**
   * Dispatched when an exit is invoked.
   */
  handleExit = () => {

  };

  async start(){
    await this.init();

    // put your start code here
    await this.animation.play();
  }
}
