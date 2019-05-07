## 高阶函数
> 高阶函数英文叫 higher-order function，是一个函数，满足下列一个条件：

- 接受一个或多个函数作为参数
- 返回一个函数作为结果

概括起来就是一个函数可以接收函数作为参数，或把函数作为返回值就是高阶函数

## 函数柯里化
> 柯里化，英语：Currying，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

- 创建已经设置好了一个或多个参数的函数. 也称部分求值（Partial Evaluation）

## 柯里化从何而来

柯里化, 即 Currying 的音译。 Currying 是编译原理层面实现多参函数的一个技术。

Currying 为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数，

Currying 原本是一门编译原理层面的技术，用途是实现多参函数

## 柯里化去向哪里

函数作为一等公民，Currying 从编译原理层面的技术应运而成了一个语言特性。 在语言特性层面，Currying 是什么？

 Currying ——只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

所以 Currying 是应函数式编程而生，在有了 Currying 后，大家再去探索去发掘了它的用途及意义

## 在 JavaScript 中实现 Currying

为了实现只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数这句话所描述的特性

```javascript
var add = (x, y) => x + y;

var curriedAdd = (x) => {
  return y => {
    return x + y
  }
}

var increment = curriedAdd(10)
increment(3) === 13 // true
```
以上实现是有一些问题的：它并不通用，并且我们并不想通过重新编码函数本身的方式来实现 Currying 化

但是这个 curriedAdd 的实现表明了实现 Currying 的一个基础 —— Currying 延迟求值的特性需要用到 JavaScript 中的作用域——说得更通俗一些，我们需要使用作用域来保存上一次传进来的参数。

```javascript
var add = (x, y) => x + y;
// currying
function curring (fn, ...arg1) {
  return function (...arg2) {
    return fn(...arg1, ...arg2)
  }
}
var increment = curring(add, 11)
increment(22) === 33 // true

var addTen = curring(add, 8, 2)
addTen() === 10 // true

// 另一种实现 currying
// curry
  function currying2 (fn) {
    var args = Array.prototype.slice.call(arguments, 1)
    return function () {
      var innerArgs = Array.prototype.slice.call(arguments)
      var finalArgs = args.concat(innerArgs)
      return fn.apply(null, finalArgs)
    }
  }
```

在此实现中，currying 函数的返回值其实是一个接收剩余参数并且立即返回计算值的函数。即它的返回值并没有自动被 Currying化 。所以我们可以通过递归来将 currying 的返回的函数也自动 Currying 化

```javascript
  function trueCurring(fn, ...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    
    return function (...args2) {
      return trueCurring(fn, ...args, ...args2)
    }
  }
```