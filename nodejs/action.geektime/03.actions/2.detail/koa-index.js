const Koa = require('koa')
const app = new Koa()
const rpcClient = require('./client.js')


// app.use(function)
// 将给定的中间件方法添加到此应用程序。
app.use(async (ctx) => {
  if (!ctx.query.columnid) {
    ctx.status = 400;
    ctx.body = 'invalid columnid';
    return
  }

  // 浏览器访问： http://localhost:3000/?columnid=24
  const result = await new Promise((resolve, rejected) => {
    rpcClient.write({
      columnid: ctx.query.columnid || '24',
    }, function (err, data) {
      // console.log('err:', err)
      // console.log('data:', data)
      err ? rejected(err) : resolve(data)
    })
  })
  console.log('result:', result)
  ctx.body = result

})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`)
})


