export default class dynamicData {

  constructor (banner) {
    this.banner = banner;
  }

  async get() {
    /*

     /// Paste DC Dynamic Code HERE ///
     //// you can check the example setup here https://www.google.com/doubleclick/studio/#campaign:advertiserId=60013113&campaignId=60263003
    */

    Enabler.setProfileId(10600049);
    var devDynamicContent = {};

    devDynamicContent.generator_richmedia_temple_framework_test_feed_main = [{}];
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0]._id = 0;
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].id = 0;
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].reporting_label = "test_0";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].default = true;
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].active = true;
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].version = ["0"];
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].text = "Welcome to this 0 Banner!";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].logo = {};
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].logo.Type = "file";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].logo.Url = "https://s0.2mdn.net/ads/richmedia/studio/33345/33345_20210113054941196_logo.svg";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].cta = "Click here";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].bgcolor = "#FFFFFF";
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].exit_url = {};
    devDynamicContent.generator_richmedia_temple_framework_test_feed_main[0].exit_url.Url = "http://www.google.com";
    Enabler.setDevDynamicContent(devDynamicContent);


    return window.dynamicContent;
  }
}
