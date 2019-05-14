const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async action() {
    const [width, height] = this.result.size.split('x');

    // main html
    this.fs.copyTpl(
      this.templatePath('plain/index.html'),
      this.destinationPath(path.join(this.result.outputPath, 'index.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    this.fs.copy(
      this.templatePath('plain/img/**'),
      this.destinationPath(path.join(this.result.outputPath), 'img/'),
    );

    // main javascript

    this.fs.copy(
      this.templatePath('plain/script'),
      this.destinationPath(path.join(this.result.outputPath, 'script')),
    );

    // copy pasting css
    this.fs.copyTpl(
      this.templatePath('plain/css/style.css'),
      this.destinationPath(path.join(this.result.outputPath, 'css/style.css')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    const json = deepmerge(this.fs.readJSON(this.templatePath('plain/.richmediarc')), {
      settings: {
        size: {
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        },
      },
    });

    this.fs.writeJSON(this.destinationPath(path.join(this.result.outputPath, '.richmediarc')), json);
  }

};
