
const argv = process.argv
let lastIndex = argv.length - 1
let dev = 'development'
let pro = 'production'
let mode = ''
if (argv[lastIndex] === dev) {
  mode = dev
} else if (argv[lastIndex] === pro) {
  mode = pro
}
console.log('mode:', mode)


module.exports = {
  mode: 'development',
  devtool: false,
  entry: __dirname + '/index.jsx',
  output: {
    filename: 'main.js',
    path: __dirname + '/../node/source/'
  },
  devServer: {
    // 根目录下dist为基本目录
    // contentBase: path.join(__dirname, 'dist'),
    contentBase: __dirname + '/../node/source/',
    // 服务端口为1208
    port: 1208,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ] // close rules
  }
}
