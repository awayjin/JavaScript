const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  template: '<div>Hello Renderer</div>'
})

// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(err => {
//   console.log(err)
// })

// const renderer = require('vue-server-renderer')
//
// const createApp = require('./app') // app.js
//
// // template
// const template = renderer.createRenderer({
//   template: require('fs').readFileSync('./views/index.template.html', 'utf-8')
// })
//
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
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }

    // res.end(html)

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width"/>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `)
  })

})

const PORT = process.env.PORT || 5006
server.listen(PORT, () => {
  console.log(`Opening at: http://localhost:${PORT}`)
})