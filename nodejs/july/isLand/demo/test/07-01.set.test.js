// 集合单元测试
import * as mySet from './07-01.set.js'
const set = new mySet.Set()

// import { Set } from './07-01.set.js'
// const set = new Set()

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
    // let set2 = new Set()
    let set2 = new mySet.Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.union(set2).values()).toEqual([3, 4, 5, 6])

    // ES6 - 扩展运算符 - 并集
    let setA = new Set()
    setA.add(1)
    setA.add(2)
    let setB = new Set()
    setB.add(3)
    setB.add(4)
    let setAll = [...new Set([...setA, ...setB])]
    expect(setAll).toEqual([1, 2, 3, 4])
  })

  // 交集 - intersection
  it('交集 - intersection', () => {
    set.add(3)
    set.add(4)
    set.add(5)
    // let set2 = new Set()
    let set2 = new mySet.Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.intersection(set2).values()).toEqual([4, 5])

    // ES6 - 扩展运算符 - 交集
    let setA = new Set()
    setA.add(1)
    setA.add(2)
    setA.add(3)
    setA.add(4)
    let setB = new Set()
    setB.add(3)
    setB.add(4)
    setB.add(5)

    console.log('ddd---:', new Set([...setA].filter(x => setB.has(x))))
    // new Set([...setA].filter(x => setB.has(x)))
    let intersection = [...setA].filter(value => setB.has(value))
    expect(intersection).toEqual([3, 4])

  })

  // 差集 - difference
  it('差集 - difference', () => {
    set.add(3)
    set.add(4)
    set.add(5)
    let set2 = new Set()
    set2.add(4)
    set2.add(5)
    set2.add(6)
    expect(set.difference(set2).values()).toEqual([3])

    // ES6 - 扩展运算符 - 交集
    let setA = new Set()
    setA.add(1)
    setA.add(2)
    setA.add(3)
    setA.add(4)
    let setB = new Set()
    setB.add(3)
    setB.add(4)
    setB.add(5)

    let difference = [...setA].filter(value => !setB.has(value))
    expect(difference).toEqual([1, 2])
  })

  // 子集
  it('isSubsetOf', () => {
    // let set2 = new Set()
    let set2 = new mySet.Set()
    set2.add(4)
    set2.add(5)
    // set2.add(16)
    expect(set.values()).toEqual([3, 4, 5])
    expect(set2.values()).toEqual([4, 5])
    expect(set2.isSubsetOf(set)).toBeTruthy()
  })

})