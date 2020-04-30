const KoaRouter = require('koa-router')
const router = new KoaRouter({
  prefix: '/v1/like'
})
// 模型
const { Favor } = require('../../models/favor')
const { LikeValidator } = require('../../valiadators/validator')
// auth
const { Auth } = require('../../../middlewares/auth')
const { success } = require('../../lib/helper')
// 点赞路由
router.post('/', new Auth().m, async (ctx, next) => {
  // 用别名
  const v = await new LikeValidator().validate(ctx,{
    id: 'art_id'
  })
  console.log(v.get('body.art_id'))
  // const result = await Favor.create(favor)
  await Favor.like(
    v.get('body.art_id'),
    v.get('body.type'),
    ctx.auth.uid
  )
  success()
})


// 取消点赞路由
router.post('/cancel', new Auth().m, async (ctx, next) => {
  // 用别名
  const v = await new LikeValidator().validate(ctx,{
    id: 'art_id'
  })
  console.log(v.get('body.art_id'))
  // const result = await Favor.create(favor)
  await Favor.dislike(
    v.get('body.art_id'),
    v.get('body.type'),
    ctx.auth.uid
  )
  success()
})

module.exports = router