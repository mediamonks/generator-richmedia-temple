// *********************************************************************************************************************
//                                        FIRST ANIMATION
// *********************************************************************************************************************

// ------------------------------------- MAIN TIMELINE -----------------------------------------------------------------
function getMainTimeline(obj) {
  var tl = new TimelineMax(obj);

  tl.add(getSharedMainTimeline());

  // ---- animation                                                                                                     // add main animation here
  // swipe
  tl.staggerFrom(['#swipeToRotate', '#textSwipeToRotate'], 0.4,
      {scale: 0, ease: Back.easeOut.config(4),}, 0.1, 'start+=0.5');
  tl.addLabel('swipe', '+=6');
  tl.to(['#swipeToRotate', '#textSwipeToRotate'], 0.2, { opacity: 0, ease: Power0.easeIn }, 'swipe');
  // expand
  tl.from('#expandCta', 0.3, { scale: 0, transformOrigin: 'center center', ease: Back.easeOut.config(4) },"swipe+=0.5");

  // label
  tl.addLabel('banner');
  tl.addPause('banner');

  return tl;
}

// ------------------------------------- SIDE ANIMATION TIMELINE -------------------------------------------------------// add specific tl here


// *********************************************************************************************************************
//                                    EXPANDED ANIMATION
// *********************************************************************************************************************

// ---------------------------------- MAIN TIMELINE --------------------------------------------------------------------
function getExpandTimeline() {

    var tl = new TimelineMax(
        {
            paused: true,
            onComplete: function () {
                window.animationAllowed = true;
                if (window.isExpanded) {
                  // play first animation
                    window.handleAutoplay();
                }
            }
        }
    );

    tl.add('expand');

    // show expanded content                                                                                              // add content to show on expanded mode
    tl.set(["#disableGestureLayer","#backgroundExpand","#friskies_logo_big"], {autoAlpha: 1},'expand')
    tl.to(['#closeButton'], 0.25, {autoAlpha: 1,}, 'expand');
    tl.set(['#expandCta', '#expandArrowsButton'], { opacity: 0 }, 'expand');

    // play 3d animation
    tl.add(addPlayFrame(window.settings.gwd3d.keyframes[window.settings.expanded.startframe],
                        window.settings.gwd3d.keyframes[window.settings.expanded.startframe+1]),
            'expand')

    tl.addPause('expand_end');
    return tl;
}

//------------------------------------- INTERACTION TIMELINE -----------------------------------------------------------
// ---- when pressing next/previous button
function getNextFrameTimeline() {

    // create TL and call handleCurentFrame to show/hide element and set the frames
    var tl = new TimelineMax(
        {onStart: function ()
            {
                window.animationAllowed = false;
            },
            onComplete: function ()
            {
                window.animationAllowed = true;
                window.handleCurrentFrame();
            }
        });

  // ---- hide previous content                                                                                         // add content to hide from previous frame
  tl.set(['#tuna_image', '#shrimp_image', '#salmon_image'], {autoAlpha:0});
  tl.set(['#tuna_panel', '#shrimp_panel', '#salmon_panel'], {autoAlpha:0});
  tl.set(['#nextButton', '#previousButton'], {autoAlpha:0}) ;

  // play animation
    tl.add('goToNextFrame');
    tl.add(addPlayFrame(window.animationStartFrame,window.animationEndFrame),"goToNextFrame")

    tl.addPause();
    return tl;
}

// ---- when the end of animation reached by the next button
function getzoomToFinalFrameTL()
{
    var tl = new TimelineMax();
    tl.add("unzoom")
    tl.to('#disableGestureLayer', 0.1, {autoAlpha:0},"unzoom+=3.1")
    tl.add(addPlayFrame(window.animationStartFrame,window.animationEndFrame),"unzoom")
    // show content                                                                                                     // add content to show for the last frame
    tl.set('#cta', {autoAlpha:1},"unzoom")

    return tl;
}
function getFinalFrameTL() {
    // create TL with infinite loop
    var tl = new TimelineMax({repeat:-1});
    tl.add(addPlayFrame(window.animationStartFrame,window.animationEndFrame),"goToNextFrame")

    return tl;
}


//------------------------------------- LOOPING TIMELINE -----------------------------------------------------------
function getBannerModeStartLoopTL() {
    var tl = new TimelineMax({paused: true, repeat: -1});
    tl.add('loop');
    tl.add(addPlayFrame(window.animationStartFrame,window.animationEndFrame),'loop')
    return tl;
}



// *********************************************************************************************************************
//                                      INTERACTING  WITH 3D MODEL
// *********************************************************************************************************************

// ---- remove elements when started interacting with 3d element in collapsed mode
function getCollapseSwipeOutTimeline(obj) {                                                                             // add elements to hide/show when interacting with 3d model
  var tl = new TimelineMax(obj);
  tl.to(["#swipeToRotate", "#textSwipeToRotate"], 0.2, { opacity: 0, ease: Power0.easeIn }, "start");
  tl.to("#expandCta", 0.2, { scale: 0, ease: Cubic.easeOut, transformOrigin: "center center" }, "start");
  return tl;
}
// ---- make element reappear after interaction ended
function getCollapseSwipeInTimeline() {                                                                                 // add elements to hide/show when interaction stopped
  var tl = new TimelineMax();
  tl.fromTo(
      "#expandCta",
      0.3,
      {
        scale: 0,
        transformOrigin: "center center"
      },
      {
        scale: 1,
        transformOrigin: "center center",
        ease: Back.easeOut.config(4),
        onComplete: function() {
          this.isCollapsedSwiping = false;
        }.bind(this)
      }
  );
  return tl;
}

// *********************************************************************************************************************
//                                      USEFULL ANIMATION
// *********************************************************************************************************************

// -------------------------------------- 3D MODEL ROTATION ------------------------------------------------------------
function rotationViewAnimationExpand(obj) {                                                                                // choose rotation parameters if needed
  var tl = new TimelineMax({obj});
  tl.add(goFromToAngle(0,20,4, 0.1));
  tl.add(goFromToAngle(20,0,8, 0.1));

  return tl;
}

