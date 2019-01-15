import config from '../.richmediarc';
import MainBanner from './MainBanner';

const arr = [
  'ads',
  'ads',
  'ads',
  'ads',
  'ads',
]

const banner = new MainBanner(config);
banner.setArray(arr);
banner.init();
