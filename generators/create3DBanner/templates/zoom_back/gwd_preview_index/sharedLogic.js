// *********************************************************************************************************************
//                                           INIT VARIABLES
// *********************************************************************************************************************
 function sharedInit() {

   // ---- gwd components
   window.gwdAd = document.getElementById("gwd-ad");
   window.gwdPageContent = document.querySelector(".gwd-page-content");
   window.bannerPage = document.getElementById("banner-page");

   // ---- frames checker
   window.keyObj = {};
   window.keyObj.key = this.settings.gwd3d.keyframes[0];

   // ---- boolean
   window.engagement = false;
   window.isExpanded = false;
   window.scrollEnabled = true;
   window.animationAllowed = true;
   window.triggeredOnce = false;

   // ---- 3d model
   window.gwd3dModel = document.querySelector("#gwd-3d-model_1");

   // ---- loading
   //check when the 3d model is available
   window.addEventListener("message", handle3dModelEvents, false);
   //check when gwd has loaded the page, if there is no 3dmodel, you should use this event to start your animation/banner
   window.bannerPage.addEventListener("pageload", handleBannerPageLoad.bind(window));


   // ---- hide expanded elements
   TweenMax.set(window.settings.expandElements, {autoAlpha: 0});
 }

// *********************************************************************************************************************
//                                                INIT BANNER
// *********************************************************************************************************************

function sharedInitBanner() {
  // ----------------------------------------------- 3D MODEL ----------------------------------------------------------
  //stop autoplaying 3d model
  window.gwd3dModel.pauseAnimation(window.settings.gwd3d.animationName);
  window.gwd3dModel.setAnimationTime(window.settings.gwd3d.animationName, 0);
  //position 3d model to default state
  window.update3dModelPosition();

// ----------------------------------------------- EVENTS --------------------------------------------------------------
  // ---- enabler events
  Enabler.addEventListener(studio.events.StudioEvent.EXIT, handleExit.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_START, handleExpandStart.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_EXPAND_FINISH, handleExpandFinish.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_START, handleCollapseStart.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.FULLSCREEN_COLLAPSE_FINISH, handleCollapseFinish.bind(window));
  Enabler.addEventListener(studio.events.StudioEvent.ORIENTATION, changeOrientationHandler.bind(window));

  // ---- interaction events
  document.querySelector("#expandArrowsButton").addEventListener("click", expand.bind(window));
  document.querySelector("#cta").addEventListener("click", handleCtaClick.bind(window));
  document.querySelector("#cta").addEventListener("touchstart", handleTouchStart);
  document.querySelector("#cta").addEventListener("touchend", handleTouchEnd);
  document.querySelector("#closeButton").addEventListener("click", collapse.bind(window));

  // ----------------------------------------------- SCROLLING ---------------------------------------------------------
  // when testing locally in an iframe, scroll will be enabled
  if (!Enabler.isServingInLiveEnvironment()) {
    if (location.href.indexOf("localhost") !== -1 && window.self !== window.top) {
      window.scrollEnabled = true;
    }
  }

  if (window.scrollEnabled) {
    if (window.Enabler && Enabler.isServingInLiveEnvironment()) {
      Enabler.addEventListener("hostpageScroll", handleHostpageScroll.bind(this), false);
    } else {
      window.addEventListener("message", onRawScroll.bind(this), false);
    }
  }

}

// *********************************************************************************************************************
//                                             EVENT HANDLER
// *********************************************************************************************************************
// ------------------------------------- INTERACTION WITH 3D MODEL -----------------------------------------------------
function sharedHandle3dModelEvents(e) {

  // ---- check if 3dModel is available
  if (!window.gwd3dModelContent) {
    window.gwd3dModelContent = window.gwd3dModel.children[0].contentWindow;
  }
  if (e && e.data === "stoptimer:TimeToFirstFrame") {
    initBanner();
  }

  // ---- detect interaction
  if (e && e.data === "starttimer:TimeToClick") {
    window.clickTime = new Date();
  }

  if ((e && e.data === "stoptimer:TimeToClick") || e.data === "cumulativecounter:Rotate") {
    window.releaseClickTime = new Date();
    window.clickedTime = window.releaseClickTime.getTime() - window.clickTime.getTime();

    if (window.clickedTime < 100) {
      expand();
    }
  }
}
// ----------------------------------------------- EXPAND --------------------------------------------------------------

function sharedExpand() {
  if (window.isExpanded) {
    return;
  }

  var fullscreenSupported = false;
  if(!window.triggeredOnce) {
    Enabler.addEventListener(
      studio.events.StudioEvent.FULLSCREEN_SUPPORT,
      function(event) {
        fullscreenSupported = event.supported;
        window.triggeredOnce = true;
        if (fullscreenSupported) {
          Enabler.requestFullscreenExpand();
        }
      }.bind(window)
    );
  }
  Enabler.queryFullscreenSupport();
}

function sharedHandleExpandStart() {
  window.update3dModelPosition("expand_start");
  // set size to fullscreen
  window.gwdPageContent.style.width = window.bannerPage.style.width = window.gwd3dModel.style.width = "100%";
  window.gwdPageContent.style.height = window.bannerPage.style.height = window.gwd3dModel.style.height = "100%";

  // hide collapsed content
  TweenMax.set(window.settings.collapseElements, {autoAlpha: 0})

}

function sharedHandleExpandFinish() {
  window.isExpanded = true;

  changeOrientationHandler();
  //Daniel Google mod
  window.gwd3dModelContent.postMessage("ScrollGatingDisable", "*");

  // play expanded tl
  window.expandTL = getExpandTimeline({ paused: true });
  window.expandTL.play(0);

}

// --------------------------------------------- COLLAPSE --------------------------------------------------------------
function sharedCollapse() {
  Enabler.requestFullscreenCollapse();
}
function sharedHandleCollapseStart() {
  // set size to banner size
  window.gwdPageContent.style.width = window.bannerPage.style.width = window.gwd3dModel.style.width =
    window.settings.dimensions.width + "px";
  window.gwdPageContent.style.height = window.bannerPage.style.height = window.gwd3dModel.style.height =
    window.settings.dimensions.height + "px";

  Enabler.finishFullscreenCollapse();
}

function sharedHandleCollapseFinish() {
  window.isExpanded = false;

  for (var i = 0; i < window.timelineArray.length; i++) {
    if(window.timelineArray[i] && window.timelineArray[i].isActive()){
      window.timelineArray[i].pause(0);
    }
  }

  // go to main tl collapsed
  window.mainTimeline.gotoAndStop("banner");

  // hide expanded elements
  TweenMax.set(window.settings.expandElements, {autoAlpha:0});


  // set 3d animation
  window.gwd3dModel.pauseAnimation(window.settings.gwd3d.animationName);
  window.gwd3dModel.setAnimationTime(window.settings.gwd3d.animationName,
    window.settings.gwd3d.keyframes[window.settings.collapse.startframe]);
  window.update3dModelPosition("collapse_end");
  update3DModelAnimation(window.gwd3dModel, window.settings.gwd3d.keyframes[window.settings.collapse.startframe],
    window.settings.gwd3d.animationName);

  //Daniel Google mod
  window.gwd3dModelContent.postMessage("ScrollGatingEnable", "*");
}

// ------------------------------------ INTERACTION WITH USER ----------------------------------------------------------
function sharedChangeOrientationHandler() {
  if (window.isExpanded) {
    if (Enabler.getOrientation().getMode() === "portrait") {
      TweenMax.set("#landscapeWrapper", { pointerEvents: "none", opacity: 0 });
    } else {
      TweenMax.set("#landscapeWrapper", { pointerEvents: "auto", opacity: 1 });
    }
  }
}
function sharedHandleCtaClick(link) {
  Enabler.exitOverride("cta_exit_click", link);
}

function sharedHandleTouchStart(e) {
  TweenMax.set("#" + e.currentTarget.id + "_over", { autoAlpha: 1 });
}
function sharedHandleTouchEnd(e) {
  TweenMax.set("#" + e.currentTarget.id + "_over", { autoAlpha: 0 });

}

function sharedHandleExit() {
  collapse();
}

// ---------------------------------------------- SCROLL ---------------------------------------------------------------
function sharedOnRawScroll(event) {
  if (event && event.data && typeof event.data == "string") {
    try {
      let eventData = JSON.parse(event.data);
      if (eventData && eventData.eventType === "hostpageScroll") {
        handleHostpageScroll(eventData);
      }
    } catch (probablyNotJsonException) {}
  }
}

function sharedHandleHostpageScroll(e) {
  if (!window.isExpanded && !window.engagement) {
    window.per = e.creativeFramePercentY;

    // ---- 3d model scroll
    var bounds = window.settings.scrolling.endBound - window.settings.scrolling.startBound;
    var frames = window.settings.scrolling.endFrame - window.settings.scrolling.startFrame;

    // if in between bounds of visibility top/bottom, recalculating current frame based upon the bounds and current percentY
    if(window.frame != window.settings.scrolling.endFrame || window.frame === undefined) {
      window.frame = Math.max(
        window.settings.scrolling.startFrame,
        Math.min(
          window.settings.scrolling.endFrame,
          frames * ((window.per - window.settings.scrolling.startBound) / bounds) + window.settings.scrolling.startFrame
        )
      );
      update3DModelAnimation(window.gwd3dModel, window.frame, window.settings.gwd3d.animationName);
    }
  }
}
















