if (typeof window === 'undefined') {
  global.window = {};
}

const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server') // SSR
const path = require('path')
const fs = require('fs')
// 读取 search.html 模板
const searchHTML = path.join(__dirname, '../dist/search.html')
const template = fs.readFileSync(searchHTML, 'utf-8')
// 数据
const data = require('./data.json')

// console.log('join:', path.join(__dirname, 'dist'),)
// console.log('resolve:', path.resolve(__dirname, 'dist'),)
// console.log('resolve3:', path.resolve('/foo/bar', './baz'))
// console.log('resolve4:', path.resolve('./foo/bar', './tmp3/file/'))

const server = (port) => {
  const app = express()

  const options = {
    // 'maxAge': '10d',
    // 'Last-Modified': '3d',
    'Cache-Control': 'public, max-age=1000',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=1000')
    },
    maxAge: 3600000
    // 'Cache-Control': 'max-age=31536000'
  }
  app.use(express.static('dist', options))

  app.get('/search', (req, res) => {
    // 浏览器强缓存
    res.setHeader('Cache-Control', 'public, max-age=3600')
    // res.setHeader('Cache-Control', 'public, max-age=0'); // 协商缓存
    // res.setHeader('Last-Modified', xxx);
    // res.setHeader('ETag', xxx);
    // 使⽤ react-dom/server 的 renderToString ⽅法将
    // React 组件渲染成字符串
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server is running on http://locahost:' +
      port, '--', new Date().toLocaleString())
  })
}

server(process.env.PORT || 3007)

const renderMarkup = (str) => {
  let dataStr = JSON.stringify(data)
  return template
    .replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->',
      `<script>window.__inital_data = ${dataStr}</script>`)
}

// const renderMarkup = (str) => {
//   return `<!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <title>Title</title>
//   </head>
//   <body>
//     <div id="root">  ${str}</div>
//   </body>
//   </html>`
// }

// ／g有一个属性叫lastIndex，每次匹配如果没有匹配到，它将重置为0，如果匹配到了，他将记录匹配的位置
// var reg = /num=(\d)/g;
// reg.test('num=1abc')
// reg.lastIndex
// reg.exec('num=1')
// reg.lastIndex