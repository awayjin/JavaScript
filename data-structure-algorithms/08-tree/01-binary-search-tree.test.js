// 二叉搜索树--测试用例
// Binary Search Tree -- test cases
// https://www.jianshu.com/p/ce4f46cd9372


// const BinarySearchTree = require('./01-binary-search-tree.js')
import BinarySearchTree from './01-binary-search-tree.js'
// console.log('BinarySearchTree', BinarySearchTree)

describe('BST 算法', () => {
  let tree = new BinarySearchTree()
  test('insert and getRoot method', () => {
    tree.insert(20) // root
    tree.insert(12)
    tree.insert(16)
    tree.insert(30)
    expect(tree.getRoot().key).toBe(20)
  })


  // 中序遍历-从最小到最大的顺序访问所有节点
  test('中序遍历 inOrderTraverse', () => {
    let printNode = (value) => {
      if (value === 12) {
        expect(12).toBe(value)
      } else if (value == 16) {
        expect(16).toBe(value)
      } else if (value == 20) {
        expect(20).toBe(value)
      } else if (value == 30) {
        expect(30).toBe(value)
      }
    }

    tree.inOrderTraverse(printNode)
  })

})

describe('BST 二叉树算法2', () => {
  let tree = new BinarySearchTree()

  let arr = [33, 44, 22, 11, 99]

  arr.map(item => {
    tree.insert(item)
  })

  test('getRoot 根节点 key', () => {
    expect(tree.getRoot().key).toBe(33)
  })

  test('使用 BST 排序, inOrderTraverse', () => {
    let arr = []
    let printNode = (value) => {
      arr.push(value)
    }
    tree.inOrderTraverse(printNode)

    expect([11, 22, 33, 44, 99]).toEqual(arr)
  })

})