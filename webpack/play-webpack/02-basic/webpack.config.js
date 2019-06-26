const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './src/index.js',
  // 多入口-多页面配置
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].js', // 多页面配置
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader'},
      { test: /.js$/, use: 'babel-loader'},
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production'
}

// 通过占位符确保文件名称的唯一。 filename: '[name].js', // 多页面配置
// ./node_modules/webpack/bin/webpack.js
// sudo yarn add --dev react react-dom @babel/preset-react -D

// 总结区别
//
// 1 .文档定义loader为在模块加载时的预处理文件，故loader运行在打包文件之前。
// 2 . plugins的定义为处理loader无法处理的事物，例如loader只能在打包之前运行，
// 但是plugins在整个编译周期都起作用。