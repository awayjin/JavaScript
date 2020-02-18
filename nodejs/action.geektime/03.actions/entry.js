const Koa = require('koa')
const mount = require('koa-mount')

const app = new Koa()

app.use(
  mount('/a', function(ctx) {
    ctx.body = 'a router'
  })
)

// download
app.use(
  mount('/download', require('./1.downloads/app.js'))
)

// list
app.use(
  // mount('/list', require('./4.list/index.js'))
  mount('/list', require('./4.list/node/index.js'))
)

// play
app.use(
  // mount('/list', require('./4.list/index.js'))
  mount('/play', require('./3.play/index.js'))
)

// detail
app.use(
  mount('/detail', require('./2.detail/index.js'))
)

const port = 3000
app.listen(port, () => {
  console.log('Listening at port ', port)
})
