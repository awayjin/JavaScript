// require 兼容 react 语法
require('@babel/register')({
  presets: ['@babel/preset-react']
})

const ReactDOMServer = require('react-dom/server')

ReactDOMServer.renderToString(
  require('./index.jsx')
)

console.log(ReactDOMServer.renderToString(
  require('./index.jsx')
))