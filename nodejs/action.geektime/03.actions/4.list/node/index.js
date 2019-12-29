const Koa = require('koa')
const app = new Koa()
const ReactDOMServer = require('react-dom/server')
const getApp = require('./app.jsx')

app.use(async ctx => {
  // 转成数字，如果是 isNaN 设为 0
  const category = isNaN(+(ctx.query.category)) ? 0 : +ctx.query.category
  const sort = isNaN(+(ctx.query.sort)) ? 0 : +ctx.query.sort

  // const data = getFackeData(sort, category)
  const reactString = ReactDOMServer.renderToString(
    getApp(data)
  )
})