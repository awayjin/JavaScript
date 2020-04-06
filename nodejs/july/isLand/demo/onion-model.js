const app = new (require('koa'))

// 洋葱模型 1 3 4 2
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})

app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})

app.use(async ctx => {
  console.log('----------')
  ctx.body = '洋葱模型，请看控制台'
})

app.listen(3000)
