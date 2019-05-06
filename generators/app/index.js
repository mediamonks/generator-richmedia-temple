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
        choices: ['create a banner', { name: 'edit a banner', disabled: true }],
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

      case 'edit a banner': {
        break;
      }

      default: {
        break;
      }
    }
  }
};
