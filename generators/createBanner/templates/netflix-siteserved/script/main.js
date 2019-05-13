import config from '../.richmediarc';
import Banner from './Banner';

const banner = new Banner();
banner.setConfig(config);
banner.start();
