// 1、webpack配置文件
const webpackConfig = require('@vue/cli-service/webpack.config.js')

// 2、编译webpack配置文件
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()
// 指定输出到的内存流中
serverCompiler.outputFileSystem = mfs

// 3、监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
let bundle
serverCompiler.watch({}, (err, stats) =>{
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(error => console.error(error) )
  stats.warnings.forEach( warn => console.warn(warn) )
  const bundlePath = path.join(
    webpackConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'))
  console.log('new bundle generated')
})


// 4、获取最新的 vue-ssr-client-manifest.json
// 这边的 8080 是 dev server 的端口号
// const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
// const clientManifest = clientManifestResp.data


