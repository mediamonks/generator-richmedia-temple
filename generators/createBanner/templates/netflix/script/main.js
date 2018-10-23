import Entity from '@mediamonks/temple/Entity';
import EventDispatcherComponent from "@mediamonks/temple/component/EventDispatcherComponent";
import MonetPlatformComponent from "@mediamonks/temple/component/platform/MonetPlatformComponent";
import DoubleClickPlatformComponent from "@mediamonks/temple/component/platform/DoubleClickPlatformComponent";
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";

import config from '../.richmediarc';

class Banner extends Entity {

  constructor() {
    super();

    this.addComponent(new ConfigComponent(config));
    this.addComponent(new MonetPlatformComponent());
    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    // EventDispatcherComponent is added by DoubleClickPlatformComponent
    const dispatcher = this.getComponent(EventDispatcherComponent);
  }
}

const banner = new Banner();
banner.init();
