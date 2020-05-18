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

















/* export default class Banner {

  constructor() {
    this.banner = null;
  }

  async init() {
    this.banner = new Vue({
      el: "#app",
    
      data() {
        return {
          isExitActive: true,
          animation: null,
          logos: [
            'https://s3.ap-southeast-2.amazonaws.com/daily-fire-assets/slack-white.svg',
            'https://s3.ap-southeast-2.amazonaws.com/daily-fire-assets/discord-white.svg',
            'https://s3.ap-southeast-2.amazonaws.com/daily-fire-assets/messenger-white.png',
          ],
          currentLogo: ''
        };
      },
      
      
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
      
      beforeCreate() {
        console.log('beforeCreate')
      },
    
      created() {
        console.log('created')
      },
    
      mounted() {
        console.log('mounted')
    
        this.animation = new Animation(this);
        this.animation.createMainTimeline();
        
      },
    });
  }

} */