let http = require('http')

let argv = process.argv
console.log('argv:', argv)

http.createServer((req, res) => {
  res.end('22')
}).listen(3001)

// script 原理： http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html

