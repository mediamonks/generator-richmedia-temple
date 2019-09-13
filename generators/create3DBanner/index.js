const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');
const FileSet = require('file-set');


module.exports = class extends Generator {
  async questions() {
    this.log(`Creating 3D banner`);

    // --------------------- size choice -------------------------------------------------------------------------------
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'size',
          message: 'Please select a size for your unit:',
          choices: [
            {name: 'Custom', value: 'custom'},
            {name: '300x250', value: '300x250'},
            {name: '300x600', value: '300x600'},
            {name: '320x240', value: '320x240'},
            {name: '336x280', value: '336x280'},
            {name: '320x480', value: '320x480'},

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
    // --------------------- model choice ------------------------------------------------------------------------------
    let model_list = (new FileSet('./model/*')).dirs ;
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'model',
          message: 'Please select the model of your unit:',
          choices: model_list
        },
      ])),
    };
    // --------------------- destination choice ------------------------------------------------------------------------
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

  }
  // --------------------- Action --------------------------------------------------------------------------------------
  action() {
    this.composeWith(require.resolve('./generate'), this.result);
  }
}

