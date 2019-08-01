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

_.each = (array, fn) => {
  for (let i = 0, len = array.length; i < len; i++) {
    fn(array[i], i)
  }
}

// _.each = function each (array, fn) {
//   for (var i = 0, len = array.length; i < len; i++) {
//     fn(array[i], i)
//   }
// }