## 1. Node Web 程序结构
- package.json
- public/ 静态资源文件夹
- node_modules/
- 放程序代码的一个或多个 JavaScript 文件.
    程序代码又分几块:
    - app.js 或 index.js
    - models/ 数据库模型
    - views/ 用来渲染页面的模板
    - controllers/ 或 routes/ - HTTP 请求处理
    - middleware/ 中间件组件
    
## 2.搭建一个 RESTful Web 服务

对应路由:
- POST /articles——创建新文章；
- GET /articles/:id——获取指定文章；
- GET /articles——获取所有文章；
- DELETE /articles/:id——删除指定文章。

```javascript
const express = require('express')
const app = express()

const articles = [
  { id: 1, title: 'title-1' },
  { id: 2, title: 'til-2' }
]
app.set('port', process.env.PORT || 3000)

// get all
app.get('/articles', (req, res, next) => {
  res.send(articles)
})

// create 创建一篇文章
app.post('/articles', (req, res, next) => {
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
  res.send(articles)
})

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'))
})

module.exports = app
```

## 3. 用 cURL 发起请求:
获取一篇文章: curl http://localhost:3000/articles/0

获取所有文章: curl http://localhost:3000/articles

删除一篇文章: 
curl -X DELETE http://localhost:3000/articles/0

创建一篇文章: 要处理 POST 请求需要消息体(请求体)解析.

消息体解析器知道如何接收 MIME-encoded（多用途互联网邮件扩展） POST 请求消息的主体部分，并将其转换成代码可用的数据。

一般来说，它给出的是易于处理的 JSON 数据。只要网站上有涉及提交表单的请求，服务器端就肯定会有一个消息体解析器来参与这个请求的处理。

JSON 消息体解析和表单编码消息体解析

表单:
curl --data 'title=til 3' http://localhost:3000/articles