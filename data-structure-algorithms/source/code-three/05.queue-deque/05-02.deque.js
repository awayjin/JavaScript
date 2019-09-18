// 双端队列 - 兼具队列和栈的特点
export class Queue {
  constructor () {
    this.count = 0 // 队列的大小
    // 需从队列前端移除元素，这个变量帮助我们追踪第一个元素
    this.lowestCount = 0
    this.items = {}
    // this.items = []
  }
  // addFront
  addFront (element) {
    if (this.isEmpty()) { // 空
      this.addBack(element)
    } else if (this.lowestCount > 0) { // 前端移除过
      this.lowestCount--
      this.items[this.count] = element
    } else {
      // lowestCount = 0
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.items[0] = element
      this.lowestCount = 0
    }
  }
  // addBack
  addBack (element) {
    this.items[this.count] = element
    this.count++
  }
  // peek
  peek () {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  // isEmpty
  isEmpty () {
    return this.size() === 0
  }
  // size
  size () {
    return this.count - this.lowestCount
  }

  // clear-清空队列
  clear () {
    this.count = 0
    this.items = {}
    this.lowestCount = 0
  }

  // toString 打印队列
  toString () {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}