const server = require('express')()
const Vue = require('vue')
const fs = require('fs')

const { createBundleRenderer } = require('vue-server-renderer')
const template = fs.readFileSync('./src/index.template.html', 'utf-8')
const serverBundle = require('/path/to/vue-ssr-server-bundle.json')
const clientManifest = require('/path/to/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})



const Renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./src/index.template.html', 'utf-8')
})

// const Renderer = require('vue-server-renderer').createRenderer();



server.get('*', (req, res) => {

  const app = new Vue({
    data: {
      name: 'vue app~',
      url: req.url
    },
    template: '<div>hello from {{name}}, and url is: {{url}}</div>'
  })

  const context = {
    title: 'SSR test#333'
  }

  Renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.log('err:--', err)
      res.status(500).end('server error')
    }
    res.end(html)
  })

})

server.listen(4001)
console.log('running at: http://localhost:4001')
