const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/v1/favor'
})
const { Favor } = require('../../models/favor')

router.post('/', async (ctx, next) => {
  const favor = {
    uid: 11,
    art_id: 22,
    type: 100
  }
  const result = await Favor.create(favor)
  ctx.body = result
})

module.exports = router