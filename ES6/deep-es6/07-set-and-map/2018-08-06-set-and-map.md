---
layout: post
title:  "模块"
date:   2018年08月06日 10:34:32
categories: JavaScript
excerpt: Set与Map
---

* content
{:toc}

---

> Set是不包含重复值的列表，在Set中检查某个值是否存在.
> Map则是键与相对应的值集合.因此Map中的每个项都存储了两块数据.

## 7.1 ES5中的Set与Map
> ES5中，用对象属性模拟Set与Map.使用对象的属性检查唯一值.
```javascript
// 确保对象上没有继承属性
let set = Object.create(null)
set.foo = true
// 检查属性的存在性
if (set.foo) {
  
}
```
> 模拟Set与模拟Map区别是所存储的值.Map多用来提取数据,Set检查值的存在
```javascript
let map = Object.create(null)
map.foo = 'bar'
let value = map.foo // 提取一个值
console.log(value)
```