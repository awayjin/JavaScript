const validator = require('validator')
const chalk = require('chalk')

// js 和 node 校验器，继承于 validator
class FEValidator {
  constructor () {
    this.data = {} // 请求参数
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

  findMembers (obj) {
    const members = []
    for (let key in obj) {
      const value = obj[key]
      if (value.length) {
        members.push(key)
      }
    }
    return members
  }

  get (reqKey) {
    const keyValue = reqKey.split('.')
    const req = keyValue[0]
    const key = keyValue[1]
    return this.data[req][key]
  }

  // 校验值
  checkValue (member) {
    let value
    value = this.get('query.' + member)
    if (value) {
      return {
        value
      }
    }
    value = this.get('body.' + member)
    if (value) {
      return {
        value
      }
    }
    return {
      value: null
    }
  }
  async validate (ctx) {
    const params = await this.getContentReq(ctx)

    this.data = params
    const members = this.findMembers(this)
    console.log('members:', members)
    console.log('this:', this)
    const errorMessage = []
    for (let member of members) {
      const result = this.checkValue(member)
      console.log('result:', result)
      if (!result.value) {
        errorMessage.push(result)
      }
    }
    console.log('errorMessage:', errorMessage)

    // console.log('this keys:')
    // // console.log(Object.keys(this))
    // // console.log(Object.values(this))
    // console.log('name:', name)
    // console.log('params.body.account:', params.body.account)
    // const email = validator[name](params.body.account)
    // console.log('email:', email)
    // if (!email) {
    //   throw new Error(msg)
    // }
    // ctx.v = this
    return this
  }

  getReqValue (params) {
    const values = []
    for (let key in params) {
      let req = params[key]
      for (let reqKey in req) {
        // console.log('reqKey', reqKey)
        if (req.hasOwnProperty && req.hasOwnProperty(reqKey)) {
          values.push(req[reqKey])
        }
      }
    }
    return values
  }

  demo () {
    // 校验
    for (let key in this) {
      let value  = this[key]
      // console.log('key: ', key, ', value:', value)
      if (value.length) {
        value.map(item => {
          const par = item.params
          let rule = ''
          // console.log('params.body.account:', params.body.account)
          if (par) {
            rule = validator[item.name](item.msg, par)
          } else {
            // rule = validator[item.name](item.msg)
            const validatorValue = this.getReqValue(params)
            // console.log('validatorValue:', validatorValue)
            rule = validator[item.name](params.body.account)
          }
          if (!rule) {
            throw new Error(item.msg)
          }
        })
      }
    }
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
      new Rule('isEmail', '不符合Email规则')
    ]
    this.password1 = [
      new Rule('isLength', '不符合长度规则', {
        min: 8,
        max: 30
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
  }

}

module.exports = {
  RegisterValidator
}