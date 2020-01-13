
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
  mode: 'production',
  devtool: false,
  entry: __dirname + '/index.jsx',
  output: {
    filename: 'main.js',
    path: __dirname + '/../node/source/'
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
