import ConfigComponent from "@mediamonks/temple/component/ConfigComponent";
import Banner from "./Banner";
import config from "../.richmediarc";

const banner = new Banner();
banner.addComponent(new ConfigComponent(config));
banner.start();
