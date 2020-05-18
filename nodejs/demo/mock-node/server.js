const app = new (require('koa'))
// 自动导入路由，全局异常，配置文件

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const Router = require('koa-router')
const router = new Router()

const cors = require('koa2-cors')
app.use(cors())

router.post('/projects', async (ctx, next) => {
  console.log('post ctx:', ctx.request.body)
  ctx.body = ctx.request.body
})

router.get('/projects', async (ctx, next) => {
  console.log('ctx:', ctx.body)
  ctx.body = 'get body'
})

app.use(router.routes())
app.use(router.allowedMethods())

// const book = require('./api/v1/book')
// const latest = require('./api/v1/classic')
// app.use(latest.routes())
// app.use(book.routes())

app.listen(5000)