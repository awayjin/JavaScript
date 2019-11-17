// graphql 协议
let { graphql, buildSchema } = require('graphql')

let schema = buildSchema(`
  type Query {
    hello: String
  }
`)

let root = {
  hello () {
    return 'hello graphql'
  }
}

graphql(schema, '{ hello }', root).then(res => {
  console.log('res:', res)
})

module.exports = (query) => {
  return graphql(schema, query, root).then(res => {
    console.log('res:', res)
    return res
  })
}