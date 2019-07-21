const TerserPlguin = require('terser-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    'large-number-away': './src/index.js',
    'large-number-away.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumberAway',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlguin({
        include: /\.min\.js/,
      })
    ]
  }
}