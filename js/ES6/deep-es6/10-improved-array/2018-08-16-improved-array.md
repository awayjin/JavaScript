---
layout: post
title:  "增强的数据功能"
date:   2018年08月16日 13:53:32
categories: JavaScript
excerpt: Improved Array
---

* content
{:toc}

---

#增强的数据功能
> 创建类型化数组(typed array)

## 10.1 创建数组
> ES6新增了Array.of()和Array.from()方法

### 10.1.1 Array.of()方法
> 弥补数组构造函数Array()的不足。使用Array.of()而非Array构造器能确保行为一致
```javascript
// 怪异点
var arr = new Array(2);
arr.length; // 2
arr[0] // undefined

var arr = Array.of(12);
console.log(arr.length) // 1
console.log(arr[0]) // 12
```

### 10.1.2 Array.from()方法
> 将类数组转换为数组
```javascript
Array.prototype.slice.call(arrayLike)
Array.from(arguments)
```
> 映射转换：将数组对象的每一个值转换为目标形式
```javascript
function translate() {
  return Array.from(arguments, value => value +1)
}
translate(1, 2, 3)
```
> 如果映射需要在对象上工作，可以传递第三个参数，从而指定映射函数内部的this值
```javascript
let helper = { 
  diff: 10,
  add(value) {
    return value + this.diff
  }
};
function translate() {
  return Array.from(arguments, helper.add, helper)
}
translate(1, 2, 3) // 11, 12, 13
```

> 可迭代对象上使用
```javascript
var numbers = {
 *[Symbol.iterator]() {
   yield 11
   yield 22
   yield 33
 }
};
for (var num of numbers) {
 console.log(num)
}
var num = Array.from(numbers, value => value + 4);
console.log(num);
```

## 10.2 所有数组上的新方法
> find()与findIndex()处理包含任意值的数组.fill()与copyWithin()方法处理类型化数组，只允许包含数值类型的值.

> find()与findIndex()方法返回匹配的值，第一次返回true时停止查找.findIndex匹配位置的索引
- 满足特定条件的数组元素时非常有用
```javascript
var arr = [11, 55, 33, 22];
console.log(arr.find(n => n > 22)) // 55
console.log(arr.findIndex(n => n > 33)) // 1
```
> fill()方法能使用特定值填充数组中的一个或多个元素.
```javascript
var arr = [11, 55, 33, 22];
// 改变其中一部分， 可选起始位置与结束位置
arr.fill(1, 2, 3)
(4) [11, 55, 1, 1]
```

> copyWithin()方法允许在数组内部复制自身元素.从什么位置开始进行填充，及被用来复制的数据的起始位置索引
```javascript
var numbers = [1, 2, 3, 4]; 
numbers.copyWithin(2, 0) // [1, 2, 1, 2]
numbers.copyWithin(2, 0, 1) // [1, 2, 1, 4]
```
## 4.4 类型化数组
> 处理数值类型数据.为JS提供了快速的按位运算能力


