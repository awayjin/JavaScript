const Koa = require('koa')
const app = new Koa()
// const KoaRouter = require('koa-router')
// const router = new KoaRouter()
// const KoaStatic = require('koa-static')
const fs = require('fs')
const rpcClient = require('./rpc/rpc.js')
const template = require('./vm/template-vm')
const detailTemplate = template(`${__dirname}/vm/vue-index.html`)
// detailTemplate(result)

// const template = require('./template')
// const detailTemplate = template(__dirname + '/template/index.html')

// router.get('/', async ctx => {
//   // const html = fs.readFileSync(__dirname + 'index.html', 'utf-8')
//   // ctx.body = html
//   if (!ctx.query.columnid) {
//     ctx.status = 400
//     ctx.body = 'invalid columnid. Need a query columnid.'
//     return
//   }
//   const result = await new Promise((resolve, reject) => {
//     rpcClient.write({
//       columnid: ctx.query.columnid
//     }, (err, data) => {
//       err ? reject(err) : resolve(data)
//     })
//   })
//
//   console.log('result:', result)
//   ctx.status = 200
//   ctx.body = '4444'
// })

app.use(async (ctx) => {
  console.log('ctx.query:')
  console.log(ctx.query)
  console.log(ctx.query.columnid)

  if (ctx.url === '/favicon.ico') {
    ctx.body = ''
    return
  }

  if (!ctx.query.columnid) {
    ctx.status = 400
    const invalidDes = 'invalid columnid. Need a query columnid.'
    console.log(invalidDes)
    ctx.body = invalidDes
    return
  }
  const result = await new Promise((resolve, reject) => {
    rpcClient.write({
      columnid: ctx.query.columnid
    }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
  console.log('result:', result)
  // detailTemplate 是 runInNewContext 创建的一个返回函数
  ctx.body = detailTemplate(result)

  // const html = await fs.readFileSync(`${__dirname}/source/vue-index.html`, 'utf-8')
  // ctx.body = html

})

// app.use(KoaStatic('./source')) // static
// app.use(router.routes())

const port = 3002
app.listen(port , () => {
  console.log(`App started at http://localhost:${port}`)
})
