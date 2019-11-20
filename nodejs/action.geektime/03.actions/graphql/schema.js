// import { buildSchema } from 'graphql'
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Comment {
    id: Int
    avatar: String
    name: String
    praiseNum: Int
  }
  type Query {
    comment: [Comment]
    person: [PersonType]
  }
  type PersonType {
    id: Int
    name: String
    age: Int
    sex: Boolean
  }
  
  type Mutation {
    praise(id: Int): Int
  }
  
`)

// 谷歌浏览器插件：restlet client 插件测试 post 请求
// http://localhost:3002/api
// body {
//   "query": "mutation { praise(id: 1) }"
// }

module.exports = schema

// http://localhost:5000/?query={comment{name}}
