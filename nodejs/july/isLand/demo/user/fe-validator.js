const validator = require('validator')
const chalk = require('chalk')

// http 请求异常
class HttpException extends Error {
  constructor (message = '请求错误', errorCode = 10000, status = 400) {
    super()
    this.message = message
    this.errorCode = errorCode
    this.status = status
  }
}

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

  // 验证字段是否已填
  isKey (member) {
    let value = ''
    for (let key in this.data) {
      const req = this.data[key]
      for (let sub in req) {
        if (sub === member) {
          // 字段为空
          if (!req[member].length) {
            value = ''
          } else {
            return value = sub
          }
        }
      }
    }
    if (!value) {
      return `${member} 是必填字段`
    }
  }

  // 验证值是否合法
  validateValue (key, value) {
    let msg = false
    let result = {
      value,
      success: false
    }
    const rule = this[key]
    if (rule.length) {
      rule.some(item => {
        // 验证值
        const isPass = validator[item.name](value, item.params)
        console.log('isPass:', isPass)
        if (!isPass) {
          // 验证没通过
          msg = item.msg
          result.value = `${key} ${item.msg}`
          return result
        } else {
          result.success = true
        }
      })
    }
    return result
  }
  // 校验值
  checkValue (member) {
    const keyField = this.isKey(member) // 字段验证
    if (keyField !== member) {
      return {
        value: keyField,
        success: false
      }
    }

    let value

    // 查询字符串
    value = this.get('query.' + member)
    if (value) {
      return this.validateValue(member, value)
    }
    // body 请求体-JSON
    value = this.get('body.' + member)
    if (value) {
      return this.validateValue(member, value)
    }

    // path 路径
    value = this.get('path.' + member)
    if (value) {
      return this.validateValue(member, value)
    }

    // header
    value = this.get('header.' + member)
    if (value) {
      return this.validateValue(member, value)
    }

    return {
      value: null,
      success: false
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
      if (!result.success) {
        errorMessage.push(result.value)
      }
    }
    // console.log('errorMessage:', errorMessage)
    if (errorMessage.length) {
      throw new HttpException(errorMessage)
    }

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
        min: 4,
        max: 30
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
  }

}

module.exports = {
  RegisterValidator
}