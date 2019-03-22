const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack') // 访问内置插件
// const MyPlugin = require('./plugins/my-plugins.js')

module.exports = {
  // entry: './src/index.js',
  entry: {
    app: './src/index.js',
    // app: './src/index.js',
    // print: './src/print.js'
  },
  output: {
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // devtool: 'inline-source-map', // 使用 source map
  // 模块热替换
  devServer: {
    host: 'localhost',
    port: 6000,
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(), // removed
    // new UglifyJsPlugin(), // 压缩JS
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template: './src/index.html',
      title: 'Output Manager'
    }),
    new webpack.NamedModulesPlugin(),
    // new MyPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
  // module4: {
  //   rules: [
  //     // {
  //     //   test: /\.css$/,
  //     //   use: [
  //     //     { loader: 'style-loader'},
  //     //     {
  //     //       loader: 'css-loader',
  //     //       options: {
  //     //         modules: true
  //     //       }
  //     //     }
  //     //   ]
  //     // }
  //     { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
  //     // { test: /\.css$/, loader: 'style-loader!css-loader' }
  //   ]
  // }
  // module3: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: [
  //         // { loader: 'style-loader' },
  //         {
  //           loader: 'css-loader',
  //           options: {
  //             modules: true
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // }
}

// npx webpack --config webpack.config.js