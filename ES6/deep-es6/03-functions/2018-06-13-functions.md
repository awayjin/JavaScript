---
layout: post
title:  "函数"
date:   2018年06月13日 11:02:32
categories: JavaScript
excerpt: 函数
---

* content
{:toc}

---

## 3.1 带参数默认值的函数
## 3.2 ES6中的参数默认值
```javascript
  function es5Func(timeout) {
    timeout = timeout || 2000
    console.log(timeout) // 2000
    // timeout = (typeof timeout !== 'undefined') ? timeout : 2000 // ES5这种模式很常用
    // console.log(timeout) // 0
  }
  es5Func(0)

  // Default Parameter Values in ECMAScript 6
  function makeRequest(url, timeout = 2000) {
    console.log(url)
    console.log(timeout)
  }
  makeRequest('example.com',  0)
```
## 3.3 参数默认值如何影响arguments对象
- 非严格模式下,arguments对象总是会被更新以反映具名参数的变化
```javascript
function mixArgs(first, second) {
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
    console.log(arguments[0]); // a
    console.log(arguments[1]); // b
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);

    console.log(first); // c
    console.log(second); // d
  }

  mixArgs("a", "b");
```

## 3.4 参数默认值表达式
- 可以将前面的参数作为后面参数的默认值, function add(first, second = first)
- 前面的参数不能访问后面的参数
```javascript
 function getValue () {
    return 15
  }
  // Default Parameter Expressions 参数默认值表达式
  function add(first, second = getValue()) {
    console.log(first + second)
  }
  add(3) // 18
  add(3, 1) // 4
```

## 3.5 参数默认值的暂时性死区(Temporal Dead Zone)
```javascript
 // Default Parameter Value Temporal Dead Zone
  if (1) {
    typeof a;  // 会抛出错
    let a = 3;
  }
```
## 3.6 使用不具名参数(Working with Unnamed Parameters)
