const Koa = require('koa')
const fs = require('fs')
const static = require('koa-static')
const mount = require('koa-mount')
const Router = require('koa-router')
const path = require('path')

const app = new Koa()
const router = new Router()
// app.use(static(path.join(__dirname + '/source/static')))
// app.use(static(__dirname + '/source/static'))
app.use(static(__dirname + '/source/'))


router.get('/', async (ctx) => {
  // ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
  ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
})
// 静态文件

// app.use(
//   mount('/static', static(__dirname + '/source/static'))
// )

app.use(
  mount('/a', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
  })
)


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)