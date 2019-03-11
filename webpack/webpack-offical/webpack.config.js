const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
  }
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