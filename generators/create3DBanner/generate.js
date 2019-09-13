const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
  async action() {
    //copy everything
    const [width, height] = this.options.size.split('x');
    const model = this.options.model;

    this.fs.copy(
      this.templatePath('./'+model),
      this.destinationPath(this.options.outputPath),
    );

    // modify size in javascript
    this.fs.copyTpl(
      this.templatePath(model+'/settings.js'),
      this.destinationPath(path.join(this.options.outputPath, 'settings.js')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    // modify size in index
    this.fs.copyTpl(
      this.templatePath(model+'/index.html'),
      this.destinationPath(path.join(this.options.outputPath, 'index.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

    // modify size in scroll
    this.fs.copyTpl(
      this.templatePath(model+'/scroll.html'),
      this.destinationPath(path.join(this.options.outputPath, 'scroll.html')),
      {
        banner_width: width,
        banner_height: height,
      },
    );

  }

};
