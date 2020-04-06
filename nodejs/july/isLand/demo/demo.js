const { LinValidator, Rule } = require('../core/lin-validator-v2')
const app = new (require('koa'))

class RegisterValidator extends LinValidator {
  constructor () {
    super();
    this.pwd1 = [
      new Rule('isLength', '密码6到32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.pwd2 = this.pwd1
  }

  validatePassWord (vals) {
    console.log('vals:', vals)
  }
}

global.config = {
  environment: 'env'
}

// 全局异常中间件
// const catchError = require('./middlewares/exception')
// app.use(catchError)

const MiddleError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log('e:', e)
    // throw new Error('MiddleError:' + e)
    ctx.body = {
      msg: e.message,
      code: e.code
    }
    ctx.status = 400
  }
}
app.use(MiddleError)


// 自定义异常
// function MyError (message) {
//   this.name = 'MyError'
//   this.message = message
//   this.stack = (new Error()).stack
// }
// MyError.prototype = Object.create(Error.prototype)
// MyError.prototype.contructor = MyError

class MyError extends Error {
  constructor (message = 'why', code = 400, errorCode = 1000) {
    super();
    this.name = 'MyError'
    this.message = message
    this.code = code
    this.errorCode = errorCode
    this.stack = (new Error()).stack
  }
  async validate (ctx) {
    ctx.body = this
  }
}

app.use(async (ctx, next) => {
  // const v = await new RegisterValidator().validate(ctx)
  // const query = ctx.request.query
  // console.log('query:', query)
  // throw new Error(query.pwd)
  await new MyError('2 why').validate(ctx)
  // console.log('v::::', v)
  // ctx.body = 444
}).listen(3000)