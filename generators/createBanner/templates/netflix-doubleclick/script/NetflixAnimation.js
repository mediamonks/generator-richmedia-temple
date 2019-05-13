import StaggerAnimation from '@mediamonks/temple/animation/StaggerAnimation';
import NetflixBrandLogoAnimation from '@mediamonks/temple/animation/netflix/NetflixBrandLogoAnimation';
import NetflixCTAAnimation from '@mediamonks/temple/animation/netflix/NetflixCTAAnimation';
import NetflixRibbonAnimation from '@mediamonks/temple/animation/netflix/NetflixRibbonAnimation';

export default class NetflixAnimation {

  /**
   *
   * @type {boolean}
   * @private
   */
  hasVideo_ = true;

  /**
   *
   * @param {HTMLDivElement} container
   */
  constructor(container) {
    this.container_ = container;

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
   * @param duration
   * @return {Promise<any>}
   */
  untilVideoIsComplete(durationFromEnd) {
    const { domNetflixVideo } = this;


    return new Promise(resolve => {
      const onComplete = () => {
        resolve();
        domNetflixVideo.removeEventListener('video-complete', onComplete);
        domNetflixVideo.removeEventListener('video-close', onComplete);
      };
      domNetflixVideo.addEventListener('video-close', onComplete);
      domNetflixVideo.addEventListener('video-complete', onComplete);

      const tick = e => {
        // console.log(e.detail.currentTime, e.detail.duration);
        if (e.detail.currentTime > e.detail.duration - durationFromEnd) {
          resolve();
          domNetflixVideo.removeEventListener('video-time', tick);
        }
      };
      domNetflixVideo.addEventListener('video-time', tick);
    });
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

  async play() {
    if(this.hasVideo_){
      await this.playWithVideo_();
    } else {
      await this.playWithOutVideo_();
    }
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async playWithVideo_() {
    this.start_ = new TimelineLite();
    this.start_.to(this.domNetflixPreloader, .3, {autoAlpha: 0});
    this.start_.add(this.ribbon.getTransitionIn());
    this.start_.set(this.domCover, { autoAlpha: 0 });

    this.start_.call(this.domNetflixVideo.play, null, this.domNetflixVideo);

    this.start_.add(this.ribbon.getTransitionOut());
    this.start_.add(this.brandLogo.getTransitionIn(), '-=.7');
    this.start_.call(() => this.start_ = null);

    await this.untilVideoIsComplete(this.brandLogo.getTransitionInDuration());

    this.end_ = this.getAfterVideoAnimation();
    this.end_.call(() => this.end_ = null)
  }

  /**
   *
   * @return {Promise<void>}
   * @private
   */
  async playWithOutVideo_() {
    this.start_ = new TimelineLite();
    this.start_.to(this.domNetflixPreloader, .3, {autoAlpha: 0});
    this.start_.add(this.ribbon.getTransitionIn());
    this.start_.set(this.domCover, { autoAlpha: 0 });
    this.start_.add(this.ribbon.getTransitionOut());
    this.start_.add(
      [this.brandLogo.getTransitionIn(), this.cta.getTransitionIn(), this.pedegree.getTransitionIn()],
      '-=0.9',
      null,
      0.3,
    );
  }

  stop() {}

  async gotoEnd(){
    if(this.start_){
      this.domNetflixVideo.pause();
      this.domNetflixVideo.close();
      this.start_.progress(1);
      this.start_ = null;
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
