class Stack {
  constructor () {
    this.items = []
  }

  push (element) {
    this.items.push(element)
    return this
  }
  // pop
  pop () {
    return this.items.pop()
  }
  // toString
  toString () {
    // console.log(this.items)
    return this.items.toString()
  }
  peek () {
    return this.items[this.items.length - 1]
  }
  isEmpty () {
    return this.items.length === 0
  }
  size () {
    return this.items.length
  }
  clear () {
    return this.items = []
  }
  print(){
    console.log(this.toString())
  }
}

// 十进制转二进制
export function decimalToBinary (decNumber) {
  const stack = new Stack()
  let number = decNumber
  let rem
  let binaryString = ''

  // 除法结果不为 0 时，获得余数
  while (number > 0) {
    // rem = Math.floor(number % 2) // remainder
    rem = number % 2 // remainder
    // 余数放栈里
    stack.push(rem)
    number = Math.floor(number / 2)
  }

  console.log('stack:', stack)
  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }

  return binaryString
}

export default Stack