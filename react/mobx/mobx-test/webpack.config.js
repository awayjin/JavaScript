const path = require('path')

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: ['babel-loader?cacheDirectory=true'],
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [["@babel/preset-env", { "targets": "defaults" }]],
            // "plugins": ['@babel/plugin-syntax-class-properties']
            "plugins": ['transform-class-properties']
          }
          // options: {
          //   presets: ['env']
          // }
        }
      }
    ]
  },
  devtool: 'inline-source-map'
}

module.exports = config