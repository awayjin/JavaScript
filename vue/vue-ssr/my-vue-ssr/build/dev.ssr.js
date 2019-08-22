// process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// __dirname 是被执行的js 文件的地址 ——文件所在目录
// console.log('process.cwd():', process.cwd())
// console.log('__dirname :', __dirname )

const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const webpackConfig = require('@vue/cli-service/webpack.config')
const path = require('path')

const MFS = new MemoryFS()
const compile = webpack(webpackConfig)
// 磁盘读取改为内存读取
compile.outputFileSymtem = MFS

let bundle
// 监听文件变化
compile.watch({
  // aggregateTimeout: 300
}, (err, stats) => {
  // const bundlePath = path.join(
  //   webpackConfig.output.path,
  //   'vue-ssr-server-bundle.json'
  // )
  console.log(' webpackConfig.output.path:', webpackConfig.output.path)
  // bundle = MFS.readFileSync(bundlePath, 'utf-8')
  // console.log('bundle:', bundle)
  // console.log('stats:', stats)
})
