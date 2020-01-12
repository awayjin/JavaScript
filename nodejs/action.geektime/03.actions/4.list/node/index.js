const Koa = require('koa')
const app = new Koa()
const KoaStatic = require('koa-static')
app.use(KoaStatic(__dirname + '/source'))

const getData = require('./get-data.js')
const template = require('./template/vm-template')(`${__dirname}/index.html`)
require('@babel/register')({
  presets: ['@babel/preset-react']
})
const ReactDOMServer = require('react-dom/server')
const indexJSX = require('./app.jsx')

app.use(async ctx => {
  const reactData = await getData(5, 14)
  console.log('node/index.js reactData:', reactData)

  console.log('ctx filt:', ctx.query.filt)
  console.log('ctx sort:', ctx.query.sort)
  const filtType = +(ctx.query.filt || 0)
  const sortType = +(ctx.query.sortType || 0)

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

const port = 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})
