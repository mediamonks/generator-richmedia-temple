import fitText from '@mediamonks/temple/util/fitText';
import untilEnablerIsInitialized from '@mediamonks/temple/doubleclick/untilEnablerIsInitialized';
import dataBind from "@mediamonks/temple/util/dataBind";
import getEventDispatcher from "@mediamonks/temple/doubleclick/getEventDispatcher";
import Events from "@mediamonks/temple/doubleclick/Events";
import getDynamicData from "./getDynamicData";


export default class Banner {

  constructor(container, config = null) {
    // add required components here
    this.config = config;
    this.container = container;
  }

  async init() {
    await untilEnablerIsInitialized();
    await this.addEventListeners();

    this.feed = getDynamicData();

    // values of feed are set on container. with data-bind="src: OBJECT_PATH"
    dataBind(this.feed, this.container);

    window.clickTag = this.feed.exit_url.Url;

    // fit text according to parent container
    const title = document.body.querySelector('.title');
    const ctaCopy = document.body.querySelector('.cta_copy');

    fitText([title, ctaCopy]);
  }

  addAnimation(animation){
    this.animation = animation;
  }

  async addEventListeners() {
    this.domMainExit = document.body.querySelector('.mainExit');
    this.domMainExit.addEventListener('click', this.handleClick);
    this.domMainExit.addEventListener('mouseover', this.handleRollOver);
    this.domMainExit.addEventListener('mouseout', this.handleRollOut);

    this.dispatcher = await getEventDispatcher();
    //on exit handler
    this.dispatcher.addEventListener(Events.EXIT, this.handleExit);
  }

  handleExit = () => {
    this.animation.getTimeline().progress(1);
  };

  /**
   * When client clicks this function will be triggered.
   */
  handleClick = () => {
    Enabler.exitOverride('Default Exit', this.mainExit);
  };

  /**
   * When mouse rolls over unit.
   */
  handleRollOver = () => {

  };

  /**
   * When mouse rolls out unit.
   */
  handleRollOut = () => {

  };

  async start(){
    await this.init();

    this.animation.play();
  }
}
