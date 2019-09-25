function defaultEquals (a, b) {
  return a === b
}

export class LinkedList {
  constructor (equalsFn = defaultEquals) {
    this.count = 0
    this.head = null // 表头
    this.equalsFn = equalsFn
  }

  // push 添加元素
  push (element) {
    let node = new Node(element)
    let current

    if (this.head === null) { // 链表为空
      this.head = node
    } else {
      current = this.head
      while (current.next !== null) {
        current = current.next
      }
      // 将其 next 赋为新元素，建立链接
      current.next = node
    }
    this.count++
  }

  // removeAt - 从特定位置移除一个元素 removeAt
  removeAt (index) {
    if (index >= 0 && index < this.count) {
      let current = this.head

      if (index === 0) {
        this.head = current.next
      } else {
        let previous
        // for (let i = 0; i < index; i++) {
        //   previous = current
        //   current = previous.next
        // }
        previous = this.getElementAt(index - 1)
        current = previous.next
        // 将previous与current的下一项链接起来:跳过current，从而移除它
        previous.next = current.next
      }
      this.count--
    }
    return undefined
  }

  // 目标索引 index
  getElementAt (index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // remove - 根据元素的值移除元素
  remove (element) {

  }

  // 在任意位置插入元素
  insert (element, index) {
    if (index >= 0 && index <= this.count) {
      let node = new Node(element)
      if (index === 0) {
        let current = this.head
        node.next = current
        this.head = node
      } else {
        let previous = this.getElementAt(index - 1)
        let current = previous.next
        previous.next = node
        node.next = current
      }

      this.count++

      return true
    }
    return false
  }

}

class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}