const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, content) => {
  console.log('ctx.request', ctx.request)
  console.log('ctx.header', ctx.header)
  console.log('ctx.ips', ctx.ips)
  console.log('ctx.ips', ctx.ip)
  console.log('ctx.request.header', ctx.request.headers)
  ctx.body = {
    key: 'body'
  }
})

app.listen(3000)