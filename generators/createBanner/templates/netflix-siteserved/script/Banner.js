import Entity from '@mediamonks/temple/Entity';
import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';

import fitText from '@mediamonks/temple/util/fitText';


import '@netflixadseng/pk-component-utils';

import '@netflixadseng/wc-netflix-fonts';
import '@netflixadseng/wc-netflix-text';
import '@netflixadseng/wc-netflix-flushed-ribbon';
import '@netflixadseng/wc-netflix-video';
import '@netflixadseng/wc-netflix-img';
import '@netflixadseng/wc-netflix-brand-logo';
import '@netflixadseng/wc-netflix-cta';
import '@netflixadseng/wc-netflix-preloader';
import NetflixAnimation from './NetflixAnimation';

export default class Banner extends Entity {
  constructor() {
    super();

    this.addComponent(new EventDispatcherComponent());
  }

  /**
   * Setting the richmediarc config
   * @param config
   */
  setConfig(config){
    this.addComponent(new ConfigComponent(config));
  }

  async init() {
    await super.init();

    // needed for vieo to start playing
    window.dispatchEvent(new Event('adinitialized'));

    this.domMainExit = document.body.querySelector('.mainExit');
    this.domnNetflixCta = document.body.querySelector('netflix-cta');

    fitText([document.body.querySelector('.pedigree span'), document.body.querySelector('.tuneIn span')]);

    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new NetflixAnimation(document.querySelector('.banner'));
  }

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {
    this.domnNetflixCta.mouseover();
  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {
    this.domnNetflixCta.mouseout();
  };

  async start() {
    await this.init();

    const animationDone = this.animation.play();
  }
}
