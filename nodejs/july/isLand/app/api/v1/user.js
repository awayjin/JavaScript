const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { User } = require('../../models/user') // 模型， 创建表
const { RegisterValidator } = require('../../valiadators/validator')

router.post('/register', async (ctx, next) => {
  // console.log('ctx.body.email:', ctx.request.body.email)
  // // 查询 email
  // const email = await User.findOne({
  //   where: {
  //     email: ctx.request.body.email
  //   }
  // })
  // console.log('email:', email)

  const v = await new RegisterValidator().validate(ctx)

  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  // console.log(v.get('body.email'))
  // console.log(v.get('query.email'))
  // console.log(v.data.body)

  await User.create(user) // 向表中插入一条数据

  // 成功也抛出
  throw new global.errors.Success()

  // ctx.body = {
  //   'user': 'user'
  // }
})

module.exports = router