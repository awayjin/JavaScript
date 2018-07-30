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
 *  3.1 compileElement-node.attributes, attr.name-attr.value
 *  node.attributes 获得元素属性的集合
 *  attr.indexOf('v-') === 0是否指令, substring
 *  attributes][1].name 名称与值
 *
 *  3.2 compileUtil
 *  true && 33, bind- bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用,
 *
 *  3.8 文本节点
 *  node.nodeType === 3, 节点类型是3
 *  var reg = /\{\{(.*)\}\}/; // .匹配除“\n”之外的任何单个字符。要匹配包括“\n”在内的任何字符，请使用像“(.|\n)”的模式。
 *  reg.test(string)-test() 方法用于检测一个字符串是否匹配某个模式.
 *  RegExp.$1 存储捕获组的构造函数属性，$1, $2...$9存储第1，2...9个捕获组
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
    this.compileNodes(this.$fragment)
  },

  // 3.1 解析节点
  compileNodes: function (el) {
    var childNodes = el.childNodes // 返回节点的子节点集合
    var that = this

    // 3.2 子节点集合类数组转换为数组并遍历
    Array.prototype.slice.call(childNodes).forEach(function (node) {
      var text = node.textContent // 返回当前节点的文本内容
      var reg = /\{\{(.*)\}\}/

      if (that.isElementNode(node)) { // 元素节点
        that.compileElement(node)
      } else if (that.isTextNode(node) && reg.test(text)) { // 3.8 文本节点
        that.compileText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) { // 解析子节点
        that.compileNodes(node)
      }
    })
  },

  // 3.3 元素解析
  compileElement: function (node) {
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

  // 3.8.2 解析文本节点
  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp) // 3.8.3
  },

  // 3.5 是否是指令
  isDirective: function (attr) {
    return attr.indexOf('v-') === 0
  },

  // 3.6 事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0
  },

  // 3.7.1 文本节点
  isTextNode: function (node) {
    return node.nodeType === 3
  }

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
  // 3.7.1 model-普通指令
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')

    var _this = this
    var val = _this._getVMVal(vm, exp)
    node.addEventListener('input', function (event) {
      var newValue = event.target.value
      if (val === newValue) {
        return
      }

      _this._setVMVal(vm, exp, newValue)
      val = newValue
    }, false)
  },

  text: function (node, vm, exp) {
    var trimExp = exp.replace(/\s*/gi, '') // 去除空格
    this.bind(node, vm, trimExp, 'text')
  },

  // 3.7.2 bind
  bind: function (node, vm, exp, dir) {
    // 3.7.3 modelUpdater
    var updaterFn = updater[dir + 'Updater'] // modelUpdater

    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue)
    })
  },

  // 3.7.4 _getVMVal- split('.')
  _getVMVal: function (vm, exp) {
    var val = vm
    exp = exp.split('.') // ["someStr"]
    exp.forEach(function (key) {
      val = val[key] // vm['someStr]
    })
    return val
  },
  _setVMVal: function (vm, exp, value) {
    vm[exp] = value
    // var val = vm;
    // exp = exp.split('.');
    // exp.forEach(function(k, i) {
    //   // 非最后一个key，更新val的值
    //   if (i < exp.length - 1) {
    //     val = val[k];
    //   } else {
    //     val[k] = value;
    //   }
    // });
  },
}

var updater = {
  // 3.7.3
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value === 'undefined' ? '' : value
  },
  // 文本节点指令替换
  textUpdater: function (node, value, oldValue) {
    // var reg =  oldValue || /(^\{\{(.*)\}\}$)/gi
    // var reg =  oldValue || /(\{\{(.*)\}\})/gi
    var reg =  oldValue || /(\{\{(\w+)\}\})/g
    var text = node.textContent.replace(reg, value)
    console.log(text)
    node.textContent = typeof text === 'undefined' ? '' : text
    // node.textContent = typeof value === 'undefined' ? '' : value
  }
}

/**
 *
 * test()  //检索字符串中的指定值。返回值是 true 或 false。
   exec() // 检索字符串中的指定值。返回值是被找到的值。如果没有发现匹配，则返回 null。
   compile()  //可以改变检索模式，也可以添加或删除第二个参数。
 *
 */
function parseText(pendingText){
  var collection=[];
  var searchTxt="";
  var targetTxt = "";
  var stringLength=0,lastIndex=0,curIndex=0;
  var reg =/\{\{(.+?)\}\}/g;

  if(!reg.test(pendingText)){
    throw new Error("未匹配");
  }else{
    reg.lastIndex=0;
    while( tempR = reg.exec(pendingText))
    {
      curIndex = reg.lastIndex;
      searchTxt=tempR[0];
      stringLength=searchTxt.length;
      collection.push(pendingText.slice(lastIndex,curIndex-stringLength));
      targetTxt=tempR[1];
      collection.push(targetTxt);
      lastIndex=curIndex;
    }
  }
  console.log(collection);
  return collection
}