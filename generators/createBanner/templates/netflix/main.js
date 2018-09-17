import Entity from '@mediamonks/temple/Entity';
import config from './.richmediarc';

class Banner extends Entity {
  /**
   *
   * @type {{entry: {js: string, html: string}, size: {width: number, height: number}}|settings|{entry, size}|module:cluster.ClusterSettings|*|{}}
   */
  settings = config.settings;

  constructor() {
    super();
  }

  async init() {
    await super.init();
  }
}

const banner = new Banner();
banner.init();
