import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // 父组件提供
  provide: {
    // [sym]: 'foo'
    foo: 'bar'
  },
  data: {
    message: 'Vue 的生命周期',
    closureMsg: 'Msg closure'
  },
  computed: {
    computedMessageMsg () {
      return this.message + this.closureMsg
    }
  },
  methods: {
    hello () {
      console.log('hello method.')
    }
  },
  beforeCreate () {
    this.variableBeforeCreate = 'variable BeforeCreate' // 定义非响应式变量
    console.group('1.--------%c%s', 'color: orange',
      'beforeCreate el: ' + this.$el,
      ', $data:' + this.$data,
      ', message:' + this.message)
    console.log('\n')
  },
  created () {
    console.group('2.-------%c%s', 'color: green',
      'created el: ' + this.$el,
      ', $data:' + this.$data,
      ', message:' + this.message)
    console.log(this.$data)
    console.log(this.$data.message)
    console.log(this.hello)
    console.log(this.computedMessageMsg)
    console.log('\n')
  },
  // 为什么钩子函数不能是箭头函数？
  // beforeMount: () => {
  beforeMount () {
    console.group('3.-------------beforeMount:')
    console.log(this.$el)
    console.log('\n')
    // debugger
  },
  mounted () {
    console.group('4.--------%c%s', 'color: blue',
      'mounted el: ' + this.$el,
      ', $data:' + this.$data,
      ', message:' + this.message)
    console.log(this.$data) // beforeCreate里定义的变量是非响应式的，并没有
    console.log(this.$data.message)
    console.log(this.$methods)
    console.log(this.computedMessageMsg)
    console.log(this.variableBeforeCreate)
    console.log('this.$vnode:')
    console.log(this.$vnode)
    console.log(this)
    console.log('\n')
  },
  render: h => h(App)
})
  .$mount('#app')
