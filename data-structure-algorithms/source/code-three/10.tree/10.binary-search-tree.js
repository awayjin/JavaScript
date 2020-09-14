
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
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 中序遍历
  inOrderTraverse (cb) {
    this.inOrderTraverseNode(this.root, cb)
  }
  // 中序遍历-递归
  inOrderTraverseNode (node, cb) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, cb)
      cb(node.key)
      this.inOrderTraverseNode(node.right, cb)
    }
  }

  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node == null) {
      return undefined;
    }
    // if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    // } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    }
    // key is equal to node.item
    // handle 3 special conditions
    // 1 - a leaf node
    // 2 - a node with only 1 child
    // 3 - a node with 2 children
    // case 1
    if (node.left == null && node.right == null) {
      node = undefined;
      return node;
    }
    // case 2
    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }
    // case 3
    const aux = this.minNode(node.right);
    node.key = aux.key;
    node.right = this.removeNode(node.right, aux.key);
    return node;
  }

}

export default BinarySearchTree