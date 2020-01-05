const Koa = require('koa')
const app = new Koa()

require('@babel/register')({
  presets: ['@babel/preset-react']
})
const ReactDOMServer = require('react-dom/server')
const indexJSX = require('./app.jsx')

const renderToString = ReactDOMServer.renderToString(
  indexJSX
)
console.log(renderToString)

app.use(ctx => {
  ctx.body = renderToString
})

const port = 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})