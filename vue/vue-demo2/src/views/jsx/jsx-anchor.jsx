export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render: function (h) {
    const tag = `h${this.level}`
    return <tag>{this.$slots.default}</tag>
  }
}
