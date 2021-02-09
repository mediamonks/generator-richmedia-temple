<% if (shared) { %>
import Banner from <%- bannerPath %>;
import Animation from <%- animationPath %>;
<% } else{ %>
import Banner from "./Banner";
import Animation from "./Animation";
<% } %>
// config will contain the final .richmediarc content. So if a .richmediarc
// inherits from a other .richmediarc it will also contain those files.
import config from "richmediaconfig";

const banner = new Banner(config);
banner.animation = new Animation(document.querySelector('.banner'), config);
banner.start();
