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
  const app = new Vue({
    data: { title: 'msg title' },
    template: '<div>-{{ title }}</div>'
  })

  renderer.renderToString(app, (err, html) => {
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
