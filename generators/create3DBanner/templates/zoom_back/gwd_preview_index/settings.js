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
  keyframes: [0, 1, 1.5, 5.5, 6, 8, 11, 13, 16, 18, 21.5, 23.5],
  animationName: 'Animation',
};

// ---- scrolling settings
// between 10% and 100% of top/bottom the creative will start/stop animating
window.settings.scrolling = {};
window.settings.scrolling.startBound = 0.1;
window.settings.scrolling.endBound = 1;
// the startframe and endframe from/to it will animate
window.settings.scrolling.startFrame = window.settings.gwd3d.keyframes[0];
window.settings.scrolling.endFrame = window.settings.gwd3d.keyframes[1];

// ---- expanded settings
window.settings.expanded = {};
window.settings.expanded.startframe = 2;
window.settings.expanded.endframe = 3;

// ---- collapse settings
window.settings.collapse = {};
window.settings.collapse.startframe = 1;
window.settings.collapse.endframe = 1;

// ---- content of expanded mode
window.settings.expandElements = [
  document.querySelector('#disableGestureLayer'),
  document.querySelector('#cta'),
  document.querySelector('#doorLeft'),
  document.querySelector('#doorRight'),
  document.querySelector('#doorLogo'),
  document.querySelector('#hotspot_ring1'),
  document.querySelector('#hotspot_ring2'),
  document.querySelector('#hotspot_ring3'),
  document.querySelector('#hotspot_ring4'),
  document.querySelector('#hotspot1'),
  document.querySelector('#hotspot2'),
  document.querySelector('#hotspot4'),
  document.querySelector('#hotspot3'),
  document.querySelector('#tap-to-discover-copy'),
  document.querySelector("#copy_cassandre"),
  document.querySelector("#copy_cap"),
  document.querySelector("#copy_chain"),
  document.querySelector("#copy_liquid"),
  document.querySelector("#backBtn"),
  document.querySelector("#ysl_logo"),
  document.querySelector("#swipeToRotate_EXP"),
  document.querySelector("#textSwipeToRotate_EXP"),
  document.querySelector("#closeButton"),
];

// ---- content of collapse mode
window.settings.collapseElements = [
  document.querySelector('#textSwipeToRotate'),
  document.querySelector('#swipeToRotate'),
  document.querySelector('#expand-cta'),
  document.querySelector('#expandArrowsButton'),
  document.querySelector('#expandRingWrapper'),
  document.querySelector('#swipe-icon-slider-wrapper'),
  document.querySelector('#collapsed_logo'),
]

// ---- hotspots Content
window.settings.hotspots = {};
// hotspots
window.settings.hotspots.hotspots = [
  document.querySelector('#hotspot1'),
  document.querySelector('#hotspot2'),
  document.querySelector('#hotspot3'),
  document.querySelector('#hotspot4'),
]
// rings
window.settings.hotspots.hotspotRings = [
  document.querySelector('#hotspot_ring1'),
  document.querySelector('#hotspot_ring2'),
  document.querySelector('#hotspot_ring3'),
  document.querySelector('#hotspot_ring4'),
]
// copy
window.settings.hotspots.copy = [
  document.querySelector("#copy_cap"),
  document.querySelector("#copy_chain"),
  document.querySelector("#copy_cassandre"),
  document.querySelector("#copy_liquid"),
]
// frame
window.settings.hotspots.frame = [
  6,
  8,
  4,
  10,
]
