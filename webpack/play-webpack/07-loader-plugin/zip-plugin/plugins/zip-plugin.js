const JSZip = require('jszip')
const zip = new JSZip()
const RawSource = require('webpack-sources').RawSource
const path = require('path')

module.exports = class ZipPlugins {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    console.log('My plugin is executed.')
    console.log('Options:', this.options)
    // console.log('compiler:', compiler)

    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename)

      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        // console.log('d:', source)
        folder.file(filename, source)

        zip.generateAsync({
          // type: 'blob'
          type: 'nodeBuffer'
        }).then((content) => {
          console.log('content:', content)
          console.log('compilation options:', compilation.options)
          // compilation.assets()

          const outputPath = path.join(
            compilation.options.output.path,
            this.options.filename + '.zip'
          )
          const outputRelativePath = path.relative(
            compilation.options.filename + '.zip',
            outputPath
          )
          // compilation.assets[outputPath] = new RawSource(content)
          compilation.assets[outputRelativePath] = new RawSource(content)

          callback()

        })
      }
    })
  }
}