// @ts-ignore
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api/**', {
      target: 'http://blackpearltest.4009515151.com'
    })
  )
}
