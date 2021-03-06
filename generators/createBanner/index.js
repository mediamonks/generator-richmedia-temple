const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async questions() {
    this.log(`Creating banner`);

    // searching for existing

    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'size',
          message: 'Please select a size for your unit:',
          choices: [
            { name: '300x250 (Medium Rectangle)', value: '300x250' },
            { name: '970x250 (Billboard)', value: '970x250' },
            { name: '300x600 (Large Skyscraper)', value: '300x600' },
            { name: '728x90 (Leaderboard)', value: '728x90' },
            { name: '160x600 (Skyscraper)', value: '160x600' },
            { name: '320x240', value: '320x240' },
            { name: '336x280', value: '336x280' },
            { name: '970x90 (Super Leaderboard)', value: '970x90' },
            { name: '320x480', value: '320x480' },
            { name: '300x50', value: '300x50' },
            { name: '320x50', value: '320x50' },
            { name: 'Custom', value: 'custom' },
          ],
        },
      ])),
    };

    if (this.result.size === 'custom') {
      this.result = {
        ...this.result,
        ...(await this.prompt([
          {
            type: 'input',
            name: 'size',
            message: 'Please fill in the size of unit:',
            default: '300x250',
            validate: input => /^\d+x\d+$/.test(input),
          },
        ])),
      };
    }

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'outputPath',
        message: 'Where do you want to put it?',
        default: `./src/${this.result.size}/`,
        validate: input => isPathInside(path.resolve(input), path.resolve(process.cwd())),
      })),
    };


    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Type of display unit is this',
          choices: [
            PlatformChoices.PLAIN_VUEJS
          ],
        },
      ])),
    };

    if (this.result.type === 'plain') {
      this.result = {
        ...this.result,
        ...(await this.prompt([
          {
            type: 'confirm',
            name: 'isShared',
            message: 'Do you want a shared library for your plain template?',
            default: true,
          },
        ])),
      };

      if (this.result.isShared) {
        this.result.folderSharedExists = false;
        if (this.fs.exists(this.destinationPath('package.json'))) {

          let json = this.fs.readJSON(this.destinationPath('package.json'));
          if(json.shared) {
            this.result.folderSharedExists = true;
            this.result.sharedFolder = json.shared;
            this.log(`Shared folder already exists`);
          } else {
            this.result = {
              ...this.result,
              ...(await this.prompt([
                {
                  type: 'input',
                  name: 'sharedFolder',
                  message: 'what is the name of your shared folder?',
                  default: 'shared'
                },
              ])),
            };
          }

        }




      }
    }
  }

  action() {
    switch (this.result.type) {
      case PlatformChoices.PLAIN: {
        this.composeWith(require.resolve('./plain'), this.result);
        break;
      }

      case PlatformChoices.FLASHTALKING: {
        this.composeWith(require.resolve('./dynamic-flashtalking'), this.result);
        break;
      }

      case PlatformChoices.DOUBLECLICK: {
        this.composeWith(require.resolve('./doubleclick'), this.result);
        break;
      }

      case PlatformChoices.DYNAMIC: {
        this.composeWith(require.resolve('./dynamic'), this.result);
        break;
      }

      case PlatformChoices.PLAIN_VUEJS: {
        this.composeWith(require.resolve('./plain-vuejs'), this.result);
        break;
      }

      default: {
        break;
      }
    }
  }
};
