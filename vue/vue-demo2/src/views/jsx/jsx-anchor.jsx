// https://juejin.im/post/5affa64df265da0b93488fdd
// import JsxComponent from 'JsxComponet'
import './jsx.scss'
import JsxComponent from './JsxComponet'

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
  data  () {
    return {
      list: [11, 22, 33, 44]
    }
  },
  render: function (h) {
    // const tag = `h${this.level}`
    // return <tag>{this.$slots.default}</tag>
    this.clickHandler()
    let ifText
    if (this.level === 2) {
      ifText = 'is 2'
    } else {
      ifText = 'not 2'
    }
    return (
      <div>
        <p>{ this.level ? 'you 2' : 'no 2'}</p>
        <p>{ ifText }</p>
        <p>
          { this.list.map(item => {
            return <span>{ item }</span>
          })}
        </p>
        <JsxComponent></JsxComponent>
      </div>
    )
  },
  methods: {
    clickHandler () {
      // console.log('hello jsx')
    }
  }
}
