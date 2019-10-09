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
//                                      USEFULL TWEEN ANIMATION
// *********************************************************************************************************************

// animation used to have a mouvement left/right
function getSwipeIconTimeline(el, obj,from,to,ease) {
  var tl = new TimelineMax(obj);
  tl.fromTo(
    el,
    1,
    { xPercent: from },
    { xPercent: to, repeat: -1, yoyo: true, ease:ease }
  );
  return tl;
}
// animation used to have a pulse effect
function getPulseIconTimeline(el, obj) {
  var tl = new TimelineMax(obj);
  tl.fromTo(
    el,
    0.7,
    { scale: 1 },
    { scale: 1.08, repeat: -1, yoyo: true, ease: Sine.easeInOut}
  );
  return tl;
}


// *********************************************************************************************************************
//                                      USEFULL 3D ANIMATION
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

// ------------------------------------------ 3D MODEL ROTATION --------------------------------------------------------

// rotate 3d model from an angle to another in a given time
// example of use:
// goFromToAngle(0,20,4, 0.1)); -> go from 0 degre to 20 degres in 4s with a precision of 0.1
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

// ----------------------------------------- 3D MODEL MODIFICATION -----------------------------------------------------

// apply an effect on 3dModel in 'time'seconds
// example of use:
// change3dModelEffectIn('CapMat',2,glowInTheDark);
// change3dModelEffectIn('CapMat',2,change3DColor,{r:10,g:50,b:100});
function change3dModelEffectIn(material,time,func,arg){
  // update every 10 ms
  var timeslot = 10;
  // number ot slot
  var nb_slot = (time*1000)/timeslot;
  // percentage at each slot
  var per = 1/nb_slot;

  var pct = 0;
  setInterval(function() {
    if (pct <= 0.99) {
      pct += per;
      if(pct >= (1-per)){
        pct = 1;
      }

      func(material,pct,arg);

    }}, timeslot);
}

// change the color of a part of the 3d element with a percentage between 0 and 1
// example of use:
// change3DColor('CapMat',1,{r:10,g:50,b:100});
function change3DColor(material, percentage, color)
{
  window.gwd3dModelContent.handleMessage(
    {
      name: 'setMaterialColor',
      material: material,
      r: (color.r/255)*percentage, g: (color.g/255)*percentage, b: (color.b/255)*percentage
    }, "*");
}

// make an element glow in the dark with a percentage between 0 and 1
// example of use:
// glowInTheDark('CapMat',1);
function glowInTheDark(material,percentage)
{
  // put 3d model dark and add reflexion
  window.gwd3dModelContent.handleMessage({
    name:'setIblAtlas',
    iblUrl:'https://poly.googleusercontent.com/downloads/1dXdp27zkZl/9Pkt37NW6ct/poly_pmrem_cubeuv_studio.jpg',
    intensity:1 * (1 - percentage)
  }, "*");
  // put part of the object glowing
  window.gwd3dModelContent.handleMessage({
    name:'setMaterialEmissive',
    material:material,
    r: 0.0,
    g:(.8 * percentage),
    b:(.3 * percentage)
  }, "*");
}

// make a array of element pulse
function getPulseTL(elements) {
  var tl = new TimelineMax({ paused: true, repeat: -1 });
  tl.add("pulse");

  tl.staggerFromTo(elements, 1.3,{ scale: 0 }, { scale: 1 }, 0.2, 'pulse');
  tl.staggerFromTo(elements, 0.8,{ autoAlpha: 0 }, { autoAlpha: 1 }, 0.2, 'pulse+=0.5');
  tl.staggerTo(elements, 1.2,{ autoAlpha: 0 }, 0.2, 'pulse+=1.2');

  return tl;
}
