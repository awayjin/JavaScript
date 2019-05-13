<template>
  <div class="hooks">
    <h1>Lifecylce hooks</h1>
    <p>
      inject - {{ message }}
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
  name: 'hooks-index',
  data () {
    return {
      message: 'Hello hooks'
    }
  }
}
</script>
