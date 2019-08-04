
// const Vue = require('vue')
const express = require('express');
const { renderToString } = require('vue-server-renderer').createRenderer()
// const { createApp } = require('../src/main.js')
const createApp = require('../src/main.js')

console.log('-----createApp---2:', createApp)

const app = express()

app.get('*', (req, res) => {

  const context = {
    url: req.url
  }
  const vm = createApp(context)
  // const vm = new Vue({
  //   data: { msg: 11, url: req.url },
  //   template: `<div>msg:{{ msg}}, url: {{ url }}</div>`
  // })
  console.log('factory function')

  renderToString(vm, (err, html) => {
    console.log('err3:', err)
    if (err) {
      res.status(500).end('Interval Server Error')
      return
    }
    res.status(200).send(html)
  })

})


const port = process.env.PORT || 3007
app.listen(port, () => {
  console.log(`Server Opening at http://localhost:${port}`)
})