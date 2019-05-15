<template>
  <div class="about">
    <h1>This is an about  page</h1>
    <pre>
      about.getters doneArray: {{ $store.getters.doneArray }}
      doneArray: {{ doneArrFilter }}

      count: {{ count }}
      countAlias: {{ countAlias + '-concat'}}
      number: {{ number  }}
      city: {{ city }}
      obj.val: {{ val }}

      <button @click="aboutCommit">About commit modules.</button>
    </pre>
    <hr>
    <button @click="updatedData">Click Me changed data.</button>
    <p>
      inject-{{ foo }}
    </p>
    <p>Vuex count: {{ $store.state.count }} </p>
    <p>Original fullName: {{ fullName }} </p>
    <p>Computed fullNameComputed: {{ fullNameComputed }} </p>
    <p>Original now: {{ now }} </p>
    <p>Original message: {{ message }} </p>

    <p>Computed reversed message: {{ reversedMessage }} </p>
    <p>Method reversed message: {{ reversedMessageMethod() }} </p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
/**
 * 1. 计算属性缓存 vs 方法
 * 计算属性是基于它们的响应式依赖进行缓存的
 *
 * 2. 计算属性 vs 侦听属性
 * 计算属性在大多数情况下更合适
 * Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。
 * 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
 */

const obj = {
  val: 20,
  mulVal () {
    return this.val * 2
  }
}

export default {
  name: 'about',
  // 子组件注入 'foo'
  inject: ['foo'],
  data () {
    return {
      message: 'Hello World',
      watchArray: [33, 44],
      firstName: 'jin',
      lastName: 'wei',
      ...obj,
      fullName: 'jin wei'
    }
  },
  mounted () {
    console.log(this.$store)
    console.log(this.$store.commit)
  },
  computed: {
    aboutDoneArr () {
      return this.arrFilter.filter(number => number % 2 === 0)
    },
    ...mapGetters([
      'doneArray',
      'doneArrFilter'
    ]),
    ...mapState({
      count: s => s.count,
      number: s => s.about.number,
      arrFilter: s => s.about.arrFilter,
      countAlias: 'count', // 别名
      city: state => state.about.city
    }),
    // count () {
    //   return this.$store.state.count
    // },
    // city () {
    //   return this.$store.state.about.city
    // },
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
  methods: {
    // about commit
    aboutCommit () {
      this.$store.commit('aboutIncrement')
    },
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
