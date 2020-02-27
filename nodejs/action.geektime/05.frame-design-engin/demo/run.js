const mount = require('koa-mount')
const koa = new (require('koa'))
const app = require('./app')

// Object.keys(app).forEach(routePath => {
//   koa.use(
//     mount(routePath, async (ctx) => {
//       ctx.body = await app[routePath](ctx.query)
//     })
//   )
// })

// /
koa.use(
  mount(async (ctx, next) => {
    ctx.body = 'index'
    console.log('ctx.req:', ctx.url)
    await next()
  })
)

// me
koa.use(
  mount('/me', async (ctx) => {
    console.log(ctx.req)
    ctx.body = await 'mine mine'
  })
)

koa.listen(5001)