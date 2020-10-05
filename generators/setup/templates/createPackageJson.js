module.exports = function createPackageJson({ name = 'richmedia-temple' }) {
  return {
    name,
    version: '1.0.0',
    description: '',
    homepage: '',
    author: '',
    engines: {
      npm: '>= 8.0.0',
    },
    scripts: {
      dev: 'node ./node_modules/@mediamonks/richmedia-temple-server/dev.js',
      build: 'node ./node_modules/@mediamonks/richmedia-temple-server/build.js',
      preview: './node_modules/.bin/henk',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/richmedia-temple-server": "^5.0.5",
      "@mediamonks/temple": "^4.0.0",
      "@mediamonks/henk": "^1.1.1",
    },
  };
};
