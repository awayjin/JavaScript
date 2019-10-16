# 彻底弄懂 Promise，Promise 的前世今生

本文大致内容：
1. Promise 解决的问题. 为什么会出现 Promise？
2. Promise 概念,状态,方法,实现
3. 异步编程的终极方案

## 1. 为什么会出现 Promise？

Promise 的出现是为了解决回调地狱的问题。回调函数在 Node.js 是异步编程的一种。

举一个回调地狱的例子, 比如面试:
```javascript
function interview (callback) {
  let random = Math.random()
  if (random > 0.5) {
    callback(null, 'success. random:' + random)
  } else {
    callback(new Error(`failed; random:` + random))
  }
}

// 回调地狱
interview(function (err) {
  if (err) {
    return console.log('failed. at 1st round.', err)
  }
    interview(function(err) {
      if (err) {
        return console.log('failed. at 2nd round.', err)
      }
      
      interview(function(err, result) {
        if (err) {
          return console.log('failed. at 3rd round.', err)
        }
        
        console.log('OK.', result)
      })
    })
})

```

## 2. Promise 介绍. 
> 概念: 是一个对象, 代表一个异步操作最终成功或失败。

Promise 必须处于三个状态:
- pending 等待态, 会流转到 resolve 或 rejected
- resolved/fulfilled 成功态
- rejected 失败态

主要方法:
- then 必须提供. 最多两个参数: 成功回调和失败回调.
- catch 处理失败的情况.
- Promise.all(iterable) 
    参数内所有 Promise 都'成功 resolved', 才返回成功. 若有一个失败, 则返回失败(rejected).
- Promise.race(iterable) 只要迭代器中某一个成功或失败,就返回相应的成功或失败.
- Promise.resolve() 成功
- Promise.reject() 失败

实现一个符合 `Promise/A+` 规范的基础 Promise:
```javascript
class Promise {
  constructor (fn) {
    this.status = 'pending' // pending, resolved, rejected
    this.value = null // 成功返回值
    this.reason = null // 失败原因
    
    // 成功回调
    let resolve = (value) => {
      if (this.status === 'resolved') {
        this.status = 'resolved'
        this.value = value
      }
    }
    // 失败回调
    let reject = () => {
      if (this.status === 'rejected') {
        this.status = 'rejected'
        this.value = value
      }
    }
    
    try {
      fn(resolve.bind(this), reject.bind(this))
    } catch (e) {
      reject.bind(this)
    }
  }
  // then 方法
  then (onResolved, onRejected) {
    if (this.status === 'resolved') {
      onResolved.call(this, this.value)
    }
    if (this.status === 'rejected') {
      onRejected.call(this, this.value)
    }
    return this
  }
  // 失败
  catch (cb) {
    return this.then.call(this, null, cb)
  }
}
``` 