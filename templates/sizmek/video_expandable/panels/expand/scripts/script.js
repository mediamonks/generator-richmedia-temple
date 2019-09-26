///////////////////////////////////////////////////////////
//-->THE VARIABLES BELOW IT´S ONLY FOR LOCAL TESTING <--///
//////////////////////////////////////////////////////////
//When you upload the Ad to the platform will use the size of the default image that you choose
var collapsedWidth = 300; //Default: 300
var collapsedHeight = 250; //Default: 250
//The variables below are the additional assets, if you want change them in the platform:
//You will need go to addittional assets and searching the ID for each element you want to change
//Video//:
var video_mp4_localPath = 'video.mp4'; //ID:1
var video_poster_localPath = 'sizmek_poster.png'; //ID:2
//Images for the different states(loading, default )
var imageName_default_localPath = 'companion_300x250_default.jpg'; //ID:3
var imageName_expand_localPath = 'companion_300x250_expand.jpg'; //ID:4
var imageName_loading_localPath = 'companion_300x250_loading.jpg'; //ID:5
//You should change the customVariable "configurationToolbarColorSet" if you want to change the type of logo
var imageName_logo_positive = 'logo_positive.svg'; //ID:6
var imageName_logo_negative = 'logo_negative.svg'; //ID:7
//You have the landscape and portrait images for Mobile devices only.
var imageName_mobile_landscape_localPath = 'mobile_landscape_960x640.jpg'; //ID:8
var imageName_mobile_portrait_localPath = 'mobile_portrait_640x960.jpg'; //ID:9
/////////////////////////////////////////////////////
//NOTE: After upload the Ad to the platform
//you will need to check the values for each custom variable in the custom variables tab
////////////////////////////////////////////////////
/*******************
INITIALIZATION
*******************/
function checkIfAdKitReady(event) {
  adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
  //Implement code logic to fire
}
/*******************
END OF CREATIVE FUNCTIONS
*******************/
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
var videoExpandable = new videoExpandable(config);
window.addEventListener('load', checkIfAdKitReady);
/*******************
CALL BACKS
*******************/
function afterShowCreative() {
  //Implement code logic to fire
}

function beforeExpandAnimation() {
  //Implement code logic to fire
}

function afterExpandAnimationComplete() {
  //Implement code logic to fire
}

function beforeCollapseAnimation() {
  //Implement code logic to fire
}

function afterCollapseAnimationComplete() {
  //Implement code logic to fire
}

function onClickCollapse() {
  //Implement code logic to fire
}

function onMouseOutCollapse() {
  //Implement code logic to fire
}

function onMouseOverExpand() {
  //Implement code logic to fire
}

function onClickExpand() {
  //Implement code logic to fire
}

function afterCollapsedCompanionClick() {
  //Implement code logic to fire
}

function afterExpandedCompanionClick() {
  //Implement code logic to fire
}

function handleExpandedCompanionClick() {
  //Implement code logic to fire
}

function afterVideoClick() {
  //Implement code logic to fire
}

function afterVideoEnd(args) {
  //Implement code logic to fire
  //At the end of the video the panel will be collapsed
  if (args.isExpanded) videoExpandable.collapse(null, EBG.ActionType.AUTO);
}

function videoPlay() {
  //Implement code logic to fire
}

function videoPause() {
  //Implement code logic to fire
}

function videoUnMuted() {
  //Implement code logic to fire
}

function videoMuted() {
  //Implement code logic to fire
}
