const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = 'index'
})

router.post('/a', async (ctx, next) => {})

router.get('*', async (ctx) => {
  ctx.body = 404
})

// 动态路由
router.get('/product/:pid', async ctx => {
  console.log(ctx.params)
  ctx.body = 'This is a product page. pid:' + ctx.params.pid
})

// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())
// router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
// 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
// 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头


const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`server started at http://locahlhost:${port}`)
})
