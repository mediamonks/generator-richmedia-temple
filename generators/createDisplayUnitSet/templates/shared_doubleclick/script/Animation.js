import FrameAnimation from "@mediamonks/temple/animation/FrameAnimation";

export default class Animation extends FrameAnimation {

  frame0(tl){
    tl.to(".content", {duration:1, opacity: 1})
    return tl;
  };
}
