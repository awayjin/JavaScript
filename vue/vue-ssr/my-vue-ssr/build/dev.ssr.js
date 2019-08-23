// process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// console.log('process.cwd():', process.cwd())
// console.log('__dirname :', __dirname )

const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const webpackConfig = require('@vue/cli-service/webpack.config')
const path = require('path')

const mfs = new MemoryFS()
const compile = webpack(webpackConfig)
// 磁盘读取改为内存读取
compile.outputFileSymtem = mfs

let bundle
// 监听文件变化
compile.watch({
  // aggregateTimeout: 300
}, (err, stats) => {
  console.log('----------- webpackConfig.output.path------:', webpackConfig.output.path)

  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(error => console.error(error))
  stats.warnings.forEach(warn => console.warn(warn))
  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

  console.log('bundle:', bundle)
  // console.log('stats:', stats)
})


// server/ssr.js
// const Koa = require('koa')
// const koaStatic = require('koa-static')
// const path = require('path')
//
// const resolve = file => path.resolve(__dirname, file)
// const app = new Koa()
//
// const isDev = process.env.NODE_ENV !== 'production'
// console.log('---isDev::--', isDev)
//
//
// const webpack = require('webpack')
// const Router = require('koa-router')
// const fs = require('fs')
// const MemoryFS = require('memory-fs')
// const axios = require('axios')
//
// // 1、webpack配置文件
// const webpackConfig = require('@vue/cli-service/webpack.config.js')
// const { createBundleRenderer } = require('vue-server-renderer')
//
// // 2、编译webpack配置文件
// // 生成服务端渲染时候的bundle
// const serverCompiler = webpack(webpackConfig)
//
// const mfs = new MemoryFS()
//
// // https://www.webpackjs.com/api/node/#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F-custom-file-systems-
// // 指定输出到的内存流中
// // 指定 webpack 的输出目录
// // 使用 memory-fs 替换默认的 outputFileSystem，
// // 以将文件写入到内存中，而不是写入到磁盘
// serverCompiler.outputFileSystem = mfs
//
// // mfs.mkdirpSync('/')
// // mfs.writeFileSync('/file.txt', 'hello world.')
// // var d = mfs.readFileSync('/file.txt', 'utf-8')
// // console.log('d:', d) // hello world.
//
// // 3、监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
// // 记录 webpack 打包生成的新文件
// let bundle
//
// // 监听 client 文件改变，重新打包
// serverCompiler.watch({}, (err, stats) => {
//   if (err) {
//     throw err
//   }
//   stats = stats.toJson()
//   stats.errors.forEach(error => console.error(error))
//   stats.warnings.forEach(warn => console.warn(warn))
//   const bundlePath = path.join(
//     webpackConfig.output.path,
//     'vue-ssr-server-bundle.json'
//   )
//   bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
//   console.log('new bundle generated')
// })
//
// // 4、获取最新的 vue-ssr-client-manifest.json
// // 这边的 8080 是 dev server 的端口号
// // const clientManifestResp = axios.get('http://localhost:5001/vue-ssr-client-manifest.json')
// // const clientManifest = clientManifestResp.data
//
// console.log('\n port', process.env.PORT)
//
// // 4. 处理请求
// const handleRequest = async ctx => {
//   // console.log('path-----:', ctx.path)
//   if (!bundle) {
//     ctx.body = 'wait minutes --away---'
//     return
//   }
//
//   // 4、获取最新的 vue-ssr-client-manifest.json
//   const clientManifestResp = await axios.get('http://localhost:5001/vue-ssr-client-manifest.json')
//   // const clientManifestResp = await axios.get('../dist/vue-ssr-client-manifest.json')
//   const clientManifest = clientManifestResp.data
//
//   const renderer = createBundleRenderer(bundle, {
//     runInNewContext: false,
//     template: fs.readFileSync(path.resolve(__dirname, '../src/index-template.html'), 'utf-8'),
//     clientManifest: clientManifest
//   })
//
//   const html = await renderToString(ctx, renderer)
//   ctx.body = html
// }
//
// function renderToString (context, renderer) {
//   return new Promise((resolve, reject) => {
//     renderer.renderToString(context, (err, html) => {
//       err ? reject(err) : resolve(html)
//     })
//   })
// }
//
// const router = new Router()
//
// router.get('*', handleRequest)
//
// app.use(router.routes())
// app.use(router.allowedMethods())
//
// // 开放目录
// app.use(koaStatic(resolve('../dist')))
//
// const PORT = process.env.PORT || 3000
//
// // 高亮代码 --- https://www.jianshu.com/p/cca3e72c3ba7
// // 此端口实时编译
// app.listen(PORT, () => {
//   // console.log(`\033[42;30m DONE \033[40;32m SSR实时编译Server started at http://localhost:${port}\033[0m`
//   console.log('\n')
//   console.log('\033[42;30m - SSR实时编译Server-Client \033[41;37m http://localhost:' + PORT + ' \033[0m')
//   console.log(`- 此端口SSR: Server started at http://localhost:${PORT}`)
//   console.log('\n')
//
// })
//
// module.exports = app
