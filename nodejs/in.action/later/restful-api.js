const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const articles = [
  { id: 1, title: 'title-1' },
  { id: 2, title: 'til-2' }
]
app.set('port', process.env.PORT || 3000)
// 支持编码为 JSON 的请求消息体
app.use(bodyParser.json())
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({
  extended: true
}))

// get all
app.get('/articles', (req, res, next) => {
  res.send(articles)
})

// create 创建一篇文章
app.post('/articles', (req, res, next) => {
  const article = { title: req.body.title }
  articles.push(article)
  res.send(articles)
})

// 获取指定文章
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id
  console.log('Fetching:', id)
  res.send(articles[id])
})

// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  console.log('Deleting:', id)
  delete articles[id]
  res.send(articles)
})

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
})

module.exports = app