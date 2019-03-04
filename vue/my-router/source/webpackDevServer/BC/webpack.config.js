const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 定义文件夹路径
const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

console.log('__dirname' + __dirname)

module.exports = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ],
    // 添加我们的插件 会自动生成一个html文件
    plugins: [
      new HtmlwebpackPlugin({
        // 在build目录下自动生成index.html，指定其title
        title: 'app title'
      })
    ]
  }
}