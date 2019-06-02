# 深入理解Promise

本文章所包含的知识点
- 什么是 Promise
- Promise/A+ 规范译文和专业术语
- 实现规范的要求
- 动手实现一个 Promise


### 什么是Promise

`Promise` 代表异步操作的最终结果。与之进行交互的方式主要是 `then` 方法，该方法注册了两个回调函数，用于接收 promise 的终值或本 promise 不能执行的原因

### 1.术语(Terminology)

#### 译文术语
- 解决（fulfill）：指一个 promise 成功时进行的一系列操作，如状态的改变、回调的执行。虽然规范中用 fulfill 来表示解决，但在后世的 promise 实现多以 resolve 来指代之。

- 拒绝（reject）：指一个 promise 失败时进行的一系列操作。

- 终值（eventual value）：所谓终值，指的是 promise 被解决时传递给解决回调的值，由于 promise 有一次性的特征，因此当这个值被传递时，标志着 promise 等待态的结束，故称之终值，有时也直接简称为值（value）。

- 据因（reason）：也就是拒绝原因，指在 promise 被拒绝时传递给拒绝回调的值。

#### 专业术语
- 1.1 "promise" 是一个具有 `then` 方法的对象或函数。
- 1.2 "thenable" 是一个定义了 `then` 方法的对象或函数。
- 1.3 "value"(值) 可以是任何合法的 JavaScript 值(包括`undefined`, `thenable`, `promise`)。
- 1.4 "exception"(异常) 是用 `throw` 语句抛出的一个值。
- 1.5 "reason"(据因) 是一个值，表示 `promise` 被拒绝(`rejected`)的原因

### 2.要求(Requirements)

#### 2.1 Promise状态
一个 `promise` 必须处于这三个状态之一： 等待(或翻译为请求)`pending`，执行`fulfilled`, 拒绝`rejected` 。

(1) 当 `promise` 处于等待(`pending`)状态时:
    
- promise可以转为 `fulfilled` 或 `rejected` 状态

(2) 当`promise`处于完成(`fulfilled`)状态时:
- `promise` 不能转为任何其他状态
- 必须有一个不能改变的终值(`value`)

(3) 当`promise`处于拒绝(`rejected`)状态时:
- `promise` 不能转为任何其他状态
- 必须有一个原因(`reason`), 此原因不能改变


#### 2.2 then方法
一个 `promise` 必须提供一个 `then` 方法来访问当前值或终值或据因

(1) promise 的 then 方法接收两个参数(参数可选)：
```javascript
promise.then(onFulfilled, onRejected)
```

其中 onFulfilled 方法表示状态从 pending——>fulfilled(resolved)时所执行的方法

而 onRejected 表示状态从 pending——>rejected 所执行的方法。

(2) 为了实现链式调用，then 方法必须返回一个 promise
```javascript
promise2 = promise1.then(onFulfilled, onRejected);
```