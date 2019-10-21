const Koa = require('koa')
const Router = require('koa-router')
const fs = require('fs')
const game = require('./game.js')

const app = new Koa()
const router = new Router()


let sameCount = 0 // 同样的动作
let lastPlayerAction = null

router.get(
  '/game',
  async (ctx, next) => {
    const query = ctx.query
    const playerAction = query.action // 动作
    ctx.playerAction = playerAction

    // clear 重置
    if (playerAction === 'clear') {
      // playerWinCount = 0
      lastPlayerAction = null;
      // 玩家连续出同一个动作的次数
      sameCount = 0;
      ctx.status = 304
      ctx.body = ''
      return
    }

    if (sameCount === 9) {
      ctx.status = 500
      ctx.body = '你作弊，不和你玩了'
      return
    }
    // 连续出同样动作 3 次就是作弊
    if (lastPlayerAction && lastPlayerAction === playerAction) {
      sameCount++
      if (sameCount >= 3) {
        ctx.status = 400
        ctx.body = '你作弊，不和你玩了'
        sameCount = 9
        return
      }
    } else {
      lastPlayerAction = playerAction
      sameCount = 0
    }

    await next()
  },
  async (ctx) => {
    const playerAction = ctx.playerAction
    const gameResult = game(playerAction)

    if (gameResult === 0) {
      ctx.body = '平局'
    } else if (gameResult === 1) {
      ctx.body = '你赢了'
    } else {
      ctx.body = '你输了'
    }
  }
)


// icon
router.get('/favicon.ico', (ctx) => {
  ctx.status = 304
})

// index
router.get('/', (ctx) => {
  ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
})

app.use(router.routes())

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`)
})