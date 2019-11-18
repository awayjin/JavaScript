const { graphql, buildSchema } = require('graphql')

// 谷歌浏览器插件 post 请求：restlet client 插件测试
// http://localhost:3002/api
// body {
//   "query": "mutation { praise(id: 1) }"
// }

const schema = buildSchema(`
  type Query {
    comment: [Comment]
    hello: String
  }
  
  type Comment {
    id: Int
    avatar: String
    name: String
    isTop: Boolean
    content: String
    publishDate: String
    commentNum: Int
    praiseNum: Int
  }
  
  type Mutation {
    praise(id: Int): Int
  }
  
`)


const mockData = {
  1: {
    id: 1,
    avatar: 'url1',
    name: 'Lily',
    content: 'content',
    praiseNum: 5,
    age: true
  },
  2: {
    id: 2,
    avatar: 'url2',
    name: 'jin',
    praiseNum: 2,
    age: true
  },
  3: {
    id: 3,
    avatar: 'url3',
    name: 'wei',
    praiseNum: 0,
    age: true
  }
}

const rootValue = {
  comment () {
    return Object.keys(mockData).map(item => mockData[item])
  },
  praise ({ id }) {
    mockData[id].praiseNum++
    return mockData[id].praiseNum
  },
  hello () {
    return 'hello graphql'
  }
}

// graphql(schema, '{comment{name,id, praiseNum}}', rootValue).then(res => {
// // graphql(schema, '{ hello }', root).then(res => {
//   console.log(res)
//   console.log(res.data.comment)
// })

// module.exports = schema
module.exports = {
  schema,
  rootValue
}
