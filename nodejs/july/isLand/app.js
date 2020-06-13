const static = require('koa-static')
const path = require('path')
const app = new (require('koa'))
// 自动导入路由，全局异常，配置文件
const InitManager = require('./core/init')
// post 的 body 解析
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// 全局异常捕获中间件
const catchError = require('./middlewares/exception')
app.use(catchError)

InitManager.init(app)

// const book = require('./api/v1/book')
// const latest = require('./api/v1/classic')
// app.use(latest.routes())
// app.use(book.routes())
app.use(static(path.join(__dirname + '/static')))

const port = 3000
app.listen(port, () => {
  console.log('---> App listened at port:' + port)
})