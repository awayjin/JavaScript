
const fs = require('fs')
const path = require('path')

const chokidar = require('chokidar')

const readyFile = (fs, file) => {

}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  // readyPromise
  const readyPromise = new Promise(resolve => {
    ready = resolve
  })

  // update
  const update = () => {
    if (bundle && clientManifest) {
      ready()
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    34
  })

}
