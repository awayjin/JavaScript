// 比较两棵虚拟DOM树的差异

const _ = require('./util.js')
const patch = require('./patch.js')
const listDiffObject = require('./list-diff')
const listDiff = listDiffObject.diff

// diff 函数，对比两棵树
function diff (oldTree, newTree) {
  let index = 0 // 当前节点的标识
  let patches = {} // 用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

// 对两棵树进行深度优先遍历
// function dfsWalk (oldNode, newNode, index, patches) {
//   let currentPatch = [] // 当前差异数组
//   // Node is removed
//   if (oldNode === null) {
//     console.log(111)
//     // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
//   } else if (_.isString(oldNode) && _.isString(newNode)) { // TextNode content replacing
//     console.log(222)
//     if (newNode !== oldNode) {
//       currentPatch.push({ type: patch.TEXT, context: newNode })
//     }
//   } else if ( //  Nodes are the same, diff old node's props and children
//     oldNode.tagName === newNode.tagName &&
//     oldNode.key === newNode.key ) {
//     console.log(333)
//     // diff props - 计算两树 props 的差异
//     let propsPatches = diffProps(oldNode, newNode)
//     if (propsPatches) {
//       currentPatch.push({
//         type: patch.PROPS,
//         props: propsPatches
//       })
//     }
//     // console.log('patch.PROPS:', patch.PROPS)
//     // console.log('currentPatch:', currentPatch)
//
//     // diff children - 计算子节点的差异
//     // Diff children. If the node has a `ignore` property, do not diff children
//     // 计算子节点的差异. 如果节点有一个 'ignore' 属性，不计算子节点
//     // console.log('isIgnoreChildren:', isIgnoreChildren)
//     if (!isIgnoreChildren(newNode)) {
//       console.log('3-3')
//       diffChildren(
//         oldNode.children,
//         newNode.children,
//         index,
//         patches,
//         currentPatch
//       )
//     }
//
//   } else {
//     console.log(444)
//     // Nodes are not the same, replace the old node with new node
//     currentPatch.push({ type: patch.REPLACE, node: newNode })
//   }
//
//   // 对比 oldNode 和 newNode 的不同，记录下来
//   if (currentPatch.length) {
//     patches[index] = currentPatch
//   }
//   console.log('currentPatch:', currentPatch)
//
// }

function dfsWalk (oldNode, newNode, index, patches) {
  var currentPatch = []

  // Node is removed.
  if (newNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
    // TextNode content replacing
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
    // Nodes are the same, diff old node's props and children
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // Diff children. If the node has a `ignore` property, do not diff children
    if (!isIgnoreChildren(newNode)) {
      diffChildren(
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
    // Nodes are not the same, replace the old node with new node
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

function isIgnoreChildren (node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}

// diff children
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index
  _.each(oldChildren, function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches)
    leftNode = child
  })
  // console.log('index:', index, 'patches:', patches, 'currentPatches:', currentPatches)
  // let diffs = listDiff(oldChildren, newChildren, 'key')
  // console.log('-diffs:', diffs)
  // console.log('444-child')
  // var newChildren = diffs.children
  //
  // if (diffs.moves.length) { console.log('diffs move.length')}
  //
  // let leftNode = null
  // let currentNodeIndex = index
  //
  // // debugger
  // _.each(oldChildren, function (child, i) {
  //   let newChild = newChildren[i]
  //   currentNodeIndex = (leftNode && leftNode.count)
  //     ? currentNodeIndex + leftNode.count + 1
  //     : currentNodeIndex + 1
  //   dfsWalk(child, newChild, currentNodeIndex, patches)
  //   leftNode = child
  // })

}

// diff props 比较两个属性(props)的不同
function diffProps (oldNode, newNode) {
  let oldProps = oldNode.props
  let newProps = newNode.props

  let propsPatches = {}
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

  // console.log('count:', count)
  // console.log('propsPatches:', propsPatches)

  if (count === 0) {
    return null
  }

  return propsPatches
}


module.exports = diff // exports = [function name]
// exports.diff = diff // exports.[function name] = [function name]
