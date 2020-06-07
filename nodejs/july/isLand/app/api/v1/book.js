const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/book'
})
const { Book } = require('../../models/book')
const { Favor } = require('../../models/favor')
const { HotBook } = require('../../models/hot-book')
const { Comment } = require('../../models/book-comment')
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require('../../valiadators/validator')
const { Auth } = require('../../../middlewares/auth')
const { success } = require('../../lib/helper')

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

// 增加短评
router.post('/add/short_comment', new Auth().m, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx,{
    id: 'book_id'
  })
  console.log('----- >:', v)
  Comment.addComment(v.get('body.book_id'),v.get('body.content'))
  success()
})

// 获取短评
// router.get('/:book_id/short_comment', new Auth().m, async ctx => {
router.get('/:id/short_comment', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx) // 不用别名
  // const v = await new PositiveIntegerValidator().validate(ctx, {
  //   id: 'book_id'
  // })
  console.log('---> v:', v)
  // const comments = await Comment.getComments(v.get('path.book_id'))
  const comments = await Comment.getComments(v.get('path.id'))
  ctx.body = comments;
})

module.exports = router