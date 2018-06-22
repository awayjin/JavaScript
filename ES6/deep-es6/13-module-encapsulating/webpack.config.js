var path = require('path');
module.exports = {
  entry: "./js/01-basic-import.js",
  output: {
    path: __dirname,
    filename: "dist/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
