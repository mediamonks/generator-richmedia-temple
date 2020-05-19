import Animation from './Animation';
import Lifecycle from './Lifecycle';

let banner = (config) => {
  const { settings: { size } } = config;

  return new Vue({
    el: "#app",
    
    /**
     * Scoped variables
    */
    data() {
      return {
        bannerSize: `${size.width}x${size.height}`,
        isExitActive: true,
        animationEnd: false,
        animation: null,
        message: 'Ready to work'
      };
    },
    
    /**
     * Functions firing by template
    */
    methods: {
      mainExitOnClick() {
        this.animation.gotoEndframe();
        window.open(window.clickTag, '_blank');
      },  
      onMouseover() {
        this.animation.onMouseoverAnimation();
      },    
      onMouseleave() {
        this.animation.onMouseleaveAnimation();
      }
    },

    /**
     * Lifecycle hooks
    */
    ...Lifecycle
  })

};

export default banner;