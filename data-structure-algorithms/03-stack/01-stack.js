// 后进先出
function Stack () {
  let items = []

  // 1. push
  this.push = (element) => {
    items.push(element)
  }

  // 2. pop 从栈里移除元素
  this.pop = () => {
    return items.pop()
  }

  // 3. peek 查看栈顶元素
  this.peek = () => {
    return items[items.length - 1]
  }

  // 4. isEmpty
  this.isEmpty = () => {
    return items.length === 0
  }

  // 5. size
  this.size = () => {
    return items.length
  }

  // 6. clear
  this.clear = () => {
    items = []
  }

  // 7. print
  this.print = () => {
    console.log(items.toString())
    return items.toString()
  }

}

export default Stack