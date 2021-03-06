const validator = require('validator')
const { HttpException } = require('./http-exception')

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

  // 查找验证所需的成员属性和方法
  findMembers (instance) {
    const members = []
    // properties
    for (let key in instance) {
      const property = instance[key]
      if (property.length) {
        members.push(key)
      }
    }
    // methods
    const methods = Reflect.ownKeys(instance.__proto__)
    for (let method of methods) {
      if (this.validateCapitalReg().test(method)) {
        members.push(method)
      }
    }
    return members
  }

  // validate + 首字母大写验证
  validateCapitalReg () {
    return /validate([A-Z])\w+/g
  }

  get (reqKey) {
    const keyValue = reqKey.split('.')
    const req = keyValue[0]
    const key = keyValue[1]
    return this.data[req][key]
  }

  // 验证字段是否已填或值为空
  validateKey (member) {
    let value = ''

    // 可选参数 isOptional
    if (this[member] && this[member].length > 1) {
      const isOptional = this[member].find(element => element.name === 'isOptional')
//       console.log('isOptional', isOptional)
      if (isOptional) return isOptional 
    }
    
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
      throw new HttpException(`${member} 是必填字段`)
    }
  }

  // 验证值是否合法, 通过第三方库 validator
  // https://github.com/chriso/validator.js
  validateValue (key, value) {
    let msg = false
    let result = {
      value,
      success: false
    }

    const rule = this[key]
    // console.log('--> value', value, ' rule:', rule)
    if (rule.length) {
      rule.some(item => {
        let isPass

  
        if (item.name === 'isOptional' && value !== '' && (!value || value == 0)) { // 可选
          isPass = true

        } else {
          // 验证值
          if (item.name === 'isOptional') {
            isPass = true
          } else {
            isPass = validator[item.name](value, item.params)
          }
        
        }
        
        // console.log('isPass:', isPass)
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

  checkIsOptional (member) {
    // 可选参数 isOptional
    if (this[member] && this[member].length) {
      const isOptional = this[member].find(element => element.name === 'isOptional')
      if (isOptional) return isOptional
    }
  }
  
  // 校验值
  checkValue (member) {
    const keyField = this.validateKey(member) // 字段验证
 

    let value

    // 查询字符串
    value = this.get('query.' + member)
    if (value || value === '') {
      return this.validateValue(member, value)
    }
    // body 请求体-JSON
    value = this.get('body.' + member)
    if (value || value === '') {
      return this.validateValue(member, value)
    }

    // path 路径
    value = this.get('path.' + member)
    if (value || value === '') {
      return this.validateValue(member, value)
    }

    // header 请求头
    value = this.get('header.' + member)
    if (value || value === '') {
      return this.validateValue(member, value)
    }

  
    
    if (keyField !== member) {
      if (keyField.name === 'isOptional' && value !== '' && (!value || value == 0)) {
        return {
          value: null,
          success: true
        }
      }
      return {
        value: keyField,
        success: false
      }
    }


    return {
      value: null,
      success: false
    }
  }
  // 验证器，开始的方法
  // ctx - 上下文
  async validate (ctx) {
    const params = await this.getContentReq(ctx)
    this.data = params
    const members = this.findMembers(this)
    console.log('members:', members)
    // console.log('Reflect.ownKeys:', Reflect.ownKeys(this))
    const errorMessage = []
    let result = []
    for (let member of members) {
      // 实例方法
      if (this.validateCapitalReg().test(member)) {
        await this[member](this.data)
      } else {
        result = this.checkValue(member)
      }
      // if (result.value === 'isOptional') {
      //
      // }
      // console.log('--> result', result)
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
}
class Rule {
  constructor (name, msg, params) {
    this.name = name
    this.msg = msg
    this.params = params
  }
}
// new Rule('isEmail', '不符合Email规则', [11, 22])

module.exports = {
  FEValidator,
  Rule
}