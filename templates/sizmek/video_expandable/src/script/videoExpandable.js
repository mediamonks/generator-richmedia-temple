//******************************************************************************
// This class is part of the Sizmek Video Expandable Format
// ALL RIGHTS RESERVED TO © 2018 Sizmek.
//******************************************************************************
//******************************************************************************
(function () {
  window.videoExpandable = function (_c) {
    "use strict";
    /*******************
     VARIABLES
     *******************/
    var config = _c;
    var creativeId;
    var scriptName = "videoExpandable";
    var creativeVersion = "2.1.0";
    var lastModified = "2018-08-08";
    var lastUploaded = "2018-08-08";

    var templateVersion = "2.0.24";
    var dimensions;
    var scrollPos = {
      x: 0,
      y: 0
    };
    var isDebug = false;
    var listenerQueue;
    var creativeIFrameId;

    var adId;
    var rnd;
    var uid;

    var localPreview = false;
    /*******************
     CONSTANTS
     *******************/
    var SOCIAL_TOOLBAR_HEIGHT = 35;
    var EXPAND_BUTTON_HEIGHT = 30;
    var SHADOW_HEIGHT = 7;
    var PROGRESS_BAR_HEIGHT = 2;
    //*************************/

    var AUDIO_BEHAVIOR_CLICK_TO_UNMUTE = 1;
    var AUDIO_BEHAVIOR_MOUSEOVER_WHEN_EXPANDED_TO_UNMUTE = 2;
    var AUDIO_BEHAVIOR_MOUSEOVER_TO_UNMUTE = 3;

    var EXPANSION_LEFT_TO_RIGHT = 1;
    var EXPANSION_AUTO_DETECT = 3;
    var CLOSE_BUTTON_POSITION_NORMAL = 1;
    var EXPANSION_MOUSE = 2;
    ///////////////////////
    ////custom variables///
    var mdIsAutoExpand = false; //Default: false
    var mdAutoCollapseTimer = 0; //Default: 0
    var mdcbAudioBehavior = 1; //Default: 1
    var mdcbCloseBtnPos = 1; //Default:1
    var mdcbExpDir = EXPANSION_AUTO_DETECT; //Default: 3
    var mdcbExpType = 1; //Default: 1
    var mdcbVideoLoop = 0; //Default: 0
    var mdCollapseShowShadow = true; //Default: true
    var mdCollapseSwitchElements = false; //Default: false
    var mdCollapseToolbarFullWidth = true; //Default: true
    var mdCollapseVideoDimHeight = 0; //Default: 0
    var mdCollapseVideoDimWidth = 0; //Default: 0
    var mdCollapseVideoPositionX = 0; //Default: 0
    var mdCollapseVideoPositionY = 0; //Default: 0
    var mdCollapseVideoRatio = true; //Default: true, //Default: true
    var mdConfiguration = "TOP_BOTTOM"; // Default: "TOP_BOTTOM"
    var mdConfigurationBgColor = "image"; //Default: "image"
    var mdConfigurationControllerColor = "#FFFFFF"; //Default: "#FFFFFF"
    var mdConfigurationEnableLogo = true; //Default: true
    var mdConfigurationProgressbarColor = "#FFFFFF"; //Default: "#FFFFFF"
    var mdConfigurationToolbarColorSet = "positive"; //Default: "positive"
    var mdDefaultBannerX = 0; //Default: 0
    var mdDefaultBannerY = 0; //Default: 0
    var mdExpDimHeight = 500; //Default: 500
    var mdExpDimWidth = 728; //Default: 728
    var mdExpToolbarFullWidth = true; //Default: true
    var mdExpVideoDimHeight = 281; //Default: 281
    var mdExpVideoDimWidth = 500; //Default: 500
    var mdExpVideoPositionX = "center"; //Default: "center"
    var mdExpVideoPositionY = "center"; //Default: " center"
    var mdExpVideoRatio = false; //Default: false
    var mdSpeedExpandAnimation = "default"; //Default: "default"
    //////////////////////////
    var videoTrackingModule;
    var collapsedWidth = 300;
    var collapsedHeight = 250;
    var widthPixels;
    var heightPixels;

    var vidStyle = {};
    var socialToolbarPositioning = {};
    var progressBarPositioning = {};
    var container;
    var panelBackground;
    var closeButton;
    var video;
    var videoContainer;
    var progressBarTrack;
    var progressBar;
    var muteButton;
    var playButton;
    var replayButton;
    var expandButton;
    var socialToolbar;
    var imageBackground = false;
    var animationLength = 0.6;
    var animationSteps = 20;
    var currentVideoLoop = 0;
    var timeoutID;
    var timeoutMouseOut;
    var isAnimationEnabled = false;
    //Additional Assets
    var video_mp4_localPath; //ID:1
    var video_poster_localPath; //ID:2
    var imageName_default_localPath; //ID:3
    var imageName_expand_localPath; //ID:4
    var imageName_loading_localPath; //ID:5
    var imageName_logo_positive; //ID:6
    var imageName_logo_negative; //ID:7
    var imageName_mobile_landscape_localPath; //ID:8
    var imageName_mobile_portrait_localPath; //ID:9

    var svKVPairs = {};

    var isIOS = false;
    var isTablet = false;
    var isAndroid = false;
    var isChrome = false;
    var isIE = false;
    var isIEVersion = 0;
    var isMobile = false;
    var isUserInitiated = false;
    var localPathAssets;
    /*******************
     VARIABLES
     *******************/
    /*******************
     INITIALIZATION
     *******************/
    var registerInteraction = function () {
      EB.userActionCounter("pua-facebook-LANDING");
      EB.userActionCounter("pua-twitter-SHARE");
      EB.userActionCounter("pua-twitter-LANDING");
      EB.userActionCounter("pua-youtube-LANDING");
      EB.userActionCounter("pua-pinterest-SHARE");
      EB.userActionCounter("pua-pinterest-LANDING");
      EB.userActionCounter("pua-linkedin-SHARE");
      EB.userActionCounter("pua-linkedin-LANDING");
      EB.userActionCounter("pua-instagram-LANDING");
      EB.userActionCounter("pua-email-SHARE");
    };

    // Create Event Handlers for class
    var addEventListener = function (_e, _m, _b) {
      window.addEventListener(_e, _m, _b);
    };

    // Remove Event Handlers for class
    var removeEventListener = function (_e, _m, _b) {
      window.removeEventListener(_e, _m, _b);
    };

    window.addEventListener("message", function () {
      try {
        eventManager.apply(this, arguments);
      }
      catch (e) {}
    }, false);

    //force to load the config.js
    if (typeof adkit.environment !== "undefined" && adkit.environment.paths.folderRoot.indexOf("file:") !== -1) {
      adkit.environment.adParts = {
        adkitConfigUrl: adkit.environment.paths.folderRoot + "/../../config.js?"
      };
    }
    // Call Init Method once AdKit is loaded
    function checkIfAdKitReady(event) {
      try {
        if(window.localPreview) {
          window.initializeLocalPreview(); //in localPreview.js
          initializeCreative();
          return;
        }
      }
      catch(e) {}
      adkit.onReady(initializeCreative);
    }

    window.addEventListener("load", checkIfAdKitReady);

    var initializeCreative = function () {
      try {
        localPreview = document.location === top.location;
      } catch(e) {}
      //by default will be "banner"
      if (typeof config == "undefined") {
        config = {
          panel: "banner"
        };
      }

      creativeId = typeof config.panel !== "undefined" && config.panel !== "" ? config.panel : "banner";

      //Variables only for local testing
      imageName_loading_localPath = typeof config.imageName_loading_localPath !== "undefined" && config.imageName_loading_localPath !== "" ? config.imageName_loading_localPath : "companion_300x250_loading.jpg";
      imageName_default_localPath = typeof config.imageName_default_localPath !== "undefined" && config.imageName_default_localPath !== "" ? config.imageName_default_localPath : "companion_300x250_default.jpg";
      imageName_expand_localPath = typeof config.imageName_expand_localPath !== "undefined" && config.imageName_expand_localPath !== "" ? config.imageName_expand_localPath : "companion_300x250_expand.jpg";
      imageName_logo_positive = typeof config.imageName_logo_positive !== "undefined" && config.imageName_logo_positive !== "" ? config.imageName_logo_positive : "logo_positive.svg";
      imageName_logo_negative = typeof config.imageName_logo_negative !== "undefined" && config.imageName_logo_negative !== "" ? config.imageName_logo_negative : "logo_negative.svg";
      imageName_mobile_landscape_localPath = typeof config.imageName_mobile_landscape_localPath !== "undefined" && config.imageName_mobile_landscape_localPath !== "" ? config.imageName_mobile_landscape_localPath : "mobile_landscape_960x640.jpg";
      imageName_mobile_portrait_localPath = typeof config.imageName_mobile_portrait_localPath !== "undefined" && config.imageName_mobile_portrait_localPath !== "" ? config.imageName_mobile_portrait_localPath : "mobile_portrait_640x960.jpg";

      video_mp4_localPath = typeof config.video_mp4_localPath !== "undefined" && config.video_mp4_localPath !== "" ? config.video_mp4_localPath : "video.mp4";
      video_poster_localPath = typeof config.video_poster_localPath !== "undefined" && config.video_poster_localPath !== "" ? config.video_poster_localPath : "sizmek_poster.png";
      try {
        // so messaging can work in safe frames we need to bind the events that are present in the event manager.
        EBG.pm.bind("sendCreativeId", function () {
          eventManager.apply(this, arguments);
        }, this);
        EBG.pm.bind("eventCallback", function () {
          eventManager.apply(this, arguments);
        }, this);
      }
      catch (e) {}
      //Workaround (from QB6573) for Async EB Load where Modernizr isn't properly initialized
      typeof Modernizr == "object" && (Modernizr.touch = Modernizr.touch || "ontouchstart" in window);

      initializeGlobalVariables();
      window.registerInteraction = function () {}; //overwrite rI function because it will never actually be called
    };

    var initializeGlobalVariables = function () {
      log("initializeGlobalVariables: creativeId: "+ creativeId +" | LOCAL: " + localPreview  );
      adId = EB._adConfig.adId;
      rnd = EB._adConfig.rnd;
      uid = EB._adConfig.uid;

      isMobile = EB.API.os.mobile;
      isIOS = EB.API.os.ios;
      isAndroid = EB.API.os.android;
      var isTabletAndroid = (EB.API.os.ua.toLowerCase().indexOf("mobile") == -1 && isAndroid) ? true : false;
      isTablet = (EB.API.os.ipad || isTabletAndroid) ? true : false;

      isIE = EB.API.browser.ie;
      isIEVersion = EB.API.browser.ver;
      isChrome = EB.API.browser.chrome;

      if (!localPreview) {
        collapsedWidth = EB.API.getAdData("width");
        collapsedHeight = EB.API.getAdData("height");
      }
      if(!isChrome && localPreview){
        localPathAssets = "../../../";
      }else{
        localPathAssets = "../../";
      }

      switch (creativeId) {
        case "banner":
          if(localPreview)top.location.replace("panels/expand/index.html", "self");
          addCSSRule(document.styleSheets[0], "#banner-background", "background-image: url(\"" + EB.getAssetUrl("AdditionalAssets/" + imageName_loading_localPath, 5) + "\"); width: " + EBG.px(collapsedWidth) + "; height: " + EBG.px(collapsedHeight));
          break;
        case "expand":
          addCustomScriptEventListener("onOrientationChange", onOrientationChange);
          readCustomVars();
          validateCustomVars();

          collapsedHeight = collapsedHeight - (mdCollapseShowShadow ? SHADOW_HEIGHT : 0);

          container = document.getElementById("container");
          panelBackground = document.getElementById("panel-background");
          closeButton = document.getElementById("close-button");
          video = document.getElementById("video");
          videoContainer = document.getElementById("video-container");
          progressBarTrack = document.getElementById("progress-bar-track");
          progressBar = document.getElementById("progress-bar");
          playButton = document.getElementById("play-pause");
          replayButton = document.getElementById("replay");
          muteButton = document.getElementById("mute");
          expandButton = document.getElementById("expand-button");
          socialToolbar = document.getElementById("social-toolbar");

          widthPixels = mdExpDimWidth;
          heightPixels = mdExpDimHeight;

          if(isMobile && !isTablet){
            //for Mobile only
            mdExpDimWidth = "100%";
            mdExpDimHeight = "100%";
          }
          handleSVData();
          trackVideoInteractions();
          addEventListeners();
          setColorSet();
          preloadLogo();
          positionCreative();
          showCreative();
          break;
      }
    };

    var onOrientationChange = function (e){
      if(localPreview && isMobile){
        setTimeout(function () {
          widthPixels = document.documentElement.clientWidth;
          heightPixels =  document.documentElement.clientHeight;
          positionContainer();
          positionVideo();
          positionToolbarAndExpand();
        }, 100);
      }else{
        widthPixels = e.mdExpDimWidth;
        heightPixels = e.mdExpDimHeight;
        positionContainer();
        positionVideo();
        positionToolbarAndExpand();
      }

    };

    var readCustomVars = function () {
      mdIsAutoExpand = EB.API.getCustomVar("mdIsAutoExpand");
      mdAutoCollapseTimer = EB.API.getCustomVar("mdAutoCollapseTimer");
      mdcbAudioBehavior = EB.API.getCustomVar("mdcbAudioBehavior");
      mdcbCloseBtnPos = EB.API.getCustomVar("mdcbCloseBtnPos");
      mdcbExpDir = EB.API.getCustomVar("mdcbExpDir");
      mdcbExpType = EB.API.getCustomVar("mdcbExpType");
      mdcbVideoLoop = EB.API.getCustomVar("mdcbVideoLoop");
      mdCollapseShowShadow = EB.API.getCustomVar("mdCollapseShowShadow");
      mdCollapseSwitchElements = EB.API.getCustomVar("mdCollapseSwitchElements");
      mdCollapseToolbarFullWidth = EB.API.getCustomVar("mdCollapseToolbarFullWidth");
      mdCollapseVideoDimHeight = EB.API.getCustomVar("mdCollapseVideoDimHeight");
      mdCollapseVideoDimWidth = EB.API.getCustomVar("mdCollapseVideoDimWidth");
      mdCollapseVideoPositionX = EB.API.getCustomVar("mdCollapseVideoPositionX");
      mdCollapseVideoPositionY = EB.API.getCustomVar("mdCollapseVideoPositionY");
      mdCollapseVideoRatio = EB.API.getCustomVar("mdCollapseVideoRatio");
      mdConfiguration = EB.API.getCustomVar("mdConfiguration");
      mdConfigurationBgColor = EB.API.getCustomVar("mdConfigurationBgColor");
      mdConfigurationControllerColor = EB.API.getCustomVar("mdConfigurationControllerColor");
      mdConfigurationEnableLogo = EB.API.getCustomVar("mdConfigurationEnableLogo");
      mdConfigurationProgressbarColor = EB.API.getCustomVar("mdConfigurationProgressbarColor");
      mdConfigurationToolbarColorSet = EB.API.getCustomVar("mdConfigurationToolbarColorSet");
      mdDefaultBannerX = EB.API.getCustomVar("mdDefaultBannerX");
      mdDefaultBannerY = EB.API.getCustomVar("mdDefaultBannerY");
      mdExpDimHeight = EB.API.getCustomVar("mdExpDimHeight");
      mdExpDimWidth = EB.API.getCustomVar("mdExpDimWidth");
      mdExpToolbarFullWidth = EB.API.getCustomVar("mdExpToolbarFullWidth");
      mdExpVideoDimHeight = EB.API.getCustomVar("mdExpVideoDimHeight");
      mdExpVideoDimWidth = EB.API.getCustomVar("mdExpVideoDimWidth");
      mdExpVideoPositionX = EB.API.getCustomVar("mdExpVideoPositionX");
      mdExpVideoPositionY = EB.API.getCustomVar("mdExpVideoPositionY");
      mdExpVideoRatio = EB.API.getCustomVar("mdExpVideoRatio");
      mdSpeedExpandAnimation = EB.API.getCustomVar("mdSpeedExpandAnimation");
    };

    var validateCustomVars = function () {
      log("validateCustomVars");
      if (mdAutoCollapseTimer < 0) mdAutoCollapseTimer = 0;
      if (mdCollapseVideoDimHeight < 0) mdCollapseVideoDimHeight = 0;
      if (mdCollapseVideoDimWidth < 0) mdCollapseVideoDimWidth = 0;
      if (mdCollapseVideoPositionX < 0 && mdConfiguration.indexOf("FULLVIDEO") == -1) mdCollapseVideoPositionX = 0;
      if (mdCollapseVideoPositionY < 0) mdCollapseVideoPositionY = 0;
      if (mdConfiguration != "TOP" && mdConfiguration != "BOTTOM" && mdConfiguration != "TOP_FULLVIDEO" && mdConfiguration != "BOTTOM_FULLVIDEO" && mdConfiguration != "TOP_BOTTOM" && mdConfiguration != "TOP_BOTTOM_FULLVIDEO") mdConfiguration = "TOP_BOTTOM";
      if (mdDefaultBannerX < 0) mdDefaultBannerX = 0;
      if (mdDefaultBannerY < 0) mdDefaultBannerY = 0;
      if (mdExpDimHeight < 0) mdExpDimHeight = 0;
      if (mdExpDimWidth < 0) mdExpDimWidth = 0;
      if (mdExpVideoDimHeight < 0) mdExpVideoDimHeight = 0;
      if (mdExpVideoDimWidth < 0) mdExpVideoDimWidth = 0;
      if (mdcbAudioBehavior < 1 && mdcbAudioBehavior > 3) mdcbAudioBehavior = AUDIO_BEHAVIOR_CLICK_TO_UNMUTE;
      if (mdcbCloseBtnPos < 1 && mdcbCloseBtnPos > 2) mdcbCloseBtnPos = CLOSE_BUTTON_POSITION_NORMAL;
      if (mdcbExpDir < 1 && mdcbExpDir > 3) mdcbExpDir = EXPANSION_AUTO_DETECT;
      if (mdcbExpType < 1 && mdcbExpType > 2) mdcbExpType = 1;
      if (mdConfigurationToolbarColorSet.toLowerCase() !== "negative" && mdConfigurationToolbarColorSet.toLowerCase() !== "positive") mdConfigurationToolbarColorSet = "positive";
      switch (mdSpeedExpandAnimation.toLowerCase()) {
        case "fast":
          animationLength = 0.1;
          animationSteps = 20;
          break;
        case "slow":
          animationLength = 1;
          animationSteps = 80;
          break;
        case "default":
        default:
          animationLength = 0.6;
          animationSteps = 40;
          break;
      }
    };

    var handleSVData = function () {
      svKVPairs = {
        "GLOBAL-facebook-LANDING-url": "none",
        "GLOBAL-twitter-SHARE-url": "none",
        "GLOBAL-twitter-LANDING-url": "none",
        "GLOBAL-youtube-LANDING-url": "none",
        "GLOBAL-pinterest-SHARE-url": "none",
        "GLOBAL-pinterest-LANDING-url": "none",
        "GLOBAL-linkedin-SHARE-url": "none",
        "GLOBAL-linkedin-LANDING-url": "none",
        "GLOBAL-instagram-LANDING-url": "none",
        "GLOBAL-email-SHARE-url": "none"
      };
      if(localPreview) svKVPairs = EB._adConfig.svKVPairs;
      for (var key in svKVPairs) {
        if (svKVPairs.hasOwnProperty(key)) {
          try {
            svKVPairs[key] = adkit.getSVData(key);
          }
          catch (e) {}
        }
      }
    };

    var addEventListeners = function () {
      closeButton.addEventListener("click", clickToCollapse);
      playButton.addEventListener("click", playToggle);
      replayButton.addEventListener("click", playToggle);
      muteButton.addEventListener("click", muteToggle);
      video.addEventListener("ended", handleVideoEnd);
      video.addEventListener("click", handleVideoClick);
      if (mdcbAudioBehavior == AUDIO_BEHAVIOR_MOUSEOVER_WHEN_EXPANDED_TO_UNMUTE || mdcbAudioBehavior == AUDIO_BEHAVIOR_MOUSEOVER_TO_UNMUTE) {
        container.addEventListener("mousemove", makeUnmuteFromMouseover);
      }
      video.addEventListener("timeupdate", updateProgressbar);
      video.addEventListener("pause", updateVideoControls);
      video.addEventListener("play", updateVideoControls);
      video.addEventListener("playing", updateVideoControls);
      video.addEventListener("volumechange", updateVideoControls);
      expandButton.addEventListener("click", clickExpand);
      if (mdcbExpType == EXPANSION_MOUSE && !isMobile) {
        expandButton.addEventListener("mouseover", mouseoverExpand);
      }
      var curId, curEl, curImageName, regexID, regexImage;
      regexID = /GLOBAL-(.*)-url/;
      regexImage = /GLOBAL-(.*)-(?:SHARE|LANDING)-url/;
      for (var key in svKVPairs) {
        if (svKVPairs[key] != 'none') {
          curId = key.match(regexID)[1];
          curEl = document.getElementById(curId);
          addClass(curEl, "enabled");
          curImageName = key.match(regexImage)[1];
          preload(
            'images/social/' + curImageName.toUpperCase() + '_OFF.png',
            'images/social/' + curImageName.toUpperCase() + '_ON.png'
          );
          // closure to keep the value of svKVPairs[key] in the clickthrough
          curEl.addEventListener("click", (function () {
            var myClickthrough = svKVPairs[key];
            var userAction = "pua-" + curId;
            return function () {
              var e = arguments[0] || window.event;
              pauseVideos();
              EB.userActionCounter(userAction, myClickthrough);
              stopBubbling(e);
            };
          })());
        }
      }
    };

    var setColorSet = function () {
      if (mdConfigurationToolbarColorSet == "positive")
        addClass(document.getElementById("panel"), "positive");
      else
        addClass(document.getElementById("panel"), "negative");
    };

    var preload = function () {
      var images = [];
      for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        if (arguments[i] == EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_logo_positive, 6)) { // handler to get width of logo to put it into CSS
          images[i].addEventListener("load", function () {
            addCSSRule(document.styleSheets[0], "#logo", "width: " + EBG.px(this.width) + ";");
          });
        }
        images[i].src = arguments[i];
      }
    };

    var preloadLogo = function () {
      if (mdConfigurationEnableLogo) {
        preload(
          EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_logo_positive, 6)
        );
      }
    };

    var positionCreative = function () {
      addSourceToVideo(video, EB.getAssetUrl("../../AdditionalAssets/" + video_mp4_localPath, 1), "video/mp4");
      video.setAttribute('poster', EB.getAssetUrl("../../AdditionalAssets/" + video_poster_localPath, 2));
      positionContainer();
      positionVideo();
      positionToolbarAndExpand();
      addPlayVolumeControls();
      if (isIOS && isMobile) {
        addCSSRule(document.styleSheets[0], "#mute", "display: none !important;");
      }
      addClass(container, "collapsed");
      addCompanionEvents("collapsed");
    };

    var showCreative = function () {
      log("showCreative: creativeId: "+ creativeId +" | LOCAL: " + localPreview  );
      isFunctionCallBack("afterShowCreative", {});
      container.style.visibility = "visible";

      if (isAndroid || (isIE && isIEVersion == 9) ) {
        video.addEventListener("play", handleFirstPlayToMute);
      }
      if (mdcbVideoLoop !== 0) {
        if(isUserInitiated){
          videoTrackingModule.playVideo(true);
        }else{
          video.play();
        }
      }
      if (mdIsAutoExpand){
        expand(null, EBG.ActionType.AUTO);
      }else{

      }
    };

    var getVideos = function () {
      var videos = document.getElementsByTagName("video");
      return videos;
    };

    var pauseVideos = function () {
      var videos = getVideos();
      for (var i = 0; i < videos.length; i++) {
        videos[i].pause();
      }
    };

    var addSourceToVideo = function (element, src, type) {
      var source = document.createElement('source');
      source.src = src;
      source.type = type;
      element.appendChild(source);
    };

    var makeMuteFromMouseout = function (event) {
      // mouseout will bubble, so make sure we're actually leaving the iframe, not some other element on the page
      if (event.relatedTarget == null) {
        muteToggle(null, true);
        container.removeEventListener("mouseout", makeMuteFromMouseout);
        container.addEventListener("mousemove", makeUnmuteFromMouseover);
      }

    };

    var makeUnmuteFromMouseover = function (event) {
      // mouseout will bubble, so make sure we're actually leaving the iframe, not some other element on the page
      if (event.relatedTarget == null) {
        if (mdcbAudioBehavior == AUDIO_BEHAVIOR_MOUSEOVER_WHEN_EXPANDED_TO_UNMUTE && !hasClass(container, "expanded")) return;
        muteToggle(null, false);
        container.removeEventListener("mousemove", makeUnmuteFromMouseover);
        container.addEventListener("mouseout", makeMuteFromMouseout);
      }

    };

    var handleVideoEnd = function (event) {
      isFunctionCallBack("afterVideoEnd", {isExpanded:hasClass(container, "expanded")});
      //if () collapse(null, EBG.ActionType.AUTO);
      if (mdcbVideoLoop == -1) {
        //eternal loop
        if(isUserInitiated){
          videoTrackingModule.playVideo(true);
        }else{
          video.play();
        }
      }
      else if (++currentVideoLoop < mdcbVideoLoop) {
        if(isUserInitiated){
          videoTrackingModule.playVideo(true);
        }else{
          video.play();
        }
      }
      else {
        updateVideoControls();
      }
    };

    var muteToggle = function (event, forceSilent) {
      clearTimeout(timeoutID);
      isUserInitiated = true;
      var e = arguments[0] || window.event;
      // Check if Video is Muted
      if (forceSilent === false || (forceSilent == null && video.muted)) {
        setTimeout(function () {
          isFunctionCallBack("videoUnMuted", {});
          // Unmute Video
          video.muted = false;
          // Change Mute Button
          removeClass(muteButton, "btn-mute-muted");
          addClass(muteButton, "btn-mute-unmuted");
        }, 300);
      }
      else if (forceSilent === true || (forceSilent == null && !video.muted)) {
        setTimeout(function () {
          isFunctionCallBack("videoMuted", {});
          // Mute Video
          video.muted = true;
          // Change Mute Button
          removeClass(muteButton, "btn-mute-unmuted");
          addClass(muteButton, "btn-mute-muted");
        },300);
      }
      stopBubbling(e);
    };

    var playToggle = function () {
      clearTimeout(timeoutID);
      isUserInitiated = true;
      var e = arguments[0] || window.event;
      // Check if Video is paused
      if (video.paused || video.ended) {
        // Play Video
        isFunctionCallBack("videoPlay", {});
        videoTrackingModule.playVideo(true);
      }
      else {
        isFunctionCallBack("videoPause", {});
        // Pause Video
        video.pause();
      }
      if (isIOS && isMobile) {
        muteToggle(null, false);
      }
      stopBubbling(e);
    };

    var expandAnimationComplete = function () {
      isAnimationEnabled=false;
      addCSSRule(document.styleSheets[0], "div.social.button.enabled", "display: block;");
      isFunctionCallBack("afterExpandAnimationComplete", {});
      if (imageBackground) {
        removeClass(container, "expandedImage");
      }
      addClass(container, "expanded");
      addCompanionEvents("expanded");
      if (mdcbAudioBehavior == AUDIO_BEHAVIOR_MOUSEOVER_WHEN_EXPANDED_TO_UNMUTE) container.addEventListener("mousemove", makeUnmuteFromMouseover);
      if (mdIsAutoExpand && mdAutoCollapseTimer > 0) {
        timeoutID = setTimeout(function () {
          collapse(null, EBG.ActionType.AUTO);
        }, mdAutoCollapseTimer * 1500);
      }
      if(localPreview && isMobile){
        window.addEventListener("orientationchange", onOrientationChange);
        onOrientationChange();
      }
    };

    var mouseoverExpand = function (event, expType) {
      isUserInitiated = true;
      isFunctionCallBack("onMouseOverExpand", {});
      EB.automaticEventCounter("MOUSE_TO_EXPAND");
      expand(event, expType);
    };

    var clickExpand = function (event, expType) {
      isUserInitiated = true;
      isFunctionCallBack("onClickExpand", {});
      var e = arguments[0] || window.event;
      EB.automaticEventCounter("CLICK_TO_EXPAND");
      expand(event, expType);
      stopBubbling(e);
    };

    var expand = function (event, expType) {
      isFunctionCallBack("beforeExpandAnimation", {});
      var e = arguments[0] || window.event;
      expType = expType || EBG.ActionType.USER;
      if(isMobile && !isTablet){
        //for Mobile only
        positionContainer();
        positionVideo();
        positionToolbarAndExpand();
        animationLength = 0;
        animationSteps = 2;
        EB.expand({
          panelName: "expand",
          actionType: expType
        });
      }else{
        //Desktop and Tablets
        EB.expand({
          panelName: "expand",
          actionType: expType
        });
      }

      var anims = {
        length: animationLength,
        steps: animationSteps,
        complete: expandAnimationComplete,
        sets: [
          {
            el: container,
            prop: "width",
            start: collapsedWidth,
            end: mdExpDimWidth
          },
          {
            el: container,
            prop: "height",
            start: collapsedHeight,
            end: mdExpDimHeight
          },
          {
            el: container,
            prop: "marginLeft",
            start: (mdcbExpDir) == EXPANSION_LEFT_TO_RIGHT ? (mdDefaultBannerX) : widthPixels - collapsedWidth - (mdDefaultBannerX),
            end: 0
          },
          {
            el: container,
            prop: "marginTop",
            start: mdDefaultBannerY,
            end: 0
          },
          {
            el: panelBackground,
            prop: "width",
            start: collapsedWidth,
            end: mdExpDimWidth
          },
          {
            el: panelBackground,
            prop: "height",
            start: collapsedHeight,
            end: mdExpDimHeight
          },
          {
            el: video,
            prop: "width",
            start: vidStyle.collapsed.width,
            end: vidStyle.expanded.width
          },
          {
            el: video,
            prop: "height",
            start: vidStyle.collapsed.height,
            end: vidStyle.expanded.height
          },
          {
            el: videoContainer,
            prop: "top",
            start: vidStyle.collapsed.top,
            end: vidStyle.expanded.top
          },
          {
            el: videoContainer,
            prop: "left",
            start: vidStyle.collapsed.left,
            end: vidStyle.expanded.left
          },
          {
            el: socialToolbar,
            prop: "top",
            start: socialToolbarPositioning.collapsed.top,
            end: socialToolbarPositioning.expanded.top
          },
          {
            el: socialToolbar,
            prop: "left",
            start: socialToolbarPositioning.collapsed.left,
            end: socialToolbarPositioning.expanded.left
          },
          {
            el: socialToolbar,
            prop: "width",
            start: socialToolbarPositioning.collapsed.width,
            end: socialToolbarPositioning.expanded.width
          },
          {
            el: progressBarTrack,
            prop: "top",
            start: progressBarPositioning.collapsed.top,
            end: progressBarPositioning.expanded.top
          },
          {
            el: progressBarTrack,
            prop: "left",
            start: progressBarPositioning.collapsed.left,
            end: progressBarPositioning.expanded.left
          },
          {
            el: progressBarTrack,
            prop: "width",
            start: progressBarPositioning.collapsed.width,
            end: progressBarPositioning.expanded.width
          }
        ]
      };
      isAnimationEnabled=true;
      if (mdcbExpType == EXPANSION_MOUSE) container.addEventListener("mouseout", mouseout);
      animate(anims);
      removeClass(container, "collapsed");
      removeCompanionEvents("collapsed");
      if (imageBackground) {
        addClass(container, "expandedImage");
      }
      stopBubbling(e);
    };

    var collapseAnimationComplete = function (collapseType) {
      isAnimationEnabled=false;
      isFunctionCallBack("afterCollapseAnimationComplete", {});
      collapseType = collapseType || EBG.ActionType.USER;
      if(collapseType == EBG.ActionType.USER){
        isUserInitiated = true;
      }
      EB.collapse({
        panelName: "expand",
        actionType: collapseType
      });

      if (imageBackground) {
        removeClass(container, "expandedImage");
      }

      addClass(container, "collapsed");
      addCompanionEvents("collapsed");
      if (mdcbAudioBehavior == AUDIO_BEHAVIOR_MOUSEOVER_WHEN_EXPANDED_TO_UNMUTE) muteToggle(null, true);
      if (mdIsAutoExpand && !localPreview) {
        EB.API.setCustomVar("mdIsAutoExpand", false, true);
      }
    };

    var stopBubbling = function (e) {
      if (!e) return;
      //IE9 & Other Browsers
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      //IE8 and Lower
      else {
        e.cancelBubble = true;
      }
    };

    var clickToCollapse = function (event, collapseType) {
      isFunctionCallBack("onClickCollapse", {});
      var e = arguments[0] || window.event;
      EB.automaticEventCounter("CLICK_TO_CLOSE");
      collapse(event, collapseType);
      stopBubbling(e);
    };

    var mouseToCollapse = function (event, collapseType) {
      isFunctionCallBack("onMouseOutCollapse", {});
      EB.automaticEventCounter("MOUSEOUT_TO_CLOSE");

      collapse(event, collapseType);
    };

    var collapse = function (event, collapseType) {
      if(localPreview && isMobile){
        window.removeEventListener("orientationchange", onOrientationChange);
      }
      isFunctionCallBack("beforeCollapseAnimation", {});
      clearTimeout(timeoutID);
      isAnimationEnabled = true;

      if (mdcbExpType == EXPANSION_MOUSE) container.removeEventListener("mouseout", mouseout);
      collapseType = collapseType || EBG.ActionType.USER;
      var anims = {
        length: animationLength,
        steps: animationSteps,
        /* complete function is closured to retain the value of collapseType into local var closeType regardless of collapseType's current value at runtime */
        complete: (function () {
          var closeType = collapseType;
          return function () {
            collapseAnimationComplete(closeType);
          };
        })(),
        sets: [
          {
            el: container,
            prop: "width",
            start: mdExpDimWidth,
            end: collapsedWidth
          },
          {
            el: container,
            prop: "height",
            start: mdExpDimHeight,
            end: collapsedHeight
          },
          {
            el: container,
            prop: "marginLeft",
            start: 0,
            end: mdcbExpDir == EXPANSION_LEFT_TO_RIGHT ? mdDefaultBannerX : widthPixels - collapsedWidth - mdDefaultBannerX
          },
          {
            el: container,
            prop: "marginTop",
            start: 0,
            end: mdDefaultBannerY
          },
          {
            el: panelBackground,
            prop: "width",
            start: mdExpDimWidth,
            end: collapsedWidth
          },
          {
            el: panelBackground,
            prop: "height",
            start: mdExpDimHeight,
            end: collapsedHeight
          },
          {
            el: video,
            prop: "width",
            start: vidStyle.expanded.width,
            end: vidStyle.collapsed.width
          },
          {
            el: video,
            prop: "height",
            start: vidStyle.expanded.height,
            end: vidStyle.collapsed.height
          },
          {
            el: videoContainer,
            prop: "top",
            start: vidStyle.expanded.top,
            end: vidStyle.collapsed.top
          },
          {
            el: videoContainer,
            prop: "left",
            start: vidStyle.expanded.left,
            end: vidStyle.collapsed.left
          },
          {
            el: socialToolbar,
            prop: "top",
            start: socialToolbarPositioning.expanded.top,
            end: socialToolbarPositioning.collapsed.top
          },
          {
            el: socialToolbar,
            prop: "left",
            start: socialToolbarPositioning.expanded.left,
            end: socialToolbarPositioning.collapsed.left
          },
          {
            el: socialToolbar,
            prop: "width",
            start: socialToolbarPositioning.expanded.width,
            end: socialToolbarPositioning.collapsed.width
          },
          {
            el: progressBarTrack,
            prop: "top",
            start: progressBarPositioning.expanded.top,
            end: progressBarPositioning.collapsed.top
          },
          {
            el: progressBarTrack,
            prop: "left",
            start: progressBarPositioning.expanded.left,
            end: progressBarPositioning.collapsed.left
          },
          {
            el: progressBarTrack,
            prop: "width",
            start: progressBarPositioning.expanded.width,
            end: progressBarPositioning.collapsed.width
          },
        ]
      };
      animate(anims);

      removeClass(container, "expanded");
      removeCompanionEvents("expanded");
      if (imageBackground) {
        addClass(container, "expandedImage");
      }
    };

    var animate = function (settings) {
      var setting, changeAmount;
      settings.curStep = settings.curStep || 0;
      for (setting = 0; setting < settings.sets.length; setting++) {
        changeAmount = (settings.sets[setting].end - settings.sets[setting].start) / settings.steps;
        settings.sets[setting].el.style[settings.sets[setting].prop] = EBG.px(Math.floor(settings.sets[setting].start + (changeAmount * settings.curStep)));
      }
      if (++settings.curStep == settings.steps) {
        if (settings.complete) settings.complete();
        setTimeout(function () {
          clearSettings(settings);
        }, 1);
      }
      else {
        setTimeout(function () {
          animate(settings);
        }, Math.floor(settings.length * 1000 / settings.steps));
      }
    };

    var mouseout = function (event) {
      // mouseout will bubble, so make sure we're actually leaving the iframe, not some other element on the page
      if (event.relatedTarget == null) {
        clearTimeout(timeoutMouseOut);
        if(!isAnimationEnabled){
          mouseToCollapse(null, EBG.ActionType.AUTO);
        }else{
          timeoutMouseOut = setTimeout(function () {
            mouseToCollapse(null, EBG.ActionType.AUTO);
          }, (mdAutoCollapseTimer * 1500) + Math.floor(animationLength * 1000 / animationSteps)*100);
        }
      }
    };

    var updateProgressbar = function (event) {
      progressBar.style.width = (100 * video.currentTime / video.duration) + "%";
    };

    var updateVideoControls = function (event) {
      // Check if Video is paused
      if (video.paused || video.ended) {
        // Show Play Button
        removeClass(playButton, "btn-play-unpaused");
        addClass(playButton, "btn-play-paused");
        removeClass(replayButton, "hidden");
        addClass(replayButton, "shown");
      }
      else {
        // Show Pause Button
        removeClass(playButton, "btn-play-paused");
        addClass(playButton, "btn-play-unpaused");
        removeClass(replayButton, "shown");
        addClass(replayButton, "hidden");
      }

      if (video.muted) {
        // Change Mute Button
        removeClass(muteButton, "btn-mute-unmuted");
        addClass(muteButton, "btn-mute-muted");
      }
      else {
        // Change Mute Button
        removeClass(muteButton, "btn-mute-muted");
        addClass(muteButton, "btn-mute-unmuted");
      }
    };

    var handleCollapsedCompanionClick = function (evt) {
      isFunctionCallBack("afterCollapsedCompanionClick", {});
      var e = arguments[0] || window.event;
      pauseVideos();
      EB.clickthrough("pua-companion-default");
      stopBubbling(e);
    };

    var handleExpandedCompanionClick = function (evt) {
      isFunctionCallBack("afterExpandedCompanionClick", {});
      var e = arguments[0] || window.event;
      pauseVideos();
      EB.clickthrough("pua-companion-expand");
      stopBubbling(e);
    };

    var handleVideoClick = function (evt) {
      isUserInitiated = true;
      isFunctionCallBack("afterVideoClick", {});
      var e = arguments[0] || window.event;
      pauseVideos();
      EB.clickthrough("pua-video");
      stopBubbling(e);
    };

    var handleFirstPlayToMute = function () {
      // mute ad
      muteToggle(null, true);
      video.removeEventListener("play", handleFirstPlayToMute);
    };

    var positionContainer = function () {
      addCSSRule(document.styleSheets[0], "#container.collapsed", "width: " + EBG.px(collapsedWidth) + ";height: " + EBG.px(collapsedHeight) + "; margin-left: " + EBG.px(mdcbExpDir == EXPANSION_LEFT_TO_RIGHT ? mdDefaultBannerX : (widthPixels - collapsedWidth - mdDefaultBannerX)) + "; margin-top: " + EBG.px(mdDefaultBannerY) + (mdCollapseShowShadow ? "; box-shadow: 0px 0px " + SHADOW_HEIGHT + "px 0px #000000;" : ""));
      addCSSRule(document.styleSheets[0], "#container.collapsed div #panel-background", "width: " + EBG.px(collapsedWidth) + ";height: " + EBG.px(collapsedHeight) + ";background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_default_localPath, 3) + "\");");

      addCSSRule(document.styleSheets[0], "#container.expanded", "width: " + EBG.px(widthPixels) + ";height: " + EBG.px(heightPixels) + ";");

      addCSSRule(document.styleSheets[0], "#container.expandedImage div #panel-background", "display: inline-block;");
      addCSSRule(document.styleSheets[0], "#container.expandedImage", "width: " + EBG.px(widthPixels) + ";height: " + EBG.px(heightPixels) + ";");

      addCSSRule(document.styleSheets[0], "#container.expandedImage div #panel-background", "width: " + EBG.px(widthPixels) + ";height: " + EBG.px(heightPixels) + ";");
      addCSSRule(document.styleSheets[0], "#container.expanded div #panel-background", "width: " + EBG.px(widthPixels) + ";height: " + EBG.px(heightPixels) + ";");

      var socialSpace = collapsedWidth - 80; //video-controls
      if (mdConfigurationEnableLogo) socialSpace-=document.getElementById("logo").style.width;
      addCSSRule(document.styleSheets[0], "#container.collapsed div#social-buttons", "width: " + EBG.px(socialSpace) + ";");
      addCSSRule(document.styleSheets[0], "#container.expanded div#social-buttons", "width: none; ");

      if(isMobile && !isTablet){
        if(localPreview){
          addCSSRule(document.styleSheets[0], "#container.expanded", "width: 100%;height: 100%;");
          addCSSRule(document.styleSheets[0], "#container.expandedImage", "width: 100%;height: 100%;");
          addCSSRule(document.styleSheets[0], "#container.expandedImage div #panel-background", "width: 100%;height: 100%;");
          addCSSRule(document.styleSheets[0], "#container.expanded div #panel-background", "width: 100%;height: 100%;");
        }else{
          document.styleSheets[0].addRule("#container.expanded", "width: 100%;height: 100%;");
          document.styleSheets[0].addRule("#container.expandedImage", "width: 100%;height: 100%;");
          document.styleSheets[0].addRule("#container.expandedImage div #panel-background", "width: 100%;height: 100%;");
          document.styleSheets[0].addRule("#container.expanded div #panel-background", "width: 100%;height: 100%;");
        }


        addCSSRule(document.styleSheets[0], "@media screen and (min-width: 30em) and (orientation: landscape) { #container.expandedImage div #panel-background, #container.expanded div #panel-background{ background-size: 100% 100%; background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_mobile_landscape_localPath, 8) + "\");}}");
        addCSSRule(document.styleSheets[0], "@media (min-height: 680px), screen and (orientation: portrait) { #container.expandedImage div #panel-background, #container.expanded div #panel-background{ background-size: 100% 100%; background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_mobile_portrait_localPath, 9) + "\");}}");
        preload(
          EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_mobile_landscape_localPath, 8),
          EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_mobile_portrait_localPath, 9)
        );
      }else{
        addCSSRule(document.styleSheets[0], "#container.expandedImage div #panel-background", "background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_expand_localPath, 4) + "\");");
        addCSSRule(document.styleSheets[0], "#container.expanded div #panel-background", "background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_expand_localPath, 4) + "\");");
        preload(
          EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_expand_localPath, 4),
          EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_default_localPath, 3)
        );
      }

      if (mdConfigurationBgColor !== "image") {
        addCSSRule(document.styleSheets[0], "#panel-background", "background-color: " + mdConfigurationBgColor + ";");
      }
      else {
        imageBackground = true;
        preload(EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_expand_localPath, 4));
      }
    };

    var positionVideo = function () {
      var noTop = false;
      var noLeft = false;
      vidStyle.collapsed = {};
      vidStyle.collapsed.top = mdCollapseVideoPositionY;
      vidStyle.collapsed.left = mdCollapseVideoPositionX;

      if (mdConfiguration.indexOf("FULLVIDEO") == -1) {
        if (!!mdCollapseVideoRatio) {
          if (collapsedWidth / (collapsedHeight - PROGRESS_BAR_HEIGHT) >= 16 / 9) { // use full height for display
            vidStyle.collapsed.width = ((collapsedHeight - PROGRESS_BAR_HEIGHT) * 16) / 9;
            vidStyle.collapsed.height = collapsedHeight - PROGRESS_BAR_HEIGHT;
            noTop = true;
          }
          else { // use full width for display
            vidStyle.collapsed.width = collapsedWidth;
            vidStyle.collapsed.height = (collapsedWidth * 9) / 16;
            noLeft = true;
          }
        }
        else {
          vidStyle.collapsed.width = mdCollapseVideoDimWidth;
          vidStyle.collapsed.height = mdCollapseVideoDimHeight;
        }
      }
      else {
        if (collapsedWidth / (collapsedHeight - PROGRESS_BAR_HEIGHT) >= 16 / 9) { // use full width for display; overflow on height
          vidStyle.collapsed.width = collapsedWidth;
          vidStyle.collapsed.height = (collapsedWidth * 9) / 16;
          noLeft = true;
          if (EBG.isNumber(vidStyle.collapsed.top)) {
            // position vertically centered, with an offset based on user's entry for mdCollapseVideoPositionY
            vidStyle.collapsed.top = ((collapsedHeight - PROGRESS_BAR_HEIGHT) / 2) - (vidStyle.collapsed.height / 2) + parseInt(vidStyle.collapsed.top);
          }
          else {
            // top-align, bottom-align, or center-align vertically
            if (vidStyle.collapsed.top == "top") vidStyle.collapsed.top = 0;
            else if (vidStyle.collapsed.top == "center") vidStyle.collapsed.top = ((collapsedHeight - PROGRESS_BAR_HEIGHT) / 2) - (vidStyle.collapsed.height / 2);
            else if (vidStyle.collapsed.top == "bottom") vidStyle.collapsed.top = (collapsedHeight - PROGRESS_BAR_HEIGHT) - vidStyle.collapsed.height;
          }
        }
        else { // use full height for display; overflow on width;
          vidStyle.collapsed.width = ((collapsedHeight - PROGRESS_BAR_HEIGHT) * 16) / 9;
          vidStyle.collapsed.height = collapsedHeight - PROGRESS_BAR_HEIGHT;
          noTop = true;
          if (EBG.isNumber(vidStyle.collapsed.left)) {
            // position horizontally centered, with an offset based on user's entry for mdCollapseVideoPositionX
            vidStyle.collapsed.left = (collapsedWidth / 2) - (vidStyle.collapsed.width / 2) + parseInt(vidStyle.collapsed.left);
          }
          else {
            // left-align, right-align, or center-align horizontally
            if (vidStyle.collapsed.left == "left") vidStyle.collapsed.left = 0;
            else if (vidStyle.collapsed.left == "center") vidStyle.collapsed.left = (collapsedWidth / 2) - (vidStyle.collapsed.width / 2);
            else if (vidStyle.collapsed.left == "right") vidStyle.collapsed.left = collapsedWidth - vidStyle.collapsed.width;
          }
        }
      }

      if (vidStyle.collapsed.left == "left") vidStyle.collapsed.left = 0;
      else if (vidStyle.collapsed.left == "center") vidStyle.collapsed.left = (collapsedWidth / 2) - (vidStyle.collapsed.width / 2);
      else if (vidStyle.collapsed.left == "right") vidStyle.collapsed.left = collapsedWidth - vidStyle.collapsed.width;

      if (vidStyle.collapsed.top == "top") vidStyle.collapsed.top = 0;
      else if (vidStyle.collapsed.top == "center") vidStyle.collapsed.top = ((collapsedHeight - PROGRESS_BAR_HEIGHT) / 2) - (vidStyle.collapsed.height / 2);
      else if (vidStyle.collapsed.top == "bottom") vidStyle.collapsed.top = collapsedHeight - vidStyle.collapsed.height - PROGRESS_BAR_HEIGHT;

      if (noTop) vidStyle.collapsed.top = 0;
      if (noLeft) vidStyle.collapsed.left = 0;

      noTop = false;
      noLeft = false;
      vidStyle.expanded = {};

      if (!!mdExpVideoRatio) {
        if (widthPixels / (heightPixels - PROGRESS_BAR_HEIGHT) >= 16 / 9) { // use full height for display
          vidStyle.expanded.width = ((heightPixels - PROGRESS_BAR_HEIGHT) * 16) / 9;
          vidStyle.expanded.height = heightPixels - PROGRESS_BAR_HEIGHT;
          noTop = true;
        }
        else { // use full width for display
          vidStyle.expanded.width = widthPixels;
          vidStyle.expanded.height = (widthPixels * 9) / 16;
          noLeft = true;
        }
      }
      else {
        vidStyle.expanded.width = mdExpVideoDimWidth;
        vidStyle.expanded.height = mdExpVideoDimHeight;
      }

      vidStyle.expanded.top = mdExpVideoPositionY;
      vidStyle.expanded.left = mdExpVideoPositionX;
      switch (vidStyle.expanded.top) {
        case "top":
          vidStyle.expanded.top = 0;
          break;
        case "center":
          vidStyle.expanded.top = ((heightPixels - PROGRESS_BAR_HEIGHT) / 2) - (vidStyle.expanded.height / 2);
          break;
        case "bottom":
          vidStyle.expanded.top = heightPixels - vidStyle.expanded.height - PROGRESS_BAR_HEIGHT;
          break;
      }

      switch (vidStyle.expanded.left) {
        case "left":
          vidStyle.expanded.left = 0;
          break;
        case "center":
          vidStyle.expanded.left = (widthPixels / 2) - (vidStyle.expanded.width / 2);
          break;
        case "right":
          vidStyle.expanded.left = widthPixels - vidStyle.expanded.width;
          break;
      }

      if (noTop) vidStyle.expanded.top = 0;
      if (noLeft) vidStyle.expanded.left = 0;

      vidStyle.collapsed.top = parseFloat(vidStyle.collapsed.top);
      vidStyle.collapsed.left = parseFloat(vidStyle.collapsed.left);
      vidStyle.expanded.top = parseFloat(vidStyle.expanded.top);
      vidStyle.expanded.left = parseFloat(vidStyle.expanded.left);

      addCSSRule(document.styleSheets[0], "#container.collapsed #video", "width: " + EBG.px(vidStyle.collapsed.width) + ";height: " + EBG.px(vidStyle.collapsed.height) + ";");
      addCSSRule(document.styleSheets[0], "#container.collapsed #video-container", "top: " + EBG.px(vidStyle.collapsed.top) + "; left: " + EBG.px(vidStyle.collapsed.left) + ";width: " + EBG.px(vidStyle.collapsed.width) + ";height: " + EBG.px(vidStyle.collapsed.height + 2) + ";");

      var replayTop, replayLeft;
      replayTop = vidStyle.collapsed.height > (collapsedHeight - PROGRESS_BAR_HEIGHT) ? ((collapsedHeight - PROGRESS_BAR_HEIGHT) / 2) - (Math.min(vidStyle.collapsed.height, (collapsedHeight - PROGRESS_BAR_HEIGHT)) / 4) - vidStyle.collapsed.top : (vidStyle.collapsed.height / 2) - (Math.min(vidStyle.collapsed.height, (collapsedHeight - PROGRESS_BAR_HEIGHT)) / 4);
      replayLeft = vidStyle.collapsed.width > collapsedWidth ? (collapsedWidth / 2) - (Math.min(vidStyle.collapsed.width, collapsedWidth) / 4) - vidStyle.collapsed.left : (vidStyle.collapsed.width / 2) - (Math.min(vidStyle.collapsed.width, collapsedWidth) / 4);

      addCSSRule(document.styleSheets[0], "#container.collapsed #replay", "width: " + EBG.px(Math.min(vidStyle.collapsed.width, collapsedWidth) / 2) + ";height: " + EBG.px(Math.min(vidStyle.collapsed.height, (collapsedHeight - PROGRESS_BAR_HEIGHT)) / 2) + "; top: " + EBG.px(replayTop) + "; left: " + EBG.px(replayLeft) + ";");

      addCSSRule(document.styleSheets[0], "#container.expanded #video", "width: " + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height) + ";");
      addCSSRule(document.styleSheets[0], "#container.expanded #video-container", "top: " + EBG.px(vidStyle.expanded.top) + "; left: " + EBG.px(vidStyle.expanded.left) + ";width: " + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height + 2) + ";");

      if(isMobile && !isTablet){
        if(localPreview){
          addCSSRule(document.styleSheets[0],"#container.expanded  #video", "width:" + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height) + ";");
          addCSSRule(document.styleSheets[0],"#container.expanded  #video-container", "top: " + EBG.px(vidStyle.expanded.top) + "; left: " + EBG.px(vidStyle.expanded.left) + ";width: " + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height + 2) + ";");
        }else{
          document.styleSheets[0].addRule("#container.expanded  #video", "width:" + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height) + ";");
          document.styleSheets[0].addRule("#container.expanded  #video-container", "top: " + EBG.px(vidStyle.expanded.top) + "; left: " + EBG.px(vidStyle.expanded.left) + ";width: " + EBG.px(vidStyle.expanded.width) + ";height: " + EBG.px(vidStyle.expanded.height + 2) + ";");
        }

      }

      replayTop = vidStyle.expanded.height > heightPixels ? (heightPixels / 2) - (Math.min(vidStyle.expanded.height, heightPixels) / 4) - vidStyle.expanded.top : (vidStyle.expanded.height / 2) - (Math.min(vidStyle.expanded.height, heightPixels) / 4);
      replayLeft = vidStyle.expanded.width > widthPixels ? (widthPixels / 2) - (Math.min(vidStyle.expanded.width, widthPixels) / 4) - vidStyle.expanded.left : (vidStyle.expanded.width / 2) - (Math.min(vidStyle.expanded.width, widthPixels) / 4);

      addCSSRule(document.styleSheets[0], "#container.expanded #replay", "width: " + EBG.px(Math.min(vidStyle.expanded.width, widthPixels) / 2) + ";height: " + EBG.px(Math.min(vidStyle.expanded.height, heightPixels) / 2) + "; top: " + EBG.px(replayTop) + "; left: " + EBG.px(replayLeft) + ";");

      if(isMobile && !isTablet){
        if(localPreview){
          addCSSRule(document.styleSheets[0],"#container.expanded  #replay", "width: " + EBG.px(Math.min(vidStyle.expanded.width, widthPixels) / 2) + ";height: " + EBG.px(Math.min(vidStyle.expanded.height, heightPixels) / 2) + "; top: " + EBG.px(replayTop) + "; left: " + EBG.px(replayLeft) + ";");
        }else{
          document.styleSheets[0].addRule("#container.expanded  #replay", "width: " + EBG.px(Math.min(vidStyle.expanded.width, widthPixels) / 2) + ";height: " + EBG.px(Math.min(vidStyle.expanded.height, heightPixels) / 2) + "; top: " + EBG.px(replayTop) + "; left: " + EBG.px(replayLeft) + ";");
        }
      }

      addCSSRule(document.styleSheets[0], "#progress-bar", "background-color:" + mdConfigurationProgressbarColor);
      if(collapsedHeight<EXPAND_BUTTON_HEIGHT + SOCIAL_TOOLBAR_HEIGHT + Math.min(vidStyle.collapsed.height, (collapsedHeight - PROGRESS_BAR_HEIGHT)) / 2){
        addCSSRule(document.styleSheets[0], "#container.collapsed #replay", "display: none;");
      }
    };

    var positionToolbarAndExpand = function () {
      if (mdConfigurationEnableLogo) addClass(document.getElementById("logo"), "enabled");

      var floating;
      var progressCollapsedMinTop = 0;
      var progressCollapsedMaxTop = collapsedHeight - PROGRESS_BAR_HEIGHT;
      var progressExpandedMinTop = 0;
      var progressExpandedMaxTop = heightPixels - PROGRESS_BAR_HEIGHT;

      socialToolbarPositioning.collapsed = {};
      socialToolbarPositioning.expanded = {};
      socialToolbarPositioning.collapsed.top = 0;
      socialToolbarPositioning.expanded.top = 0;
      var expandButtonTop = 0;
      switch (mdConfiguration) {
        case "TOP":
        case "TOP_FULLVIDEO":
          if (mdCollapseToolbarFullWidth) {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = EXPAND_BUTTON_HEIGHT;
            }
            else {
              socialToolbarPositioning.collapsed.top = 0;
            }
          }
          else {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top + EXPAND_BUTTON_HEIGHT, EXPAND_BUTTON_HEIGHT, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT);
            }
            else {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top, 0, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT - EXPAND_BUTTON_HEIGHT);

            }
          }

          if(socialToolbarPositioning.collapsed.top<0){
            socialToolbarPositioning.collapsed.top = 0;
          }
          expandButtonTop = mdCollapseSwitchElements ? socialToolbarPositioning.collapsed.top - EXPAND_BUTTON_HEIGHT : socialToolbarPositioning.collapsed.top + SOCIAL_TOOLBAR_HEIGHT;
          socialToolbarPositioning.expanded.top = mdExpToolbarFullWidth ? 0 : vidStyle.expanded.top;
          socialToolbarPositioning.expanded.top = minMax(socialToolbarPositioning.expanded.top, 0, heightPixels - SOCIAL_TOOLBAR_HEIGHT - PROGRESS_BAR_HEIGHT);
          break;
        case "BOTTOM":
        case "BOTTOM_FULLVIDEO":
          if (mdCollapseToolbarFullWidth) {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = collapsedHeight - SOCIAL_TOOLBAR_HEIGHT;
            }
            else {
              socialToolbarPositioning.collapsed.top = collapsedHeight - SOCIAL_TOOLBAR_HEIGHT - EXPAND_BUTTON_HEIGHT;
            }
          }
          else {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top + vidStyle.collapsed.height - SOCIAL_TOOLBAR_HEIGHT, EXPAND_BUTTON_HEIGHT, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT);
            }
            else {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top + vidStyle.collapsed.height - SOCIAL_TOOLBAR_HEIGHT - EXPAND_BUTTON_HEIGHT, 0, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT - EXPAND_BUTTON_HEIGHT);
            }
          }
          if(socialToolbarPositioning.collapsed.top<0){
            socialToolbarPositioning.collapsed.top = 0;
          }
          if (vidStyle.collapsed.top + vidStyle.collapsed.height > collapsedHeight - PROGRESS_BAR_HEIGHT);
          socialToolbarPositioning.collapsed.top -= PROGRESS_BAR_HEIGHT;

          expandButtonTop = mdCollapseSwitchElements ? socialToolbarPositioning.collapsed.top - EXPAND_BUTTON_HEIGHT : socialToolbarPositioning.collapsed.top + SOCIAL_TOOLBAR_HEIGHT + PROGRESS_BAR_HEIGHT;
          progressCollapsedMaxTop = mdCollapseSwitchElements ? collapsedHeight - PROGRESS_BAR_HEIGHT : expandButtonTop - PROGRESS_BAR_HEIGHT;

          socialToolbarPositioning.expanded.top = mdExpToolbarFullWidth ? heightPixels - SOCIAL_TOOLBAR_HEIGHT : vidStyle.expanded.top + vidStyle.expanded.height - SOCIAL_TOOLBAR_HEIGHT;
          socialToolbarPositioning.expanded.top = minMax(socialToolbarPositioning.expanded.top, 0, heightPixels - SOCIAL_TOOLBAR_HEIGHT);

          if (vidStyle.expanded.top + vidStyle.expanded.height >= heightPixels - PROGRESS_BAR_HEIGHT)
            socialToolbarPositioning.expanded.top -= PROGRESS_BAR_HEIGHT;

          progressExpandedMaxTop = socialToolbarPositioning.expanded.top + SOCIAL_TOOLBAR_HEIGHT;
          break;
        case "TOP_BOTTOM":
        case "TOP_BOTTOM_FULLVIDEO":
        default:
          if (mdCollapseToolbarFullWidth) {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = collapsedHeight - SOCIAL_TOOLBAR_HEIGHT;
            }
            else {
              socialToolbarPositioning.collapsed.top = 0;
            }
          }
          else {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top + vidStyle.collapsed.height - SOCIAL_TOOLBAR_HEIGHT, EXPAND_BUTTON_HEIGHT, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT);
            }
            else {
              socialToolbarPositioning.collapsed.top = minMax(vidStyle.collapsed.top, 0, collapsedHeight - SOCIAL_TOOLBAR_HEIGHT - EXPAND_BUTTON_HEIGHT);
            }
          }

          if(socialToolbarPositioning.collapsed.top<0){
            socialToolbarPositioning.collapsed.top = 0;
          }
          expandButtonTop = (mdCollapseSwitchElements ? 0 : collapsedHeight - EXPAND_BUTTON_HEIGHT);
          progressCollapsedMaxTop = mdCollapseSwitchElements ? collapsedHeight - PROGRESS_BAR_HEIGHT : expandButtonTop - PROGRESS_BAR_HEIGHT;

          if (mdExpToolbarFullWidth) {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.expanded.top = heightPixels - SOCIAL_TOOLBAR_HEIGHT;
            }
            else {
              socialToolbarPositioning.expanded.top = 0;
            }
          }
          else {
            if (mdCollapseSwitchElements) {
              socialToolbarPositioning.expanded.top = vidStyle.expanded.top + vidStyle.expanded.height - SOCIAL_TOOLBAR_HEIGHT;
            }
            else {
              socialToolbarPositioning.expanded.top = vidStyle.expanded.top;
            }
          }
          if (vidStyle.collapsed.top + vidStyle.collapsed.height > collapsedHeight - PROGRESS_BAR_HEIGHT)
            socialToolbarPositioning.collapsed.top -= PROGRESS_BAR_HEIGHT;

          socialToolbarPositioning.expanded.top = minMax(socialToolbarPositioning.expanded.top, 0, heightPixels - SOCIAL_TOOLBAR_HEIGHT);
          if (vidStyle.expanded.top + vidStyle.expanded.height >= heightPixels - PROGRESS_BAR_HEIGHT)
            socialToolbarPositioning.expanded.top -= PROGRESS_BAR_HEIGHT;

          progressExpandedMaxTop = mdCollapseSwitchElements ? socialToolbarPositioning.expanded.top + SOCIAL_TOOLBAR_HEIGHT : progressExpandedMaxTop;
          break;
      }

      if (mdcbCloseBtnPos == CLOSE_BUTTON_POSITION_NORMAL) {
        if (mdcbExpDir == EXPANSION_LEFT_TO_RIGHT) {
          floating = "right";
        }
        else {
          floating = "left";
        }
      }
      else {
        if (mdcbExpDir == EXPANSION_LEFT_TO_RIGHT) {
          floating = "left";
        }
        else {
          floating = "right";
        }
      }

      if (mdConfigurationEnableLogo) setLogo();

      // close button and video controls must have opposite floats values
      addCSSRule(document.styleSheets[0], "#close-button", "float: " + floating + ";");
      if (floating == "left") {
        floating = "right";
      }
      else {
        floating = "left";
      }
      addCSSRule(document.styleSheets[0], "#video-controls", "float: " + floating + ";");

      if (mdCollapseToolbarFullWidth) {
        socialToolbarPositioning.collapsed.width = collapsedWidth;
      }
      else {
        if (mdConfiguration.indexOf("FULLVIDEO") != -1) {
          socialToolbarPositioning.collapsed.width = collapsedWidth;
        }
        else {
          socialToolbarPositioning.collapsed.width = minMax(vidStyle.collapsed.width, 0, collapsedWidth);
        }
      }

      if (mdExpToolbarFullWidth) {
        socialToolbarPositioning.expanded.width = widthPixels;
      }
      else {
        socialToolbarPositioning.expanded.width = minMax(vidStyle.expanded.width, 0, widthPixels);
      }

      if (mdCollapseToolbarFullWidth) {
        socialToolbarPositioning.collapsed.left = 0;
      }
      else {
        if (mdConfiguration.indexOf("FULLVIDEO") != -1) {
          socialToolbarPositioning.collapsed.left = 0;
        }
        else {
          socialToolbarPositioning.collapsed.left = vidStyle.collapsed.left;
        }
      }

      if (mdExpToolbarFullWidth) {
        socialToolbarPositioning.expanded.left = 0;
      }
      else {
        socialToolbarPositioning.expanded.left = vidStyle.expanded.left;
      }

      socialToolbarPositioning.collapsed.left = minMax(socialToolbarPositioning.collapsed.left, 0, collapsedWidth);
      socialToolbarPositioning.expanded.left = minMax(socialToolbarPositioning.expanded.left, 0, widthPixels);

      progressBarPositioning.collapsed = {};

      progressBarPositioning.collapsed.top = minMax(vidStyle.collapsed.top + vidStyle.collapsed.height, progressCollapsedMinTop, progressCollapsedMaxTop);
      progressBarPositioning.collapsed.left = minMax(vidStyle.collapsed.left, 0, collapsedWidth);
      progressBarPositioning.collapsed.width = minMax(vidStyle.collapsed.width, 0, collapsedWidth);

      progressBarPositioning.expanded = {};
      progressBarPositioning.expanded.top = minMax(vidStyle.expanded.top + vidStyle.expanded.height, progressExpandedMinTop, progressExpandedMaxTop);
      progressBarPositioning.expanded.left = minMax(vidStyle.expanded.left, 0, widthPixels);
      progressBarPositioning.expanded.width = minMax(vidStyle.expanded.width, 0, widthPixels);


      addCSSRule(document.styleSheets[0], "#container.collapsed #progress-bar-track", "top: " + EBG.px(progressBarPositioning.collapsed.top) + "; left: " + EBG.px(progressBarPositioning.collapsed.left) + ";width: " + EBG.px(progressBarPositioning.collapsed.width) + ";");
      addCSSRule(document.styleSheets[0], "#container.expanded #progress-bar-track", "top: " + EBG.px(progressBarPositioning.expanded.top) + "; left: " + EBG.px(progressBarPositioning.expanded.left) + ";width: " + EBG.px(progressBarPositioning.expanded.width) + ";");

      addCSSRule(document.styleSheets[0], "#container.collapsed #social-toolbar", "width:" + EBG.px(socialToolbarPositioning.collapsed.width) + "; top: " + EBG.px(socialToolbarPositioning.collapsed.top) + "; left: " + EBG.px(socialToolbarPositioning.collapsed.left));
      addCSSRule(document.styleSheets[0], "#container.expanded #social-toolbar", "width:" + EBG.px(socialToolbarPositioning.expanded.width) + "; top: " + EBG.px(socialToolbarPositioning.expanded.top) + "; left: " + EBG.px(socialToolbarPositioning.expanded.left));

      addCSSRule(document.styleSheets[0], "#container.collapsed #expand-button", "top: " + EBG.px(expandButtonTop) + "; left: " + EBG.px(0) + ";");

      if(isMobile && !isTablet){
        if(localPreview){
          addCSSRule(document.styleSheets[0], "#container.expanded #progress-bar-track", "top: " + EBG.px(progressBarPositioning.expanded.top) + "; left: " + EBG.px(progressBarPositioning.expanded.left) + ";width: " + EBG.px(progressBarPositioning.expanded.width) + ";");
          addCSSRule(document.styleSheets[0], "#container.expanded #social-toolbar", "width:" + EBG.px(socialToolbarPositioning.expanded.width) + "; top: " + EBG.px(socialToolbarPositioning.expanded.top) + "; left: " + EBG.px(socialToolbarPositioning.expanded.left));
        }else{
          document.styleSheets[0].addRule("#container.expanded #progress-bar-track", "top: " + EBG.px(progressBarPositioning.expanded.top) + "; left: " + EBG.px(progressBarPositioning.expanded.left) + ";width: " + EBG.px(progressBarPositioning.expanded.width) + ";");
          document.styleSheets[0].addRule("#container.expanded #social-toolbar", "width:" + EBG.px(socialToolbarPositioning.expanded.width) + "; top: " + EBG.px(socialToolbarPositioning.expanded.top) + "; left: " + EBG.px(socialToolbarPositioning.expanded.left));
        }
      }
    };

    var minMax = function (testVal, minVal, maxVal) {
      return Math.min(Math.max(testVal, minVal), maxVal);
    };

    var setLogo = function () {
      addCSSRule(document.styleSheets[0], "#panel.positive #logo", "background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_logo_positive, 6) + "\") !important;");
      addCSSRule(document.styleSheets[0], "#panel.negative #logo", "background-image: url(\"" + EB.getAssetUrl(localPathAssets + "AdditionalAssets/" + imageName_logo_negative, 7) + "\") !important;");
    };

    var addPlayVolumeControls = function () {
      // controls (play/pause and mute/unmute) are all created with SVG graphics so we may style the color of the controls using CSS
      var svgTextBegin = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="35px" height="35px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><style>.style0{fill:	';
      svgTextBegin += mdConfigurationControllerColor;
      svgTextBegin += ';}</style>";';
      var svgTextCircle = '<g id="Circle"><path d="M256 0C114.562 0 0 114.6 0 256c0 141.4 114.6 256 256 256c141.438 0 256-114.563 256-256 C512 114.6 397.4 0 256 0z"/></g>';
      var svgTextPaused = '<g id="Paused"><polygon points="204.8,371.2 204.8,140.8 358.4,256" class="style0"/></g>';
      var svgTextUnpaused = '<g id="Unpaused"><path d="M230.4 358.4h-51.2V153.6h51.2V358.4z M332.8 358.4h-51.2V153.6h51.2V358.4z" class="style0"/></g>';
      var svgTextSpeaker = '<g id="Speaker"><polygon points="161.653,214.044 119.696,214.044 119.696,297.956 161.653,297.956 245.565,360.891 266.543,360.891 266.543,151.109 245.565,151.109" class="style0"/></g>';
      var svgTextMuted = '<g id="Muted"><path d="M392.304,224.618l-20.986-20.986l-31.481,31.479l-31.479-31.479l-20.658,20.822l31.151,31.645l-31.479,31.479l20.986,20.988l31.479-31.482l31.481,31.482l20.986-20.988l-31.48-31.479L392.304,224.618z" class="style0"/></g>';
      var svgTextUnmuted = '<g id="Unmuted"><path d="M295.883,226.005c-4.096-4.097-10.737-4.097-14.834,0c-4.096,4.096-4.096,10.737,0,14.833c8.193,8.192,8.193,21.476,0,29.669c-4.096,4.095-4.096,10.735,0,14.833c4.097,4.096,10.738,4.096,14.834,0C312.269,268.954,312.269,242.389,295.883,226.005z M325.551,196.337c-4.096-4.096-10.738-4.096-14.833,0c-4.097,4.097-4.097,10.737,0,14.834c24.577,24.577,24.577,64.426,0,89.002c-4.097,4.096-4.097,10.739,0,14.835c4.095,4.096,10.737,4.096,14.833,0C358.321,282.238,358.321,229.106,325.551,196.337z M355.218,166.67c-4.096-4.097-10.738-4.097-14.832,0c-4.098,4.096-4.098,10.737,0,14.833c40.961,40.963,40.961,107.375,0,148.338c-4.098,4.096-4.098,10.737,0,14.833c4.094,4.098,10.736,4.098,14.832,0C404.373,295.52,404.373,215.824,355.218,166.67z" class="style0"/></g>';
      var svgTextEnd = '</svg>';

      var b64Unpaused = window.btoa(svgTextBegin + svgTextCircle + svgTextUnpaused + svgTextEnd);
      var b64Paused = window.btoa(svgTextBegin + svgTextCircle + svgTextPaused + svgTextEnd);
      var b64Muted = window.btoa(svgTextBegin + svgTextCircle + svgTextSpeaker + svgTextMuted + svgTextEnd);
      var b64Unmuted = window.btoa(svgTextBegin + svgTextCircle + svgTextSpeaker + svgTextUnmuted + svgTextEnd);

      addCSSRule(document.styleSheets[0], "#play-pause.btn-play-paused", "background-image: url(data:image/svg+xml;base64," + b64Paused + ");");
      addCSSRule(document.styleSheets[0], "#play-pause.btn-play-unpaused", "background-image: url(data:image/svg+xml;base64," + b64Unpaused + ");");
      addCSSRule(document.styleSheets[0], "#mute.btn-mute-unmuted", "background-image: url(data:image/svg+xml;base64," + b64Unmuted + ");");
      addCSSRule(document.styleSheets[0], "#mute.btn-mute-muted", "background-image: url(data:image/svg+xml;base64," + b64Muted + ");");

      var svgTextReplayCircle = '<g id="Circle"><path fill="none" stroke="' + mdConfigurationControllerColor + '" stroke-width="18" stroke-miterlimit="10" d="M256,23.871 C127.75,23.871,23.871,127.75,23.871,256c0,128.249,103.879,232.129,232.129,232.129c128.249,0,232.129-103.88,232.129-232.129 C488.129,127.75,384.249,23.871,256,23.871z"/></g>';
      var svgTextReplayPlay = '<g id="Play"><polygon fill="' + mdConfigurationControllerColor + '" points="204.8,371.2 204.8,140.8 358.4,256 	"/></g>';

      var b64Replay = window.btoa(svgTextBegin + svgTextReplayCircle + svgTextReplayPlay + svgTextEnd);

      addCSSRule(document.styleSheets[0], "#replay ", "background-image: url(data:image/svg+xml;base64," + b64Replay + ");");
    };

    var hasClass = function (ele, cls) {
      return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    var addClass = function (ele, cls) {
      if (!hasClass(ele, cls)) ele.className += " " + cls;
    };

    var removeClass = function (ele, cls) {
      if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
      }
    };

    var addCSSRule = function (sheet, selector, styleSheetRules, index) {
      try {
        if ("insertRule" in sheet) {
          sheet.insertRule(selector + "{" + styleSheetRules + "}", index);
        }
        else if ("addRule" in sheet) {
          sheet.addRule(selector, styleSheetRules, index);
        }
      }
      catch (e) {
        var targetDoc = document;
        var styleElement = document.createElement("style");
        styleElement.setAttribute('type', 'text/css');
        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = styleSheetRules;
        }
        else {
          styleElement.appendChild(targetDoc.createTextNode(selector + "{" + styleSheetRules + "}"));
        }
        targetDoc.getElementsByTagName('head')[0].appendChild(styleElement);
      }
    };

    var clearSettings = function (settings) {
      var setting;
      for (setting = 0; setting < settings.sets.length; setting++) {
        settings.sets[setting].el.style[settings.sets[setting].prop] = '';
      }
    };

    var addCompanionEvents = function (companionSize) {
      switch (companionSize) {
        case "expanded":
          panelBackground.addEventListener("click", handleExpandedCompanionClick);
          break;
        case "collapsed":
          panelBackground.addEventListener("click", handleCollapsedCompanionClick);
          break;
        default:
          break;
      }
    };

    var removeCompanionEvents = function (companionSize) {
      switch (companionSize) {
        case "expanded":
          panelBackground.removeEventListener("click", handleExpandedCompanionClick);
          break;
        case "collapsed":
          panelBackground.removeEventListener("click", handleCollapsedCompanionClick);
          break;
        default:
          break;
      }
    };

    /*************************************
     End HTML5 Event System - Do Not Modify
     *************************************/
    function displayDimensions() {
      if (dimensions) {
        var iw = window.innerWidth,
          ih = window.innerHeight,
          sx = scrollPos.x,
          sy = scrollPos.y;
        var str = "<br>Viewport: " + iw + "x" + ih + " | <span style='display:block'>Scroll (X: " + sx + "%; Y: " + sy + "%)</span>";
        dimensions.innerHTML = str;
      }
    }

    function setCreativeVersion() {
      sendMessage("setCreativeVersion", {
        creativeId: creativeId,
        creativeVersion: creativeVersion,
        creativeLastModified: lastModified,
        uid: uid
      });
    }

    var onPageScroll = function (event) {
      isFunctionCallBack("onPageScroll", {
        scrollXPercent: event.scrollXPercent,
        scrollYPercent: event.scrollYPercent
      });
      displayDimensions();
    };
    /*******************
     END OF CREATIVE FUNCTIONS
     *******************/
    /*******************
     UTILITIES
     *******************/
    var trackVideoInteractions = function () {
      var videos = getVideos();
      for (var i = 0; i < videos.length; i++) {
        videoTrackingModule = new EBG.VideoModule(videos[i]);
      }
    };

    var isFunctionCallBack = function (nameFunction, actionType) {
      var args = [];
      try {
        args = actionType;
        if (typeof window[nameFunction] === "function") {
          window[nameFunction](args);
        }
      }
      catch (e) {}
    };

    /*******************
     UTILITIES
     *******************/
    /*********************************
     HTML5 Event System - Do Not Modify
     *********************************/
    var creativeContainerReady = function () {};

    var sendMessage = function (type, data) {
      //note: the message type we're sending is also the name of the function inside
      //		the custom script's messageHandlers object, so the case must match.

      if (!data.type) data.type = type;
      EB._sendMessage(type, data);
    };

    var addCustomScriptEventListener = function (eventName, callback, interAd) {
      listenerQueue = listenerQueue || {};
      var data = {
        uid: uid,
        listenerId: Math.ceil(Math.random() * 1000000000),
        eventName: eventName,
        interAd: !!(interAd),
        creativeIFrameId: creativeIFrameId
      };
      sendMessage("addCustomScriptEventListener", data);
      data.callback = callback;
      listenerQueue[data.listenerId] = data;
      return data.listenerId;
    };


    var dispatchCustomScriptEvent = function (eventName, params) {
      try {
        params = params || {};
        params.uid = uid;
        params.eventName = eventName;
        params.creativeIFrameId = creativeIFrameId;
        sendMessage("dispatchCustomScriptEvent", params);
      }
      catch (e) {}
    };

    var removeCustomScriptEventListener = function (listenerId) {
      var params = {
        uid: uid,
        listenerId: listenerId,
        creativeIFrameId: creativeIFrameId
      };

      sendMessage("removeCustomScriptEventListener", params);
      if (listenerQueue[listenerId])
        delete listenerQueue[listenerId];
    };

    var eventManager = function (event) {
      var msg;
      try {
        if (typeof event == "object" && event.data) {
          msg = JSON.parse(event.data);
        }
        else {
          // this is safe frame.
          msg = {
            type: event.type,
            data: event
          };
        }
        if (msg.type && msg.data && (!uid || (msg.data.uid && msg.data.uid == uid))) {
          switch (msg.type) {
            case "sendCreativeId":
              creativeIFrameId = msg.data.creativeIFrameId;
              creativeId = typeof config.panel != "undefined" && config.panel !== "" ? config.panel : "banner";
              addCustomScriptEventListener('pageScroll', onPageScroll);
              addCustomScriptEventListener("onOrientationChange", onOrientationChange);
              sendMessage("dispatchScrollPos", {
                uid: uid
              });
              if (creativeContainerReady) creativeContainerReady();
              setCreativeVersion();
              break;
            case "eventCallback": // Handle Callback
              var list = msg.data.listenerIds;
              var length = list.length;
              for (var i = 0; i < length; i++) {
                try {
                  var t = listenerQueue[list[i]];
                  if (!t) continue;
                  t.callback(msg.data);
                }
                catch (e) {}
              }
              break;
          }
        }
      }
      catch (e) {}
    };

    // Debugging
    var log = function () { // this is a closure-compiled version of the original code
      if (isDebug) {
        var b, a;
        b = Array.prototype.slice.call(arguments);
        a = new Date();
        a = scriptName + " (" + a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate() + " " + (("0" + a.getHours()).slice(-2)) + ":" + (("0" + a.getMinutes()).slice(-2)) + ":" + (("0" + a.getSeconds()).slice(-2)) + "." + (("00" + a.getMilliseconds()).slice(-3)) + "): ";
        b.unshift(a);
        try {
          window.console && console.log && (console.log.apply ? console.log.apply(console, b) : console.log(b));
        }
        catch (d) {}
      }
    };
    // Return functions you want publically available
    return {
      addEventListener: addEventListener,
      removeEventListener: removeEventListener,
      initializeCreative: initializeCreative,
      collapse : collapse,
      expand : expand
    };
  };
}());
