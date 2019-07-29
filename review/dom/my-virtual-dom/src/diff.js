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
    console.log(111)
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
  } else if (_.isString(oldNode) && _.isString(newNode)) { // TextNode content replacing
    console.log(222)
    //
  } else if ( //  Nodes are the same, diff old node's props and children
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    console.log(333)
    // diff props
    let propsPathces = diffProps(oldNode, newNode)
  } else {
    console.log(444)
    // Nodes are not the same, replace the old node with new node
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  console.log('arguments:', arguments)
  // if (currentPatch.length) {
  //   patches[index] = currentPatch
  // }

  // 对比 oldNode 和 newNode 的不同，记录下来
  patches[index] = []

  diffChildren(oldNode.children, newNode.children, index, patches)
}

// diff props 比较两个属性(props)的不同
function diffProps (oldNode, newNode) {
  let oldProps = oldNode.props
  let newProps = newNode.props

  let propsPatches = { }
  let count = 0

  // Find out different properties
  // 遍历旧属性，找出不同的属性 -- 比较值的不同
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) { // 比较值的不同
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // Find out new property
  // 遍历新属性，找出新属性 -- 新的键查找老的键
  for (let key in newProps) {
    if (!oldProps.hasOwnProperty(key)) { // 比较 键 的不同
      count++
      propsPatches[key] = newProps[key]
    }
  }

  console.log('count:', count)
  console.log('propsPatches:', propsPatches)

  if (count === 0) {
    return null
  }

  return propsPatches
}

// diff children
function diffChildren (oldTree, newTree, index, patches) {
  
}


module.exports = diff // exports = [function name]
// exports.diff = diff // exports.[function name] = [function name]
