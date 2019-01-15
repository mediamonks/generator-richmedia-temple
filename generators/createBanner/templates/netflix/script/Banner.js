import Entity from '@mediamonks/temple/Entity';
import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';
import MonetPlatformComponent from '@mediamonks/temple/component/platform/MonetPlatformComponent';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';

import '@netflixadseng/pk-component-utils';
import '@netflixadseng/wc-monet-integrator';
import '@netflixadseng/wc-netflix-fonts';
import '@netflixadseng/wc-netflix-text';
import '@netflixadseng/wc-netflix-flushed-ribbon';
import '@netflixadseng/wc-netflix-video';
import '@netflixadseng/wc-netflix-img';
import '@netflixadseng/wc-netflix-brand-logo';
import '@netflixadseng/wc-netflix-cta';
import '@netflixadseng/wc-netflix-preloader';
import '@netflixadseng/wc-netflix-ratings-bug';

// import getEnabler from '@mediamonks/temple/util/getEnabler';
import isRibbonComplete from './util/isRibbonComplete';
import isVideoComplete from './util/isVideoComplete';
import isVideo75PercentComplete from './util/isVideo75PercentComplete';

export default class Banner extends Entity {
  constructor(config) {
    super();

    this.addComponent(new ConfigComponent(config));
    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new MonetPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    this.domInitialLoadHider = document.body.querySelector('.initial-load-hider');
    this.domNetflixRibbon = document.body.querySelector('netflix-flushed-ribbon');
    this.domNetflixVideo = document.body.querySelector('netflix-video');
    this.domNetflixBrandLogo = document.body.querySelector('netflix-brand-logo');
    this.domnNetflixCta = document.body.querySelector('netflix-cta');
    this.domMainExit = document.body.querySelector('.main-exit');
    // this.domSupercutOverlay = document.body.querySelector('.supercutOverlay');

    this.domMainExit.addEventListener('click', this.handleMainClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    // START INITIAL ANIMATION
    this.domNetflixRibbon.play();

    // wait for ribbon to cover unit
    await isRibbonComplete(this.domNetflixRibbon);

    // remove initial hider after ribbon is covering page.
    this.domInitialLoadHider.style.display = 'none';

    const monetComponent = this.getComponent(MonetPlatformComponent);

    if (monetComponent.getData('Toggle_Supercut')) {
      this.domNetflixVideo.play();
      this.domNetflixBrandLogo.play();
      this.domNetflixBrandLogo.progress(1);
      this.domNetflixBrandLogo.reverse();

      isVideo75PercentComplete(this.domNetflixVideo).then(() => {
        this.domNetflixBrandLogo.play();
      });

      // wait for video to complete playing
      await isVideoComplete(this.domNetflixVideo);
    }

    this.domNetflixBrandLogo.play();

    console.log('start');

    // do the rest
    this.start();
  }

  handleMainClick = () => {
    window.open(window.clickTag);
  };

  handleRollOver = () => {
    this.domnNetflixCta.mouseover();
  };

  handleRollOut = () => {
    this.domnNetflixCta.mouseout();
  };

  async start() {

  }
}
