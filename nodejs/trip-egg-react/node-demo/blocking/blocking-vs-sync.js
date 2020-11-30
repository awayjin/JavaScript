
const fs = require('fs')
const data = fs.readFileSync('./file.md', 'utf-8')
console.log('同步执行 sync blocking:', data)


fs.readFile('./file.md', 'utf-8', (err, data) => {
  if (err) throw err
  console.log('non-blocking:', data)
})
// 异步地删除文件
fs.unlink('./file.md', (err, data) => {
  if (err) throw err
  console.log('unlink data:', data)
})
console.log('这是异步，先执行')