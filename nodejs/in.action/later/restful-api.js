const express = require('express')
const app = express()

const articles = [{ title: 'Example' }]
app.set('port', process.env.PORT || 3000)

// get all
app.get('/articles', (req, res, next) => {
  res.send(articles)
})

// create
app.get('/articles', (req, res, next) => {
  res.send('OK')
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
  res.send({ message: 'Deleted' })
})

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
})

module.exports = app