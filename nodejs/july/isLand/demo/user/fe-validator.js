const { isLength } = require('validator')
const chalk = require('chalk')

// js 和 node 校验器，继承于 validator
class FEValidator {
  // take 4 request parameters in context
  // 获取上下文中的4种请求参数 - paras
  async getContentReq (ctx) {
    return {
      path: ctx.params,
      body: ctx.request.body,
      query: ctx.request.query,
      header: ctx.request.header,
    }
  }
  async validate (ctx) {
    const params = await this.getContentReq(ctx)
    const account = isLength(params.body.account, {
      min: 4,
      max: 30
    })
    const id = 44
    console.log(chalk.bgCyanBright(`this. ${id}`))
    console.log(this)
    if (!account) {
      throw new Error('4-30个字符')
    }
  }
}
class Rule {
  constructor (name, msg, ...params) {
    console.log(name)
    console.log(msg)
    console.log(...params)
  }
}
new Rule('isEmail', '不符合Email规则', [11, 22])

class RegisterValidator extends FEValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规则', [11, 22]),
      new Rule('isLength', '不符合长度规则', [11, 22])
    ]
  }

}

module.exports = {
  RegisterValidator
}