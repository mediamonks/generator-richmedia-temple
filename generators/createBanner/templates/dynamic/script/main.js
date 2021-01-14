import Banner from "./Banner";

// config will contain the final .richmediarc content. So if a .richmediarc
// inherits from a other .richmediarc it will also contain those files.
import config from "richmediaconfig";

const banner = new Banner(config);

banner.init()
  .then(() => banner.loadDynamicContent())
  .then(() => banner.setDynamicContent())
  .then(() => banner.addEventListeners())
  .then(() => banner.loadAndPlayAnimation());
