const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('./build/setup-dev-server.js')
const express = require('express')

const app = express()
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)
const templatePath = resolve('./src/index-template.html')

// renderer
function render (req, res) {
  // context
  const context = {
    title: 'SSR 测试1',
    url: req.url
  }

  // renderToString
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return res.status(500).send('500 | Internal Server Error')
    }
    res.send(html)
  })
}

let renderer
let readyPromise
// template

if (isProd) {
  // 生产
  // ...生产暂不处理
} else {
  // 开发
  readyPromise = devServer(
    app,
    templatePath,
    (bundle, options) => {
      createBundleRenderer(
        bundle,
        Object.assign(options, {
          basedir: resolve('./dist'),
          runInNewContext: false
        })
      )
    }
  )
}

app.get(
  '*',
  isProd
    ? ''
    : (req, res) => {
      readyPromise.then(() => render(req, res))
    }
)

const port = process.env.PORT || 9003
app.listen(port, () => {
  console.log(`server started at http://locahlhost:${port}`)
})
