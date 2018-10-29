import Entity from '@mediamonks/temple/Entity';

class Banner extends Entity {

  constructor() {
    super();


  }

  init() {
    return super.init().then(() => {

    })
  }
}

const banner = new Banner();
banner.init();
