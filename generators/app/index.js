"use strict";
const path = require("path");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const inquirer = require("inquirer");
const createPackageJson = require("./templates/createPackageJson");
const isPathInside = require('is-path-inside');
const MainChoices = {
  SETUP: "initial setup",
  CREATE_BANNER: "create richmedia unit",
  ADD_CONTENT: "add content to richmedia unit"
};

const PlatformChoices = {
  DOUBLECLICK: "doubleclick",
  NETFLIX: "netflix"
};

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(`
Welcome to ${chalk.red("Richmedia Temple")} generator!
-
With this tool you can create the initial setup, create standard banner config etc
`);

    const choices = [MainChoices.SETUP];

    if (await this.fs.exists(this.destinationPath("package.json"))) {
      choices.push(MainChoices.CREATE_BANNER, {
        name: MainChoices.ADD_CONTENT,
        disabled: "in development"
      });
    } else {
      choices.push({
        name: MainChoices.CREATE_BANNER,
        disabled: "missing initial setup"
      });
    }

    this.answers = await this.prompt([
      {
        type: "list",
        name: "doing",
        message: "What do you want to do?",
        choices
      }
    ]);

    switch (this.answers.doing) {
      case MainChoices.SETUP: {
        this.answers = {
          ...this.answers,
          ...(await this.prompt([
            {
              type: "input",
              name: "projectName",
              message: "Your project name",
              default: this.appname // Default to current folder name
            }
          ]))
        };
        break;
      }
      case MainChoices.CREATE_BANNER: {
        this.answers = {
          ...this.answers,
          ...(await this.prompt([
            {
              type: "input",
              name: "size",
              message: "Please fill in size of banner",
              default: "300x250",
              validate: (input, hash) => /^\d+x\d+$/.test(input)
            },
            {
              type: "input",
              name: "outputPath",
              message: "Where do you want to put it?",
              default: './src/',
              validate: (input, hash) => {
                return isPathInside(path.resolve(input), path.resolve(process.cwd()))
              }
            },
            {
              type: "list",
              name: "bannerType",
              message: "What is the platform?",
              choices: [PlatformChoices.DOUBLECLICK, PlatformChoices.NETFLIX]
            },

          ]))
        };

        switch (this.answers.bannerType) {
          case PlatformChoices.NETFLIX: {
            this.answers = {
              ...this.answers,
              ...(await this.prompt([

              ]))
            };
            break;
          }
        }
      }
    }
  }

  writing() {
    switch (this.answers.doing) {
      case MainChoices.SETUP: {
        this.fs.extendJSON(
          this.destinationPath("package.json"),
          createPackageJson({
            name: this.answers.projectName
          })
        );
        break;
      }

      case MainChoices.CREATE_BANNER: {
        break;
      }
    }
  }

  install() {
    switch (this.answers.doing) {
      case MainChoices.SETUP: {
        this.installDependencies({
          npm: true,
          bower: false,
          yarn: false
        });
        break;
      }

      case MainChoices.CREATE_BANNER: {
        break;
      }
    }
  }
};
