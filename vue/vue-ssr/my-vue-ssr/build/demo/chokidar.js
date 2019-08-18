const chokidar = require('chokidar')
const fs = require('fs')

const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const log = console.log.bind(console)

const clientConfig = require(resolve('../../server/webpack.client.config'))


const templatePath = '../../src/index-template.html'
chokidar.watch(
  resolve(templatePath)
  // resolve('../../src/')
).on('change', path => {
  let template = fs.readFileSync(templatePath, 'utf-8')
  log(`File ${path} has been change`)
  log(template)
})

console.log('clientConfig.entry.app:', clientConfig.entry.app)
console.log('filename:', clientConfig.output)
console.log('filename:', clientConfig.plugins)




// 不能监听子目录
// fs.watch('./src/', function (event, filename) {
//   console.log('event is: ' + event);
//   if (filename) {
//     console.log('filename provided: ' + filename);
//   } else {
//     console.log('filename not provided');
//   }
// });
