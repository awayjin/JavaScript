<template>
  <div class="about">
    <h1>Lifecylce hooks</h1>
    <button @click="updatedData">Click Me changed data.</button>
    <p>
      inject-{{ foo }}
    </p>
  </div>
</template>

<script>
/**
 * 1. 计算属性缓存 vs 方法
 * 计算属性是基于它们的响应式依赖进行缓存的
 *
 * 2. 计算属性 vs 侦听属性
 * 计算属性在大多数情况下更合适
 * Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。
 * 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
 */
export default {
  name: 'about',
  // 子组件注入 'foo'
  inject: ['foo'],
  data () {
    return {
      message: 'Hello World',
      firstName: 'jin',
      lastName: 'wei',
      fullName: 'jin wei'
    }
  },
  computed: {
    // 词倒排
    reversedMessage () {
      return this.message.split('').reverse().join('')
    },
    now () {
      return Date.now()
    },
    fullNameComputed () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    firstName (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName (val) {
      this.fullName = this.firstName + ' ' + val
    }
  },
  beforeCreate () {
    console.log('1.beforeCreate this.message', this.message)
    console.log(this)
  },
  created () {
    console.group('2.created this.message', this.message)
    console.log(this)
  },
  beforeMount () {
    console.group('3. beforeMount this.message', this.message)
    console.log(this)
  },
  mounted () {
    console.group('4. mounted this.message', this.message)
    console.log(this)
  },
  beforeUpdate () {
    console.group('5. beforeUpdate this.message', this.message)
    console.log(this)
  },
  updated () {
    console.group('6. updated this.message', this.message)
    console.log(this)
  },
  beforeDestroy () {
    console.group('7. beforeDestroy this.message', this.message)
    console.log(this)
  },
  destroyed () {
    console.group('8. destroyed this.message', this.message)
    console.log(this)
  },
  methods: {
    // 倒排
    reversedMessageMethod () {
      return this.message.split('').reverse().join('')
    },
    updatedData () {
      console.log(222)
      console.log(window._)
      console.log(this.$store.state.count)
      // this.lastName = 'away-2'
      this.firstName = 'jin-2'
      // this.now = 33
    }
  }
}
</script>
