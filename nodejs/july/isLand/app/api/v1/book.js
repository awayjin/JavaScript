const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/book'
})
const { Book } = require('../../models/book')
const { Favor } = require('../../models/favor')
const { HotBook } = require('../../models/hot-book')
const { PositiveIntegerValidator, SearchValidator } = require('../../valiadators/validator')
const { Auth } = require('../../../middlewares/auth')

// 热门书籍列表
router.get('/hot_list', async (ctx, next) => {
  const books = await HotBook.getAll()
  ctx.body = books
})

// 获取书籍详细
// 中间层和微服务
router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book()
  ctx.body = await book.detail(v.get('path.id'))
})

// 搜索书籍
router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  console.log('v.get(\'query.q\'):::', decodeURIComponent(v.get('query.q')))
  const result = await Book.searchFromYuShu(
    (v.get('query.q')), v.get('query.start'), v.get('query.count'))
  ctx.body = result
})

// 获取我喜欢的书籍数量
router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = {
    count
  }
})

// 获取书籍点赞情况 1120
router.get('/:book_id/favor', new Auth().m, async ctx => {
  const v =await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  const favor = await Favor.getBookFavor(
    ctx.auth.uid, v.get('path.book_id'))
  ctx.body = favor
})

module.exports = router