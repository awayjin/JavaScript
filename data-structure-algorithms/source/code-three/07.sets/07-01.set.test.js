// 集合单元测试
import { Set } from './07-01.set.js'

const set = new Set()

describe('07.sets 集合', () => {
  it('add', () => {
    set.add(3)
    set.add(3)
    expect(set.values()).toEqual([3])
  })

  it('has', () => {
    set.add(4)
    expect(set.has(3)).toBeTruthy()
    expect(set.has(5)).toBeFalsy()
  })

  it('delete', () => {
    expect(set.delete(3)).toBeTruthy()
    expect(set.delete(3)).toBeFalsy()
    expect(set.values()).toEqual([4])
  })

  it('size', () => {
    set.add(5)
    set.add(6)
    expect(set.size()).toBe(3)
    expect(set.values()).toEqual([4, 5, 6])
  })

  it('values', () => {
    set.add(7)
    expect(set.values()).toEqual([4, 5, 6, 7])
  })

  it('clear', () => {
    set.clear()
    expect(set.items).toEqual({})
  })

  // 并集 - union
  it('union', () => {
    set.add(3)
    set.add(4)
    set.add(5)
    let set2 = new Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.union(set2).values()).toEqual([3, 4, 5, 6])
  })

  // 交集 - intersection
  it('intersection', () => {
    set.add(3)
    set.add(4)
    set.add(5)
    let set2 = new Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.intersection(set2).values()).toEqual([4, 5])
  })

  // 差集 - difference
  it('difference', () => {
    set.add(3)
    set.add(4)
    set.add(5)
    let set2 = new Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.difference(set2).values()).toEqual([3])
  })

  // 子集
  it('isSubsetOf', () => {
    let set2 = new Set()
    set2.add(4)
    set2.add(5)
    // set2.add(16)
    expect(set.values()).toEqual([3, 4, 5])
    expect(set2.values()).toEqual([4, 5])
    expect(set2.isSubetOf(set)).toBeTruthy()
  })

})