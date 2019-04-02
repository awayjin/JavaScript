const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack') // 访问内置插件
// const MyPlugin = require('./plugins/my-plugins.js')

// 定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

module.exports = {
  mode: 'development',
  // content: __dirname,
  //实现刷新浏览器webpack-hot-middleware/client?noInfo=true&reload=true 是必填的
  entry: ['webpack-hot-middleware/client?noInfo=true&reload=true' , APP_PATH],
  // 输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'//将app文件夹中的两个js文件合并成build目录下的bundle.js文件
  },
  devtool: '#source-map',
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // title: 'Output Manager'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ]
}

// npx webpack --config webpack.config.js