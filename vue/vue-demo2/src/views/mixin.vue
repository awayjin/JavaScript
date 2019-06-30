<template>
  <div>
    <pre>
      mixin
      混入 (mixin) 来分发 Vue 组件中的可复用功能
      当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项
      mixinMsg: {{ mixinMsg }}
      message: {{ message }}
      Mixin2 msg2: {{ msg2 }}
      <button @click="hello"> hello Mixins </button>
      <button @click="onEmit"> onEmit  </button>
      <button @click="crossDomain"> crossDomain </button>
      <ul>
        <li v-for="item in msgData" v-bind:key="item.id">{{ item.msg }}</li>
      </ul>
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
    },
    onEmit () {
      this.$emit('onEmit', 'from mixin2')
      this.$emit('onEmit', 'from mixin2-2')
    }
  }
}

const mixin2 = {
  data () {
    return {
      msg2: 'mixin2'
    }
  }
}

export default {
  name: 'mixin',
  mixins: [myMixin, mixin2],
  // 选项合并
  data () {
    return {
      message: 'component msg',
      msgData: []
    }
  },
  mounted () {
    this.$on('onEmit', data => console.log('onEmit1:', data))
    this.$on('onEmit', data => console.log('onEmit2:', data))
    // this.crossDomain()
  },
  methods: {
    crossDomain () {
      // console.log(this.$axios)
      // fetch('http://locahost:4003')
      this.$axios.get('http://localhost:5005/user?name=nam-3&url=www.runoob.com')
      // this.$axios.get('http://localhost:5005/user?name=nam-3&url=www.runoob.com')
      // this.$axios.post('https://fancy-test.4009515151.com/capricom/billInfo/getBillInfoList')
        .then(data => {
          this.msgData = data.data
          console.log('data:', data.data)
        })
        .catch(error => console.log('error, :', error))
    }
  }
}
</script>
