const http = require('http')
const pug = require('pug')
// const template = require(__dirname + './template.pug')

// 编译这份代码
const compiledFunction = pug.compileFile('./template.pug');
// console.log('compiledFunction:', compiledFunction)
console.log(compiledFunction({
  name: '李莉'
}));



http.createServer((req, res) => {

  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8'
  })

  const compileHtml = compiledFunction({
    name: '李莉',
    arr: [11, 22, 33]
  })

  res.end(compileHtml)
  // res.end('44s')
}).listen(3000)