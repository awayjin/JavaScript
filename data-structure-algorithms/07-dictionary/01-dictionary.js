// class Dictionary {
//   constructor () {
//     this.items = {}
//   }
// }
// report--- https://blog.csdn.net/weixin_34314962/article/details/88811759
function Dictionary () {
  var items = {}

  // has
  this.has = (key) => {
    return key in items
  }

  // set
  this.set = (key, value) => {
    items[key] = value
  }

  // delete
  this.delete = (key) => {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  // get
  this.get = (key) => {
    return this.has(key) ? items[key] : undefined
  }

  // values
  this.values = () => {
    var values = []
    for (var key in items) {
      if (this.has(key)) {
        values.push(items[key])
      }
    }
    return values
  }

  // keys
  this.keys = () => {
    return Object.keys(items)
  }

  // clear
  this.clear = () => {
    items = {}
  }

  // size
  this.size = () => {
    return Object.keys(items).length
  }

  // getItems
  this.getItems = () => {
    return items
  }
}

// module.exports = Dictionary
export default Dictionary


