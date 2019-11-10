const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const fs = require('fs')
const mount = require('koa-mount')

const app = new Koa()
const router = new KoaRouter()
const rpcClient = require('./client.js')
const template = require('./template')
const detailTemplate = template(__dirname + '/template/index.html')

// router.get('/', async (ctx) => {
//   ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
// })

// app.use(mount('/static', KoaStatic(`${__dirname}/source/static/`)))

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
  // console.log('result:', result)

  ctx.status = 200

  // ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
  ctx.body = detailTemplate(result)
})


// app.use(router.routes())
// app.use(KoaStatic(__dirname +'/source'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`)
})



// rpcClient.write({
//   columnid: 24,
// }, function (err, data) {
//   console.log('err:', err)
//   console.log('data:', data)
// })



