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
import Animation from './Animation';

export default class Banner extends Entity {
  constructor(config = null) {
    super();

    if (config) {
      this.addComponent(new ConfigComponent(config));
    }
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    // needed for vieo to start playing
    window.dispatchEvent(new Event('adinitialized'));

    this.domMainExit = document.body.querySelector('.mainExit');
    this.domnNetflixCta = document.body.querySelector('netflix-cta');

    fitText([document.body.querySelector('.pedigree span'), document.body.querySelector('.tuneIn span')]);

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.animation = new Animation(document.querySelector('.banner'));
  }

  exit = () => {
    Enabler.exit('Default Exit');
    // window.open(this.clickTag, '_blank')
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.animation.gotoEnd();
    this.exit();
  };

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

  /**
   * Should be set before start is called
   */
  enableSuperCut = () => {
    this.animation.enableSuperCut();
  };

  /**
   *
   * @return {Promise<void>}
   */
  async start() {
    await this.init();

    await this.animation.play();
  }
}
