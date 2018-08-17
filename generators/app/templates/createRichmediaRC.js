const MainChoices = require('../data/MainChoices');
const PlatformChoices = require('../data/PlatformChoices');
const QuestionNames = require('../data/QuestionNames');

function createRichmediaRC({ bannerType, bannerSize }) {
  const [bannerWidth, bannerHeight] = bannerSize.split('x');

  const result = {
    settings: {
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
