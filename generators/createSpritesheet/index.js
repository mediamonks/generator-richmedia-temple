const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const glob = require('glob-promise');

const pack = require('gamefroot-texture-packer');
const path = require('path');
const chalk = require('chalk');

module.exports = class extends Generator {
  async questions() {
    this.log(`Creating a spritesheet`);
    this.log(`searching for images`);
    this.log(`${chalk.yellow(`!its possible that this will not work on your computer, 
because you dont have image-magick installed.`)}`);

    const files = await glob('**/*.{png,jpg,bpm,jpeg}');

    this.log(`${files.length} image(s) found`);

    // group per dir;
    const groupedImages = this.groupedImages = files.reduce((acc, item) => {
      const data = path.parse(item);
      if (!acc[data.dir]) {
        acc[data.dir] = [];
      }

      acc[data.dir].push(item);

      return acc;
    }, {});

    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'images',
          message: 'Please directory where images are located:',
          choices: Object.keys(groupedImages).map(dirPath => ({
            name: `dir: ${dirPath} with ${groupedImages[dirPath].length} images`,
            value: dirPath,
          })),
        },
      ])),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'list',
        name: 'format',
        message: `Please choose the format you want to use:`,
        default: `css`,
        choices: ['kiwi', 'starling', 'sparrow', 'json', 'pixi', 'easel', 'cocos2d', 'css'],
      })),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'path',
        message: `Where do you want to put the ${chalk.bold(`spritesheet`)}?`,
        default: `./`,
        validate: input => isPathInside(path.resolve(input), path.resolve(process.cwd())) || path.resolve(input) === path.resolve(process.cwd()),
      })),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'scale',
        message: `You want to scale the output a bit?`,
        default: 1,
        validate: input => typeof input === 'number' && input > 0,
      })),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'width',
        message: `Max width?`,
        default: 1024,
        validate: input => typeof input === 'number' && input > 0,
      })),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'height',
        message: `Max height?`,
        default: 1024,
        validate: input => typeof input === 'number' && input > 0,
      })),
    };

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'name',
        message: `Please choose a name:`,
        default: `spritesheet`,
      })),
    };
  }

  action() {
    const packer = require('gamefroot-texture-packer');

    const {images, ...options} = this.result;

    const newImages = images
      .map(item => this.groupedImages[item])
      .reduce((acc, item) => ([...acc, ...item]))

    console.log(newImages);

    packer(newImages, options, function (err) {
      if (err) throw err;

      console.log('spritesheet successfully generated');
    });
  }
};
