const { LinValidator, Rule } = require('./core/lin-validator-v2')
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
// 全局异常处理
const catchError = require('./middlewares/exception')
app.use(catchError)

app.use(async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  console.log('v::::', v)
  ctx.body = 444
}).listen(3000)