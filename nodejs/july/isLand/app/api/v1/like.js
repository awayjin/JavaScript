const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/v1/favor'
})
// 模型
const { Favor } = require('../../models/favor')
require('../../valiadators/validator')
// auth
const { Auth } = require('../../../middlewares/auth')

router.post('/', new Auth().m, async (ctx, next) => {
  const favor = {
    uid: 11,
    art_id: 22,
    type: 100
  }
  const result = await Favor.create(favor)
  ctx.body = result
})

module.exports = router