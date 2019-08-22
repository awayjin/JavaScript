// process.cwd() 返回的是当前Node.js进程执行时的工作目录
// _dirname 是被执行的js 文件的地址 ——文件所在目录
// 参考1: https://juejin.im/post/5ad4219d6fb9a028da7cfffc
// 参考2: https://juejin.im/post/5bc4321b6fb9a05d1e0e824b

// https://www.cnblogs.com/zhangmingzhao/p/10045290.html
// A simple in-memory filesystem. Holds data in a javascript object.
// 跟node.js中的FS类似。不写入磁盘,输出到memoryFs
const MemoryFS = require('memory-fs')

const axios = require('axios')

const webpack = require('webpack')

const Router = require('koa-router')

const path = require('path')
const fs = require('fs')

// 1、webpack配置文件
const webpackConfig = require('@vue/cli-service/webpack.config.js')
const { createBundleRenderer } = require('vue-server-renderer')

// 2、编译webpack配置文件
// 生成服务端渲染时候的bundle
const serverCompiler = webpack(webpackConfig)

const mfs = new MemoryFS()

// https://www.webpackjs.com/api/node/#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F-custom-file-systems-
// 指定输出到的内存流中
// 指定 webpack 的输出目录
// 使用 memory-fs 替换默认的 outputFileSystem，
// 以将文件写入到内存中，而不是写入到磁盘
serverCompiler.outputFileSystem = mfs

// mfs.mkdirpSync('/')
// mfs.writeFileSync('/file.txt', 'hello world.')
// var d = mfs.readFileSync('/file.txt', 'utf-8')
// console.log('d:', d) // hello world.

// 3、监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
// 记录 webpack 打包生成的新文件
let bundle

// 监听 client 文件改变，重新打包
serverCompiler.watch({}, (err, stats) => {
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
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
  console.log('new bundle generated')
})

// 4、获取最新的 vue-ssr-client-manifest.json
// 这边的 8080 是 dev server 的端口号
// const clientManifestResp = axios.get('http://localhost:5001/vue-ssr-client-manifest.json')
// const clientManifest = clientManifestResp.data

console.log('\n port', process.env.PORT)

// 4. 处理请求
const handleRequest = async ctx => {
  // console.log('path-----:', ctx.path)
  if (!bundle) {
    ctx.body = 'wait minutes --away---'
    return
  }

  // 4、获取最新的 vue-ssr-client-manifest.json
  const clientManifestResp = await axios.get('http://localhost:5001/vue-ssr-client-manifest.json')
  // const clientManifestResp = await axios.get('../dist/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, '../src/index-template.html'), 'utf-8'),
    clientManifest: clientManifest
  })

  const html = await renderToString(ctx, renderer)
  ctx.body = html
}

function renderToString (context, renderer) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

const router = new Router()

router.get('*', handleRequest)

module.exports = router
