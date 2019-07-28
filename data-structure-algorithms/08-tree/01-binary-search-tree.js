// 二叉搜索树
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

  // 中序遍历 inorder traverse
  // 中序遍历-从最小到最大的顺序访问所有节点
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