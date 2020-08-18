const Generator = require('yeoman-generator');
const chalk = require('chalk');
const hasInitialSetup = require('../../util/hasInitialSetup');

module.exports = class App extends Generator {
  async questions() {
    const packageJson = require('../../package');

    // Have Yeoman greet the user.
    this.log(`
Welcome to ${chalk.red('Richmedia Temple Generator')} v${packageJson.version}
-
Create, change and start developing your richmedia units
`);

    this.result = await this.prompt([
      {
        type: 'list',
        name: 'todo',
        message: 'What do you want to do?',
        choices: [
          'create a banner',
          'create a 3D banner',
          // {name: 'create spritesheet', disabled: false}
        ],
      },
    ]);
  }

  async action() {
    if (!hasInitialSetup(this)) {
      this.composeWith(require.resolve('../setup'), { options: '' });
    }

    switch (this.result.todo) {
      case 'create a banner': {
        this.composeWith(require.resolve('../createBanner'), { options: '' });
        break;
      }

      case 'create a 3D banner': {
        this.composeWith(require.resolve('../create3DBanner'), { options: '' });
        break;
      }

      case 'create spritesheet': {
        this.composeWith(require.resolve('../createSpritesheet'), { options: '' });
        break;
      }

      default: {
        break;
      }
    }
  }
};
