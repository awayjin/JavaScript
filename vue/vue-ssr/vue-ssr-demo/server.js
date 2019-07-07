// demo: https://www.cnblogs.com/lentoo/p/9637845.html

// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const server = require('express')()

// 5. 使用一个页面模板 template
const fs = require('fs')
const { createRenderer } = require('vue-server-renderer')
// 6. 模板插值
const renderer = createRenderer({
  template: fs.readFileSync('./views/index.template.html', 'utf-8')
})


const createApp = require('./app')

// 4. 与服务器集成
server.get('*', (req, res) => {
  const context = {
    title: 'hello',
    url: req.url,
    meta: `
    <meta name="pre-">
    <meta name="demo">
  `
  }

  console.log('req.url:', req.url)
  const app = createApp(context)

  // 渲染上下文对象-context
  renderer.renderToString(app, context, (err, html) => {
  // renderer.renderToString(app, (err, html) => {
    console.log('err--:', err)
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }

    res.end(html)

  })

})

const PORT = process.env.PORT || 5006
server.listen(PORT, () => {
  console.log(`Opening at: http://localhost:${PORT}`)
})