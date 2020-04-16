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
      errorCode: e.errorCode,
      code: e.code,
      stack: e.stack
    }
  }
}

app.use(exceptionMiddleware)

router.get('/', async ctx => {
  ctx.body = 'index page.'
})

class HttpException extends Error {
  constructor (message = 'default error', errorCode =  10000, code = 400) {
    super();
    this.message = message
    this.errorCode = errorCode
    this.code = code
  }
}

const e1 = new HttpException('router exception.')
console.log(e1)

router.get('/exception', async ctx => {
  // throw new Error('router exception.')
  throw new HttpException('router exception.')
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