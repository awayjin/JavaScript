import Stack from  './01-stack'

let stack = new Stack()

describe('01-stack.js', () => {

  test('1. isEmpty()', () => {
    expect(stack.isEmpty()).toBeTruthy()
  })

  test('2. push() 3. size()', () => {
    stack.push(11)
    stack.push(22)
    stack.push(33)
    expect(stack.size()).toBe(3)
  })

  test('4 peek()', () => {
    expect(stack.peek()).toBe(33)
  })

  test('5 pop()', () => {
    expect(stack.pop()).toBe(33)
    expect(stack.size()).toBe(2)
  })

  test('6 clear()', () => {
    stack.clear()
    expect(stack.size()).toBe(0)
  })

  test('7 print()', () => {
    stack.push(11)
    stack.push(22)
    stack.print()
    expect(stack.print()).toBe('11,22')
  })



})