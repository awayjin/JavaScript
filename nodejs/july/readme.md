## 路由
开闭原则： 修改关闭 扩展开放

版本号：api query header

## process.cwd() 绝对路径

## requireDirectory 实现路由自动加载

## 4. 参数获取及验证

/v1/:id/classic/latest?key=11


查询参数: url?query=33

路径传参: url/api/v1/${param}/latest

header传参: url/api/33/
{
  token: '111'
}

body 传参： koa-bodyparser 参数解析

```javascript
const path = ctx.params
const query = ctx.request.query
const header = ctx.request.header
const body = ctx.request.body // koa-bodyparser

console.log('path:', path)
console.log('query:', query)
console.log('header:', header)
console.log('body:', body)
```

### 编程规范

await 对表达式求职。

判断出异常 return false, 编程规范 throw。

异步异常获取

```javascript
try  {
  func2()
} catch (e) {
  
}
function fun2 () {
  throw new Error(33)
}
```


### 4.4 全局异常处理中间件编写

面向切面编程
监听错误
输出一段有意义的提示信息
```javascript
// 全局异常处理中间件
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.body = '服务器有点问题，请稍后再试'
  }
}

module.exports = catchError

const catchError = require('./middlewares/exception')
app.use(catchError)
```

### 已知错误和未知错误
message
error_code 详细，开发者自己定义的 10001 20003
request_url 当前请求的 url


