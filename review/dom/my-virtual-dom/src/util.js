let _ = exports

// 类型判断
_.type = (obj) => {
  // return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
  return Object.prototype.toString.call(obj).slice(8, -1)
}

// 是否字符串
_.isString = (list) => {
  return _.type(list) === 'String'
}