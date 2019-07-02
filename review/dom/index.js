var el = require('./element')

// 1. 用 JavaScript 对象结构表示 DOM 树的结构；
// 然后用这个树构建一个真正的 DOM 树，插到文档当中
//
// 2. 当状态变更的时候，重新构造一棵新的对象树。
// 然后用新的树和旧的树进行比较，记录两棵树差异
//
// 3. 把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

// 步骤一：用JS对象模拟DOM树
// 现在ul只是一个 JavaScript 对象表示的 DOM 结构，页面上并没有这个结构。
// 我们可以根据这个ul构建真正的<ul>
var ul = el(
  'ul',
  { id: 'list'},
  [
    el('li', { props: 'item'}, ['item 1']),
    el('li', { props: 'item'}, ['item 2']),
    el('li', { props: 'item'}, ['item 3'])
  ]
)

console.log('ul:')
console.log(ul)