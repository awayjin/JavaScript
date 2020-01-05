const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os')
// 负责将html文档虚拟到根目录下
let htmlWebpackPlugin = new HtmlWebpackPlugin({
  // 虚拟的html文件名 index.html
  filename: 'index.html',
  // 虚拟html的模板为 src下的index.html
  template: path.resolve(__dirname, './src/index.html')
})

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
  // 开发模式
  mode: 'development',
  // 配置入口文件
  entry: {
    main: './src/app.js'
  },
  // entry: './src/app.js',
  // 出口文件目录为根目录下dist, 输出的文件名为main
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
    filename: '[name]-[hash:8].js'
  },
  // 配置开发服务器, 并配置自动刷新
  devServer: {
    // 根目录下dist为基本目录
    contentBase: path.join(__dirname, 'dist'),
    // 自动压缩代码
    compress: true,
    // 服务端口为1208
    port: 1208,
    // 自动打开浏览器
    open: true,
    host: host
  },
  // 装载虚拟目录插件
  plugins: [htmlWebpackPlugin],
  module: {
    rules: [
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', "@babel/preset-react"]
      //     }
      //   }
      // },
      {
        test: /\.js|jsx$/,
        // use: 'babel-loader',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        },
        exclude: /node_modules/
      }
    ]
  }
}
