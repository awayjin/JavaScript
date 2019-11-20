const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const static = require('koa-static')
const graphqlHTTP = require('koa-graphql')
// const schema = require('./schema.js')
const { schema, rootValue } = require('./schema.js')
const mount = require('koa-mount')

// koa-mount
// app.use(
//   mount('/api', graphqlHTTP({
//     schema: schema,
//     rootValue: rootObject,
//     graphiql: true
//   }))
// )

// app.use(
//   graphqlHTTP({
//     schema,
//     rootValue: rootObject,
//     graphiql: true
//   })
// )

// koa-router
router.all('/api',
  graphqlHTTP({
    rootValue,
    schema,
    graphiql: true
  })
)

router.get('/', (ctx) => {
  ctx.body = fs.readFileSync(__dirname + '/source/index.html', 'utf-8')
})

app.use(router.routes())
app.use(static(__dirname + '/source'))

app.listen(3001, () => console.log('App started at 3001'))

