const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async action() {
    const [width, height] = this.options.size.split('x');

    // main html
    this.fs.copyTpl(
      this.templatePath('template-a/index.html'),
      this.destinationPath(path.join(this.options.outputPath, 'index.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    this.fs.copy(
      this.templatePath('template-a/img/**'),
      this.destinationPath(path.join(this.options.outputPath), 'img/'),
    );

    this.fs.copy(
      this.templatePath('template-a/script'),
      this.destinationPath(path.join(this.options.outputPath, 'script')),
    );

    // copy pasting css
    this.fs.copyTpl(
      this.templatePath('template-a/css/style.css'),
      this.destinationPath(path.join(this.options.outputPath, 'css/style.css')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    const json = deepmerge(this.fs.readJSON(this.templatePath('template-a/.richmediarc')), {
      settings: {
        size: {
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        },
      },
    });

    this.fs.writeJSON(this.destinationPath(path.join(this.options.outputPath, '.richmediarc')), json);
  }

};
