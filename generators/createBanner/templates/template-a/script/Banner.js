import Entity from '@mediamonks/temple/Entity';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";
import EventDispatcherComponent from "@mediamonks/temple/component/EventDispatcherComponent";
import fitText from "@mediamonks/temple/util/fitText";

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

    // Using fittext for font-size resize.
    let fitTextArray = [
      document.body.querySelector('.cta span')
    ];

    fitText(fitTextArray);

    // EventDispatcherComponent is added by DoubleClickPlatformComponent
    const dispatcher = this.getComponent(EventDispatcherComponent);

    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleExit);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    // listening to events that are being dispatched by DoubleClick through DoubleClickPlatformComponent
    // dispatcher.addEventListener(DoubleClickEventEnum.INIT, this.handleInit);
    // dispatcher.addEventListener(DoubleClickEventEnum.EXIT, this.handleExit);
    // dispatcher.addEventListener(DoubleClickEventEnum.COLLAPSE, this.handleCollapse);
    // dispatcher.addEventListener(DoubleClickEventEnum.COLLAPSE_FINISH, this.handleCollapseFinish);
    // dispatcher.addEventListener(DoubleClickEventEnum.COLLAPSE_START, this.handleCollapseStart);
    // dispatcher.addEventListener(DoubleClickEventEnum.EXPAND_FINISH, this.handleExpandFinish);
    // dispatcher.addEventListener(DoubleClickEventEnum.EXPAND_START, this.handleExpandStart);
    // dispatcher.addEventListener(DoubleClickEventEnum.FULLSCREEN_COLLAPSE_FINISH, this.handleFullscreenCollapseFinish);
    // dispatcher.addEventListener(DoubleClickEventEnum.FULLSCREEN_COLLAPSE_START, this.handleFullscreenCollapseStart);
    // dispatcher.addEventListener(DoubleClickEventEnum.FULLSCREEN_EXPAND_FINISH, this.handleFullscreenExpandFinish);
    // dispatcher.addEventListener(DoubleClickEventEnum.FULLSCREEN_EXPAND_START, this.handleFullscreenExpandStart);
    //
    // dispatcher.addEventListener(DoubleClickEventEnum.HIDDEN, this.handleHidden);
    // dispatcher.addEventListener(DoubleClickEventEnum.INTERACTION, this.handleInteraction);
    // dispatcher.addEventListener(DoubleClickEventEnum.ORIENTATION, this.handleOrientation);
    // dispatcher.addEventListener(DoubleClickEventEnum.PAGE_LOADED, this.handlePageLoaded);
    // dispatcher.addEventListener(DoubleClickEventEnum.VISIBLE, this.handleVisible);

    this.animation = new Animation(document.querySelector('.banner'))
  }

  /**
   * Dispatched when an exit is invoked.
   */
  handleExit = () => {

  };

  handleInit = () => {};

  /**
   * Called when visible
   */
  handleVisible = () => {};

  /**
   * Called when the creative has begun expanding. This gets dispatched when a user calls
   * studio.Enabler#requestExpand() or when the rendering environment has initiated expanding the creative.
   */
  handleExpandStart = () => {};

  /**
   * Dispatched when the creative has finished expanding.
   */
  handleExpandFinish = () => {};

  handleCollapse = () => {};

  handleCollapseStart = () => {};

  /**
   * Called when the ad is hidden from the user. This is useful for environments where the ad is rendered offscreen and displayed to the user at a later time, then possibly hidden.
   */
  handleHidden = () => {};

  /**
   * Dispatched when an interaction occurs.
   */
  handleInteraction = () => { };

  /**
   * Dispatched when orientation and/or orientation degrees change.
   */
  handleOrientation = () => {};

  handlePageLoaded = () => { };

  /**
   * Dispatched when the creative should begin collapsing. This gets dispatched when a user
   * calls studio.Enabler#requestCollapse() or when the rendering environment has started to collapsed the creative
   */
  handleCollapseFinish = () => {};


  handleFullscreenExpandStart = () => { };

  handleFullscreenExpandFinish = () => {};

  /**
   * Dispatched when the creative should begin collapsing from fullscreen state to collapsed state.
   */
  handleFullscreenCollapseStart = () => {};

  /**
   * Dispatched when the creative has finished collapsing from fullscreen state to collapsed state.
   */
  handleFullscreenCollapseFinish = () => {};

  async start(){
    await this.init();

    // put your start code here
    this.animation.play();
  }
}
