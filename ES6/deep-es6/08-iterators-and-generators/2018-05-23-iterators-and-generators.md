---
layout: post
title:  "js中的类"
date:   2018年05月23日 15:46:32
categories: JavaScript
excerpt: 迭代器与生成器
---

* content
{:toc}

---

# JavaScript迭代器与生成器
> 迭代数据的方式由for循环转变到迭代器对象

## 8.1 循环的问题
- 嵌套并追踪多个变量时，复杂就会增加
- for 循环天然的范例样式会书写在多个位置导致更多的错误出现
```javascript
var colors = ["red", "green", "blue"];
for (var i = 0, len = colors.length; i < len; i++) {
 console.log(colors[i]);
}
```

## 8.2 何为迭代器
> 迭代器只是带有特殊接口的对象.都有next()方法，返回一个包含两个属性的结果对象.
```javascript
function createIterator (items) {
    var i = 0
    return {
      next: function () {
        var done = (i >= items.length) // true or false
        var value = !done ? items[i++] : undefined

        return {
          done: done,
          value: value
        }
      }
    }
  }

  var iterator = createIterator([1, 2, 3])

  console.log(iterator.next())          // "{ value: 1, done: false }"
  console.log(iterator.next())          // "{ value: 2, done: false }"
  console.log(iterator.next())          // "{ value: 3, done: false }"
  console.log(iterator.next())          // "{ value: undefined, done: true }"

  // for all further calls
  console.log(iterator.next())
```
