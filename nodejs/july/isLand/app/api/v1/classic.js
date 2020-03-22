const router = new (require('koa-router'))
// const { HttpException, ParameterException } = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../valiadators/validator')

// router.get('/v1/classic/latest', async (ctx, next) => {
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body // koa-bodyparser

  console.log('path:', path)
  console.log('query:', query)
  console.log('header:', header)
  console.log('body:', body)
  // throw new Error('API Exception')

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

  const v = new PositiveIntegerValidator()
  v.validate(ctx)


  ctx.body = {
    key: 'classic'
  }

})

module.exports = router