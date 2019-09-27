class Set {
  constructor () {
    this.items = {}
  }

  // has
  has (element) {
    // return element in this.items
    // 和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。
    // var obj = { a: 3};
    // console.log(Object.prototype.hasOwnProperty.call(obj, 'a')) // true
    // console.log(obj.hasOwnProperty('toString')) // false
    // console.log('toString' in obj) // true
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }

  // add
  add (element) {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }

  // delete
  delete (element) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }

  // clear
  clear () {
    this.items = {}
  }

  // size
  size () {
    return Object.keys(this.items).length
  }

  // values
  values () {
    return Object.values(this.items)
  }
}