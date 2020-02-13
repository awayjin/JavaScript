const Koa = require('koa')
const fs = require('fs')
const static = require('koa-static')
const mount = require('koa-mount')

const app = new Koa()
// app.use(static(path.join(__dirname + '/source/static')))
// app.use(static(__dirname + '/source/static'))
app.use(static(__dirname + '/source/'))


// const Router = require('koa-router')
// const router = new Router()
// router.get('/aa', async (ctx) => {
//   // ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
//   ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
// })

// app.use(
//   mount('/static', static(__dirname + '/source/static'))
// )

app.use(
  mount('/', async (ctx) => {
    setTimeout(() => {
      console.log(window.location.href)
    }, 500)
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
  })
)


// app.use(router.routes())
// app.use(router.allowedMethods())

module.exports = app
// app.listen(3000)