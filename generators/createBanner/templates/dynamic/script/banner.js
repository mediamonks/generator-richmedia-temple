import Entity from '@mediamonks/temple/Entity';
import DoubleClickPlatformComponent from '@mediamonks/temple/component/platform/DoubleClickPlatformComponent';
import EventDispatcherComponent from "@mediamonks/temple/component/EventDispatcherComponent";
import Animation from "./animation";
import dynamicData from "./dynamicData";

export default class Banner extends Entity {

  constructor(config = null) {
    super();

    this.config = config;

    this.addComponent(new DoubleClickPlatformComponent());
    this.addComponent(new EventDispatcherComponent());
  }

  async init() {
    await super.init();

    const dynamic = new dynamicData(this);
    await dynamic.get();

    const dispatcher = this.getComponent(EventDispatcherComponent);

    this.domMainExit = document.body.querySelector('.mainExit');
    this.domMainExit.addEventListener('click', this.handleExit);
    this.domMainExit.addEventListener("mouseover", this.handleMouseOver);
    this.domMainExit.addEventListener("mouseout", this.handleMouseOut);

    this.runAnimation();

  }

  runAnimation = () => {
    this.animation = new Animation(document.querySelector('.banner'), this.config);
    this.mainTimeline = this.animation.createMainTimeline();
    this.mainTimeline.play();
  };

  handleExit = () => {
    this.mainTimeline.progress(1);
    Enabler.exitOverride('Default Exit', this.mainExit);
  };

  handleMouseOver = () => {
    console.log("Mouse Over");
  }

  handleMouseOut = () => {
    console.log("Mouse Out");
  }

  async start() {
    await this.init();
    this.animation.play();
  }
}
