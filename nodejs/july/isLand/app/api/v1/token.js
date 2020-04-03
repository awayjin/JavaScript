const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/token'
})
const { TokenValidator } = require('../../valiadators/validator')

router.post('/', async (ctx) => {
  const v = await new TokenValidator().validate(ctx)
  ctx.body = '33'
})

module.exports = router