import StaggerAnimation from '@mediamonks/temple/animation/StaggerAnimation';
import NetflixBrandLogoAnimation from '@mediamonks/temple/animation/netflix/NetflixBrandLogoAnimation';
import NetflixCTAAnimation from '@mediamonks/temple/animation/netflix/NetflixCTAAnimation';
import NetflixRibbonAnimation from '@mediamonks/temple/animation/netflix/NetflixRibbonAnimation';
import untilVideoIsComplete from '@mediamonks/temple/util/netflix/untilVideoIsComplete';

export default class Animation {
  hasEnded = false;
  hasSuperCut = false;

  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.container = container;

    this.domNetflixPreloader = container.querySelector('netflix-preloader');
    this.domNetflixVideo = container.querySelector('netflix-video');

    this.ribbon = new NetflixRibbonAnimation(container.querySelector('netflix-flushed-ribbon'));
    this.cta = new NetflixCTAAnimation(container.querySelector('.cta'));
    this.brandLogo = new NetflixBrandLogoAnimation(container.querySelector('netflix-brand-logo'));
    this.pedegree = new StaggerAnimation(container.querySelectorAll('.pedigree [animate]'));

    this.domCover = container.querySelector('.cover');

    if(this.container.querySelector('[data-dynamic-key="Supercut"]') != null) {
      this.domNetflixVideoSupercut = container.querySelector('[data-dynamic-key="Supercut"]');
    }
  }

  enableSuperCut() {
    this.hasSuperCut = true;
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async play() {
    const start = (this.start = new TimelineLite());
    start.to(this.domNetflixPreloader, 0.3, { autoAlpha: 0 });

    if (this.hasSuperCut) {
      start.add(this.ribbon.getTransitionIn());
      start.set(this.domCover, { autoAlpha: 0 });

      start.call(() => this.domNetflixVideo.play());

      start.add(this.ribbon.getTransitionOut());
      start.add(this.brandLogo.getTransitionIn(), '-=.7');
      start.addPause('outro');
      start.add(this.brandLogo.getTransitionOut());
    } else {
      start.set(this.domNetflixVideo, { display: 'none' });
      start.set(this.domCover, { autoAlpha: 0 });
    }

    start.add(
      [this.brandLogo.getTransitionIn(), this.cta.getTransitionIn(), this.pedegree.getTransitionIn()],
      '+=.4',
      null,
      0.3,
    );

    if (this.hasSuperCut) {
      await untilVideoIsComplete(this.domNetflixVideo, this.brandLogo.getTransitionInDuration());

      if (!this.hasEnded) {
        start.play('outro');
      }
    }

    return await new Promise(resolve => start.call(resolve));
  }

  async gotoEnd() {
    this.hasEnded = true;
    this.start.pause();
    this.start.progress(1);
    this.domNetflixVideo.pause();
    this.domNetflixVideo.close();
    this.brandLogo.element.timeline.progress(1).pause();

    if(this.container.querySelector('[data-dynamic-key="Supercut"]') != null) {
      this.domNetflixVideoSupercut.pause();
      this.domNetflixVideoSupercut.close();
    }
  }
}
