export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render (createElement) {
    // @returns {VNode}
    return createElement(
      // {String | Object | Function}
      // 一个 HTML 标签名、组件选项对象，或者
      // resolve 了上述任何一种的一个 async 函数。必填项。
      'h' + this.level,
      // {
      //   template: '<div>{{ heading }}</div>',
      //   data () {
      //     return {
      //       heading: 4
      //     }
      //   }
      // },
      // 子节点数
      this.$slots.default
    )
  }
}
