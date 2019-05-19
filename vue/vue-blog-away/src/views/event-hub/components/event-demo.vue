<template>
  <div class="hub">
    event-demo sub-component:
    <ul >
      <li v-for="(item, index) in fibs" v-bind:key="index">
        {{ item.text }}--number: {{ item.number }}-- index: {{ index }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'event-demo',
  data () {
    return {
      fibs: []
    }
  },
  created () {
    // 监听
    this.$eventHub.$on('add-fibonacci', this.addFibonacci)
  },
  // 清除事件监听
  beforeDestroy () {
    this.$eventHub.$off('add-fibonacci', this.addFibonacci)
  },
  // 使用 $emit, $on, $off 分别来分发、监听、取消监听事件
  methods: {
    addFibonacci (newFib) {
      this.fibs.push(newFib)
    }
  }
}
</script>
