import Queue from './01-queue'

let queue = new Queue()

describe('Queue 队列', () => {
  // isEmpty
  test('isEmpty', () => {
    expect(queue.isEmpty()).toBeTruthy()
  })

  // enqueue-front
  test('enqueue front', () => {
    queue.enqueue('11')
    expect(queue.front()).toBe('11')
  })

  // size
  test('size', () => {
    expect(queue.size()).toBe(1)
  })

  // print
  test('size', () => {
    queue.enqueue(22)
    expect(queue.print()).toBe('11,22')
  })

  // dequeue
  test('dequeue', () => {
    expect(queue.dequeue()).toBe('11')
  })


})