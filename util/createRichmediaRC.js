const PlatformChoices = require('./data/PlatformChoices');

function createRichmediaRC({ bannerType, bannerSize }) {
  const [bannerWidth, bannerHeight] = bannerSize.split('x');

  const result = {
    settings: {
      entry: {
        js: './main.js',
        html: './index.html',
      },
      size: {
        width: parseInt(bannerWidth, 10),
        height: parseInt(bannerHeight, 10),
      },
    },

    content: {},
  };

  if (bannerType === PlatformChoices.NETFLIX) {
    result.monet = {
      creative: 'GLOBAL_LIS_TOOLKIT_728x90_H5-RM_MLT_MONET',
      agency: 'Mediamonks',
    };
  }

  return result;
}

module.exports = createRichmediaRC;
