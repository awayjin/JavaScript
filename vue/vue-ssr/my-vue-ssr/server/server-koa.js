// const express = require('express')
// const server = express()
const Koa = require('koa')
const serverKoa = new Koa()

const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)

const koaStatic = require('koa-static')
// server.use(express.static('dist'))
// 开放dist目录
serverKoa.use(koaStatic(resolve('../dist')))

const { createBundleRenderer } = require('vue-server-renderer')

// 主要记录了静态资源文件的配置信息
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
// 主要记录了js文件的内容
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

// 删除 webpack 打包自动生成 index.html 文件
// 如果存在就没法使用 ../src/index-template.html
const rimraf = require('rimraf')
rimraf('./dist/index.html', (err) => {
  console.log('rimraf err', err)
})

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  // （可选）页面模板
  template: fs.readFileSync(resolve('../src/index-template.html'), 'utf-8'),

  // （可选）客户端构建 manifest
  clientManifest: clientManifest
})

function renderToString (context) {
  return new Promise((resolve, reject) => {
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
      // err ?  resolve(html) : reject(err + '--err--')
    })
  })
}

serverKoa.use(async (ctx, next) => {
  // 模板的上下文
  const context = {
    title: 'server/index.js title',
    url: ctx.url,
    meta: `<meta name="viewport" content="width=device-width">`
  }

  let html
  try {
    html = await renderToString(context)
  } catch (e) {
    console.log('html error:', e)
    html = 'Interval Server Error'
  } finally {
    ctx.body = html
  }
})

const PORT = process.env.PORT || 3002
serverKoa.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
