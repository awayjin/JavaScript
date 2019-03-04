let path = require('path')
let MyPlugins = require('./MyPlugins.js')

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    // publicPath需要使用相对路径
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  plugins: [
    new MyPlugins()
  ]
}