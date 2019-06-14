<template>
  <div>
    <pre>
      mixin
      混入 (mixin) 来分发 Vue 组件中的可复用功能
      当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项
      mixinMsg: {{ mixinMsg }}
      message: {{ message }}
      <button @click="hello"> hello </button>
      <button @click="crossDomain"> crossDomain </button>
    </pre>
  </div>
</template>

<script>
// 定义一个混入对象
const myMixin = {
  data () {
    // 选项合并
    return {
      message: 'myMixin msg. it will be replaced',
      mixinMsg: 'This is a mixin msg.'
    }
  },
  // 创建
  created: function () {
    this.hello()
  },
  methods: {
    hello () {
      console.log('hello from mixin.')
    }
  }
}
export default {
  name: 'mixin',
  mixins: [myMixin],
  // 选项合并
  data () {
    return {
      message: 'component msg'
    }
  },
  methods: {
    crossDomain () {
      // console.log(this.$axios)
      // fetch('http://locahost:4003')
      this.$axios.get('user?name=nam-3&url=www.runoob.com')
      // this.$axios.get('http://localhost:5005/user?name=nam-3&url=www.runoob.com')
      // this.$axios.post('https://fancy-test.4009515151.com/capricom/billInfo/getBillInfoList')
        .then(data => {
          console.log('data:', data)
        })
        .catch(error => console.log('error, :', error))
    }
  }
}
</script>
