const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
// const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator, ClassicValidator } = require('../../valiadators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')
const { Favor } = require('../../models/favor')

// router.get('/v1/classic/latest', async (ctx, next) => {
router.get('/latest', new Auth().m, async (ctx, next) => {
  // const path = ctx.params
  // const query = ctx.request.query
  // const header = ctx.request.header
  // const body = ctx.request.body // koa-bodyparser
  // if (true) {
  //   // const error = new Error('Why wrong?')
  //   // error.errorCode = 10001
  //   // error.status = 400
  //   // error.requestUrl = `${ctx.method} ${ctx.path}`
  //   // console.log('error:', error)
  //   // const error = new HttpException('Why wrong?', 10001, 400)
  //   // const error = new HttpException()
  //   // const error = new ParameterException()
  //   const error = new errors.ParameterException('is it mistake') // 不导入
  //   throw error
  // }

  // const v = await new PositiveIntegerValidator()
  // v.validate(ctx)
  //
  // ctx.body = {
  //   key: 'classic'
  // }

  // ctx.body = ctx.auth.uid

  const flow = await Flow.findOne({
    order: [
      ['index', 'desc']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  // art.setDataValue('index', flow.index)
  art.dataValues.index = flow.index
  // console.log('flow:', flow)
  // console.log('art:', art)
  ctx.body = art
})

// 获取期刊点赞情况
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const type = parseInt(v.get('path.type'))
  // const type = v.get('path.type')
  const id = v.get('path.id')
  const art = await Art.getData(id, type)
  console.log('art:', art)
  console.log('type:', type)
  console.log('id:', id)
  if (!art) {
    throw new global.errors.NotFound()
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like
  }
})

// 获取期刊详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const type = parseInt(v.get('path.type'))
  const id = v.get('path.id')
  const artDetail = await Art.getData(id, type)
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
  ctx.body = {
    like_status: like,
    ...artDetail.dataValues
  }
})

module.exports = router