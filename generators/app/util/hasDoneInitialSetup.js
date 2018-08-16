const fs = require('fs-extra');

module.exports = function hasDoneInitialSetup(){
  return new Promise(resolve => {
    fs.readJSON('package.json')
  })
}
