// 转为字符串
function defaultToString (item) {
  // 在字典中，理想的情况是用字符串作为键名
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  console.log(111, '--', item.toString())
  return item.toString()
}
// console.log(defaultToString(3))
// console.log(defaultToString('3'))
// console.log(defaultToString(null))
// console.log(defaultToString(undefined))
// console.log(defaultToString({})) // "[object Object]"
// console.log(defaultToString(new String(3)))

class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  toString () {
    return `[#${this.key}: ${this.value}]`
  }
}

// 字典
export class Dictionary {
  constructor (toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  // hasKey(key):如果某个键值存在于该字典中，返回 true，否则返回 false
  hasKey (key) {
    let dc = this.table[this.toStrFn(key)]
    return dc != undefined
  }

  // set
  set (key, value) {
    if (key != null  && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  // get
  get (key) {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  // remove
  remove (key) {
    if (this.hasKey(key)) {
      const valuePair = this.table[this.toStrFn(key)]
      delete valuePair.key
      return true
    }
    return false
  }

  // 创建 valuePairs 方法，它会以数组形式返回字典中的所有 valuePair 对象
  keyValues () {
    return Object.values(this.table)
  }

  // keys
  keys () {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  // values
  values () {
    return this.keyValues().map(valuePair => valuePair.value)
  }
}