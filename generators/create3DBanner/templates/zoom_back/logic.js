// *********************************************************************************************************************
//                                           INIT VARIABLES
// *********************************************************************************************************************
function init() {
  sharedInit();

  // ---- boolean                                                                                                         // add boolean here if necessary
  window.endframeActive = false;
}

// *********************************************************************************************************************
//                                                INIT BANNER
// *********************************************************************************************************************

function initBanner() {
  sharedInitBanner();

  // ----------------------------------------------- TIMELINES ---------------------------------------------------------  // add specific TL if necessary

  window.swipeIconTimeline = getSwipeIconTimeline(
    ['#swipeIconSliderDot', '#swipeIconSliderDotRing'],
    {
      paused: true,
      repeat: 2,
      yoyo: true,
    },
    -53,
    -150,
    Power2.easeInOut,
  );

  window.mainTimeline = getMainTimeline({ paused: true });
  window.doorTimeline = getDoorTimeline({ paused: true });
  window.doorTimeline.progress(1);
  window.ringFadeTimeline = getRingFadeTimeline({ repeat: -1 });

  // ----------------------------------------------- EVENTS ------------------------------------------------------------ // add specific event listener
  document.querySelector('#backBtn').addEventListener('click', handleBackbtnClick);
  document.querySelector('#hotspot1').addEventListener('click', handleHotspotClick);
  document.querySelector('#hotspot1').addEventListener('touchstart', handleHotspotTouchStart);
  document.querySelector('#hotspot1').addEventListener('touchend', handleHotspotTouchEnd);
  document.querySelector('#hotspot2').addEventListener('click', handleHotspotClick);
  document.querySelector('#hotspot2').addEventListener('touchstart', handleHotspotTouchStart);
  document.querySelector('#hotspot2').addEventListener('touchend', handleHotspotTouchEnd);
  document.querySelector('#hotspot3').addEventListener('click', handleHotspotClick);
  document.querySelector('#hotspot3').addEventListener('touchstart', handleHotspotTouchStart);
  document.querySelector('#hotspot3').addEventListener('touchend', handleHotspotTouchEnd);
  document.querySelector('#hotspot4').addEventListener('click', handleHotspotClick);
  document.querySelector('#hotspot4').addEventListener('touchstart', handleHotspotTouchStart);
  document.querySelector('#hotspot4').addEventListener('touchend', handleHotspotTouchEnd);

  // ----------------------------------------------- SCROLLING ---------------------------------------------------------

  if (window.scrollEnabled) {
    update3DModelAnimation(window.gwd3dModel, window.settings.scrolling.endFrame, window.settings.gwd3d.animationName);
  }

  // ----------------------------------------------- START -------------------------------------------------------------
  start();
}

// *********************************************************************************************************************
//                                             EVENT HANDLER
// *********************************************************************************************************************
// ---------------------------------------------- LOADING --------------------------------------------------------------
function handleBannerPageLoad() {
  //disable pointer events on children so its easier to identify which obj gets clicked
  for (var i = 0; i < window.settings.hotspots.hotspots.length; i++) {
    TweenMax.set(window.settings.hotspots.hotspots[i].childNodes, { pointerEvents: 'none' });
  }
}

// ------------------------------------- INTERACTION WITH 3D MODEL -----------------------------------------------------
function handle3dModelEvents(e) {
  // for checking yaw, pivot and zoom when positioning 3dmodel
  /*
  if (typeof e.data == 'string') {
     console.log(e.data);
  }
*/

  sharedHandle3dModelEvents(e);

  // ---- interaction with 3d element started
  if (e && e.type === 'interaction-start') {
    // add element to hide/show during interaction
    if (!window.engagement) {
      window.engagement = true;

      // stop pulse tl
      if (window.pulseTL) {
        window.pulseTL.pause(0);
      }

      // clear timeout
      clearTimeout(window.endframeTimeout);
      clearTimeout(window.resetPositionTimeout);

      // pause TL
      window.mainTimeline.pause();
      window.collapseSwipeFadeOutTimeline = getCollapseSwipeOutTimeline();
    }
  }

  // ---- interaction with 3d element stopped
  if (e && e.type === 'interaction-end') {
    // add element to show/hide after the end of interaction
    window.engagement = false;

    // in expanded mode
    if (window.isExpanded) {
      // clear timeout
      clearTimeout(window.endframeTimeout);
      clearTimeout(window.resetPositionTimeout);
      setResetPositionTimeout();
      setEndframeTimeout();
    }
    // in collapsed mode
    else {
      // pause maint TL
      window.mainTimeline.pause();
      // show swipe button
      window.collapseSwipeFadeInTimeline = getCollapseSwipeInTimeline();
    }
  }
}

// ------------------------------------- NAVIGATION IN ANIMATION  ------------------------------------------------------
// ---- go to expanded end frame
function gotoEndFrame() {
  // add tl to play/pause in end frame
  window.pulseTL.pause(0);
  window.endframeActive = true;
  window.endframeTL = getEndframeTL();
  window.endframeTL.play();
}

// ---- put 3d model back to the right position
function resetPositions() {
  // add element to animate when back to position
  window.pulseTL.play();
  TweenMax.to([window.settings.hotspots.hotspots, '#tap-to-discover-copy'], 0.25, { autoAlpha: 1 });
  TweenMax.set(window.settings.hotspots.hotspots, { pointerEvents: 'auto', delay: 0.55 });

  this.gwd3dModelContent.postMessage({ name: 'setTargetZoom', scale: 1500 }, '*'); // update the position of the 3d model
  this.gwd3dModelContent.postMessage({ name: 'setTargetLocalPan', X: 0, Y: 0, Z: 0 }, '*');
  this.gwd3dModelContent.postMessage({ name: 'setTargetPivot', X: 1, Y: -3, Z: -1.8 }, '*');
  this.gwd3dModelContent.postMessage({ name: 'setTargetYaw', yawAngle: -24 }, '*');
  this.gwd3dModelContent.postMessage({ name: 'setTargetPitch', pitchAngle: 0 }, '*');

  clearTimeout(window.endframeTimeout);
  setEndframeTimeout();
}

// ---- rotate hotspot when interaction                                                                                 // add animation when hotspot are interacting
function handleHotspotTouchStart(e) {
  TweenMax.to(e.target, 0.5, { rotation: '+=90' });
  clearTimeout(window.endframeTimeout);
  clearTimeout(window.resetPositionTimeout);
}
// ---- rotate back hotspot when interaction stop
function handleHotspotTouchEnd(e) {
  TweenMax.to(e.target, 0.5, { rotation: 0 });
  setResetPositionTimeout();
  setEndframeTimeout();
}

// ---- handle current frame
function handleHotspotClick(e) {
  // stop pulse tl
  window.pulseTL.pause(0);
  // clear timeout
  clearTimeout(window.endframeTimeout);
  clearTimeout(window.resetPositionTimeout);

  // get the index of the current hotspot
  window.currentHotspot = window.settings.hotspots.hotspots.indexOf(e.target);
  // get the frame
  window.hotspotInFrameNum = window.settings.hotspots.frame[window.currentHotspot];
  // get the copy
  window.hotspotCopy = window.settings.hotspots.copy[window.currentHotspot];

  // set the animation frame and duration
  window.animationStartFrame = window.settings.gwd3d.keyframes[window.hotspotInFrameNum];
  window.animationEndFrame = window.settings.gwd3d.keyframes[window.hotspotInFrameNum + 1];
  window.duration = Math.abs(window.animationEndFrame - window.animationStartFrame);

  // play tl
  window.hotspotInTL = getHotspotClickTL();
  window.hotspotInTL.play();
}

// ---- handle going back to main expanded tl
function handleBackbtnClick() {
  // reverse animation frames
  window.animationStartFrame = window.settings.gwd3d.keyframes[window.hotspotInFrameNum + 1];
  window.animationEndFrame = window.settings.gwd3d.keyframes[window.hotspotInFrameNum];
  // play TL
  window.hotspotOutTL = getBackClickTL();
  window.hotspotOutTL.play();
}

// ---- Timeout
// position timeout
function setResetPositionTimeout() {
  window.resetPositionTimeout = setTimeout(function() {
    resetPositions();
    // window.pulseTL.play(0);
  }, 1000);
}
// end frame timeout
function setEndframeTimeout() {
  window.endframeTimeout = setTimeout(function() {
    gotoEndFrame();
    // window.pulseTL.pause(0);
  }, 4000);
}

// ----------------------------------------------- START ---------------------------------------------------------------
function start() {
  // add tl to play at start
  window.mainTimeline.play();
}
// ----------------------------------------------- EXPAND --------------------------------------------------------------
function expand() {
  sharedExpand();
}

function handleExpandStart() {
  sharedHandleExpandStart();

  // stop scrolling door animation                                                                                      // add tl to play/pause while expansion
  window.doorTimeline.gotoAndStop('end');
  // play TL
  window.mainTimeline.gotoAndStop('banner');
}

function handleExpandFinish() {
  sharedHandleExpandFinish();

  // reset all tl                                                                                                       // add tl to reset when expanded
  window.hotspotTL = getHotspotTL(0);
  window.pulseTL = getPulseTL(0);
  window.expandTL.play(0);

  // disable gesture layer
  TweenMax.set('#disableGestureLayer', { autoAlpha: 1 });
}

// --------------------------------------------- COLLAPSE --------------------------------------------------------------
function collapse() {
  sharedCollapse();
}

function handleCollapseStart(e) {
  // add tl to play/pause while collapsing
  sharedHandleCollapseStart();
}

function handleCollapseFinish(e) {
  // clear timeout
  clearTimeout(window.endframeTimeout);
  clearTimeout(window.resetPositionTimeout);

  // stop all TL                                                                                                        // add all timeline here except collapsed
  window.timelineArray = [
    window.nextTL,
    window.expandTL,
    window.hotspotTL,
    window.pulseTL,
    window.endframeTL,
    window.hotspotInTL,
    window.hotspotOutTL,
  ];

  // able gesture layer
  TweenMax.set('#disableGestureLayer', { autoAlpha: 0 });

  // show collapsed elements                                                                                            // add elements to be shown in collapsed mode
  TweenMax.set(['#expandCta', '#expandArrowsButton', '#expandRingWrapper'], { autoAlpha: 1 });

  sharedHandleCollapseFinish();
}

// ------------------------------------ INTERACTION WITH USER ----------------------------------------------------------

function changeOrientationHandler() {
  sharedChangeOrientationHandler();
}

function handleCtaClick() {
  // update exit link
  clearTimeout(window.endframeTimeout);
  clearTimeout(window.resetPositionTimeout);
  sharedHandleCtaClick('http://www.google.com');
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

    // ---- tween animation
    var startFrameAnimation = window.doorTimeline.getLabelTime('start');
    var endFrameAnimation = window.doorTimeline.getLabelTime('end');
    var frameAnimation = Math.max(startFrameAnimation, Math.min(endFrameAnimation, window.per));
    window.doorTimeline.gotoAndStop(frameAnimation);
  }
}

// *********************************************************************************************************************
//                                             USEFULL FUNCTIONS
// *********************************************************************************************************************
// ---- 3D model
function update3DModelAnimation(model, animationFrame, animationName) {
  model.setAnimationTime(animationName, animationFrame);
}

function update3dModelPosition(state) {
  // set 3d model position

  switch (state) {
    case 'collapse_end':
      console.log('collapse_end state');

      break;

    case 'expand_start':
      console.log('expand_start state');

      // window.gwd3dModel.setTargetZoom(1500);
      // window.gwd3dModel.setTargetLocalPan(0, 0, 0);
      // window.gwd3dModel.setTargetPivot(1, -3, -1.8);
      // window.gwd3dModel.setTargetYaw(-24);
      // window.gwd3dModel.setTargetPitch(0);
      break;

    default:
      console.log('default state');
      window.gwd3dModel.setTargetZoom(1500);
      window.gwd3dModel.setTargetLocalPan(0, 0, 0);
      window.gwd3dModel.setTargetPivot(1, -3, -1.8);
      window.gwd3dModel.setTargetYaw(-24);
      window.gwd3dModel.setTargetPitch(0);
  }
}

init();
