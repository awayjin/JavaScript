// server/ssr.js
const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')

const resolve = file => path.resolve(__dirname, file)
const app = new Koa()

const isDev = process.env.NODE_ENV !== 'production'
console.log('---isDev::--', isDev)

const router = isDev ? require('./dev.ssr') : require('./server-koa.js')
app.use(router.routes())
app.use(router.allowedMethods())

// 开放目录
app.use(koaStatic(resolve('../dist')))

const PORT = process.env.PORT || 3000

// 高亮代码 --- https://www.jianshu.com/p/cca3e72c3ba7
// 此端口实时编译
app.listen(PORT, () => {
  // console.log(`\033[42;30m DONE \033[40;32m SSR实时编译Server started at http://localhost:${port}\033[0m`
  console.log('\n')
  console.log('\033[42;30m - SSR实时编译Server-Client \033[41;37m http://localhost:' + PORT + ' \033[0m')
  console.log(`- 此端口SSR: Server started at http://localhost:${PORT}`)
  console.log('\n')

})

module.exports = app
