const express = require('express')
const server = express()
const fs = require('fs')
const path = require('path')
// const Vue = require('vue')
// const { app } = require('../src/entry-server')

// const { createRenderer } = require('vue-server-renderer')
// const renderer = createRenderer({
//   template: fs.readFileSync(path.join(__dirname, '../src/index-template.html'), 'utf-8')
// })
// const renderer = createRenderer()

const resolve = file => path.resolve(__dirname, file)

const { createBundleRenderer } = require('vue-server-renderer')

// 主要记录了静态资源文件的配置信息
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
// 主要记录了js文件的内容
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

// 删除 webpack 打包自动生成 index.html 文件
// 如果存在就没法默使用 ../src/index-template.html
const rimraf = require('rimraf')
rimraf('./dist/index.html', (err) => {
  console.log('rimraf err', err)
})

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  // （可选）页面模板
  template: fs.readFileSync(resolve('../src/index-template.html'), 'utf-8'),
  // template: fs.readFileSync(resolve("../dist/index.html"), "utf-8"),

  // （可选）客户端构建 manifest
  clientManifest: clientManifest
})

server.use(express.static('dist'))

server.get('*', (req, res) => {
  // const vm = new Vue({
  //   data: { msg: 'msg-txt' },
  //   template: '<div>-{{ msg }}</div>'
  // })

  // 模板的上下文
  const context = {
    title: 'server/index.js title',
    url: req.url,
    meta: `<meta name="viewport" content="width=device-width">`
  }

  // const context = { url: req.url }
  // const vm = app(context)

  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
  // renderer.renderToString(vm, context, (err, html) => {
  // renderer.renderToString(vm, (err, html) => {
    if (err) {
      console.log('err:', err)
      res.status(500).end('Interval Server Error' + err)
      return
    }
    res.send(html)
  })
})

const PORT = process.env.PORT || 3002
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
