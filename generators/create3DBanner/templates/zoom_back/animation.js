// *********************************************************************************************************************
//                                        FIRST ANIMATION
// *********************************************************************************************************************

// ------------------------------------- MAIN TIMELINE -----------------------------------------------------------------
function getMainTimeline(obj) {
  var tl = new TimelineMax(obj);

  tl.add(getSharedMainTimeline());

  // ---- animation                                                                                                     // add main animation here
  // hide logo
  tl.addLabel("logoOut", "+=3");
  tl.to("#collapsed_logo", 0.2, { opacity: 0, ease: Power0.easeIn }, "logoOut");

  // swipe icon
  tl.from(["#textSwipeToRotate"], 0.2, { opacity: 0, ease: Power0.easeIn }, "logoOut+=0.5");
  tl.from(["#swipeIconSlider", "#swipeIconSliderDot", "#swipeIconSliderDotRing"],
    0.2, { opacity: 0, ease: Power4.easeIn }, "logoOut+=0.5");
  tl.to(["#swipeIconSliderDotRing"], 2, { scale: 1.4, opacity: 0, repeat: -1, ease: Power4.easeOut });

  tl.addLabel("swipe", "+=3");
  window.swipeIconTimeline.play();


  tl.to(["#swipeIconSlider", "#swipeIconSliderDot", "#swipeIconSliderDotRing"], 0.2,
    { opacity: 0, ease: Power0.easeIn }, "swipe");
  tl.to("#textSwipeToRotate", 0.2, { opacity: 0, ease: Power0.easeIn }, "swipe");

  // expand icon
  tl.from("#expandRingWrapper" , 0.3, { opacity: 0, ease: Power0.easeIn }, "swipe+=1");
  tl.from("#expandCta", 0.3,
    {
      scale: 0,
      transformOrigin: "center center",
      ease: Back.easeOut.config(4),
    },
    "swipe+=1");
  tl.to(["#expandCircle", "#expandRing", "#expandRingFadeWrapper"], 0.3, { opacity: 1 }, "swipe+=1");

  // label
  tl.addLabel("banner");
  tl.addPause("banner");


  return tl;
}

// ------------------------------------- SIDE TIMELINE -----------------------------------------------------------------// add side tl here
// expand logo animation
function getRingFadeTimeline(obj) {
  var tl = new TimelineMax(obj);

  tl.add("start");
  tl.from("#expandRingFade", 1, {opacity: 0.2, ease:Power2.easeIn}, "start");
  tl.to("#expandCircle", 1, {scale:1, ease:Power2.easeIn}, "start");
  tl.add("fadeout");
  tl.to("#expandRingFade", 0.7, {scale:1.1, opacity: 0, ease:Power2.easeOut}, "fadeout");
  tl.to("#expandCircle", 1, { scale:0.75, ease:Power2.easeOut}, "fadeout");
  tl.set("#expandRingFade", {scale:1, ease:Power2.easeOut});
  tl.to("#expandRingFade", 0.3, {opacity: 0.2, ease:Power2.easeOut});

  return tl;
}


// *********************************************************************************************************************
//                                    SCROLL ANIMATION
// *********************************************************************************************************************  // add scrolling animation
// opening door tl
function getDoorTimeline(obj) {
  var tl = new TimelineMax(obj);
  tl.addLabel("start");
  tl.to("#doorRightCollapsed", 0.9, { x: 400 }, "start+=0.3");
  tl.to("#doorRightCollapsedLogo", 0.9, { x: 400 }, "start+=0.3");
  tl.to("#doorRightCollapsedLogo", 0.3, { rotation: 90, transformOrigin: "center center" }, "start+=0.1");
  tl.to("#doorLeftCollapsed", 0.9, { x: -400 }, "start+=0.3");
  tl.addLabel("end");
  return tl;
}
// *********************************************************************************************************************
//                                    EXPANDED ANIMATION
// *********************************************************************************************************************

// ---------------------------------- MAIN TIMELINE --------------------------------------------------------------------
function getExpandTimeline() {

  var tl = new TimelineMax(
    {
      paused: true,
      onComplete: function() {
        window.animationAllowed = true;
        if (window.isExpanded) {
          // make hotspots appear
          window.hotspotTL.play(0);
          setEndframeTimeout();
          setResetPositionTimeout();
        }
      },
    });

  // ---- open door animation                                                                                           // add animation when expanded
  tl.add("openDoors");
  tl.fromTo(["#doorRight", "#doorLeft", "#doorLogo"], 0.2, { autoAlpha: 0 }, { autoAlpha: 1 });
  tl.fromTo(["#doorRight", "#doorLogo"], 3, { x: 0 }, { x: document.querySelector("#doorRight").offsetWidth },
    "openDoors+=1");
  tl.fromTo("#doorLeft", 3, { x: 0 }, { x: -document.querySelector("#doorLeft").offsetWidth }, "openDoors+=1");
  tl.fromTo("#doorLogo", 1, { rotation: 0 }, { rotation: 90 }, "openDoors");

  // ---- show expanded content                                                                                         // add content to show on expanded mode
  tl.add("expand", "-=3.2");
  tl.to(["#closeButton"], 0.25, { autoAlpha: 1 }, "openDoors");
  tl.set(["#expandCta", "#expandArrowsButton", "#expandRingWrapper"], { opacity: 0 }, "openDoors");
  tl.set("#backgroundExpand", { opacity: 1 }, "openDoors");

  // ---- play animation
  tl.add(addPlayFrame(window.settings.gwd3d.keyframes[window.settings.expanded.startframe],
    window.settings.gwd3d.keyframes[window.settings.expanded.endframe]),
    'expand')

  tl.addPause("expand_end");
  return tl;
}

//------------------------------------- INTERACTION TIMELINE -----------------------------------------------------------
// ---- when pressing hotspot buttons
function getHotspotClickTL() {

  var tl = new TimelineMax({ paused: true });

  // diable gesture
  tl.set("#disableGestureLayer", {autoAlpha: 1});

  // hide hotspots                                                                                                      // add elements to hide
  tl.set(window.settings.hotspots.hotspots, {pointerEvents:"none"});
  tl.to([window.settings.hotspots.hotspots,'#tap-to-discover-copy'], 0, {autoAlpha:0});

  tl.add("goToNextFrame");

  // play 3d animation
  tl.add(addPlayFrame(window.animationStartFrame, window.animationEndFrame), "goToNextFrame");

  // show content                                                                                                       // add element to show
  tl.to("#backBtn", 0.5, { autoAlpha: 1 }, "goToNextFrame+=2.5");
  tl.to(window.hotspotCopy, 0.5, { autoAlpha: 1 }, "goToNextFrame+=2");
  tl.set("#backBtn", { pointerEvents: "auto" }, "goToNextFrame+=2");

  tl.addPause();
  return tl;
}

// ---- going back to main view
function getBackClickTL() {

  var tl = new TimelineMax({
    paused: true,
    onComplete: function() {                                                                                            // add animation after hitting the back button
      TweenMax.staggerTo([window.settings.hotspots.hotspots,'#tap-to-discover-copy'], 0.25, { autoAlpha: 1 }, 0.1);
      TweenMax.staggerTo(window.settings.hotspots.hotspotRings, 0.25, { autoAlpha: 1 }, 0.1);
      TweenMax.set(window.settings.hotspots.hotspots, { pointerEvents: "auto", delay: 0.55 });
      TweenMax.set("#disableGestureLayer", { autoAlpha: 0, delay: 0.55 });
      setEndframeTimeout();
      window.pulseTL.play();
    }
  });
  tl.add("goToNextFrame");

  // hide elements                                                                                                      // add elements to hide
  tl.set(['#backBtn'], {pointerEvents:"none"}, "goToNextFrame");
  tl.to(['#backBtn'], 0.3 ,{autoAlpha:0}, "goToNextFrame");
  tl.to(window.hotspotCopy, 0.5, { autoAlpha: 0 }, "goToNextFrame");

  // play 3d animation
  tl.add(addPlayFrame(window.animationStartFrame, window.animationEndFrame), "goToNextFrame");

  tl.addPause();
  return tl;
}

// ---- end frame
function getEndframeTL() {
  var tl = new TimelineMax({ paused: true });
  tl.add("goToNextFrame");

  // show cta and logo                                                                                                  // add endframe animation
  tl.set("#cta", { pointerEvents: "auto" }, "goToNextFrame");
  tl.to("#cta", 0.5, { autoAlpha: 1 }, "goToNextFrame");
  tl.to("#ysl_logo", 0.5, { autoAlpha: 1 }, "goToNextFrame");

  // hide hotspots
  tl.set(window.settings.hotspots.hotspots, { pointerEvents: "auto" }, "goToNextFrame");
  tl.set([window.settings.hotspots.hotspots,'#tap-to-discover-copy'], { autoAlpha: 0 }, "goToNextFrame");

  tl.addPause();
  return tl;
}

//-------------------------------------------- SIDE TIMELINE -----------------------------------------------------------// add your side tl here

function getHotspotTL() {
  var tl = new TimelineMax({
    paused: true,
    onStart: function() {
      window.pulseTL = getPulseTL(window.settings.hotspots.hotspotRings);
      window.pulseTL.play(0);
    }
  });

  tl.staggerFromTo([window.settings.hotspots.hotspots,'#tap-to-discover-copy'], 0.25, { autoAlpha: 0, scale: 0.6 },
    { autoAlpha: 1, scale: 1 }, 0.1);
  tl.fromTo("#disableGestureLayer", 0.05, { autoAlpha: 1 }, { autoAlpha: 0 });
  return tl;
}
// *********************************************************************************************************************
//                                      INTERACTING WITH 3D MODEL
// *********************************************************************************************************************

// ---- remove elements when started interacting with 3d element in collapsed mode
function getCollapseSwipeOutTimeline(obj) {                                                                             // add elements to hide/show when interacting with 3d model
  var tl = new TimelineMax(obj);


  // interaction in the endframe
  if(window.endframeActive === true){
    // hide CTA and logo
    tl.set('#cta', {pointerEvents:"none"});
    tl.to('#cta', 0.5, {autoAlpha:0});
    tl.to('#ysl_logo', 0.5, {autoAlpha:0});
  }

  // hide hotspots
  tl.set(window.settings.hotspots.hotspots, {pointerEvents:"none"})
  tl.to([window.settings.hotspots.hotspots,'#tap-to-discover-copy'], 0.2, {autoAlpha:0})

  // hide swipe and expand icon
  tl.to(["#swipeToRotate", "#textSwipeToRotate", "#collapsed_logo"], 0.2, { opacity: 0, ease: Power0.easeIn }, "start");
  tl.to("#expandCta", 0.2, { scale: 0, ease: Cubic.easeOut, transformOrigin: "center center" }, "start");
  tl.to("#expandRingWrapper" , 0.2,  { opacity:0, ease: Cubic.easeOut }, "start");
  tl.to(["#swipeIconSlider", "#swipeIconSliderDot", "#swipeIconSliderDotRing"], 0.2, { opacity: 0, ease: Power0.easeIn }, "start");
  return tl;
}

// ---- make element reappear after interaction ended
function getCollapseSwipeInTimeline() {                                                                                 // add elements to hide/show when interaction stopped
  var tl = new TimelineMax();
  tl.fromTo("#expandCta", 0.3, {scale: 0, transformOrigin: "center center"},
    {scale: 1, transformOrigin: "center center", ease: Back.easeOut.config(4),});

  tl.fromTo("#expandRingWrapper" , 0.2,  { opacity:0}, { opacity: 1, ease: Cubic.easeOut });
  return tl;
}

