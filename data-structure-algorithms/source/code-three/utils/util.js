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