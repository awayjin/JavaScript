
const readyFile = (fs, file) => {

}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(resolve => {
    ready = resolve
  })

  const update = () => {
    if (bundle && clientManifest) {
      ready()
    }
  }
}
