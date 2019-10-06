import { HashTable } from './08-02.hash-table'

const hash = new HashTable()

describe('散列表 hashTable', () => {
  it('put 将键和值加入散列表', () => {
    expect(hash.put('John', 'john@qq.com')).toBeTruthy()
    expect(hash.put('Wei', 'wei@qq.com')).toBeTruthy()
    expect(hash.put(null, 3)).toBeFalsy() // deep equality
    expect(hash.put(undefined, 3)).toBeFalsy() // deep equality
  })

  it('get 从散列表中获取一个值', () => {
    expect(hash.get('John')).toBe('john@qq.com')
    expect(hash.get('Wei')).toBe('wei@qq.com')
    expect(hash.get('jin')).toBe(null)
  })

  it('remove', () => {
    expect(hash.get('Wei')).toBe('wei@qq.com')
    expect(hash.remove('Wei')).toBeTruthy()
    expect(hash.get('Wei')).toBe(null)

    console.log(hash.hashCode('John'), '-', hash.get('John'))
    console.log(hash.hashCode('Dc'), '-', hash.get('Dc'))

    // 散列值相同 - collision
    hash.put('Jamie', 'Jamie@qq.com')
    hash.put('Sue', 'Sue@qq.com')

    console.log(hash)
    console.log(Object.keys(hash.table))
    console.log(hash.toString())
  })

  it('size isEmpty', () => {
    expect(hash.size()).toBe(2)
    expect(hash.isEmpty()).toBeFalsy()
    hash.clear()
    expect(hash.size()).toBe(0)
    expect(hash.isEmpty()).toBeTruthy()
  })

  // 散列值 处理 hashCode 冲突
})