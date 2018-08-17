const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
// const yosay = require('yosay');
// const inquirer = require('inquirer');
const createPackageJson = require('./templates/createPackageJson');
const createRichmediaRC = require('./templates/createRichmediaRC');
const isPathInside = require('is-path-inside');
const MainChoices = require('./data/MainChoices');
const PlatformChoices = require('./data/PlatformChoices');
const QuestionNames = require('./data/QuestionNames');
const glob = require('glob-promise');
// const richmediarcSchema = require('@mediamonks/richmedia-temple-server/src/schema/richmediarc.schema');

module.exports = class extends Generator {
  mergeAnswers(result) {
    this.answers = {
      ...(this.answers || {}),
      ...result,
    };
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(`
Welcome to ${chalk.red('Richmedia Temple')} generator!
-
Create, change and start developing your richmedia units
`);

    const choices = [MainChoices.SETUP];

    if (await this.fs.exists(this.destinationPath('package.json'))) {
      choices.push(MainChoices.CREATE_BANNER, {
        name: MainChoices.ADD_CONTENT,
        disabled: 'in development',
      });
    } else {
      choices.push({
        name: MainChoices.CREATE_BANNER,
        disabled: 'missing initial setup',
      });
    }

    this.mergeAnswers(
      await this.prompt([
        {
          type: 'list',
          name: QuestionNames.DOING,
          message: 'What do you want to do?',
          choices,
        },
      ]),
    );

    switch (this.answers[QuestionNames.DOING]) {
      case MainChoices.SETUP: {
        this.mergeAnswers(
          await this.prompt([
            {
              type: 'input',
              name: QuestionNames.PROJECT_NAME,
              message: 'Your project name',
              default: this.appname, // Default to current folder name
            },
          ]),
        );

        break;
      }

      case MainChoices.CREATE_BANNER: {
        this.mergeAnswers(
          await this.prompt([
            {
              type: 'input',
              name: QuestionNames.SIZE,
              message: 'Please fill in size of banner',
              default: '300x250',
              validate: input => /^\d+x\d+$/.test(input),
            },
          ]),
        );

        this.mergeAnswers(
          await this.prompt([
            {
              type: 'input',
              name: QuestionNames.OUTPUT_PATH,
              message: 'Where do you want to put it?',
              default: `./src/${this.answers[QuestionNames.SIZE]}/`,
              validate: input => isPathInside(path.resolve(input), path.resolve(process.cwd())),
            },
            {
              type: 'list',
              name: QuestionNames.BANNER_PLATFORM,
              message: 'What is the platform?',
              choices: [PlatformChoices.DOUBLECLICK, PlatformChoices.NETFLIX],
            },
          ]),
        );

        switch (this.answers[QuestionNames.BANNER_PLATFORM]) {
          case PlatformChoices.NETFLIX: {
            this.mergeAnswers(await this.prompt([]));
            break;
          }

          default: {
            throw Error(`unknown choise ${this.answers[QuestionNames.BANNER_PLATFORM]}`);
          }
        }

        break;
      }

      case MainChoices.ADD_CONTENT: {
        const files = await glob(path.join(this.destinationPath(), '**/.richmediarc'));

        this.mergeAnswers(
          await this.prompt([
            {
              type: 'list',
              name: QuestionNames.RICHMEDIARC_PATH,
              message: 'What file do you want to change',
              choices: files,
            },
          ]),
        );

        // const { contentType } = await this.prompt([
        //   {
        //     type: 'list',
        //     name: 'contentType',
        //     message: 'What file do you want to change',
        //     choices: Object.keys(richmediarcSchema.definitions),
        //   },
        // ]);
        //
        // console.log(contentType);
        //
        // const data = await new Promise(resolve =>
        //   schinquirer.prompt(richmediarcSchema.definitions[contentType].properties, args => {
        //     console.log('args', args);
        //
        //     resolve(args);
        //   }),
        // );
        //
        // console.log(data);

        break;
      }

      default: {
        throw Error(`unknown choise ${this.answers.doing}`);
      }
    }
  }

  writing() {
    switch (this.answers[QuestionNames.DOING]) {
      case MainChoices.SETUP: {
        this.fs.extendJSON(
          this.destinationPath('.richmediarc'),
          createPackageJson({
            name: this.answers[QuestionNames.PROJECT_NAME],
          }),
        );
        break;
      }

      case MainChoices.CREATE_BANNER: {
        this.fs.extendJSON(
          this.destinationPath(path.join(this.answers[QuestionNames.OUTPUT_PATH], '.richmediarc')),
          createRichmediaRC({
            bannerSize: this.answers[QuestionNames.SIZE],
            bannerType: this.answers[QuestionNames.BANNER_PLATFORM],
          }),
        );
        break;
      }

      default: {
        throw Error(`unknown choise ${this.answers[QuestionNames.DOING]}`);
      }
    }
  }

  install() {
    switch (this.answers.doing) {
      case MainChoices.SETUP: {
        this.installDependencies({
          npm: true,
          bower: false,
          yarn: false,
        });
        break;
      }

      case MainChoices.CREATE_BANNER: {
        break;
      }

      default: {
        break;
      }
    }
  }
};
