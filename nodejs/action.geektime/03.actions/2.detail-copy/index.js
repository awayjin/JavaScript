const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const fs = require('fs')
const KoaStatic = require('koa-static')
// const rpcClient = require('./rpc/rpc.js')
const rpcClient = require('./client')

// app.use(KoaStatic('./source')) // static

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
  if (!ctx.query.columnid) {
    ctx.status = 400
    const invalidDes = 'invalid columnid. Need a query columnid.'
    console.log(invalidDes)
    ctx.body = invalidDes
    return
  }
  const result = await new Promise((resolve, reject) => {
    rpcClient.write({
      columnid: ctx.query.columnid || 33333
    }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })

  console.log('result:', result)
  ctx.status = 200
  ctx.body = result
})


// app.use(router.routes())

const port = 3000
app.listen(port , () => {
  console.log(`App started at http://localhost:${port}`)
})


// rpcClient.write({
//   columnid: 122
// }, (err, data) => {
//   if (err) {
//     console.log('err:', err)
//   } else {
//     console.log('data:', data)
//   }
// })