// JavaScript 字典所有测试用例

// https://www.jianshu.com/p/ce4f46cd9372

// const Dictionary = require('./01-dictionary')
import Dictionary from './01-dictionary.js'

// const dic = new Map()
const dic = new Dictionary()
dic.set('away', 'away@qq.com')
dic.set('jin', 'jin@qq.com')


describe('Dictionary', () => {
  // 断言
  test('has()', () => {
    expect(dic.has('away')).toBe(true)
    expect(dic.has('jin')).toBe(true)
  })

  test('size()', () => {
    expect(dic.size()).toBe(2)
  })

  test('keys()', () => {
    expect(dic.keys()).toEqual(['away', 'jin'])
  })

  test('values()', () => {
    expect(dic.values()).toEqual(['away@qq.com', 'jin@qq.com'])
  })

  test('get()', () => {
    expect(dic.get('jin')).toBe('jin@qq.com')
  })

  test('delete()', () => {
    expect(dic.delete('jin')).toBeTruthy()
  })

  test('again size()', () => {
    expect(dic.size()).toBe(1)
  })

  // 相等断言-比较对象
  test('getItems()', () => {
    expect(dic.getItems()).toEqual({'away': 'away@qq.com'})
  })

  // delete false
  test('delete() return false', () => {
    expect(dic.delete('aniKey')).toBeFalsy()
  })

  // clear
  test('clear()', () => {
    dic.clear()
    expect(dic.getItems()).toEqual({})
  })



})
