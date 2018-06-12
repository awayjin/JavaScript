/**
 *
 *
 > Observer 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，
 内部采用Object.defineProperty的getter和setter来实现。

 > Compile 指令解析器，它的作用对每个元素节点的指令进行扫描和解析，
 根据指令模板替换数据，以及绑定相应的更新函数。

 > Watcher 订阅者， 作为连接 Observer 和 Compile 的桥梁，
 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

 > Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），
 数据变动触发 notify 函数，再调用订阅者的 update 方法。
 *
 */

function Compile (el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)

  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el)
    this.init() // 初始化
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  // 元素节点
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  node2Fragment: function (el) {
    /**
     * createDocumentFragment
     * 因为文档片段存在于内存中，并不在DOM树中，
     * 所以将子元素插入到文档片段时不会引起页面重排(reflow)(对元素位置和几何上的计算)。
     * 因此，使用文档片段document fragments 通常会起到优化性能的作用
     */
    var fragment = document.createDocumentFragment() // 创建一个新的空白的文档片段
    var child
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      console.log(el.firstChild)
      fragment.appendChild(child)
    }
    console.log(fragment)
    return fragment
  },
  init: function () {
    this.compileElement(this.$fragment)
  },
  compileElement: function (el) {
    var childNodes = el.childNodes
    var me = this

    Array.prototype.slice.call(childNodes).forEach(function (node) {
      var text = node.textContent
      var reg = /\{\{(.*)\}\}/

      if (me.isElementNode(node)) {
        me.compile(node)
      } else if (me.isTextNode(node) && reg.test(test)) {
        me.complieText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  }
}
