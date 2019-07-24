// 二叉搜索要树
function binarySearchTree () {
  
  let Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  let root = null

  // insert 向树中插入一个新的键
  this.insert = (key) => {
    let newNode = new Node(key)

    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  let insertNode = (node, newNode) => {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }

  // getRoot
  this.getRoot = () => {
    return root
  }

  // inorder traverse
  this.inOrderTraverse = (callback) => {
    inOrderTraverseNode(root, callback)
  }

  let inOrderTraverseNode = (node, callback) => {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

}

export default binarySearchTree