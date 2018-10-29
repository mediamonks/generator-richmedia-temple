const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');
const NetflixAdSengLibs = require('../../util/data/NetflixAdSengLibs');

module.exports = class extends Generator {
  async questions() {
    this.log(`Creating banner`);

    this.result = await this.prompt([
      {
        type: 'input',
        name: 'size',
        message: 'Please fill in size of banner',
        default: '300x250',
        validate: input => /^\d+x\d+$/.test(input),
      },
    ]);

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

    // checking if package.json is already there
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Type of banner is this',
          choices: Object.values(PlatformChoices),
        },
      ])),
    };

    switch (this.result.type) {
      case PlatformChoices.NETFLIX: {
        this.netflix = await this.prompt([
          {
            type: 'checkbox',
            name: 'libs',
            message: 'Please check all libs you are going to use for this rm unit.',
            choices: [
              ...NetflixAdSengLibs
            ],
          },
        ]);
        break;
      }

      default: {
        break;
      }
    }
  }

  action() {
    switch (this.result.type) {
      case PlatformChoices.NETFLIX: {
        const [width, height] = this.result.size.split('x');

        this.fs.extendJSON(this.destinationPath('package.json'), {
          dependencies: {
            ...this.netflix.libs.reduce((prev, curr) => {
              prev[curr] = '';
              return prev;
            }, {}),

            '@netflixadseng/wc-monet-integrator': 'latest',
            '@netflixadseng/wc-netflix-fonts': 'latest',
          },
        });

        this.fs.copyTpl(
          this.templatePath('netflix/index.html'),
          this.destinationPath(path.join(this.result.outputPath, 'index.html')),
          {
            banner_width: width,
            banner_height: height,
          },
        );

        this.fs.copyTpl(
          this.templatePath('netflix/css/style.css'),
          this.destinationPath(path.join(this.result.outputPath, 'css/style.css')),
          {
            banner_width: width,
            banner_height: height,
          },
        );

        this.fs.copyTpl(
          this.templatePath('netflix/script/main.js'),
          this.destinationPath(path.join(this.result.outputPath, 'script/main.js')),
        );

        const json = deepmerge(this.fs.readJSON(this.templatePath('netflix/.richmediarc')), {
          settings: {
            size: {
              width: parseInt(width, 10),
              height: parseInt(height, 10),
            },
          },
        });

        this.fs.writeJSON(this.destinationPath(path.join(this.result.outputPath, '.richmediarc')), json);

        this.fs.copy(
          this.templatePath('netflix/img/**'),
          this.destinationPath(path.join(this.result.outputPath), 'img/'),
        );

        mkdirp(this.destinationPath(path.join(this.result.outputPath, 'video')), err => {
          if (err) console.error(err);
        });

        break;
      }

      case PlatformChoices.DOUBLECLICK: {
        const [width, height] = this.result.size.split('x');

        // main html
        this.fs.copyTpl(
          this.templatePath('doubleclick/index.html'),
          this.destinationPath(path.join(this.result.outputPath, 'index.html')),
          {
            banner_width: width,
            banner_height: height,
          },
        );

        this.fs.copy(
          this.templatePath('doubleclick/img/**'),
          this.destinationPath(path.join(this.result.outputPath), 'img/'),
        );

        // main javascript
        this.fs.copyTpl(
          this.templatePath('doubleclick/script/main.js'),
          this.destinationPath(path.join(this.result.outputPath, 'script/main.js')),
        );

        // copy pasting css
        this.fs.copyTpl(
          this.templatePath('doubleclick/css/style.css'),
          this.destinationPath(path.join(this.result.outputPath, 'css/style.css')),
          {
            banner_width: width,
            banner_height: height,
          },
        );

        const json = deepmerge(this.fs.readJSON(this.templatePath('doubleclick/.richmediarc')), {
          settings: {
            size: {
              width: parseInt(width, 10),
              height: parseInt(height, 10),
            },
          },
        });

        this.fs.writeJSON(this.destinationPath(path.join(this.result.outputPath, '.richmediarc')), json);

        break;
      }


      case PlatformChoices.PLAIN: {
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
        this.fs.copyTpl(
          this.templatePath('plain/script/main.js'),
          this.destinationPath(path.join(this.result.outputPath, 'script/main.js')),
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

        break;
      }

      default: {
        break;
      }
    }
  }
};
