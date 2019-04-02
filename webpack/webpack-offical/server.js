// https://segmentfault.com/a/1190000011761345

const express = require('express')
const webpack = require('webpack')

const app = express()

const config = require('./webpack.config.js')
const compiler = webpack(config) // compiler


// webpackDevMiddleware
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddle = require('webpack-hot-middleware')

let devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  // 向控制台显示任何内容
  quiet: true
})

let hotMiddleware = webpackHotMiddle(compiler, {
  log: false,
  // heartbeat: 2000
})

app.use(devMiddleware)

// app.use(hotMiddleware)

// const hotMiddleware = require("webpack-hot-middleware")
// app.use(hotMiddleware(compiler))

// app.use(webpackDevMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }))
//
// // webpackHotMiddle
// app.use(webpackHotMiddle(compiler), {
//   // path: '/__webpack_hmr',
//   heartbeat: 10 * 1000
// })

app.use(require("webpack-hot-middleware")(compiler))



const port = process.env.PORT || 4000
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})