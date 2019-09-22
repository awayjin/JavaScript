import { Deque } from './05-02.deque.js'

describe('05-02 deque 双端队列', () => {
  let d = new Deque()

  it('isEmpty', () => {
    expect(d.isEmpty()).toBeTruthy()
  })

  it('addFront 验证空、lowestCount=0没有移除过前端队列', () => {
    d.addFront(3)
    expect(d.toString()).toBe('3')
    expect(d.count).toBe(1)

    d.addFront(5)
    expect(d.toString()).toBe('5,3')
    d.addFront(8)
    expect(d.toString()).toBe('8,5,3')

  })

  it('removeBack', () => {
    console.log('d.count:', d.count)

    expect(d.removeBack()).toBe(3)
    expect(d.toString()).toBe('8,5')
    expect(d.count).toBe(2)
  })
})