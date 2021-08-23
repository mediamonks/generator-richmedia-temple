module.exports = function createPackageJson({ name = 'richmedia-temple' }) {
  return {
    name,
    version: '1.0.0',
    description: '',
    homepage: '',
    author: '',
    engines: {
      npm: '>= 14.9.0',
    },
    scripts: {
      dev: "rds-dev",
      build: "rds-build",
      preview: './node_modules/.bin/henk',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/richmedia-temple-server": "^7.4.1",
      "@mediamonks/temple": "^6.1.0",
      "@mediamonks/henk": "^1.1.1",
    },
  };
};
