const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { User } = require('../models/user')
const { LoginType, ArtType } = require('../lib/enum')
console.log('validator', 22)

// 正整数校验
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
    this.query = [
      new Rule('isLength', '长度4个字符', {
        min: 4,
        max: 30
      })
    ]
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

// 令牌校验
class TokenValidator extends LinValidator {
  constructor () {
    super();
    this.account = [
      new Rule('isLength', '不符合账号规则, 4到32个字符', {
        min: 4,
        max: 32
      })
    ]
    // 密码可传可不传
    this.secret = [
      new Rule('isOptional'), // 可选
      new Rule('isLength', '需要6-128个字符', {
        min: 6,
        max: 128
      })
    ]
  }

  // 校验是否我们定义的类型
  validateLoginType (vals) {
    if (!vals.body.type) {
      throw new Error('type 是必须参数')
    }

    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type 参数不合法')
    }
  }
}

// 不为空
class NotEmptyValidator extends LinValidator {
  constructor () {
    super();
    this.token = [
      new Rule('isLength', '不允许为空', { min: 1})
    ]
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type
  if (!type) {
    throw new Error('type是必须参数')
  }
  type = parseInt(type)

  if (!ArtType.isThisType(type)) {
    throw new Error('type参数不合法')
  }
}

// 点赞验证, art_id, type
class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.validateType = checkArtType
    // const checker = new Checker(ArtType)
    // this.validateType = checker.check.bind(checker)
  }
}

class ClassicValidator extends LikeValidator {}

module.exports = {
  PositiveIntegerValidator,
  LikeValidator,
  RegisterValidator,
  NotEmptyValidator,
  ClassicValidator,
  TokenValidator
}