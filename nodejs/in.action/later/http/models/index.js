const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Article = require('./db.js').Article // 数据库模块

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const read = require('node-readability')

// 把任何网页变成一个干净的视图。
// const url = 'http://www.manning.com/cantelon2/'
// read(url, (err, result) => {
//   console.log('result:', result)
// })

// 创建一篇文章
app.post('/articles', (req, res, next) => {
  const url = req.body.url
  read(url, (err, result) => {
    if (err || !result) {
      res.status(500).send('Error downloading article.')
    }

    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err)
        console.log('article:', article);
        res.send('创建成功.');
      }
    )
  })
})

// 获取所有文章
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err)
    res.send(articles)
  })
})

// 查询指定的文章
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id

  Article.find(id, (err, article) => {
    if (err) return next(err)
    console.log(article)
    console.log('id:', id)
    if (!article) {
      res.send('无此文章.')
      return
    }
    res.send(article)
  })
})

// 删除指定文章
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.delete(id, (err) => {
    if (err) return next(err)
    res.send({ message: 'Deleted', id: id })
  })
})

app.listen(app.get('port'), () => {
  console.log(`App stated on port http://localhost:${app.get('port')}`)
})

module.exports = app