// 一个简单的内存文件系统。将数据保存在JavaScript对象中
// https://www.cnblogs.com/running-runtu/p/8996932.html
const MemoryFS = require('memory-fs')
const mfs = new MemoryFS()


mfs.writeFileSync('/memory-fs.html', 'content write')
let value = mfs.readFileSync('/memory-fs.html', 'utf-8')
console.log('value:', value)

// mfs.mkdirpSync('/')
mfs.writeFileSync('/file.txt', 'hello world.')
var d = mfs.readFileSync('/file.txt', 'utf-8')
console.log('d:', d) // hello world.
