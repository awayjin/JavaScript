const app = new (require('koa'))
const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/api/v1/token'
})
const basicAuth = require('basic-auth')
const chalk = require('chalk')

// auth
class Auth {
  get m () {
    console.log('getter m')
    return async (ctx, next) => {
      const user = basicAuth(ctx.req)
      console.log(chalk.yellow('user', user))
      ctx.auth = {
        a: 11,
        b: 22
      }
      next()
    }
  }
}

router.post('/', new Auth().m, async ctx => {
  ctx.body = 'token of auth: ' + ctx.auth.a + `, b:${ctx.auth.b}`
})

app.use(router.routes())

const port = 3000
app.listen(port, () => {
  console.log('\c http://localhost:', port)
})