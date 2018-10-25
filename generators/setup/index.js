const Generator = require('yeoman-generator');
const createPackageJson = require('./templates/createPackageJson');
const chalk = require('chalk');

module.exports = class Setup extends Generator {
  async questions() {
    this.log(`${chalk.red(`I'm seeing you did not setup your project yet`)}`);

    // checking if package.json is already there
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname.replace(' ', '-'), // Default to current folder name
        validate: input => /^\S*$/.test(input),
      },
    ]);
  }

  action() {
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      createPackageJson({
        name: this.answers.projectName,
      }),
    );

    this.fs.copy(this.templatePath('.prettierrc'), this.destinationPath('.prettierrc'));
    this.fs.copy(this.templatePath('gitignore.text'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.editorconfig'), this.destinationPath('.editorconfig'));

    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false,
    });
  }
};
