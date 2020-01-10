const Koa = require('koa')
const app = new Koa()
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

  const renderToString = ReactDOMServer.renderToString(
    indexJSX(reactData)
  )
  ctx.body = template({
    reactString: renderToString,
    reactData
  })
  // ctx.body = template(reactData.columns[0])
})

const port = 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})
