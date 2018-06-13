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

/**
 * 1.nodeType=1元素节点
 * 2. document fragments createDocumentFragment, firstChild
 * 3. childNodes, Array.prototype.slice.call类数组转换成数组
 *    textContent与innerText区别
 *    textContent 返回指定节点的文本内容，以及它的所有后代。隐藏的也返回.
 *    innerText不会
 *
 *  3.1 compile-node.attributes, attr.name-attr.value
 *  attr.indexOf('v-') === 0是否指令, substring
 *
 *  3.2 compileUtil
 *  true && 33, bind- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用,
 */

function Compile (el, vm) {
  this.$vm = vm
  // 1.0 获取节点
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)

  if (this.$el) {
    // 2.0 转换为文档片段
    this.$fragment = this.node2Fragment(this.$el)
    // 3.0 初始化
    this.init()
    // 2.2 文档片段追加到当前元素中
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  // 1.1 是否是元素节点
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  // 2.1 把所有节点添加文档片段里，并返回文档片段
  node2Fragment: function (el) {
    /**
     * createDocumentFragment
     * 因为文档片段存在于内存中，并不在DOM树中，
     * 所以将子元素插入到文档片段时不会引起页面重排(reflow)(对元素位置和几何上的计算)。
     * 因此，使用文档片段document fragments 通常会起到优化性能的作用
     */
    var fragment = document.createDocumentFragment() // 创建一个新的空白的文档片段
    var child
    // console.log(el.firstChild)
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      // console.log(el.firstChild)
      fragment.appendChild(child)
    }
    // console.log(fragment)
    return fragment
  },
  init: function () {
    this.compileElement(this.$fragment)
  },

  // 3.1 解析节点
  compileElement: function (el) {
    var childNodes = el.childNodes // 返回节点的子节点集合
    var me = this

    // 3.2 子节点集合类数组转换为数组并遍历
    Array.prototype.slice.call(childNodes).forEach(function (node) {
      var text = node.textContent // 返回当前节点的文本内容
      var reg = /\{\{(.*)\}\}/

      if (me.isElementNode(node)) { // 元素节点
        me.compile(node)
      } else if (false && me.isTextNode(node) && reg.test(test)) {
        // me.complieText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node)
      }
    })
  },

  // 3.3 元素解析
  compile: function (node) {
    var nodeAttrs = node.attributes // 获得元素属性的集合
    var me = this

    // 3.4 元素属性集合类数组转换为数组并遍历
    Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
      // 属性名称
      var attrName = attr.name
      // 3.5 是否指令
      if (me.isDirective(attrName)) {
        // 指令值-属性值，egg: clickBtn
        var exp = attr.value
        // 截取'v-',指令名, egg: v-on:click
        var dir = attrName.substring(2)
        // 3.6 是否事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir) // 3.6.1 绑定事件
        }
        node.removeAttribute(attrName)
      }
    })
  },

  // 3.5 是否是指令
  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },

  // 3.6 事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },

  compile2: function(node) {
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function(attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },
}

// 指令处理集合
var compileUtil = {
  // 3.6.2 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1] // on:click
    var fn = vm.$options.methods && vm.$options.methods[exp]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  }
}