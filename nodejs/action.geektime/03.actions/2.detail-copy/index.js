const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const fs = require('fs')
const KoaStatic = require('koa-static')
app.use(KoaStatic('./source'))

router.get('/', async ctx => {
  const html = fs.readFileSync(__dirname + 'index.html', 'utf-8')
  ctx.body = html
})

app.use(router.routes())

const port = 4000
app.listen(port , () => {
  console.log(`App started at http://localhost:${port}`)
})

const rpcClient = require('./rpc/rpc.js')

rpcClient.write({
  columnid: 122
}, (err, data) => {
  if (err) {
    console.log('err:', err)
  } else {
    console.log('data:', data)
  }
})