const Koa = require('koa');
const graphqlHTTP = require('koa-graphql');
// const graphqlHTTP = require('graphql');

const app = new Koa();
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
    avatar: 'url333-3',
    name: 'wei',
    praiseNum: 0
  }
}

schema.getQueryType().getFields().comment.resolve = () => {
  return Object.keys(mockData).map(key => {
    return mockData[key]
  })
}



schema.getMutationType().getFields().praise.resolve = (arg0, { id }) => {
  mockData.praiseNum++
  return mockData[id].praiseNum
}

// schema.getMutationType().getFields().praise.resolve = (args0, { id }) => {
//   return new Promise((resolve, reject) => {
//     praiseClient.write({
//       commentid: id
//     }, function (err, res) {
//       err ? reject(err) : resolve(res.praiseNum)
//     })
//   })
// }

app.use(
  graphqlHTTP({
    schema
    // schema: require('./schema')
  })
)


// http://localhost:5000/?query={comment{name}}


app.listen(3002);