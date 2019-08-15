
const path = require('path')
const fs = require('fs')
const LRU = require('lru-cache')

const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('./build/setup-dev-server.js')

const express = require('express')
const app = express()

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)

// createRenderer
function createRenderer (bundle) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  )
}

const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
  return true
}

const microCache = LRU({
  max: 10,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

// renderer
function render(req, res) {
  // 缓存
  const cacheable = isCacheable(req.url)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      console.log('Response from cache')
      return res.send(hit)
    }
  }

  const startTime = Date.now()
  res.setHeader('Content-Type', 'text/html')

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.log(err)
    }
  }

  const context = {
    title: 'SSR 测试1',
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - startTime}ms`)
    }

  })

}


let renderer
let readyPromise
const templatePath = resolve('./src/index-template.html')

readyPromise = devServer(
  app,
  templatePath,
  (bundle, options) => {
    renderer = createRenderer(bundle, options)
  }
)


app.get(
  '*',
  isProd
    ? ''
    : (req, res) => {
      readyPromise.then(() => )
    }
)
