const Router = require('koa-router')
const router = new Router({
  prefix: '/api/v1'
})

router.get('/demo', async (ctx, next) => {
  ctx.body = 'demo mid'
})

module.exports = router