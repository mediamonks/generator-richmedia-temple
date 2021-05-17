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
      dev: "rds-dev",
      build: "rds-build",
      preview: './node_modules/.bin/henk',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/richmedia-temple-server": "^7.2.3",
      "@mediamonks/temple": "^6.0.2",
      "@mediamonks/henk": "^1.1.1",
    },
  };
};
