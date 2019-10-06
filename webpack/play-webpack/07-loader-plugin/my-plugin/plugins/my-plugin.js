module.exports = class MyPlugins {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    console.log('My plugin is executed.')
    console.log('Options:', this.options)
    // console.log('compiler:', compiler)
  }
}