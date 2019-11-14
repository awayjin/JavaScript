const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
// const graphqlHTTP = require('graphql');

const app = new Koa();
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

schema.getQueryType().getFields().comment.resolve = () => {
  return Object.keys(mockData).map(key => {
    return mockData[key]
  })
  // return [{
  //   id: 1,
  //   avatar: 'https://static001.geekbang.org/account/avatar/00/19/19/a0/84f95280.jpg',
  //   name: 'Junting'
  // }]
}

app.use(
  graphqlHTTP({
    schema
    // schema: require('./schema')
  })
)


// http://localhost:5000/?query={comment{name}}


app.listen(5000);