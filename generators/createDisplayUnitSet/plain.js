const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');
const bannerChoices = require("./bannerChoices");

module.exports = class extends Generator {

  async questions() {
    this.log(`giving options to banner set`);

    // searching for existing
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'checkbox',
          name: 'set_html',
          message: 'Please select display unit with separate html:',
          choices: bannerChoices
            .filter(item => this.options.set.find(a => a.value === item.value))
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
            .filter(item => this.options.set.find(a => a.value === item.value))
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
            .filter(item => this.options.set.find(a => a.value === item.value))
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

    const sourceConfig = this.fs.readJSON(this.templatePath('__size__/.richmediarc'));

    this.options.set.forEach(size => {
      const [width, height] = size.split('x');

      const outputPath = this.destinationPath(path.join(this.options.outputPath, size));
      const hasSeparateHTML = this.result.set_html.find(item => item.value === x);
      const hasSeparateJS = this.result.set_js.find(item => item.value === x);
      const hasSeparateCSS = this.result.set_css.find(item => item.value === x);

      const entry = {
        ...sourceConfig.settings.entry
      };

      const content = {
        ...sourceConfig.content
      };

      if(hasSeparateHTML){
        entry.html = './index.hbs';

        this.fs.copy(
          this.templatePath('shared/index.hbs'),
          this.destinationPath(path.join(outputPath, 'index.hbs'))
        );
      }

      if(hasSeparateJS){
        entry.html = './script/main.js';

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
