const server = require('express')()
const fs = require('fs')
const path = require('path')
const Vue = require('vue')

const { createRenderer } = require('vue-server-renderer')
const renderer = createRenderer({
  // template: fs.readFileSync('./src/index-template.html', 'utf-8')
  // template: fs.readFileSync('./dist/index.html', 'utf-8')
  template: fs.readFileSync(path.join(__dirname, '../src/index-template.html'), 'utf-8')
  // template: fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
})

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

  renderer.renderToString(vm, context,(err, html) => {
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
