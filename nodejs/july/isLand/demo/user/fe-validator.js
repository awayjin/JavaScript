const validator = require('validator')
const chalk = require('chalk')

// js 和 node 校验器，继承于 validator
class FEValidator {
  constructor () {
    this.data = {}
  }

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
  get (reqKey) {
    const keyValue = reqKey.split('.')
    const req = keyValue[0]
    const key = keyValue[1]
    // console.log('req:', req, ' key:', key)
    return this.data[req][key]
  }
  async validate (ctx) {
    const params = await this.getContentReq(ctx)
    this.data = params
    // validator
    // console.log('params:', params)
    // const account = isLength(params.body.account, {
    //   min: 4,
    //   max: 30
    // })
    // const id = 44
    // console.log(chalk.bgCyanBright(`this. ${id}`))
    const {
      name,
      msg
    } = this.email[0]
    console.log('name:', name)
    console.log('params.body.account:', params.body.account)
    const email = validator.isEmail(params.body.account)
    console.log('email:', email)
    if (!email) {
      throw new Error(msg)
    }
    ctx.v = this
    return this
  }
}
class Rule {
  constructor (name, msg, params) {
    // console.log(name)
    // console.log(msg)
    // console.log(...params)
    this.name = name
    this.msg = msg
    this.params = params
  }
}
// new Rule('isEmail', '不符合Email规则', [11, 22])

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