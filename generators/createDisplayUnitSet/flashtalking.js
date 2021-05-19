const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');
const bannerChoices = require("./bannerChoices");

module.exports = class extends Generator {

  async questions() {

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'set_html',
          message: 'Please select display unit with separate html:',
          choices: bannerChoices
            .filter(item => this.options.set.find(size => size === item.value))
        },
      ])),
    };

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'set_js',
          message: 'Please select display unit with separate javascript:',
          choices: bannerChoices
            .filter(item => this.options.set.find(size => size === item.value))
        },
      ])),
    };

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'set_css',
          message: 'Please select display unit with separate css:',
          choices: bannerChoices
            .filter(item => this.options.set.find(size => size === item.value))
        },
      ])),
    };
  }

  async action() {

    this.fs.copy(
      this.templatePath('shared'),
      this.destinationPath(path.join(this.options.outputPath, 'shared'))
    );

    this.fs.copy(
      this.templatePath('shared/.sharedrc'),
      this.destinationPath(path.join(this.options.outputPath, 'shared/.sharedrc'))
    );

    this.fs.copy(
      this.templatePath('flashtalking/index.hbs'),
      this.destinationPath(path.join(this.options.outputPath, 'shared'))
    );

    const sourceConfig = this.fs.readJSON(this.templatePath('__size__/.richmediarc'));

    this.options.set.forEach(size => {
      const [width, height] = size.split('x');

      const outputPath = this.destinationPath(path.join(this.options.outputPath, size));
      const hasSeparateHTML = this.result.set_html.find(item => item === size);
      const hasSeparateJS = this.result.set_js.find(item => item === size);
      const hasSeparateCSS = this.result.set_css.find(item => item === size);

      // static folder from flashtalking
      this.fs.copy(
        this.templatePath('flashtalking/static'),
        this.destinationPath(path.join(outputPath, 'static'))
      );

      this.fs.copyTpl(
        this.templatePath('flashtalking/static/manifest.js'),
        this.destinationPath(path.join(outputPath, 'static/manifest.js')),
        {
          width,
          height,
        },
      );

      const entry = {
        ...sourceConfig.settings.entry
      };

      const content = {
        ...sourceConfig.content
      };

      if(hasSeparateHTML){
        entry.html = './index.hbs';

        this.fs.copy(
          this.templatePath('flashtalking/index.hbs'),
          this.destinationPath(path.join(outputPath, 'index.hbs'))
        );
      }

      if(hasSeparateJS){
        entry.js = './script/main.js';

        this.fs.copy(
          this.templatePath('shared/script'),
          this.destinationPath(path.join(outputPath, 'script'))
        );
      }

      if(hasSeparateCSS){
        content.css = './css/style.css';

        this.fs.copy(
          this.templatePath('shared/css'),
          this.destinationPath(path.join(outputPath, 'css'))
        );
      }

      let config = deepmerge(sourceConfig, {
        settings: {
          entry,
          size: {
            width: parseInt(width, 10),
            height: parseInt(height, 10),
          },
        },
        content
      });

      this.fs.writeJSON(path.join(outputPath, '.richmediarc'), config);
    });

  }

};
