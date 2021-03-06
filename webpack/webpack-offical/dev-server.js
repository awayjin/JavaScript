const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')

const webpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')
const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options)

const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

const port = process.env.PORT || 3004 // 进程-用户环境信息

const fs = require('fs') // 文件系统

/**
 *
 * fs.readdirSync - 指定目录下所有文件名称
 * __dirname: 总是指向被执行 js 文件的绝对路径
 *
 * fs.Stats - 对象提供有关文件的信息
 * fs.statSync - 返回: <fs.Stats>
 *
 *   path.join 与 path.resolve 的区别
 1. 对于以/开始的路径片段，path.join只是简单的将该路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在terminal中使用cd命令一样

 */

const path = require('path')

const app = express()

fs.readdirSync(__dirname).forEach(file => {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

// 将静态文件目录设置为：项目根目录 +/public
app.use(express.static(__dirname))

server.listen(port, 'localhost', () => {
  console.log(`-----------dev server listening on port ${port}`)
})