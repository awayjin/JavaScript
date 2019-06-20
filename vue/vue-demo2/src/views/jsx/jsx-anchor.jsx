// demo: https://juejin.im/post/5affa64df265da0b93488fdd

// import JsxComponent from 'JsxComponet'
// import './jsx.scss'
// import styles from './jsx-d.css' // 局部样式
import styles from './jsx.scss' // 局部样式
import JsxComponent from './JsxComponet'

export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  data  () {
    return {
      list: [11, 22, 33, 44],
      text: 'v-model'
    }
  },
  // 事件，class,style,ref等等怎么绑定？
  render: function (h) {
    // const tag = `h${this.level}`
    // return <tag>{this.$slots.default}</tag>
    // this.clickHandler()
    let ifText
    if (this.level === 2) {
      ifText = 'is 2'
    } else {
      ifText = 'not 2'
    }
    console.log('styles:', styles)
    return (
      <div>
        <div className={styles.person}>看背景颜色和文字颜色</div>
        <div className={ styles.person }> div </div>
        <p >{ this.level ? 'you 2' : 'no 2'}</p>
        <p>{ ifText }</p>
        <p>
          { this.list.map(item => {
            return <span>{ item }</span>
          })}
        </p>
        <p><input type="text" value={ this.text } onInput={ this.input } /> { this.text }</p>
        <JsxComponent></JsxComponent>
        <h4
          id="foo"
          onClick={this.clickHandler}
          class={{ foo: true, bar: 1 }}
          style={{ color: 'darkgray', fontSize: '14px' }}
          // domPropsInnerHTML = 'bar'
          slot='demo'>
          default: { this.$slots.default }
          demo:{ this.$slots.demo }
        </h4>
      </div>
    )
  },
  methods: {
    // v-model
    input (e) {
      this.text = e.target.value
    },
    clickHandler () {
      console.log('hello jsx')
    }
  }
}
