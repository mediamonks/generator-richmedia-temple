import StaggerAnimation from '@mediamonks/temple/animation/StaggerAnimation';

export default class Animation {
/**
*
* @param {HTMLDivElement} container
*/
constructor(container, config) {
 this.container = container;
 this.config = config;
}

createTimeline = obj => {
 var tl = new TimelineMax(obj);
 tl.to(".banner", 1, {opacity: 1});

 return tl;
};

/**
*
* @return {Promise<void>}
* @private
*/
async play() {}
}
