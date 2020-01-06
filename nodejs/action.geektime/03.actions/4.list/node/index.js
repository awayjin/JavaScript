const Koa = require('koa')
const app = new Koa()
const getData = require('./get-data.js')

require('@babel/register')({
  presets: ['@babel/preset-react']
})
const ReactDOMServer = require('react-dom/server')
const indexJSX = require('./app.jsx')

const renderToString = ReactDOMServer.renderToString(
  indexJSX
)
console.log(renderToString)

console.log('getData:', getData(3, 4))

app.use(ctx => {
  ctx.body = renderToString
})

const port = 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})