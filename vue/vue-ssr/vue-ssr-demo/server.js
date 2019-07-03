// demo: https://www.cnblogs.com/lentoo/p/9637845.html

// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
// const app = new Vue({
//   template: '<div>Hello Renderer</div>'
// })

// 第 2 步：创建一个 renderer
// const renderer = require('vue-server-renderer').createRenderer()

const server = require('express')()

// 第 3 步：将 Vue 实例渲染为 HTML
// renderer.renderToString(app).then(html => {
//   console.log('html 33:', html)
// }).catch(err => {
//   console.log(err)
// })

// const renderer = require('vue-server-renderer')
//
// const createApp = require('./app') // app.js
//

// 5. 使用一个页面模板 template
const fs = require('fs')
const { createRenderer } = require('vue-server-renderer')
// 6. 模板插值
const renderer = createRenderer({
  template: fs.readFileSync('./views/index.template.html', 'utf-8')
})

// 4. 与服务器集成
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      title: 'insert title'
    },
    template: `<div>访问的 URL 是: {{ url }}</div>`
  })

  const context = {
    title: 'hello',
    url: req.url,
    meta: `
    <meta name="pre-">
    <meta name="demo">
  `
  }
  // const app = createApp(context)

  // 渲染上下文对象-context
  renderer.renderToString(app, context, (err, html) => {
  // renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }

    res.end(html)

    // res.end(`
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width"/>
    //   </head>
    //   <body>
    //     ${html}
    //   </body>
    //   </html>
    // `)
  })

})

const PORT = process.env.PORT || 5006
server.listen(PORT, () => {
  console.log(`Opening at: http://localhost:${PORT}`)
})