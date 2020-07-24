const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()

// const gameKoa = new Koa()
// app.use('')
router.get('/',
  async (ctx, next) => {
    console.log(1)
    await next()
    console.log('ctx.play:', ctx.play)
    ctx.body = 'body'
    console.log(2)
  },
  async function (ctx, next) {
    await new Promise((resolve, rejected) => {
      setTimeout(() => {
        console.log(3)
        next()
        console.log(4)
        ctx.play = true
        resolve()
      })
    })
  }

)

// app.use(
//   async (ctx, next) => {
//     console.log('----->', 1)
//     await next()
//     console.log('ctx.play:', ctx.play)
//     console.log(2)
//   }
// )
//
// app.use(
//   async function (ctx, next) {
//     await new Promise((resolve, rejected) => {
//       setTimeout(() => {
//         console.log(3)
//         ctx.play = true
//         console.log(4)
//         resolve()
//       })
//     })
//     // console.log(3)
//     // ctx.play = true
//     // console.log(4)
//   }
// )

// app.use(router.routes())

app.listen(4001)