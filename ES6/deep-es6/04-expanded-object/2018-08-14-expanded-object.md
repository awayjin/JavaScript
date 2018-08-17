---
layout: post
title:  "扩展对象功能"
date:   2018年08月14日 10:34:32
categories: JavaScript
excerpt: Expanded Object Functionality
---

* content
{:toc}

---

#扩展对象功能

## 4.1 对象类别
> JS使用混合术语来描述能在标准中找到的对象。包括：
- 普通对象：拥有JS对象所有默认的内部行为
- 奇异对象:其内部行为在某些方面有别于默认行为
- 标准对象： 在	ES6	中被定义的对象，例如Array、Date，等等。标准对象可以是普通的，也可以是奇异的
- 内置对象： 在脚本开始运行时由	JS	运行环境提供的对象。所有的标准对象都是内置对象

## 4.2 对象字面量语法的扩展
> ES6用几种方式扩展了对象字面量

### 4.2.1 属性初始化器的速记法
> 属性名和本地变量名相同
```javascript
function createPerson(name, age) {
  return {
    name,
    age
  }
}
```

### 4.2.2 方法简写
> 方法简写能使用super
```javascript
var obj = {
  name: 33,
  sayName() {
    return this.name
  }
}; 
obj.sayName()
```
### 4.2.3 需计算属性名
> 需计算属性名是对象字面量语法的一部分。方法号表示法，也可以包含表达式
```javascript
var lastName = 'last name';
var suffix = 'name';
var person = {
  'first name': 'jin',
  [lastName]: 'wei',
  ['last' + suffix]: 'wei2'
};
console.log(person['first name']);
console.log(person[lastName])
```


