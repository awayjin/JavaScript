const Koa = require('koa')
const app = new Koa()
const KoaStatic = require('koa-static')
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const mount = require('koa-mount')

const getData = require('./get-data.js')
const template = require('./template/vm-template')(`${__dirname}/index.html`)
require('@babel/register')({
  presets: ['@babel/preset-react']
})
const ReactDOMServer = require('react-dom/server')
const indexJSX = require('./app.jsx')


// data
// router.get('/data', async (ctx, next) => {
//   const filtType = +(ctx.query.filt || 0)
//   const sortType = +(ctx.query.sort || 0)
//   const reactData = await getData(filtType, sortType)
//   console.log('/data reactData:', reactData)
//
//   const renderToString = ReactDOMServer.renderToString(
//     indexJSX(reactData)
//   )
//
//   // ctx.body = 33
//   ctx.body = template({
//     reactString: renderToString,
//     reactData,
//     filtType,
//     sortType
//   })
// })


// router.get('/', async (ctx, next) => {
//   console.log('node/index.js ctx filt:', ctx.query.filt)
//   console.log('node/index.js ctx sort:', ctx.query.sort)
//   const filtType = +(ctx.query.filt || 0)
//   const sortType = +(ctx.query.sortType || 0)
//   const reactData = await getData(filtType, sortType)
//
//   const renderToString = ReactDOMServer.renderToString(
//     indexJSX(reactData)
//   )
//   ctx.body = template({
//     reactString: renderToString,
//     reactData,
//     filtType,
//     sortType
//   })
// })


app.use(mount('/data', async (ctx) => {
  ctx.body = await getData(+(ctx.query.filt || 0), +(ctx.query.sort || 0))
}))

app.use(async ctx => {
  // console.log('node/index.js reactData:', reactData)
  console.log('node/index.js ctx filt:', ctx.query.filt)
  console.log('node/index.js ctx sort:', ctx.query.sort)
  const filtType = +(ctx.query.filt || 0)
  const sortType = +(ctx.query.sortType || 0)
  const reactData = await getData(filtType, sortType)

  const renderToString = ReactDOMServer.renderToString(
    indexJSX(reactData)
  )
  ctx.body = template({
    reactString: renderToString,
    reactData,
    filtType,
    sortType
  })
  // ctx.body = template(reactData.columns[0])
})

app.use(KoaStatic(__dirname + '/source'))
app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})
