import Banner from "./Banner";
import Animation from "./Animation";

// config will contain the final .richmediarc content. So if a .richmediarc
// inherits from a other .richmediarc it will also contain those files.
import config from "richmediaconfig";

const animation = new Animation();
const banner = new Banner(document.querySelector('.banner'), animation, config);

banner.init()
  .then(() => banner.addEventListeners())
  .then(() => banner.start());
