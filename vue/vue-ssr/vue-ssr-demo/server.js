const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()

const renderer = require('vue-server-renderer')

const template = renderer.createRenderer({
  template: require('fs').readFileSync('./views/index.template.html', 'utf-8')
})

const context = {
  title: 'hello',
  meta: `
    <meta name="pre-">
    <meta name="demo">
  `
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      title: 'insert title'
    },
    template: `<div>访问的 URL 是: {{ url }}</div>`
  })

  template.renderToString(app, context, (err, html) => {
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

server.listen(5000)