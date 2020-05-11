const KoaRouter = require('koa-router')
const app = new (require('koa'))
const chalk = require('chalk')
const router = new KoaRouter({
  prefix: '/api/v1/user'
})
const { RegisterValidator } = require('./fe-validator.js')

const exceptionMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = 500
    ctx.body = {
      message: e.message
    }
  }
}
app.use(exceptionMiddleware)

// 用户注册
router.post('/:id/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  // console.log('v:', v)
  console.log('body.account:', v.get('body.account'))
  console.log('query.type:', v.get('query.type'))
  console.log('path.id:', v.get('path.id'))
  console.log('header.auth:', v.get('header.auth'))
  ctx.body = 'register'
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

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use(router.routes())

const port = 3001
app.listen(port, () => {
  console.log(chalk.bgGreen(`App listened at port ${port}`))
})