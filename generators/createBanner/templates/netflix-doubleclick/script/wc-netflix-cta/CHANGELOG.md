# Changelog
All notable changes to the Netflix Web Components will be documented in this file.

## [Unreleased]

## [2.0.0] - 2018-05-03
- Removes unnecessary templates:
    - `component_link.html`, this is redundant with preview index.html
    - `boilerplate_tests.html`, clean slate for us to write `2.x` component tests
- Removes legacy testing framework & unused `./test` folder
- Simplifies install to just `npm install`
- Changes `./dist/src` to `./dist/npm`
- Moves NPM Publish to `./dist/npm/package.json`
- Changes NPM entry from `index.js` to `./src/main.js`
    - adds `"main"` declaration to `./src/package.json`
- Dist inline scripts into `./dist/npm/index.html`
    - makes index preview-able
    - eliminates need to commit/publish `./dist/npm/node_modules`
- Ensures that `./dist/npm/package.json` version propagates to top-level component version
    - adds npm hook `syncVersion` to do this

#### Notes
The structure of the published NPM component changes with this release. We expect `2.x` changes to break any pipelines that 
were forced to relatively path to the necessary `pk-component-...` dependencies. The fix is to update your paths, or in a pinch, use semver to anti-target this 
release (ex: `^1.x.x`).

