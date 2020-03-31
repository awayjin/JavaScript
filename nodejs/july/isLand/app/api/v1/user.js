const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { RegisterValidator } = require('../../valiadators/validator')
const { User } = require('../../models/user') // 模型， 创建表
const bcrypt = require('bcryptjs') // 加密工具

router.post('/register', async (ctx, next) => {
  console.log('ctx.body.email:', ctx.request.body.email)
  // 查询 email
  const email = await User.findOne({
    where: {
      email: ctx.request.body.email
    }
  })
  console.log('email:', email)

  const v = await new RegisterValidator().validate(ctx)

  // 位数，成本
  // 明文，加密 不同，彩虹攻击
  const salt = bcrypt.genSaltSync(10)
  const pwd = bcrypt.hashSync(v.get('body.password2'), salt)

  const user = {
    email: v.get('body.email'),
    password: pwd,
    nickname: v.get('body.nickname')
  }

  console.log(v.get('body.email'))
  console.log(v.get('query.email'))
  // console.log(v.data.body)

  const r = await User.create(user)

  ctx.body = {
    'user': 'user'
  }
})

module.exports = router