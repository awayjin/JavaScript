// JS 表示 DOM 节点
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

// 根据 js 对象构建真正的 DOM
Element.prototype.render = function () {
  var el = document.createElement(this.tagName) // 根据tagName构建
  var props = this.props

  console.log('el1:', el)

  for (var propName in props) { // 设置节点的DOM属性
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var eleFunc = (child) => {
    console.log('element:', child)
    return child.render()
  }

  var textFunc = (child) => {
    console.log('text:', child)
    return document.createTextNode(child)
  }

  var children = this.children || []
  children.forEach(function (child) {
    var childEl = (child instanceof Element) // 是否元素节点
      ? eleFunc(child) // 如果子节点也是虚拟DOM，递归构建DOM节点
      : textFunc(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
    console.log('-------childEl---', childEl)
  })
  console.log('el2:', el)

  return el
}


module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}