const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const webpack = require('webpack');

const devConfig = {
  plugins: [
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin() // 可以不加
  ],
  // mode: 'production'
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // 热更新， hot: true 自动引入 HotModuleReplacementPlugin
    hot: true,
    stats: 'errors-only'
  },
  devtool: 'cheap-source-map',
}

module.exports = merge(baseConfig, devConfig)
