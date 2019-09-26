import Banner from './Banner';
import EventDispatcherComponent from '@mediamonks/temple/component/EventDispatcherComponent';

window.afterShowCreative = function() {
  //Implement code logic to fire
};

window.beforeExpandAnimation = function() {
  //Implement code logic to fire
};

window.afterExpandAnimationComplete = function() {
  //Implement code logic to fire
};

window.beforeCollapseAnimation = function() {
  //Implement code logic to fire
};

window.afterCollapseAnimationComplete = function() {
  //Implement code logic to fire
};

window.onClickCollapse = function() {
  //Implement code logic to fire
};

window.onMouseOutCollapse = function() {
  //Implement code logic to fire
};

window.onMouseOverExpand = function() {
  //Implement code logic to fire
};

window.onClickExpand = function() {
  //Implement code logic to fire
};

window.afterCollapsedCompanionClick = function() {
  //Implement code logic to fire
};

window.afterExpandedCompanionClick = function() {
  //Implement code logic to fire
};

window.handleExpandedCompanionClick = function() {
  //Implement code logic to fire
};

window.afterVideoClick = function() {
  //Implement code logic to fire
};

window.afterVideoEnd = function(args) {
  //Implement code logic to fire
  //At the end of the video the panel will be collapsed
  if (args.isExpanded) videoExpandable.collapse(null, EBG.ActionType.AUTO);
};

window.videoPlay = function() {
  //Implement code logic to fire
};

window.videoPause = function() {
  //Implement code logic to fire
};

window.videoUnMuted = function() {
  //Implement code logic to fire
};

window.videoMuted = function() {
  //Implement code logic to fire
};

// wait for the adKit to be ready
adkit.onReady(() => {
  // then start the banner

  // then when the EventDispatchComponent is loaded. sibscribe to the click event
  document.querySelector('.banner').addEventListener('click', () => {
    EB.clickthrough();
  });

  var config = {
    panel: 'expand',
    //OPTIONAL: FOR LOCAL TESTING ONLY//
    video_mp4_localPath: video_mp4_localPath,
    video_poster_localPath: video_poster_localPath,
    imageName_loading_localPath: imageName_loading_localPath,
    imageName_default_localPath: imageName_default_localPath,
    imageName_expand_localPath: imageName_expand_localPath,
    imageName_logo_positive: imageName_logo_positive,
    imageName_logo_negative: imageName_logo_negative,
    imageName_mobile_landscape_localPath: imageName_mobile_landscape_localPath,
    imageName_mobile_portrait_localPath: imageName_mobile_portrait_localPath,
    //OPTIONAL: FOR LOCAL TESTING ONLY//
  };

  const video = videoExpandable(config);
});
