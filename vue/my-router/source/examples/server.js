const express = require('express') // express
const webpack = require('webpack') // webpack
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')
const ejs = require('ejs')

const app = express()
// console.log(WebpackConfig)
// console.log(process)
// app.use(webpackMiddleware(compiler, {
//   publicPath: webpackConf.output.publicPath
// }))

let compiler = webpack(WebpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/assets/'
}))
app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, '../src/html'))
app.set('view engine', 'html')

app.get('/', function (req, res) {
  res.render('index')
})

const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}`)
})

// const express = require('express')
// const rewrite = require('express-urlrewrite')
// const webpack = require('webpack')
// const webpackDevMiddleware = require('webpack-dev-middleware')
// const WebpackConfig = require('./webpack.config')
//
// const app = express()
//
// app.use(webpackDevMiddleware(webpack(WebpackConfig), {
//   publicPath: '/__build__/',
//   stats: {
//     colors: true,
//     chunks: false
//   }
// }))
//
// const fs = require('fs')
// const path = require('path')
//
// fs.readdirSync(__dirname).forEach(file => {
//   if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
//     app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
//   }
// })
//
// app.use(express.static(__dirname))
//
// const port = process.env.PORT || 8080
// module.exports = app.listen(port, () => {
//   console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
// })

