import Entity from '@mediamonks/temple/Entity';
import ConfigComponent from '@mediamonks/temple/component/ConfigComponent';
import SizmekPlatformComponent from '@mediamonks/temple/component/platform/SizmekPlatformComponent';
import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';

export default class Banner extends Entity {
  constructor(config) {
    super();

    // add required components here
    if (config) {
      this.addComponent(new ConfigComponent(config));
    }

    this.addComponent(new SizmekPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    this.onAllComponentsLoaded();
  }

  //automatically called when all components are loaded
  onAllComponentsLoaded = () => {
    console.log("onStart");
    window.creativeId = 'DeluxeBanner';
    window.creativeVersion = '2.0.0';
    window.lastModified = '2017-11-01';
    window.lastUploaded = '2017-11-01';
    window.templateVersion = '2.0.24';
    window.templateName = 'cf_deluxe_banner_basic_1x1_' + window.creativeVersion + '_6266'; // cf_[format_name]_[template_name]_[wxh]_version_BlockID
    window.dimensions;
    window.scrollPos = {
      x: 0,
      y: 0,
    };

    window.bannerDiv;
    window.adId, window.rnd, window.uid;

    window.addEventListener(
      'message',
      function() {
        try {
          this.eventManager.apply(this, arguments);
        } catch (e) {}
      },
      false,
    );

    this.initializeCreative();


  };

  exit = () => {
    console.log(EB);
    window.open('https://www.google.com', '_blank');
  };

  /**
   * When client clicks this function will be triggerd.
   */
  handleClick = () => {
    this.exit();
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {};

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {};

  initializeCreative(event) {
    try {
      //try/catch just in case localPreview.js is not included
      if (window.localPreview) {
        window.initializeLocalPreview(); //in localPreview.js
      }
    } catch (e) {}

    // so messaging can work in safe frames we need to bind the events that are present in the event manager.
    EBG.pm.bind(
      'sendCreativeId',
      function() {
        this.eventManager.apply(this, arguments);
      },
      this,
    );
    EBG.pm.bind(
      'eventCallback',
      function() {
        this.eventManager.apply(this, arguments);
      },
      this,
    );

    //Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
    typeof Modernizr == 'object' && (Modernizr.touch = Modernizr.touch || 'ontouchstart' in window);

    this.initializeGlobalVariables();
    window.registerInteraction = function() {}; //overwrite rI function because it will never actually be called
    this.addEventListeners();
    this.displayDimensions();

    this.setCreativeVersion();
  }

  initializeGlobalVariables() {
    window.adId = EB._adConfig.adId;
    window.rnd = EB._adConfig.rnd;
    window.uid = EB._adConfig.uid;
    window.bannerDiv = document.getElementById('banner');
    window.dimensions = document.getElementById('dimensions');

    window.listenerQueue;
    window.creativeIFrameId;
  }

  addEventListeners() {
    this.domMainExit = document.body.querySelector('.mainExit');

    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    window.addEventListener('resize', this.displayDimensions);
  }

  /*******************
   EVENT HANDLERS
   *******************/
  handleClick(event) {
    EB.clickthrough();
  }

  onPageScroll(event) {
    // use scrollPos anywhere to know the current x/y coordinates.
    scrollPos.x = event.scrollXPercent;
    scrollPos.y = event.scrollYPercent;
    displayDimensions();
  }

  /*******************
   UTILITIES
   *******************/

  displayDimensions() {
    if (dimensions) {
      var iw = window.innerWidth,
        ih = window.innerHeight,
        sx = scrollPos.x,
        sy = scrollPos.y;
      var str = iw + 'x' + ih + ' | Scroll (X: ' + sx + '%; Y: ' + sy + '%)';
      dimensions.innerHTML = str;
    }
  }

  setCreativeVersion() {
    this.sendMessage('setCreativeVersion', {
      creativeId: window.creativeId + ' - ' + window.templateName,
      creativeVersion: window.creativeVersion,
      creativeLastModified: window.lastModified,
      uid: window.uid,
    });
  }

  /*********************************
   HTML5 Event System - Do Not Modify
   *********************************/

  sendMessage(type, data) {
    //note: the message type we're sending is also the name of the inside
    //		the custom script's messageHandlers object, so the case must match.

    if (!data.type) data.type = type;
    EB._sendMessage(type, data);
  }

  addCustomScriptEventListener(eventName, callback, interAd) {
    window.listenerQueue = window.listenerQueue || {};
    var data = {
      uid: uid,
      listenerId: Math.ceil(Math.random() * 1000000000),
      eventName: eventName,
      interAd: !!interAd,
      creativeIFrameId: creativeIFrameId,
    };
    this.sendMessage('addCustomScriptEventListener', data);
    data.callback = callback;
    window.listenerQueue[data.listenerId] = data;
    return data.listenerId;
  }

  dispatchCustomScriptEvent(eventName, params) {
    params = params || {};
    params.uid = uid;
    params.eventName = eventName;
    params.creativeIFrameId = creativeIFrameId;
    this.sendMessage('dispatchCustomScriptEvent', params);
  }

  removeCustomScriptEventListener(listenerId) {
    var params = {
      uid: uid,
      listenerId: listenerId,
      creativeIFrameId: creativeIFrameId,
    };

    this.sendMessage('removeCustomScriptEventListener', params);
    if (window.listenerQueue[listenerId]) delete window.listenerQueue[listenerId];
  }

  eventManager(event) {
    var msg;
    if (typeof event == 'object' && event.data) {
      msg = JSON.parse(event.data);
    } else {
      // this is safe frame.
      msg = {
        type: event.type,
        data: event,
      };
    }
    if (msg.type && msg.data && (!uid || (msg.data.uid && msg.data.uid == uid))) {
      switch (msg.type) {
        case 'sendCreativeId':
          window.creativeIFrameId = msg.data.creativeIFrameId;
          this.addCustomScriptEventListener('pageScroll', this.onPageScroll);
          this.sendMessage('dispatchScrollPos', {
            uid: uid,
          });
          if (creativeContainerReady) creativeContainerReady();
          break;
        case 'eventCallback': // Handle Callback
          var list = msg.data.listenerIds;
          var length = list.length;
          for (var i = 0; i < length; i++) {
            try {
              var t = window.listenerQueue[list[i]];
              if (!t) continue;
              t.callback(msg.data);
            } catch (e) {}
          }
          break;
      }
    }
  }

  async start() {
    await this.init();
  }
}
