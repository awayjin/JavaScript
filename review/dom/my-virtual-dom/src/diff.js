// 比较两棵虚拟DOM树的差异

const _ = require('./util.js')
const patch = require('./patch.js')

// diff 函数，对比两棵树
function diff (oldTree, newTree) {
  let index = 0 // 当前节点的标识
  let patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
}

// 对两棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  let currentPatch = []

  // Node is removed
  if (oldNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
  } else if (_.isString(oldNode) && _.isString(newNode)) { // TextNode content replacing

    //
  } else if ( //  Nodes are the same, diff old node's props and children
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {

  } else {
    // Nodes are not the same, replace the old node with new node
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }


  // if (currentPatch.length) {
  //   patches[index] = currentPatch
  // }

  // 对比 oldNode 和 newNode 的不同，记录下来
  patches[index] = []

  diffChildren(oldNode.children, newNode.children, index, patches)
}

function diffChildren (oldTree, newTree, index, patches) {
  
}

module.exports = diff // exports = [function name]
// exports.diff = diff // exports.[function name] = [function name]
