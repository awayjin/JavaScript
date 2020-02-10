const merge = require('webpack-merge') // 两个配置文件合并
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

// let config = process.NODE_ENV === 'development' ? devConfig : proConfig
console.log('----> process.env.NODE_ENV:', process.env.NODE_ENV)
// module.exports = merge(baseConfig, config)

module.exports = (env, argv) => {
  // console.log('env:', env)
  // console.log('argv:', argv)
  // "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
  //   "build": "webpack --mode=production --config ./build/webpack.config.js",
  let config = argv.mode === 'development' ? devConfig : proConfig;
  return merge(baseConfig(env, argv), config);
};