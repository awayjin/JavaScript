var el = require('./element.js')
var diff = require('./diff.js')

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

// 1. 构建虚拟 DOM
// js 对象表示 DOM 结构
var tree = el(
  'ul',
  { id: 'list', class: 'remove-prop-demo', cDemo: 'c-demo-value' },
  [
    33,
    el('li', { class: 'item' }, ['item 1']),
    el('li', { class: 'item' }, ['item 2']),
    el('li', { class: 'item' }, [el('span', { class: 'child' }, [11])]),
    44,
  ]
)

// 根据 tree 构建真正的 <ul>
// 2. 通过虚拟 DOM 构建真正的 DOM
var ulRoot = tree.render()
document.body.appendChild(ulRoot)


console.log('tree ul:', tree)
console.log('ulRoot:', ulRoot)

// 3. 生成新的虚拟DOM
var newTree = el(
  'ul',
  { id: 'list', class: 'remove-prop-demo-222', myNewProp: 'my-new-prop' },
  [
    66,
    el('li', { class: 'item3' }, ['item 4']),
    el('li', { class: 'item' }, ['item 5']),
    el('li', { class: 'item' }),
    44,
  ]
)

// 4. 比较两棵虚拟DOM树的不同
var patches = diff(tree, newTree)
// var patches = diff.diff(tree, newTree)

// 5. 在真正的DOM元素上应用变更
// patch(root, patches)

console.log(Object.prototype.toString.call(tree))
console.log(Object.prototype.toString.call(tree).replace(/\[object\s|\]/g, ''))

console.log(Array(90).join('-'))