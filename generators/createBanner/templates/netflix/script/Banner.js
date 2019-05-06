import Entity from '@mediamonks/temple/Entity';
import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';
import MonetPlatformComponent from '@mediamonks/temple/component/platform/MonetPlatformComponent';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';
import isRibbonComplete from '@mediamonks/temple/util/isRibbonComplete';
import isVideoComplete from '@mediamonks/temple/util/isVideoComplete';
import isVideoAboutToEnd from '@mediamonks/temple/util/isVideoAboutToEnd';
// import findElementsByCSS from '@mediamonks/temple/util/findElementsByCSS';
import fitText from '@mediamonks/temple/util/fitText';
import getVideoDuration from '@mediamonks/temple/util/getVideoDuration';
import DoubleClickEventEnum from '@mediamonks/temple/event/DoubleClickEventEnum';

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

    const monetComponent = this.getComponent(MonetPlatformComponent);
    const dispatcher = this.getComponent(EventDispatcherComponent);

    // const elements = findElementsByCSS(
    //   document.body.querySelector('#banner'),
    //   [monetComponent.getLocale().language],
    //   ['netflix-text', 'netflix-brand-logo', 'netflix-flushed-ribbon', 'netflix-video', 'netflix-cta'],
    //   css,
    // );

    this.domNetflixPreloader = document.body.querySelector('netflix-preloader');
    this.domNetflixRibbon = document.body.querySelector('netflix-flushed-ribbon');
    this.domNetflixVideo = document.body.querySelector('netflix-video');
    this.domNetflixVideoEl = document.body.querySelector('netflix-video video');
    this.domNetflixBrandLogo = document.body.querySelector('netflix-brand-logo');
    this.domnNetflixCta = document.body.querySelector('netflix-cta');
    this.domnNetflixCtaContainer = document.body.querySelector('.ctaContainer');
    this.domMainExit = document.body.querySelector('#main-exit');
    this.domNetflixPedigree = document.body.querySelector('.pedigree');
    this.domNetflixTitleTreatment = document.body.querySelector('.titleTreatment');
    this.domNetflixTuneIn = document.body.querySelector('.tuneIn');

    this.domNetflixSupercutTuneIn = document.body.querySelector('.supercutTuneIn');

    monetComponent.setImpressionPixel('RICH_MEDIA', ['SINGLE_TITLE', 'VIDEO']);

    fitText([
      document.body.querySelector('.pedigree span'),
      document.body.querySelector('.tuneIn span')
    ]);

    this.domMainExit.addEventListener('click', monetComponent.gotoExit.bind(monetComponent));
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    dispatcher.addEventListener(DoubleClickEventEnum.DC_EXIT, this.handleOnExitClick);
  }

  animateToEndFrame(){
    this.domNetflixRibbon.progress(1, true);
    this.domNetflixBrandLogo.progress(1, true);
    this.domNetflixPreloader.style.display = 'none';

    const mainTimeline = this.getMainTimeline();
    mainTimeline.progress(1);

    this.domNetflixVideo.pause();
    this.domNetflixVideo.close();

    setTimeout(() => {
      this.domnNetflixCta.mouseout();
    }, 1000);
  }

  /**
   *
   * @return {TimelineMax}
   */
  getMainTimeline(){
    if(!this._mainTimeline){
      const tl = new TimelineMax({ paused: true });
      tl.add(this.getIntroAnimationNetflixElements());

      this._mainTimeline = tl;
    }

    return this._mainTimeline;
  };

  /**
   *
   * @param {object} timelineOptions
   * @return {TimelineMax}
   */
  getIntroAnimationNetflixElements(timelineOptions = {}) {
    const tl = new TimelineMax(timelineOptions);
    tl.addLabel('start', 0);
    tl.to(this.domNetflixSupercutTuneIn, 0.5, { opacity: 0 }, 'start');
    tl.from(this.domNetflixTuneIn, 2, { opacity: 0 }, 'start+=1.5');
    tl.from(this.domNetflixTitleTreatment, 2, { opacity: 0 }, 'start+=1.5');
    tl.from(this.domNetflixPedigree, 2, { opacity: 0 }, 'start+=1.5');
    tl.from(this.domNetflixBrandLogo, 1, { opacity: 0 }, 'start+=2');
    tl.call(this.domNetflixBrandLogo.play, null, this.domNetflixBrandLogo, 'start+=2.5');
    tl.fromTo(this.domnNetflixCtaContainer, 1, { width: 0 }, { width: 110, ease: Quad.easeOut }, 'start+=2.5');
    return tl;
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

  /**
   * When on exit click is registered from double click
   */
  handleOnExitClick = () => {
    this.animateToEndFrame();
  };

  async start() {
    await this.init();

    const monetComponent = this.getComponent(MonetPlatformComponent);
    const timeline = this.getMainTimeline();

    timeline.play();

    // remove initial hider after ribbon is covering page.
    TweenMax.to(this.domNetflixPreloader, 0.2, {
      autoAlpha: 0,
      onComplete: () => {
        this.domNetflixRibbon.play();
      },
    });

    // wait for ribbon to cover unit
    await isRibbonComplete(this.domNetflixRibbon);

    if (monetComponent.getData('Toggle_Supercut')) {
      this.domVideoExit = document.body.querySelector('.videoClick');
      this.domVideoExit.addEventListener('click', monetComponent.gotoExit.bind(monetComponent));
      TweenMax.set(this.domNetflixBrandLogo, { opacity: 1 });

      this.domNetflixVideo.play();
      this.domNetflixBrandLogo.progress(1);

      this.domNetflixVideoEl.setAttribute('loadedmetadata', 'preload');
      const duration = await getVideoDuration(this.domNetflixVideo);

      this.domNetflixBrandLogo.reverse();

      //check if there's time to unfold the netflix logo
      if (duration - 0.5 > this.domNetflixBrandLogo.animDuration) {
        isVideoAboutToEnd(this.domNetflixVideo, this.domNetflixBrandLogo.animDuration).then(() => {
          this.domNetflixBrandLogo.play();
        });
      }

      // wait for video to complete playing
      await isVideoComplete(this.domNetflixVideo);
    }
  }
}
