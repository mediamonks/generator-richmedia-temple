const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async action() {
    const [width, height] = this.options.size.split('x');

    this.fs.extendJSON(
      this.destinationPath('package.json'),
      this.fs.readJSON(this.templatePath('netflix-siteserved/extendPackageJson.json')),
    );

    this.fs.copyTpl(
      this.templatePath('netflix-siteserved/index.html'),
      this.destinationPath(path.join(this.options.outputPath, 'index.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    this.fs.writeJSON(
      this.destinationPath(path.join(this.options.outputPath, '.richmediarc')),
      deepmerge(this.fs.readJSON(this.templatePath('netflix-siteserved/.richmediarc')), {
        settings: {
          size: {
            width: parseInt(width, 10),
            height: parseInt(height, 10),
          },
        },
      }),
    );

    this.fs.copyTpl(
      this.templatePath('netflix-siteserved/css/style.css'),
      this.destinationPath(path.join(this.options.outputPath, 'css/style.css')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    this.fs.copy(
      this.templatePath('netflix-siteserved/script'),
      this.destinationPath(path.join(this.options.outputPath, 'script')),
    );

    this.fs.copy(this.templatePath('netflix-siteserved/img'), this.destinationPath(path.join(this.options.outputPath), 'img'));

    mkdirp(this.destinationPath(path.join(this.options.outputPath, 'video')), err => {
      if (err) console.error(err);
    });
  }

};
