import Entity from '@mediamonks/temple/Entity';

export default class Banner extends Entity {

  constructor() {
    super();

    // add required components here
  }

  async start(){
    await this.init();
  }
}

