const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { RegisterValidator } = require('../../valiadators/validator')
const { User } = require('../../models/user')

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

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
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