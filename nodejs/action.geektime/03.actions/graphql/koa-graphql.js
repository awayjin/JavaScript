const Koa = require('koa');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
// const graphqlHTTP = require('graphql');

const app = new Koa();
const schema = require('./schema.js')

app.use(
  graphqlHTTP({
    // schema: schema
    schema: require('./schema')
  })
)

// http://localhost:5000/?query={comment{name}}

// app.use(mount('/graphql', graphqlHTTP({
//   schema: MyGraphQLSchema,
//   graphiql: true
// })));

app.listen(5000);