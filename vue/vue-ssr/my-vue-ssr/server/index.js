const server = require('express')()
const fs = require('fs')
const path = require('path')
const Vue = require('vue')
// const { app } = require('../src/entry-server')

const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer({
  template: fs.readFileSync(path.join(__dirname, '../src/index-template.html'), 'utf-8')
})
// const renderer = createRenderer()

server.get('*', (req, res) => {
  const vm = new Vue({
    data: { msg: 'msg-txt' },
    template: '<div>-{{ msg }}</div>'
  })

  // 模板的上下文
  const context = {
    title: 'server/index.js title',
    url: req.url,
    meta: `<meta name="viewport" content="width=device-width">`
  }

  // const context = { url: req.url }
  // const vm = app(context)

  renderer.renderToString(vm, context,(err, html) => {
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
