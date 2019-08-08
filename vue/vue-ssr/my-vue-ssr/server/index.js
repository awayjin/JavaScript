const express = require('express')
const server = express()
const fs = require('fs')
const path = require('path')
const Vue = require('vue')
// const { app } = require('../src/entry-server')

// const { createRenderer } = require('vue-server-renderer')
// const renderer = createRenderer({
//   template: fs.readFileSync(path.join(__dirname, '../src/index-template.html'), 'utf-8')
// })
// const renderer = createRenderer()

const resolve = file => path.resolve(__dirname, file);

const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve("../src/index-template.html"), "utf-8"),
  // template: fs.readFileSync(resolve("../dist/index.html"), "utf-8"),
  clientManifest: clientManifest
})

// express().use("/dist", express.static("./dist"))
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

  renderer.renderToString(context,(err, html) => {
  // renderer.renderToString(vm, context,(err, html) => {
  // renderer.renderToString(vm,(err, html) => {
    if (err) {
      res.status(500).end('Interval Server Error')
      return
    }
    res.send(html)
  })

})

const PORT = process.env.PORT || 3002
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
