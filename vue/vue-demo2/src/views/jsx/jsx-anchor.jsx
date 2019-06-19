// https://juejin.im/post/5affa64df265da0b93488fdd
// import JsxComponent from 'JsxComponet'

export default {
  // components: {
  //   JsxComponent
  // },
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  render: function (h) {
    const tag = `h${this.level}`
    // return <tag>{this.$slots.default}</tag>
    return (
      <tag>
        id = 'foo',
        domPropsInnerHTML = 'bar',
        onclick = { this.clickHandler }
      </tag>
    )
  },
  methods: {
    clickHandler () {
      console.log('hello jsx')
    }
  }
}
