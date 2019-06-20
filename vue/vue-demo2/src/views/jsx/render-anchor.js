export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  mounted () {
    // console.log(this.$slots)
    // console.log(this.$scopedSlots)
  },
  render (createElement) {
    // @returns {VNode}
    return createElement(
      // {String | Object | Function}
      // 一个 HTML 标签名、组件选项对象，或者
      // resolve 了上述任何一种的一个 async 函数。必填项。
      'h' + this.level,
      {
        'class': {
          foo: true,
          bar: 0
        },
        // 普通的 HTML 特性
        attrs: {
          id: 'render-foo'
        },
        // DOM 属性
        domProps: {
          value: this.value
        }
      },
      // 子节点数
      // this.$slots.default,

      // {String | Array}
      // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
      // 也可以使用字符串来生成“文本虚拟节点”。可选。
      [
        '先写一些文字',
        createElement('div', this.$slots.default)
      ]
    )
  }
}
