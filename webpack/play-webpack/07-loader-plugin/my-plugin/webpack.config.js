const path = require('path')
// 自定义插件
const MyPlugin = require('./plugins/my-plugin.js')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
  plugins: [
    new MyPlugin({
      dd: 33,
      name: 'my plugin.'
    })
  ]
}