# 彻底弄懂 Promise，Promise 的前世今生

> 概念: 是一个对象。代表异步操作最终返回的成功或失败。

本文大致内容：
1. Promise 解决的问题. 为什么会出现 Promise？
2. Promise 相关应用
3. 异步编程的终极方案

## 1. 为什么会出现 Promise？

Promise 的出现是为了解决回调地狱的问题。回调函数在 Node.js 是异步编程的一种。

举一个回调地狱的例子, 比如面试:
```javascript
function interview (callback) {
  if (Math.random() > 0.5) {
    callback(null, 'success.')
  } else {
    callback(new Error(`failed at ${round} round`))
  }
}

interview(function (err, result) {
  if (err) return err
})

```