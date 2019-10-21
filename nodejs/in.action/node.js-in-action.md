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
```javascript
// 支持编码为 JSON 的请求消息体
app.use(bodyParser.json())
// 支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({
  extended: true
}))
```

创建一篇文章, 表单格式:
curl --data 'title=til 3' http://localhost:3000/articles

## 4. 添加数据库
就往 Node 程序中添加数据库而言，一般会涉及下面几个步骤:
- 决定想要用的数据库系统。
-  在 npm 上看看那些实现了数据库驱动或对象关系映射（ORM）的热门模块。
- 用 npm --save 将模块添加到项目中。
- 创建模型，封装数据库访问 API。
- 把这些模型添加到 Express 路由中。

选哪个数据库?

SQLite 是进程内数据库，所以很方便：你不需要在系统上安装一个后台运行的数据库。你添加的所有数据都会写到一个文件里，也就是说程序停掉后再起来时数据还在

### 4.1 制作自己的模型 API

 
## 5. 让文章可读并把它存起来

node-readability 这个模块提供了一个异步函数，可以下载指定 URL 的页面并将 HTML 转换成简化版.

把任何网页变成一个干净的视图。

curl --data "url=http://manning.com/cantelon2/" http://localhost:3000/articles