import StaggerAnimation from '@mediamonks/temple/animation/StaggerAnimation';
import NetflixBrandLogoAnimation from '@mediamonks/temple/animation/netflix/NetflixBrandLogoAnimation';
import NetflixCTAAnimation from '@mediamonks/temple/animation/netflix/NetflixCTAAnimation';
import NetflixRibbonAnimation from '@mediamonks/temple/animation/netflix/NetflixRibbonAnimation';
import untilVideoIsComplete from '@mediamonks/temple/util/netflix/untilVideoIsComplete';




export default class Animation {

  static STATE_IDLE = 1 << 1;
  static STATE_VIDEOPLAYING = 1 << 2;
  static STATE_STARTANIMATING = 1 << 3;
  static STATE_ENDANIMATING = 1 << 4;

  state = Animation.STATE_IDLE;

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
  }

  /**
   *
   * @param {boolean} value
   */
  setHasVideo(value){
    this.hasVideo_ = value;
  }

  /**
   *
   * @param element
   * @param selector
   * @param maxTimes
   * @return {Promise<any>}
   */
  getElement(element, selector, maxTimes = 30) {
    let times = 0;
    return new Promise(resolve => {
      let int;
      let result;
      int = setInterval(() => {
        result = element.querySelector(selector);

        if (result) {
          clearInterval(int);
          resolve(result);
        } else {
          if (times > maxTimes) {
            clearInterval(int);
            resolve(null);
          }
        }

        times++;
      }, 50);
    });
  }

  /**
   *
   * @param duration
   * @return {Promise<any>}
   */
  async isVideoReadyToPlay() {
    const { domNetflixVideo } = this;

    let video;
    video = await this.getElement(domNetflixVideo, 'video');

    return new Promise(resolve => {
      const int = setInterval(() => {
        if (video.readyState >= 1) {
          resolve();
          clearInterval(int);
        }
      }, 100);
    });
  }

  getAfterVideoAnimation(){
    const tl = new TimelineLite();
    tl.add(this.brandLogo.getTransitionOut());
    tl.add(
      [this.brandLogo.getTransitionIn(), this.cta.getTransitionIn(), this.pedegree.getTransitionIn()],
      '+=.4',
      null,
      0.3,
    );

    return tl;
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async playWithVideo() {
    this.start = new TimelineLite();
    this.start.to(this.domNetflixPreloader, .3, {autoAlpha: 0});
    this.start.add(this.ribbon.getTransitionIn());
    this.start.set(this.domCover, { autoAlpha: 0 });

    this.start.call(this.domNetflixVideo.play, null, this.domNetflixVideo);

    this.start.add(this.ribbon.getTransitionOut());
    this.start.add(this.brandLogo.getTransitionIn(), '-=.7');
    this.start.call(() => this.start = null);

    await untilVideoIsComplete(this.domNetflixVideo, this.brandLogo.getTransitionInDuration());

    this.end_ = this.getAfterVideoAnimation();
    this.end_.call(() => this.end_ = null)
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async playWithOutVideo() {
    this.start = new TimelineLite();
    this.start.to(this.domNetflixPreloader, .3, {autoAlpha: 0});
    this.start.add(this.ribbon.getTransitionIn());
    this.start.set(this.domCover, { autoAlpha: 0 });
    this.start.add(this.ribbon.getTransitionOut());
    this.start.add(
      [this.brandLogo.getTransitionIn(), this.cta.getTransitionIn(), this.pedegree.getTransitionIn()],
      '-=0.9',
      null,
      0.3,
    );
  }

  async gotoEnd(){
    if(this.start){
      this.domNetflixVideo.pause();
      this.domNetflixVideo.close();
      this.start.progress(1);
      this.start = null;
      this.getAfterVideoAnimation().play();
    } else if(this.end_){
      this.end_.progress(1);
    } else {
      this.domNetflixVideo.pause();
      this.domNetflixVideo.close();
      this.getAfterVideoAnimation().play();
    }
  }
}
