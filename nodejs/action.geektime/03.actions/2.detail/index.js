const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const fs = require('fs')

const app = new Koa()
const router = new KoaRouter()

router.get('/', (ctx) => {
  ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
})

app.use(router.routes())
app.use(KoaStatic(__dirname +'/source'))

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}`)
})