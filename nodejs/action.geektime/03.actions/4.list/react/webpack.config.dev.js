const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // 热更新， hot: true 自动引入 HotModuleReplacementPlugin
    hot: true,
    port: 4000
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
    // new webpack.HotModuleReplacementPlugin() // webpack4.x 后自动引入
  ]
}
