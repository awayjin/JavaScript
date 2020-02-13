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

// detail
app.use(
  mount('/detail', require('./2.detail-copy/index.js'))
)

const port = 3000
app.listen(port, () => {
  console.log('Listening at port ', port)
})
