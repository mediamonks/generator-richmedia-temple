
// *********************************************************************************************************************
//                                           INIT VARIABLES
// *********************************************************************************************************************
function init() {

  sharedInit() ;

  // ---- frame counter
  window.frameCounter = window.settings.expanded.startframe;

  // ---- boolean                                                                                                         // add boolean here if necessary
  window.isCollapsedSwiping = false;

}

// *********************************************************************************************************************
//                                                INIT BANNER
// *********************************************************************************************************************

function initBanner() {

  sharedInitBanner()

  // ----------------------------------------------- TIMELINES ---------------------------------------------------------  // add specific TL if necessary
  // get rotation animation
  window.playRotationViewAnimation = rotationViewAnimationExpand({ paused: true });

  // get collapsed animation
  window.mainTimeline = getMainTimeline({ paused: true });
  window.swipeIconTimeline = getSwipeIconTimeline(["#swipeToRotate"], {
    paused: true,
    repeat: 6,
    yoyo: true
  },
    -30,
    30,
    Sine.easeInOut
  );
  window.pulseIconTimeline = getPulseIconTimeline(["#tap_to_go_fullscreen"], {
    paused: true,
    repeat: 6,
    yoyo: true
  });

// ----------------------------------------------- EVENTS --------------------------------------------------------------
  document.querySelector("#nextButton").addEventListener("click", handleNextClick);
  document.querySelector("#previousButton").addEventListener("click", handlePreviousClick);                 // add specific event if necessary


  // ----------------------------------------------- SCROLLING ---------------------------------------------------------

  if (window.scrollEnabled) {
    window.update3dModelPosition("collapse_end");
    update3DModelAnimation(window.gwd3dModel, window.settings.expanded.lastzoomedframe,
        window.settings.gwd3d.animationName);
  }

  // ----------------------------------------------- START -------------------------------------------------------------
  start();
}


// *********************************************************************************************************************
//                                             EVENT HANDLER
// *********************************************************************************************************************
// ---------------------------------------------- LOADING --------------------------------------------------------------
// ---- use this function if necessary
function handleBannerPageLoad() {}

// ------------------------------------- INTERACTION WITH 3D MODEL -----------------------------------------------------
function handle3dModelEvents(e) {
  //for checking yaw, pivot and zoom when positioning 3dmodel
  // if (typeof e.data == 'string') {
  //   console.log(e.data);
  // }

  sharedHandle3dModelEvents(e)

  // ---- interaction with 3d element started
  if (e && e.data === "starttimer:TotalEngagement") {
    if (!window.engagement) {
      window.engagement = true;

      // stop main TL                                                                                                   // add element to hide/show during interaction
      window.mainTimeline.pause();
      // stop rotation
      window.playRotationViewAnimation.pause();
      // hide swipe button
      window.collapseSwipeFadeOutTimeline = getCollapseSwipeOutTimeline();
    }
  }

  // ---- interaction with 3d element stopped
  if (e && e.data === "stoptimer:TotalEngagement") {
    window.engagement = false;

    // in collapsed mode                                                                                                // add element to hide/show after the end of interaction
    if (!window.isExpanded) {
      // play rotation
      window.playRotationViewAnimation.play();
      // show swipe button
      window.collapseSwipeFadeInTimeline = getCollapseSwipeInTimeline();
    }
  }

}

// ------------------------------------- NAVIGATION IN ANIMATION  ------------------------------------------------------
// move to first frame
function handleAutoplay() {
  window.direction = 0;
  window.handleNavigationClick(0);
}

// move to previous frame
function handlePreviousClick() {
  window.direction = -1;
  window.handleNavigationClick(window.direction);
}

// move to next frame
function handleNextClick() {
  window.direction = 1;
  window.handleNavigationClick(window.direction);
}


// handle current frame
function handleNavigationClick(direction){
  if(!window.animationAllowed){
    return;
  }

  // ---- set the starting/ending frame
  // starting point of expanded mode
  if(direction === 0){
    window.handleCurrentFrame();
  }
  // next frame
  if(direction === 1){
    window.frameCounter++
    window.animationStartFrame = window.settings.gwd3d.keyframes[window.frameCounter];
    window.animationEndFrame = window.settings.gwd3d.keyframes[window.frameCounter+1];
  }
  // previous frame
  if(direction === -1){
    window.animationStartFrame = window.settings.gwd3d.keyframes[window.frameCounter+1];
    window.animationEndFrame = window.settings.gwd3d.keyframes[window.frameCounter];
    window.frameCounter--
  }


  // ---- call function to play
  if(direction !== 0){
    window.nextTL = getNextFrameTimeline({ paused: true });
    window.nextTL.play();
  }

}


function handleCurrentFrame(e) {

  // ---- if between first and last frame of next/previous
  if(window.frameCounter >= window.settings.expanded.startframe
      && window.frameCounter <= window.settings.expanded.lastzoomedframe)
  {
      // show next button
      TweenMax.set('#nextButton', {autoAlpha:1})
      // show previous if not the firstframe
      if(window.frameCounter != window.settings.expanded.startframe) {
        TweenMax.set('#previousButton', {autoAlpha: 1})
      }

      // show current  content                                                                                          // add content to show for each frame
      var activeFoodImage = window.settings.contentFrames[window.frameCounter].foodImage
      var activeFoodCopy = window.settings.contentFrames[window.frameCounter].copyOverlay
      TweenMax.to(activeFoodCopy, 0.5, {autoAlpha:1, y:-5})
      TweenMax.to(activeFoodImage, 0.5, {autoAlpha:1, y:-5})
      TweenMax.set(['#nextButton', '#previousButton'],
          {backgroundColor: window.settings.contentFrames[window.frameCounter].arrowColor})
  }

  // ---- last frame reached
  else if(window.frameCounter >= window.settings.expanded.lastzoomedframe){

    // go to unzoom view
    window.animationStartFrame = window.settings.gwd3d.keyframes[window.frameCounter]
    window.animationEndFrame = window.settings.gwd3d.keyframes[window.frameCounter+1]
    window.finalTL = getzoomToFinalFrameTL({ paused: true });
    window.finalTL.play();


    // go into endframe loop and play animation
    window.frameCounter++
    window.animationStartFrame = window.settings.gwd3d.keyframes[window.frameCounter]
    window.animationEndFrame = window.settings.gwd3d.keyframes[window.frameCounter+1]
    window.playRotationViewAnimation = rotationViewAnimationExpand({ paused: true });
    window.playRotationViewAnimation.play();
    window.finalTL = getFinalFrameTL({ paused: true });
    window.finalTL.play();
  }
}

// ----------------------------------------------- START ---------------------------------------------------------------
function start() {                                                                                                      // add tl to play at start
  window.pulseIconTimeline.play();
  window.swipeIconTimeline.play();
  window.mainTimeline.play();
}
// ----------------------------------------------- EXPAND --------------------------------------------------------------
function expand()
{
  sharedExpand();
}

function handleExpandStart() {

  sharedHandleExpandStart();

  // stop all animation
  TweenMax.killAll(false, false, true);

  if(window.bannerModeStartLoopTL != undefined){
    window.bannerModeStartLoopTL.remove();
  }
}

function handleExpandFinish() {

  sharedHandleExpandFinish();
}

// --------------------------------------------- COLLAPSE --------------------------------------------------------------
function collapse() {
  sharedCollapse();
}

function handleCollapseStart() {

  sharedHandleCollapseStart();

  // set animation frame
  window.animationStartFrame = window.settings.gwd3d.keyframes[window.settings.collapse.startframe]
  window.animationEndFrame = window.settings.gwd3d.keyframes[window.settings.collapse.endframe]

  // play tl
  window.bannerModeStartLoopTL = getBannerModeStartLoopTL();
  window.bannerModeStartLoopTL.play();

}

function handleCollapseFinish(e) {
  window.frameCounter = window.settings.expanded.startframe;

  // stop all TL                                                                                                        // add all timeline here except collapsed
  window.timelineArray = [
    window.zoomToFinalFrameTL,
    window.nextTL,
    window.finalTL,
    window.expandTL,
    window.playRotationViewAnimation,
  ]

  // show collapsed elements                                                                                            // add elements to be shown in collapsed mode
  TweenMax.set("#expandArrowsButton", { autoAlpha:1});
  TweenMax.set("#friskies_logo_small", {autoAlpha: 1})

  sharedHandleCollapseFinish()
}

// ------------------------------------ INTERACTION WITH USER ----------------------------------------------------------

function changeOrientationHandler() {
  sharedChangeOrientationHandler();
}

function handleCtaClick() {
  sharedHandleCtaClick("https://www.purina.com/friskies/wet-cat-food/complements-toppers");
}

function handleTouchStart(e) {
  sharedHandleTouchStart(e);
}
function handleTouchEnd(e) {
  sharedHandleTouchEnd(e);
}

function handleExit() {
  sharedHandleExit();
}

// ---------------------------------------------- SCROLL ---------------------------------------------------------------
function onRawScroll(event) {
  sharedOnRawScroll(event);
}

function handleHostpageScroll(e) {
  if (!window.isExpanded && !window.engagement) {

    sharedHandleHostpageScroll(e);


    if(!window.bannerModeStartLoop && !(window.frame != window.settings.scrolling.endFrame || window.frame === undefined)) {
      // set frames
      window.animationStartFrame = window.settings.gwd3d.keyframes[window.settings.collapse.startframe]
      window.animationEndFrame = window.settings.gwd3d.keyframes[window.settings.collapse.endframe]


      // play TL and rotation
      window.playRotationViewAnimation.play();
      window.bannerModeStartLoopTL = getBannerModeStartLoopTL();
      window.bannerModeStartLoopTL.play();
      window.bannerModeStartLoop = true;
    }
  }
}

// *********************************************************************************************************************
//                                             USEFULL FUNCTIONS
// *********************************************************************************************************************
// ---- 3D model
function update3DModelAnimation(model, animationFrame, animationName) {
  model.setAnimationTime(animationName, animationFrame);
}

function update3dModelPosition(state) {                                                                                 // set 3d model position

  switch (state) {
    case "collapse_end":
      window.gwd3dModel.setTargetZoom(800);
      window.gwd3dModel.setTargetLocalPan(0, 0, 0);
      window.gwd3dModel.setTargetPivot(0, 90, 5);
      window.gwd3dModel.setTargetYaw(0);
      window.gwd3dModel.setTargetPitch(-25);
      break;

    case "expand_start":
      window.gwd3dModel.setTargetZoom(1500);
      window.gwd3dModel.setTargetLocalPan(0, 0, 0);
      window.gwd3dModel.setTargetPivot(0, 0, 5);
      window.gwd3dModel.setTargetYaw(0);
      window.gwd3dModel.setTargetPitch(-35);
      break;

    default:
      window.gwd3dModel.setTargetZoom(800);
      window.gwd3dModel.setTargetLocalPan(0, 0, 0);
      window.gwd3dModel.setTargetPivot(0, 90, 5);
      window.gwd3dModel.setTargetYaw(0);
      window.gwd3dModel.setTargetPitch(-25);
  }
}


init();
