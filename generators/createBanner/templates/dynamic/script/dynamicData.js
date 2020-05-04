export default class dynamicData {

  constructor (banner) {
    this.banner = banner;
  }

  async get() {
    const bannerSize = `${this.banner.config.settings.size.width}x${this.banner.config.settings.size.height}`;

    /*

     /// Paste DC Dynamic Code HERE ///

    */

   await this.set();
  }

  async set() {
    /*

     /// Assign all dynamic data to DOM elements HERE ///

    */

   this.banner.mainExit = "http://www.mediamonks.com";
  }
}
