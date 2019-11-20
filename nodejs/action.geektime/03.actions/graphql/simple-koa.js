const graphqlHTTP = require('koa-graphql')
const koa = require('koa')
const app = new koa()
const schema = require('./schema.js')

const mockData = {
  1: {
    id: 1,
    avatar: 'url1',
    name: 'Lily',
    praiseNum: 5
  },
  2: {
    id: 2,
    avatar: 'url2',
    name: 'jin',
    praiseNum: 2
  },
  3: {
    id: 3,
    avatar: 'url3',
    name: 'wei',
    praiseNum: 0
  }
}
// 官方例子用的是 express，使用的是 rootValue 这个参数，在 koa 里也可以使用：
// schema
const rootObject = {
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
  },
  praise: (arg) => {
    const { id } = arg
    console.log('arg:', arg)
    console.log('id:', id)
    mockData[id].praiseNum++
    return mockData[id].praiseNum
  }
}
// http

app.use(
  graphqlHTTP({
    schema,
    rootValue: rootObject,
    graphiql: true
  })
)

app.listen(3002, ()=> console.log('App started at 3002'))
// http://localhost:3001/?query={comment{name}}
