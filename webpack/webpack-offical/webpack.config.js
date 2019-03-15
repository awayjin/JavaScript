const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') // 访问内置插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MyPlugin = require('./plugins/my-plugins.js')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     { loader: 'style-loader'},
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     }
      //   ]
      // }
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
      // { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(), // removed
    // new UglifyJsPlugin(), // 压缩JS
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MyPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
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