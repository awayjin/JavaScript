const query = require('./index')

query('{ hello }').then(hello => console.log('hello:', hello))

// 伪代码基于 koa
// app.use(async ctx => {
//   const res = await query(ctx.query)
//   ctx.body = res
// })