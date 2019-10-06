// 转为字符串
export function defaultToString (item) {
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

// valuePair - 保存两个值:原始的 key 和 value
export class ValuePair {
  constructor (key, value) {
    this.key = key
    this.value = value
  }

  toString () {
    return `[#${this.key}: ${this.value}]`
  }
}