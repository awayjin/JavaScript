// import { buildSchema } from 'graphql'
const { buildSchema } = require('graphql')

const schema = buildSchema(
  `
  type Comment {
    id: Int
    avatar: String
    name: String
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
  `
)


module.exports = schema

// http://localhost:5000/?query={comment{name}}

// schema
// const rootComment = {
//   comment: () => {
//     return [
//       {
//         id: 1,
//         avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
//         name: 'Junting',
//         isTop: true,
//         content: '你最帅了～',
//         publishDate: '今天',
//         commentNum: 10,
//         praiseNum: 5
//       }
//     ]
//   }
// }
// // http
//
// app.use(
//   graphqlHTTP({
//     schema,
//     rootValue: rootComment,
//     graphiql: true
//   })
// );