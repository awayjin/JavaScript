// process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// console.log('process.cwd():', process.cwd())
// console.log('__dirname :', __dirname )

const webpack = require('webpack')
const MemoryFS = require('memory-fs')
let webpackConfig = require('@vue/cli-service/webpack.config')
const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaStatic = require('koa-static')
const axios = require('axios')
const { createBundleRenderer } = require('vue-server-renderer')

const app = new Koa()
const router = new KoaRouter()
const mfs = new MemoryFS()
// const compile = webpack(webpackConfig)
// webpackConfig = {
//   mode: 'development',
//   entry: './build/entry-client.js',
//   output: {
//     publicPath: '/',
//     path: path.resolve(process.cwd(), './dist')
//   },
//   target: 'node'
// }

const compile = webpack(webpackConfig)
// 磁盘读取改为内存读取
compile.outputFileSystem = mfs

let bundle
// 监听文件变化, 获取服务端渲染JSON-vue-ssr-server.json
compile.watch({
  // aggregateTimeout: 300
}, async (err, stats) => {
  console.log('----------- webpackConfig.output.path------:', webpackConfig.output.path)
  console.log('----------- webpackConfig------:')
  // console.log(webpackConfig)

  if (err) {
    throw err
  }
  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  console.log('bundlePath:', bundlePath)
  // mfs.writeFileSync(bundlePath, 'hello memory-fs')
  // bundle = mfs.readFileSync(bundlePath, 'utf-8')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
})

router.get('*', async ctx => {
  // 获取客户端 vue-ssr-client-manifest.json
  const clientManifestRes = await axios.get('http://localhost:5001/vue-ssr-client-manifest.json')
  const clientManifest= clientManifestRes.data

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync('./src/index-template.html', 'utf-8'),
    clientManifest
  })

  renderer.renderToString(ctx, (err, html) => {
    if (err) throw new Error('renderToString Error:', err)
    ctx.body = html
  })

})

app.use(KoaStatic('../dist'))
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.NODE_ENV || 3030
app.listen(port, () => {
  console.log(`server started at http://locahost:${port}`)
})

// module.exports = app



