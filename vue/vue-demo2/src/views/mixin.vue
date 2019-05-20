<template>
  <div>
    <pre>
      mixin
      混入 (mixin) 来分发 Vue 组件中的可复用功能
      当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项
      mixinMsg: {{ mixinMsg }}
      message: {{ message }}
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
  }
}
</script>

<style scoped>
</style>
