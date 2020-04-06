const Router = require('koa-router')
const { TokenValidator } = require('../../valiadators/validator') // token 验证
const { LoginType } = require('../../lib/enum') // 登录类型
const { User } = require('../../models/user') // 模型数据表
const { generateToken } = require('../../../core/util') // token 生成

const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)

  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL: // email 登录 - 101
     token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM: // 小程序登录 - 100
      break
    default:
      throw new global.errors.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token
  }
})

async function emailLogin (account, secret) {
  // throw new global.errors.Success('email 登录', 0)
  await User.verifyEmailPassword(account, secret)
  // 验证通过生成 token
  return generateToken(User.id, 2)
}

module.exports = router