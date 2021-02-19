const path = require('path')

const config = {
  mode: 'development',
  // entry: path.resolve(__dirname, 'src/index.js'),
  entry: path.resolve(__dirname, 'src/default.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        // test: /\.js$/,
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: ['babel-loader?cacheDirectory=true'],
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [["@babel/preset-env", { "targets": "defaults" }], "@babel/preset-react"],
            // "presets": ["env"],
            // "plugins": ['@babel/plugin-syntax-class-properties']
            // "plugins": ['transform-decorators-legacy', 'transform-class-properties']
            "plugins": [["@babel/plugin-proposal-decorators", { "legacy": true }], 'transform-class-properties']
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