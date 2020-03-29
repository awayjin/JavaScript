const app = new (require('koa'))
const InitManager = require('./core/init')
// post 的 body 解析
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// 全局异常处理
const catchError = require('./middlewares/exception')
app.use(catchError)

// require('./app/models/user')

InitManager.init(app)

// const book = require('./api/v1/book')
// const latest = require('./api/v1/classic')
// app.use(latest.routes())
// app.use(book.routes())

app.listen(3000)