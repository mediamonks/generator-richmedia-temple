const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async action() {
    console.log("this.fs", this.fs)
    console.log("this.fs.copyTpl", this.fs.copyTpl)
    console.log("this.options", this.options)
    const [width, height] = this.options.size.split('x');

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      this.fs.readJSON(this.templatePath('plain/extendPackageJson.json')),
    );

    // main html
    this.fs.copyTpl(
      this.templatePath('plain/banner/index.html'),
      this.destinationPath(path.join(this.options.outputPath, 'index.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    this.fs.copy(
      this.templatePath('plain/banner/static'),
      this.destinationPath(path.join(this.options.outputPath,  'static')),
    );

    this.fs.copy(
      this.templatePath('plain/banner/img/**'),
      this.destinationPath(path.join(this.options.outputPath), 'img/'),
    );

    // main javascript

    this.fs.copy(
      this.templatePath('plain/banner/script'),
      this.destinationPath(path.join(this.options.outputPath, 'script')),
    );

    this.fs.copy(
      this.templatePath('plain/shared/script'),
      this.destinationPath(path.join(this.options.outputPath, '../../shared/', 'script')),
    );

    // copy pasting css
    this.fs.copyTpl(
      this.templatePath('plain/banner/css/style.css'),
      this.destinationPath(path.join(this.options.outputPath, 'css/style.css')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    const json = deepmerge(this.fs.readJSON(this.templatePath('plain/banner/.richmediarc')), {
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
