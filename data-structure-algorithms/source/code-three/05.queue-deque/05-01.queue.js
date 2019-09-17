// 队列
export class Queue {
  constructor () {
    this.count = 0 // 队列的大小
    // 需从队列前端移除元素，这个变量帮助我们追踪第一个元素
    this.lowestCount = 0
    this.items = {}
    // this.items = []
  }
  // enqueue
  enqueue (element) {
    this.items[this.count] = element
    this.count++
  }
  // dequeue
  dequeue () {
    if (this.isEmpty()) {
      return undefined
    }
    let result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
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