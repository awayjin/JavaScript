export default class Stack {
  constructor () {
    this.count = 0
    this.items = {}
  }
  // push
  push (element) {
    this.items[this.count] = element
    this.count++
  }
  // pop
  pop () {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  getElement () {

  }
  // peek - 查看栈顶元素
  peek () {
    return this.items[this.count - 1]
  }
  // isEmpty
  isEmpty () {
    return this.count === 0
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

  while (!stack.isEmpty()) {
    // binaryString += stack.pop().toString()
    binaryString += stack.pop()
  }

  return binaryString
}

// 十进制转2-36进制
export function baseConverter (decNumber, base) {
  let number = decNumber
  let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let stack = new Stack()
  let baseString = ''

  while (number > 0) {
    stack.push(number % base)
    number = Math.floor(number / base)
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()]
  }

  return baseString
}

