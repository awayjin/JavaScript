const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')

class PositiveIntegerValidator extends LinValidator {
  constructor () {
    super();
    this.id = [
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

// 注册校验
class RegisterValidator extends LinValidator {
  constructor () {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码6到32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称4到15个字符', {
        min: 4,
        max: 15
      })
    ]
  }

  validatePassword (vals) {
    const pwd1 = vals.body.password1
    const pwd2 = vals.body.password2
    if (pwd1 !== pwd2) {
      throw new Error('两个密码必须相同')
    }
  }

  // 验证 email 是否存在
  async validateEmail (vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (user) {
      throw new Error('email 已存在!')
    }
  }


}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}