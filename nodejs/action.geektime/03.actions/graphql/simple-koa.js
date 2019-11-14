const graphqlHTTP = require('koa-graphql')
const koa = require('koa')
const app = new koa()
const schema = require('./schema.js')

const mockData = {
  1: {
    id: 1,
    avatar: 'url1',
    name: 'Junting'
  },
  2: {
    id: 2,
    avatar: 'url2',
    name: 'jin'
  },
  3: {
    id: 3,
    avatar: 'url3',
    name: 'wei'
  }
}
// 官方例子用的是 express，使用的是 rootValue 这个参数，在 koa 里也可以使用：
// schema
const rootComment = {
  comment () {
    return Object.keys(mockData).map(key => mockData[key])
  },
  // comment: () => {
  //   return [
  //     {
  //       id: 1,
  //       avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
  //       name: 5
  //     }
  //   ]
  // },
  person: () => {
    return [
      {
        id: 2,
        name: 'jin',
        age: 20,
        sex: 0
      }
    ]
  }
}
// http

app.use(
  graphqlHTTP({
    schema,
    rootValue: rootComment,
    graphiql: true
  })
)

app.listen(3001)
// http://localhost:3001/?query={comment{name}}
