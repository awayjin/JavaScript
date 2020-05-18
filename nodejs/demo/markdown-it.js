const http = require('http')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const fs = require('fs')
const html = fs.readFileSync(__dirname + '/readme.md', 'utf-8')
const result = md.render(html)
// const result = md.render('# markdown-it rulezz!');

http.createServer((req, res) => {
  // res.end('md')
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.end(result)
  // res.end(html)
}).listen(4000)


// https://github.com/ravenq/markdown-it-vue
// https://markdown-it.docschina.org/architecture.html
