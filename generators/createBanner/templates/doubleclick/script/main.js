import Entity from '@mediamonks/temple/Entity';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import EventDispatcherComponent from "@mediamonks/temple/component/EventDispatcherComponent";
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";
import DoubleClickEventEnum from "@mediamonks/temple/event/DoubleClickEventEnum";

import config from '../.richmediarc';

class Banner extends Entity {

  constructor() {
    super();

    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new ConfigComponent(config));
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    // EventDispatcherComponent is added by DoubleClickPlatformComponent
    const dispatcher = this.getComponent(EventDispatcherComponent);

    // listening to events that are being dispatched by DoubleClick through DoubleClickPlatformComponent
    dispatcher.addEventListener(DoubleClickEventEnum.DC_INIT, this.handleInit);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_EXIT, this.handleExit);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_COLLAPSE, this.handleCollapse);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_COLLAPSE_FINISH, this.handleCollapseFinish);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_COLLAPSE_START, this.handleCollapseStart);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_EXPAND_FINISH, this.handleExpandFinish);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_EXPAND_START, this.handleExpandStart);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_COLLAPSE_FINISH, this.handleFullscreenCollapseFinish);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_COLLAPSE_START, this.handleFullscreenCollapseStart);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_DIMENSIONS, this.handleFullscreenDimensions);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_EXPAND_FINISH, this.handleFullscreenExpandFinish);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_EXPAND_START, this.handleFullscreenExpandStart);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_FULLSCREEN_SUPPORT, this.handleFullscreenSupport);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_HIDDEN, this.handleHidden);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_INTERACTION, this.handleInteraction);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_ORIENTATION, this.handleOrientation);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_PAGE_LOADED, this.handlePageLoaded);
    dispatcher.addEventListener(DoubleClickEventEnum.DC_VISIBLE, this.handleVisible);
  }

  /**
   * Dispatched when an exit is invoked.
   */
  handleExit = () => {};

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

  handleFullscreenSupport = () => {};

  /**
   * Indicates the maximum dimensions available to the creative for
   * fullscreen expansion, as well as the offset of the original creative.
   */
  handleFullscreenDimensions = () => {};

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
}

const banner = new Banner();
banner.init();
