import { defaultToString } from '../utils/util'

// 散列表
class HashTable {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.hashTable = {}
  }

  // 散列函数
  loseloseHashCode (key) {
    if (typeof key === 'number') { // 是否是一个数
      return key
    }

    // 然后，给定一个 key 参数，
    // 我们就能根据组成 key 的每个字符的 ASCII 码值的和得到一个数。
    const tableKey = this.toStrFn(key)
    //  hash 变量来存储这个总和
    let hash = 0

    // 遍历 key 并将从 ASCII 表中查到的
    // 每个字符对应的 ASCII 值加到 hash 变量中
    for (let i = 0; i < tableKey.length; i++) {
      // charCodeAt 字符编码
      hash += tableKey.charCodeAt(i)
    }

    // 为了得到比较小的数值，我们会使用 hash 值 和一个任意数做除法的余数(%)
    return hash % 37
  }

  // hashCode
  hashCode (key) {
    return this.loseloseHashCode(key)
  }

}