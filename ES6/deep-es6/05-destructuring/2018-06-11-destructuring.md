---
layout: post
title:  "解构"
date:   2018年06月11日 09:57:32
categories: JavaScript
excerpt: 解构：更方便的数据访问
---

* content
{:toc}

---
# 解构：更方便的数据访问(Destructuring for Easier Data Access).
> 解构：将一个数据结构分解为更小的部分的过程

## 5.1 解构为何有用(Why is Destructuring Useful)
- 大量变量需要处理，需逐个赋值
- 嵌套数据结构，为一点数据挖掘整个结构
```javascript
let options = {
    repeat: true,
    save: false
  }
let repeat = options.repeat
let save = options.save
```
## 5.2 对象解构(Object Destructuring) 
> 左侧使用对象字面量。等号右边使用属性初始化器
```javascript
 // 对象结构
  let node = {
    type: 'Identifier',
    name: 'foo'
  }
  var { type, name } = node
  console.log(type)
  console.log(name)
```
## 5.2.1 解构赋值(Destructuring Assignment)
- 必须用圆括号包裹解构赋值语句.因为花括号会被解析为代码块语句，而块语句不允许在赋值操作符(即等号)左侧出现
```javascript
 // 解构赋值-Destructuring Assignment
  let node = {
    type: 'Identifier',
    name: 'foo'
  },
    type = 'Literal',
    name = 5;

  // 解构表达式
  ({ type, name } = node)
  // { type, name } = node // error
,
  console.log(type)
  console.log(name)
```
- 任何期望有个值的位置都可以使用解构赋值表达式.

## 5.2.2 默认值(Default Values)
- 没有找到同名变量被赋值undefined
- 定义一个默认值
```javascript
let node = { type: 'identifier' }
let { type, value = true} = node
```

## 5.2.3 赋值给不同的变量名
```javascript
  // 赋值给不同的本地变量名
  let { type: localType, localName = 33 } = node
```

## 5.2.4 嵌套的对象解构(Nested Object Destructuring)
```javascript
// 嵌套的对象解构 Nested Object Destructuring
  let node = {
    type: 'Identifier',
    name: 'foo',
    loc: {
      start: {
        line: 1,
        column: 1
      },
      end: {
        line: 1,
        column: 4
      }
    }
  }

   let { loc: { start, end: localEnd }} = node
   console.log(start.column) // 1
   console.log(localEnd.column) // 4
```

## 5.3 数组解构(Array Destructuring)
> 数组解构在数组内部位置上，而不是作用在对象的具名属性上
```javascript
// Array Destructuring
  let colors = ['red', 'green', 'blue']
  let [firstColor, secondColor] = colors
  console.log(firstColor)
  console.log(secondColor)

  // 忽略一些项
  let [ , , thirdColor ] = colors
  console.log(thirdColor)
```
### 5.3.1 解构赋值(Destructuring Assignment)
> 与对象解构不同，不必将表达式包含在圆括号内
- 互换变量的值
```javascript
 // ES5中互换变量的值
  let a = 1
  let b = 2
  let temp

  temp = a
  a = b
  b = temp
  console.log(a) // 2
  console.log(b) // 1
  console.log(temp) // 1
```
```javascript
  // 在ES6中互换值，不需要额外变量
  [a, b] = [b, a]
  console.log(a) // 2
  console.log(b) // 1
```
### 5.3.2 默认值
### 5.3.3 数组的嵌套解构
```javascript
 // Nested Destructuring
  let colors = ['red', [ { 'green': 'green-value'}, 'lightgreen'], 'blue']
  let [firstColor, [ secondColor, secondColorLight ]] = colors
  console.log(secondColor) // {green: "green-value"}
  console.log(secondColorLight) // secondColorLight
```
### 5.3.4 剩余项(Rest Items)
```javascript
  // Rest Items
  let colors = ['red', 'green', 'green-value', 'blue']
  let [firstColor, ...restColor] = colors
  console.log(firstColor)
  console.log(restColor)
  // 克隆数组
  let [...clonedColors] = colors
  console.log(clonedColors)
  console.log(clonedColors == colors) // false
```
### 5.3.5 混合解构(Mixed Destructuring)
```javascript
 let node = {
    type: 'Identifier',
    name: 'foo',
    loc: {
      start: {
        line: 1,
        column: 1
      },
      end: {
        line: 1,
        column: 4
      }
    },
    range: [0, 3]
  }
  // 混合解构
  let { loc: { start }, range: [startIndex] } = node
```

### 5.3.6 参数解构 Destructured Parameters
```javascript
// 参数解构 Destructured Parameters
  function setCookie(name, value, { secure, path, domain, expires}) {
    // code to set the cookie
  }
  setCookie('type', 'js', {
    secure: true,
    expires: 6000
  })
```

### 5.3.7 解构的参数是必需的(Destructured Parameters are Required)
- 参数解构是解构声明的简写,  参数解构的默认值
- let	{	secure,	path,	domain,	expires	}	=	options
```javascript
 // 参数解构的默认值
  function setCookie3(name, value, {
    secure = true,
    path = '/',
    domain = 'example.com',
    expires = new Date(Date.now() + 60 * 60 * 1000)} = {}) {
    // code to set the cookie
    console.log(domain)
    console.log(expires)
  }
  setCookie3('type', 'js')
```
