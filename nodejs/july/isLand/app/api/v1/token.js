const Router = require('koa-router')
const { TokenValidator,  NotEmptyValidator } = require('../../valiadators/validator') // token 验证
const { LoginType } = require('../../lib/enum') // 登录类型
const { User } = require('../../models/user') // 模型数据表
const { generateToken } = require('../../../core/util') // token 生成
const { Auth } = require('../../../middlewares/auth')
const { WXManger} = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token'
})
// 获取token
router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)

  let token
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL: // email 登录 - 101
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM: // 小程序登录 - 100
      // 代表微信小程序的 code
      token = await WXManger.codeToToken(v.get('body.account'))
      break
    default:
      throw new global.errors.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token
  }
})

// token 验证
router.post('/verify', async (ctx) => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})


// 邮箱登录
async function emailLogin (account, secret) {
  // throw new global.errors.Success('email 登录', 0)
  const user = await User.verifyEmailPassword(account, secret)
  console.log('Auth.USER:', Auth.USER)
  // console.log('实例user:', user)
  // 验证通过生成 token
  return generateToken(user.id, Auth.USER)
}

module.exports = router