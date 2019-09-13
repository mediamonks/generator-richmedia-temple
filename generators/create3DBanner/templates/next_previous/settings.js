// *********************************************************************************************************************
//                                                    SETTINGS
// *********************************************************************************************************************
window.settings = {};

// ---- dimensions of the banner
window.settings.dimensions = {
  width: <%= banner_width %>,
  height: <%= banner_height %>,
};

// ---- keyframes of the animation
window.settings.gwd3d = {
  keyframes: [2.28, 3.28, 11.56, 13.84, 16.6, 19.4, 21.86, 30.12],
  animationName: 'All Animations',
};

// ---- scrolling settings
//between 20% and 60% of top/bottom the creative will start/stop animating
window.settings.scrolling = {};
window.settings.scrolling.startBound = 0.2;
window.settings.scrolling.endBound = 0.5;
//the startframe and endframe from/to it will animate
window.settings.scrolling.startFrame = window.settings.gwd3d.keyframes[0];
window.settings.scrolling.endFrame = window.settings.gwd3d.keyframes[1];

// ---- expanded settings
window.settings.expanded = {};
window.settings.expanded.startframe = 2;
window.settings.expanded.lastzoomedframe = 4;
window.settings.expanded.endframe = 6;

// ---- collapse settings
window.settings.collapse = {};
window.settings.collapse.startframe = 1;
window.settings.collapse.endframe = 2;

// ---- content to show on each frame
window.settings.contentFrames = [
  {},
  {},
  { arrowColor:"rgba(173, 69, 163, 0.6)", foodImage:"#shrimp_image", copyOverlay:"#shrimp_panel"},
  { arrowColor:"rgba(255, 100, 173, 0.6)", foodImage:"#salmon_image", copyOverlay:"#salmon_panel"},
  { arrowColor:"rgba(49, 196, 223, 0.6)", foodImage:"#tuna_image", copyOverlay:"#tuna_panel"},
  {},
  {},
];

// ---- content of expanded mode
window.settings.expandElements = [
  document.querySelector('#nextButton'),
  document.querySelector('#previousButton'),
  document.querySelector('#salmon_panel'),
  document.querySelector('#salmon_image'),
  document.querySelector('#tuna_panel'),
  document.querySelector('#tuna_image'),
  document.querySelector('#shrimp_panel'),
  document.querySelector('#shrimp_image'),
  document.querySelector('#disableGestureLayer'),
  document.querySelector('#backgroundExpand'),
  document.querySelector('#cta'),
  document.querySelector('#friskies_logo_big'),
  document.querySelector('#closeButton')
]

// ---- content of collapse mode
window.settings.collapseElements = [
  document.querySelector('#textSwipeToRotate'),
  document.querySelector('#swipeToRotate'),
  document.querySelector('#expand-cta'),
  document.querySelector('#expand-arrows-button'),
  document.querySelector('#friskies_logo_small'),
]
