function defaultEquals (a, b) {
  return a === b
}

export class LinkedList {
  constructor (equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined // 表头
    this.equalsFn = equalsFn
  }

  push (element) {
    let node = new Node(element)
    let current
    if (typeof this.head === 'undefined') { // 链表为空
      this.head = node
    } else {
      current = this.head
      
      while (current.next !== undefined) {
        current = current.next
      }
      // 将其 next 赋为新元素，建立链接
      current.next = node
    }
  }
}

class Node {
  constructor (element) {
    this.element = element
    this.next = undefined
  }
}