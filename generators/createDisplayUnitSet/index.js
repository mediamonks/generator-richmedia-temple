const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');
const bannerChoices = require("./bannerChoices");

console.log("npm test")

module.exports = class extends Generator {
  async questions() {
    this.log(`Creating banner`);

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'set',
          message: 'Please select a set for your unit:',
          choices: bannerChoices
        },
      ])),
    };

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Please select a type you want:',
          choices: [
            // { name: PlatformChoices.DOUBLECLICK, value: PlatformChoices.DOUBLECLICK },
            { name: PlatformChoices.DOUBLECLICK, value: PlatformChoices.DOUBLECLICK },
            { name: PlatformChoices.FLASHTALKING, value: PlatformChoices.FLASHTALKING },
            { name: PlatformChoices.PLAIN, value: PlatformChoices.PLAIN }
          ],
        },
      ])),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'outputPath',
        message: 'Where do you want to put it?',
        default: `./src/${this.result.type}_${this.result.set.join('_')}/`,
        validate: input => isPathInside(path.resolve(input), path.resolve(process.cwd())),
      })),
    };
  }

  action() {
    switch (this.result.type) {
      case PlatformChoices.PLAIN: {
        this.composeWith(require.resolve('./plain'), this.result);
        break;
      }

      case PlatformChoices.FLASHTALKING: {
        this.composeWith(require.resolve('./flashtalking'), this.result);
        break;
      }

      case PlatformChoices.DOUBLECLICK: {
        this.composeWith(require.resolve('./doubleclick'), this.result);
        break;
      }

      default: {
        break;
      }
    }
  }
};
