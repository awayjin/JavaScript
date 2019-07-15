// 队列
function Queue () {
  let items = []

  // 添加元素
  this.enqueue = (element) => {
    items.push(element)
  }

  // 移除元素
  this.dequeue = () => {
    return items.shift()
  }

  // 查看队列头元素
  this.front = () => {
    return items[0]
  }

  // 是否为空
  this.isEmpty = () => {
    return items.length === 0
  }

  // size
  this.size = () => {
    return items.length
  }

  // print
  this.print = () => {
    console.log(items.toString())
    return items.toString()
  }

}

export default Queue