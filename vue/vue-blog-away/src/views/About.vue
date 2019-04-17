<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  // 子组件注入 'foo'
  inject: ['foo'],
  created () {
    console.log(this.foo)
  }
}
</script>
