# 深入理解Promise

### 什么是Promise
`Promise/A+`规范定义：`Promise`代表异步操作的最终结果.

### 1.专业术语(Terminology)
- 1.1 "promise" 是一个具有 `then` 方法的对象或函数。
- 1.2 "thenable" 是一个定义了 `then` 方法的对象或函数。
- 1.3 "value" 可以是任何合法的 JavaScript 值(包含`undefined`, `thenable`, `promise`)。
- 1.4 "exception" 是用 `throw` 语句抛出的值。
- 1.5 "reason" 表示 `promise` 为什么被 `rejected` 的值

### 2.要求(Requirements)

#### 2.1 Promise状态
一个 `promise` 必须处于这三个状态之一： 请求`pending`，完成`fulfilled`, 拒绝`rejected` 。

(1) 当`promise`处于请求(`pending`)状态时:
    
- promise可以转为 `fulfilled` 或 `rejected` 状态

(2) 当`promise`处于完成(`fulfilled`)状态时:
- `promise` 不能转为任何其他状态
- 必须有一个不能改变的值(`value`)

(3) 当`promise`处于拒绝(`rejected`)状态时:
- `promise` 不能转为任何其他状态
- 必须有一个原因(`reason`), 此原因不能改变


#### 2.2 then方法
`promise` 必须提供一个 `then` 方法来访问当前或最终值或原因

(1) promise 的 then 方法接收两个参数：
```javascript
promise.then(onFulfilled, onRejected)
```

其中 onFulfilled 方法表示状态从 pending——>fulfilled(resolved)时所执行的方法

而 onRejected 表示状态从 pending——>rejected 所执行的方法。

(2) 为了实现链式调用，then方法必须返回一个promise
```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```