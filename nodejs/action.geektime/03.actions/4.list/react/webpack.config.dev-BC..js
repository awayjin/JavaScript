const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')
const os = require('os')
function getIpAddress () {
  const networkInterfaces = os.networkInterfaces()
  let ip = ''
  Object.values(networkInterfaces).some(item => {
    item.some(sub => {
      if ((sub.family).toLowerCase() === 'ipv4' && sub.address !== '127.0.0.1') {
        ip = sub.address
      }
    })
  })
  return ip
}
let host = getIpAddress()
console.log('ip:', host)

module.exports = {
  // entry: {
  //   main: './src/index.jsx'
  //   // entry: ["@babel/polyfill", "./src/"]
  // },
  entry: {
    entry: './src/app.jsx',
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: '[name]-[hash:8].js'
  // },
  mode: 'development',
  devServer: {
    // contentBase: './dist',
    contentBase: path.join(__dirname, 'dist'),
    // 热更新， hot: true 自动引入 HotModuleReplacementPlugin
    hot: true,
    port: 3001,
    open: true,
    // host: '0.0.0.0'
    host: host
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','react']
          }
        }
      }
    ]
  },
  // webpack 可以使用 loader 来预处理文件。
  // 这允许你打包除 JavaScript 之外的任何静态资源。
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           // presets: [
  //           //   '@babel/preset-env'
  //           // ],
  //           presets: [
  //             [
  //               '@babel/env',
  //               // 'es2015',
  //               {
  //                 targets: {
  //                   edge: '17',
  //                   chrome: '66',
  //                   safari: '11.1',
  //                   firefox: '60',
  //                   // android: '4'
  //                 },
  //                 useBuiltIns: 'usage'
  //               }
  //             ]
  //           ],
  //           sourceType: 'unambiguous', // 关键是这一句, 解决兼容性问题
  //           // plugins: ['@babel/plugin-transform-runtime']
  //           // plugins: ['es2015']
  //         }
  //       }
  //     },
  //     {
  //       test: /\.m?jsx$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env','react']
  //         }
  //       }
  //     }
  //   ]
  // },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
    // new webpack.HotModuleReplacementPlugin() // webpack4.x 后自动引入
  ]
}
