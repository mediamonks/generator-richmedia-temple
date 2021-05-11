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
      "dev": "rds-dev",
      "build": "rds-build",
      preview: './node_modules/.bin/henk',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/richmedia-temple-server": "^6.1.5",
      "@mediamonks/temple": "^4.0.0",
      "@mediamonks/henk": "^1.1.1",
    },
  };
};
