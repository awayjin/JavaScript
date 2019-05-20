<template>
  <div class="hub">
    <h1>This is an event-hub  page</h1>

    event-hub
    <div>33</div>

    <hr>
    <pre>
      getFibNum: <input type="number" v-model="fibNum" maxlength="3"> {{ fibNum }}
      <button @click="addFibonacci">add-Fibonacci</button>
    </pre>

    <EventDemo></EventDemo>

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
import EventDemo from './components/event-demo.vue'
export default {
  name: 'event-hub',
  components: {
    EventDemo
  },
  data () {
    return {
      fibNum: 5
    }
  },
  mounted () {
    console.log(this.$eventHub)
  },
  // 使用 $emit, $on, $off 分别来分发、监听、取消监听事件
  methods: {
    getFibNum (num) {
      if (num === 1 || num === 2) return 1
      return this.getFibNum(num - 1) + this.getFibNum(num - 2)
    },
    // http://www.cnblogs.com/liquanjiang/p/7810316.html
    getStrongFibNum (num) {
      let memory = []
      let vm = this
      return function (num) {
        if (memory[num] !== undefined) {
          return memory[num]
        } else {
          console.log(num)
          if (num === 0 || num === 1) {
            memory[num] = num
          } else {
            memory[num] = vm.getStrongFibNum(num - 2) + vm.getStrongFibNum(num - 1)
          }
          return memory[num]
          // return memory[n] = (n === 0 || n === 1)
          //   ? n
          //   : this.getStrongFibNum(n - 2) + this.getStrongFibNum(n - 1)
        }
      }
    },
    addFibonacci () {
      // 加强版 fibonacci，缓存数据
      let getNum = (function () {
        let memory = []
        return function (num) {
          if (memory[num] !== undefined) {
            return memory[num]
          } else {
            if (num === 0 || num === 1) {
              memory[num] = num
            } else {
              memory[num] = getNum(num - 2) + getNum(num - 1)
            }
            return memory[num]
          }
        }
      })()
      // 通过事件中心分发
      this.$eventHub.$emit('add-fibonacci', {
        text: 'fibonacci queue',
        // number: this.getFibNum(this.fibNum) // 数比较大卡死
        // number: this.getStrongFibNum(this.fibNum) // 数比较大卡死
        number: getNum(this.fibNum) // 数比较大卡死
      })
    }
  }
}
</script>
