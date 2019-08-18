
const fs = require('fs')
const path = require('path')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const chokidar = require('chokidar')

const clientConfig = require('./webpack.client.config')

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {
    
  }
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  // readyPromise
  const readyPromise = new Promise(resolve => {
    ready = resolve
  })

  // update
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')

  // 监听模板的变化，变动赋值给变量 template
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index-template.html updated.')
    update()
  })

  // modify client config to work with hot middleware
  // 修改客户端配置用来使用 hot-middleware
  clientConfig.entry.app = [
    'webpack-hot-middle/client',
    clientConfig.entry.app
  ]
  // 通过占位符确保文件名称的唯一
  clientConfig.output.filename = '[name].js'
  // 添加开发插件
  clientConfig.plugins.push(
    // 热更新插件，webpack4.x+ 设置 hot: true 默认开启
    new webpack.HotModuleReplacementPlugin,
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // webpack4.x+ 中 mode: production 时默认开启
    new webpack.NoEmitOnErrorsPlugin()
  )

  // 中文文档: https://www.webpackjs.com/guides/development/#使用-webpack-dev-middleware
  // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
  // dev middleware
  const clientCompiler = webpack(clientConfig)
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)

  // API: https://webpack.docschina.org/api/compiler
  // 注释讲解: https://juejin.im/entry/58c9f6b6ac502e0058854686
  // 在 client-webpack 转换完成时获取 devMiddleware 的 fileSystem。
  // 读取生成的 index.html 并通过传入的 opt 的回调设置到 server.js 里
  clientCompiler.plugin('done', stats => {
    // const fs = devMiddleware.fileSystem
    // const filePath = path.join(clientConfig.output.path, 'index.html')
    stats = stats.toJson()
    stats.errors.forEach(err => console.error('err1-AWAY:', err))
    stats.warnings.forEach(err => console.warn('warn1-AWAY:', err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(
      readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json')
    )
    update()
  })

}
