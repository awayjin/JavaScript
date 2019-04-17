// https://segmentfault.com/a/1190000011761345
const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
// webpackDevMiddleware
const webpackDevMiddleware = require('webpack-dev-middleware')
// webpack.config
const config = require('./webpack.config.js')

const app = express()

console.log('publicPath:', config.output.publicPath)
const compiler = webpack(config) // compiler
let devMiddleware = webpackDevMiddleware(compiler, {
  // 虚拟目录，自动指向path编译目录
  // publicPath: config.output.publicPath || '/',
  publicPath: '/__build__/',
  // 向控制台显示任何内容
  quiet: true,
  stats: {
    colors: true,
    chunks: false
  }
})

const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname).forEach(file => {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.use(express.static(__dirname))

// const webpackHotMiddle = require('webpack-hot-middleware')
// let hotMiddleware = webpackHotMiddle(compiler, {
//   log: false
// })
// app.use(devMiddleware)
// app.use(require("webpack-hot-middleware")(compiler))

const port = process.env.PORT || 4000
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})