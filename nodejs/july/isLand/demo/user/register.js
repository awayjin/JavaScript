const KoaRouter = require('koa-router')
const app = new (require('koa'))
const bodyParser = require('koa-bodyparser')
const chalk = require('chalk')

const { DemoUser } = require('./db/user-model.js')

const router = new KoaRouter({
  prefix: '/api/v1/user'
})
const { RegisterValidator, SearchValidator } = require('./validator.js')
const { Success } = require('./http-exception')
const cors = require('koa2-cors')
// app.use(cors())

const exceptionMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log('e::', e)
    ctx.status = parseInt(e.status)
    ctx.body = {
      message: e.message,
      errorCode: e.errorCode
    }
  }
}
app.use(exceptionMiddleware)

// 搜索
router.get('/:id/demo', async (ctx, next) => {
  const id = ctx.params // 路径
  console.log('---> id:', id);
  ctx.body = 'demo'
})

// 搜索
router.get('/search', async (ctx, next) => {
  const v = await new SearchValidator().validate(ctx)
  // console.log('----》 v：', v)
  ctx.body = v
})

// 用户注册
router.post('/:id/register', async (ctx, next) => {

  const v = await new RegisterValidator().validate(ctx)
  // console.log('v:', v)
  console.log('body.account:', v.get('body.email'))
  console.log('query.type:', v.get('query.type'))
  console.log('path.id:', v.get('path.id'))
  console.log('header.auth:', v.get('header.auth'))
  const user = {
    email: v.get('body.email'),
    password1: v.get('body.password1')
  }
  await DemoUser.create(user)
  ctx.body = new Success('ok', 200)
})

/**
 * 常用的请求参数，获取4种方式
 *  1. 路径 path, ctx.params
 *  2. 查询字符串 ctx.request.query
 *  3. 请求头 header: ctx.request.header
 *  4. 请求体 body json格式： ctx.request.body
 *
 * */
router.get('/register/:id', async (ctx, next) => {
  ctx.res.writeHead({
    'access-control-allow-origin': 'http://localhost:3000',
  // 允许自定义头
  // 'access-control-allow-headers': 'X-Test-CORS',
  // 允许的方法
  'access-control-allow-methods': 'PUT, POST, Delete, GET',
  })
  const params = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body
  console.log(chalk.bgYellow(`1. 路径 ctx.params: `), params)
  console.log(chalk.bgCyan(` 2. 查询字符串 ctx.request.query: `), query)
  console.log(chalk.bgRed(` 3. 请求头 ctx.request.header: `), header)
  console.log(chalk.bgCyanBright(` 4. 请求体 ctx.request.body: `), body)
  ctx.body = `register params id: ${params.id}`
})

app.use(cors())
app.use(bodyParser())
app.use(router.routes())

const port = 3001
app.listen(port, () => {
  console.log(chalk.bgCyanBright(`App listened at port ${port}`))
})
