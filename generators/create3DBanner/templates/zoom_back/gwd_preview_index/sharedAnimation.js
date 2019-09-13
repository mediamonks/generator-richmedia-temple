// *********************************************************************************************************************
//                                        FIRST ANIMATION
// *********************************************************************************************************************

// ------------------------------------- MAIN TIMELINE -----------------------------------------------------------------
function getSharedMainTimeline() {
  var tl = new TimelineMax();

  // ---- set size
  window.gwdPageContent.style.width = window.bannerPage.style.width = window.settings.dimensions.width + 'px';
  window.gwdPageContent.style.height = window.bannerPage.style.height = window.settings.dimensions.height + 'px';

  // ---- loader
  tl.to("#loaderWrapper", 1, { autoAlpha: 0 }, "start");
  tl.addLabel("loader");

  // ---- 3d model
  tl.set("#gwd3dModelDisable", { pointerEvents: "none" });


  return tl;
}


// *********************************************************************************************************************
//                                      USEFULL ANIMATION
// *********************************************************************************************************************

// ------------------------------------ PLAY 1 FRAME OF 3D ANIMATION ---------------------------------------------------
function addPlayFrame( startFrame, endFrame)
{
  var tl = new TimelineMax();
  var duration = Math.abs(endFrame-startFrame);

  tl.fromTo(window.keyObj, duration,
    {animationFrame: startFrame}, {
      animationFrame: endFrame,
      ease: Linear.easeNone,
      onUpdate: function () {
        update3DModelAnimation(
          window.gwd3dModel,
          window.keyObj.animationFrame,
          window.settings.gwd3d.animationName
        );
      }
    }
  );
  return tl;
}

// -------------------------------------- 3D MODEL ROTATION ------------------------------------------------------------

function goFromToAngle(from,to,time, precision)
{
  var tl = new TimelineMax();

  var angle = to-from;
  var speed = Math.abs(angle)/time ;
  var timeSlot = precision/speed;

  // if going reverse clockwise
  if(angle>0)
  {
    for (var i=from; i<to; i+=precision)
    {
      tl.call(setTargetYaw, [i], this, '+='+timeSlot);
    }
  }
  // if going clockwise
  else
  {
    for (var i=from; i>to; i-=precision)
    {
      tl.call(setTargetYaw, [i], this, '+='+timeSlot);
    }
  }
  return tl;
}
function setTargetYaw(num) {
  this.gwd3dModel.setTargetYaw(num);
}


