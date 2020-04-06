
## 洋葱模型

Koa.js 经典的 `洋葱模型` 中间件处理流程。

洋葱模型简化图示:
![洋葱模型图示](./onion-model.png)

洋葱模型示例：
```javascript
const app = new (require('koa'))
// 洋葱模型 1 3 4 2
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})
app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})
app.listen(3000)
```


## 全局异常处理中间件

- 异常处理
    - 已知异常
    - 未知异常
    
- Promise
    - async
    - await