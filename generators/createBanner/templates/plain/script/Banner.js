import Entity from '@mediamonks/temple/Entity';
import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";

export default class Banner extends Entity {

  constructor(config) {
    super();

    // add required components here
    if(config){
      this.addComponent(new ConfigComponent(config))
    }
  }

  async start(){
    await this.init();
  }
}

