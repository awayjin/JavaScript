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

```javascript
const path = ctx.params
const query = ctx.request.query
const header = ctx.request.header
const body = ctx.request.body // koa-bodyparser
```
  
### 库
validator 字符串验证程序和清理程序库

### 查找所有方法和属性
在原型链查找


### 5-3 配置文件与在终端显示异常

挂载全局配置文件

###  5-4 关系型数据库与非关系型数据库

通用型和针对小程序

在线作图：
https://processon.com/

MySQL 安装类型：
utf8mb4 utf8mb4_general_ci

### 5-6 Sequelize 初始化配置与注意事项_batch

> Sequelize 是一个基于 promise 的 Node.js ORM。
ORM 就是通过实例对象的语法，完成关系型数据库的操作的技术，是"对象-关系映射"（Object/Relational Mapping）

模型是 Sequelize 的本质. 模型是代表数据库中表的抽象. 

### 盐与密码加密
```javascript
const salt = bcrypt.genSaltSync(10)
const pwd = bcrypt.hashSync(v.get('body.password2'), salt)
```

模型的set操作


### HttpBasicAuth传递令牌和验证令牌

// 原生 ctx.req
// koa 封装过 ctx.request
      
### 小程序openid登录系统
code 
openid
appSecret

AppID(小程序ID) 
AppSecret(小程序密钥)

auth.code2Session:
通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。


### 在小程序安装UI组件库

设置 -> 项目设置 -> 使用npm模块

设置 -> 项目设置 -> 不校验合法域名

工具 -> 构建npm


## 可选参数 isOptional

## 数据来源
python 爬虫工具 requests, BF4, Scrappy

## 新增短评和获取短评 - 别名

## JSON序列化 - toJSON
```javascript
const person = {
  name: 'my name',
  age: 18,
  toJSON () {
    const ran = Math.random() * 10
    if (ran > 5) {
      return ran
    }
    return { 'name': 'look up sky'}
  }
}
console.log(JSON.stringify(person))
```

## 自动 无感知刷新令牌
退出 短时间 二次重发机制

获取 Mac IP
ifconfig | grep "inet"