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
        animation: null,
        message: 'Ready to work'
      };
    },
    
    /**
     * Functions firing by template
    */
    methods: {
      mainExitOnClick() {
        console.log('mainExitOnClick');
      },  
      onMouseover() {
        console.log('onMouseover');
      },    
      onMouseleave() {
        console.log('onMouseleave');
      }
    },

    /**
     * Lifecycle hooks
    */
    ...Lifecycle
  })

};

export default banner;