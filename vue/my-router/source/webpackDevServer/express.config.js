const path = require('path')
const express = require('express')

var ejs = require('ejs')
const app = express()

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
let webpackConf = require('./webpack.config')

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, 'src/html'))
app.set('view engine', 'html')

var compiler = webpack(webpackConf)

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConf.output.publicPath
}))

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(4000)