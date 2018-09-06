module.exports = function createPackageJson({ name = 'richmedia-temple' }) {
  return {
    name,
    version: '0.0.0',
    description: '',
    homepage: '',
    author: '',
    engines: {
      npm: '>= 6.0.0',
    },
    scripts: {
      dev: 'node ./node_modules/@mediamonks/richmedia-temple-server/dev.js',
      build: 'node ./node_modules/@mediamonks/richmedia-temple-server/build.js',
    },
    license: 'ISC',
    dependencies: {
      '@mediamonks/richmedia-temple-server': '',
    },
  };
};
