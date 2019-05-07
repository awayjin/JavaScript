## 高阶函数

高阶函数英文叫 higher-order function，是一个函数，满足下列一个条件：

- 接受一个或多个函数作为参数
- 返回一个函数作为结果

概括起来就是一个函数可以接收函数作为参数，或把函数作为返回值就是高阶函数

## 函数作为参数传递

JavaScript 语言中内置了一些高阶函数，比如 Array.prototype.map，Array.prototype.filter 和 Array.prototype.reduce，它们接受一个函数作为参数，并应用这个函数到列表的每一个元素。