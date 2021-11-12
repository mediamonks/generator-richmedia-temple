const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');


module.exports = class extends Generator {
  async action() {
    const [width, height] = this.options.size.split('x');

    if(!this.options.folderSharedExists) {
      const jsonPackage = deepmerge(this.fs.readJSON(this.templatePath('plain/extendPackageJson.json')), {
        shared: this.options.sharedFolder,
      });

      this.fs.extendJSON(
        this.destinationPath('package.json'),
        jsonPackage,
      );
    }


    this.fs.copyTpl(
      this.templatePath('plain/banner'),
      this.destinationPath(path.join(this.options.outputPath)),
      {
        shared: this.options.sharedFolder,
        banner_width: width,
        banner_height: height,
        bannerPath: "'../../../"+this.options.sharedFolder+"/script/Banner'",
        animationPath: "'../../../"+this.options.sharedFolder+"/script/Animation'",
      },
    );

    if(this.options.isShared) {
      if(!this.options.folderSharedExists) {
        this.fs.copy(
          this.templatePath('plain/shared/img'),
          this.destinationPath(path.join(this.options.outputPath), '../../' + this.options.sharedFolder + '/img'),
        );

        this.fs.copyTpl(
          this.templatePath('plain/shared/script'),
          this.destinationPath(path.join(this.options.outputPath, '../../' + this.options.sharedFolder + '/script')),
          {
            shared: this.options.isShared,
            bannerPath: "'../../../" + this.options.sharedFolder + "/script/Banner'",
            animationPath: "'../../../" + this.options.sharedFolder + "/script/Animation'",
          },
        );
      }
    } else {
      this.fs.copy(
        this.templatePath('plain/shared/img'),
        this.destinationPath(path.join(this.options.outputPath), 'img/'),
      );

      this.fs.copyTpl(
        this.templatePath('plain/shared/script'),
        this.destinationPath(path.join(this.options.outputPath, 'script')),
        {
          shared: this.options.isShared
        },
      );
    }


    const json = deepmerge(this.fs.readJSON(this.templatePath('plain/banner/.richmediarc')), {
      content: {
        logo: this.options.isShared ? "../../"+this.options.sharedFolder+"/img/logo.svg" : "./img/logo.svg",
      },
      settings: {
        type: this.options.isShared ? "plain-shared" : "plain",
        size: {
          width: parseInt(width, 10),
          height: parseInt(height, 10),
        },
      },
    });

    this.fs.writeJSON(this.destinationPath(path.join(this.options.outputPath, '.richmediarc')), json);
  }

};
