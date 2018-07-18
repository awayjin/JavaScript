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
 *
 * 2. document fragments createDocumentFragment, firstChild
 *  document.createDocumentFragment 创建一个新的空白的文档片段
 *  firstChild 属性返回指定节点的首个子节点
 *
 * 3. childNodes, Array.prototype.slice.call类数组转换成数组
 *    textContent与innerText区别
 *    textContent 返回指定节点的文本内容，以及它的所有后代。隐藏的也返回.
 *    innerText不会
 *
 *  3.1 compile-node.attributes, attr.name-attr.value
 *  node.attributes 获得元素属性的集合
 *  attr.indexOf('v-') === 0是否指令, substring
 *  attributes][1].name 名称与值
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
    this.$fragment = this.nodeToFragment(this.$el)
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
  nodeToFragment: function (el) {
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
      /**
       * appendChild
       * 如果这个给定的要插入的child是document中已存在的节点中的引用，
       * 那么appendChild（）方法会把它从它现在的位置转移到新的位置，相当于一个剪切的效果
       *
       */
      fragment.appendChild(child)
    }

    return fragment
  },
  init: function () {
    this.compileElement(this.$fragment)
  },

  // 3.1 解析节点
  compileElement: function (el) {
    var childNodes = el.childNodes // 返回节点的子节点集合
    var that = this

    // 3.2 子节点集合类数组转换为数组并遍历
    Array.prototype.slice.call(childNodes).forEach(function (node) {
      var text = node.textContent // 返回当前节点的文本内容
      var reg = /\{\{(.*)\}\}/

      if (that.isElementNode(node)) { // 元素节点
        that.compile(node)
      } else if (false && me.isTextNode(node) && reg.test(test)) {
        // me.compileText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) {
        // me.compileElement(node)
      }
    })
  },

  // 3.3 元素解析
  compile: function (node) {
    var nodeAttrs = node.attributes // 获得元素属性的集合
    var _this = this

    // 3.4 元素属性集合类数组转换为数组并遍历
    Array.prototype.slice.call(nodeAttrs).forEach(function (attr) {
      // 属性名称
      var attrName = attr.name
      // 3.5 是否指令
      if (_this.isDirective(attrName)) {
        // 指令值-属性值，egg: clickBtn
        var exp = attr.value
        // 截取'v-',指令名, egg: v-on:click
        var dir = attrName.substring(2)
        // 3.6 是否事件指令
        if (_this.isEventDirective(dir)) {
          compileUtil.eventHandler(node, _this.$vm, exp, dir) // 3.6.1 绑定事件
        } else {
          // 3.7 普通指令 model
          compileUtil[dir] && compileUtil[dir](node, _this.$vm, exp)
        }

        // node.removeAttribute(attrName)
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
  },
  // 3.7.1 model, exp-value
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')
  },
  // 3.7.2 bind
  bind: function (node, vm, exp, dir) {
    // 3.7.3 modelUpdater
    var updaterFn = updater[dir + 'Updater'] // modelUpdater
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))
  },
  // 3.7.4 _getVMVal- split('.')
  _getVMVal: function (vm, exp) {
    var val = vm
    console.log(val)
    exp = exp.split('.') // ["someStr"]
    exp.forEach(function (key) {
      val = val[key] // vm['someStr]
    })
    console.log('2:'+val)
    return val
  },
  model3: function(node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function(e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  bind3: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];

    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function(value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },
}

var updater = {
  // 3.7.3
  modelUpdater: function (node, value, oldValue) {
    console.log('value:' + value)
    node.value = typeof value === 'undefined' ? '' : value
  },
}