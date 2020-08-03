## 1. 前言

深入理解 Virtual DOM 算法，给现有前端的编程提供一些新的思考。

对前端应用状态管理的思考, 都在解决同一个问题：`维护状态，更新视图`

https://github.com/livoras/blog/issues/13

## 2. Virtual DOM算法

DOM 很慢
```javascript
var div = document.createElement('div')
var str = ''
for (var key in div) {
 str += key + ' '
}
console.log(str)
```

相对于 DOM 对象，原生的 JavaScript 对象处理起来更快，而且更简单。DOM 树上的结构、属性信息我们都可以很容易地用 `JavaScript 对象`表示出来：
```javascript
let element = {
  tagName: 'ul',
  props: { id: 'list' },
  children: [
    { tagName: 'li', props: { class: 'item'}, children: ['item 1'] },
    { tagName: 'li', props: { class: 'item'}, children: ['item 2'] },
    { tagName: 'li', props: { class: 'item'}, children: ['item 3'] }
  ]
}
```
上面对应的写法
```html
<ul id="list">
  <li class="item">item 1</li>
  <li class="item">item 2</li>
  <li class="item">item 3</li>
</ul>
```

用 JavaScript 对象表示的树结构来构建一棵真正的DOM树.

用新渲染的对象树去和旧的树进行对比，记录这两棵树差异。

所谓的 Virtual DOM 算法。包括几个步骤：

1. 用 `JavaScript 对象结构`表示 DOM 树的结构；然后用这个树构建一个`真正的 DOM 树`，插到文档当中

2. 当`状态变更`的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录`两棵树差异`

3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

## 3. 算法实现

### 3.1 步骤一：用JS对象模拟DOM树

用 JavaScript 来表示一个 DOM 节点，只需要记录它的节点类型、属性，还有子节点：

```javascript
// element.js
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}
```


上面的 DOM 结构就可以简单的表示：

```javascript
// index.js
// js 对象表示 DOM 结构
var el = require('./element.js')
var ul = el(
  'ul',
  { id: 'list'},
  [
    el('li', { props: 'item'}, ['item 1']),
    el('li', { props: 'item'}, ['item 2']),
    el('li', { props: 'item'}, ['item 3'])
  ]
)
```