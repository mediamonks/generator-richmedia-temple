//import config from "../.richmediarc";
import Animation from "./animation";

var app = new Vue({
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