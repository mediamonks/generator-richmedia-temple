import banner from "./banner";

// config will contain the final .richmediarc content. So if a .richmediarc
// inherits from a other .richmediarc it will also contain those files.
import config from "richmediaconfig";

banner(config);
