import { Queue } from './05-01.queue.js'


describe('队列-先进先出', () => {
  let q = new Queue()
  q.enqueue(3)
  q.enqueue(5)
  q.enqueue(6)


  it('dequeue 从对列移除元素', () => {
    expect(q.dequeue()).toBe(3)
  })

  test('peek 查看队列头元素', () => {
    expect(q.peek()).toBe(5)
  })

  test('size 2', () => {
    expect(q.size()).toBe(2)
  })

  test('isEmpty 2', () => {
    expect(q.isEmpty()).toBeFalsy()
  })

  it('clear 清空队列', () => {
    q.clear()
    expect(q.items).toEqual({})
    expect(q.count).toBe(0)
    expect(q.lowestCount).toBe(0)
  })

  it('toString 打印队列', () => {
    q.enqueue(10)
    q.enqueue(4)
    q.enqueue(20)
    expect(q.toString()).toBe('10,4,20')
  })
})