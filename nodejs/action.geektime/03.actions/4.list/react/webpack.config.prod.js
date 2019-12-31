const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    // path: path.resolve('dist'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },
  mode: 'production'
}
