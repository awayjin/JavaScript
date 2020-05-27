const { FEValidator, Rule } = require('./fe-validator')
const { HttpException } = require('./http-exception')
const { DemoUser } = require('./db/user-model.js')

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

  validatePassword (data) {
    const pwd1 = data.body.password1
    const pwd2 = data.body.password2
    if (!pwd1) {
      throw new HttpException(`password1 值异常`)
    }

    if (!pwd2) {
      throw new HttpException(`password2 值异常`)
    }

    if (pwd1 !== pwd2) {
      throw new HttpException('两个密码必须相同')
    }
  }

  // 验证邮箱
  async validateEmail (data) {
    const email = data.body.email
    const user = await DemoUser.findOne({ where: { email }})
    console.log('user:', user)
    if (user === null) {
      console.log('not found. 可以注册')
    } else {
      console.log('has been found.')
      throw new HttpException('邮箱已注册')
    }
  }

}

module.exports = {
  RegisterValidator
}