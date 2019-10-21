# 彻底弄懂 Promise，Promise 的前世今生

本文大致内容：
1. Promise 解决的问题. 为什么会出现 Promise？
2. Promise 概念,状态,方法,实现
3. 异步编程的终极方案 async-await

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
        if (this.status === 'pending') {
          this.status = 'resolved'
          this.value = value
        }
      }
      // 失败回调
      let reject = (value) => {
        if (this.status === 'pending') {
          this.status = 'rejected'
          this.reason = value
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
      if (this.status === 'resolved' &&
        this.getType(onResolved) === 'Function'
      ) {
        onResolved.call(this, this.value)
      }
      if (this.status === 'rejected' &&
        this.getType(onRejected) === 'Function'
      ) {
        onRejected.call(this, this.reason)
      }
      return this
    }
    // 获取数据类型
    getType (val) {
      return Object.prototype.toString.call(val).slice(8, -1)
    }
    // 失败
    catch (cb) {
      // if (this.status === 'rejected') return this
      return this.then.call(this, null, cb)
    }
  }

  let p1 = new Promise(function (resolve, reject) {
    // resolve(11)
    reject('err-22')
  })
  p1
    .then(
      data =>  console.log(data), 
      err1 => console.log('err1:', err1)
     )
    .catch(err2 => console.log('err2:', err2))
``` 

## 异步编程 Promise 会出现的问题.
如下例3：, 会在全局抛出异常, try-catch 并未捕获到. 似乎出乎意料.
```javascript
// 例3：
// Uncaught (in promise) Error: err!!!
void function() {
   try {
      new Promise((resolve, reject) => {
        // reject('err!!!') // Uncaught (in promise) err!!!
        throw new Error('err!!!')
      })
    } catch (e) {
       console.log('e2:', e)
    }
}()
```

为什么未捕获到? 
当函数调用时会形成一个全新的调用栈(call stack), new Promise 里抛出错误实际相当于执行了一个异步任务，在栈低后执行, 而 try-catch 是在栈顶先执行，所以报错。

注：栈是一个后进先出的顺序数据结构。


## 3. 异步编程的终极方案 async/await

async/await：

- async 是 Promise 的语法糖封装。如例4
- 异步编程的终极方案 – 以同步的方式写异步。如例5
    - await 关键字可以“暂停”async function的执行
    - await 关键字可以以同步的写法获取 Promise 的执行结果
    - try-catch 可以获取 await 所得到的错误. 平常的异步任务 try-catch 是捕捉不到的.

例4:
```javascript
// 例4: async 是 Promise 的语法糖
// 都返回 Promise {<resolved>: 11}
  console.log(
    async function() {
      return 11
    }()
  )

  console.log(
    new Promise((resolve, reject) => {
      resolve(11)
    })
  )
```

例5:
```javascript

void async function() {
   try {
      await new Promise((resolve, reject) => {
        // reject('err!!!') // Uncaught (in promise) err!!!
        throw new Error('err!!!')
      })
    } catch (e) {
      // 能捕获到错误
       console.log('e2:', e)
    }
    // e2: Error: err!!!****
    
    // 关键字可以以同步的写法获取 Promise 的执行结果
    // 11
    // 22
    let p2 = await new Promise((resolve, reject) => {
		resolve(11)
	})
    console.log(p2)
    console.log(22)
}()

```