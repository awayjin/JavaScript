const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // entry: './src/index.js',
  // 多入口-多页面配置
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    // filename: 'bundle.js',
    // filename: '[name].js', // 多页面配置
    filename: '[name][hash:8].js', // chunkhash
    path: path.resolve(__dirname, 'dist')
  },
  // 文件监听. 放到硬盘中
  // watch: true,
  // // 只有开启监听模式时，watchOptions才有意义
  // watchOptions: {
  //   // 默认为空，不监听的文件或者文件夹，支持正则匹配
  //   ignored: /node_modules/,
  //   // 监听到变化发生后会等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
  //   poll: 1000
  // },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader'},
      { test: /.js$/, use: 'babel-loader'},
      // { test: /.(jpeg|png|gif|jpg)$/, use: 'file-loader' },
      {
        test: /.(jpeg|png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    // new webpack.HotModuleReplacementPlugin() // 可以不加
  ],
  // mode: 'production'
  mode: 'development',
  devServer: {
    contentBase: './dist',
    // 热更新， hot: true 自动引入 HotModuleReplacementPlugin
    hot: true
  }
}

// 通过占位符确保文件名称的唯一。 filename: '[name].js', // 多页面配置
// ./node_modules/webpack/bin/webpack.js
// sudo yarn add --dev react react-dom @babel/preset-react -D

// 总结区别
//
// 1 .文档定义loader为在模块加载时的预处理文件，故loader运行在打包文件之前。
// 2 . plugins的定义为处理loader无法处理的事物，例如loader只能在打包之前运行，
// 但是plugins在整个编译周期都起作用。