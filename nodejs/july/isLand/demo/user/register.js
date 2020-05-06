const KoaRouter = require('koa-router')
const app = new (require('koa'))
const chalk = require('chalk')
const router = new KoaRouter({
  prefix: '/api/v1/user'
})

const exceptionMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.body = {
      message: e.message
    }
  }
}
app.use(exceptionMiddleware)

const validator = require('validator')
class AwayValidator {
  // take 4 request parameters in context
  // 获取上下文中的4种请求参数 - paras
  getContentReq (ctx) {
    return {
      path: ctx.params,
      body: ctx.request.body,
      query: ctx.request.query,
      header: ctx.request.header,
    }
  }
}
class RegisterValidator extends AwayValidator {
  constructor () {
    super()
    this.account = validator.isLength('str')
    this.password1 = validator
    this.password2 = this.password1
  }
  async validate (ctx) {
    const params = await this.getContentReq(ctx)
    const account = validator.isLength(params.body.account, {
      min: 4,
      max: 30
    })
    console.log('account:', chalk.bgCyanBright(account))
    if (!account) {
      throw new Error('4-30个字符')
    }
  }
}

//
router.post('/:id/register', async (ctx, next) => {
  console.log(chalk.bgCyan('ctx.request'))
  console.log(ctx)
  console.log(ctx.params)
  console.log(ctx.request.body)
  console.log(ctx.request.query)
  console.log(ctx.request.header)
  const v = new RegisterValidator().validate(ctx)
  const query = ctx.request.query
  // console.log(chalk.bgCyan(validator.isNumeric(query.type)))
  // console.log('ctx.request.type: ', query.type)
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

const port = 3000
app.listen(port, () => {
  console.log(chalk.bgGreen(`App listened at port ${port}`))
})