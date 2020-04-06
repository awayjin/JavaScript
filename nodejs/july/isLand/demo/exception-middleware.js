const Koa = require('koa')
const app = new Koa()
const router = new (require('koa-router'))

const exceptionMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log('e:', e)
    ctx.body = {
      message: e.message,
      stack: e.stack
    }
  }
}

app.use(exceptionMiddleware)

router.get('/', async ctx => {
  ctx.body = 'index page.'
})


router.get('/exception', async ctx => {
  throw new Error('router exception.')
})

app.use(router.routes())

// app.use(async (ctx, next) => {
//   const url = ctx.url
//   if (url === '/') {
//     ctx.response.body = 'index'
//   } else if (url === '/exception') {
//     throw new Error('异常 Error 抛出')
//   } else {
//     ctx.body = 'other page.'
//   }
// })



app.listen(3000)