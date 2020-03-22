const router = new (require('koa-router'))

router.get('/v1/book/latest', async (ctx, next) => {
  ctx.body = {
    key: 'book'
  }
})

module.exports = router