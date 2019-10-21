
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

function defaultCompare2(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function defaultCompare (a, b) {
  if (a === b) {
    return 0
  }
  return a < b ? -1 : 1
}


// 节点
class Node {
  constructor (key) {
    this.key = key
    this.left = null
    this.right = null
  }
  toString() {
    return `${this.key}`
  }
}

class BinarySearchTree {
  constructor (compareFn = defaultCompare) {
    this.compareFn = compareFn // 用来比较节点值
    this.root = null // Node 类型的根节点
  }

  // 向二叉搜索树中插入一个键
  insert (key) {
    if (this.root === null) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  // 插入非根节点
  insertNode (node, key) {
    // 新节点的键小于当前节点的键
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        console.log('node.left:', node.left)
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        console.log('node.right:', node.right)
        this.insertNode(node.right, key)
      }
    }
  }
}

export default BinarySearchTree