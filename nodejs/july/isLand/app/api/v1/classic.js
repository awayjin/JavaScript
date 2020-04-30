const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
// const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../valiadators/validator')
const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')

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

module.exports = router