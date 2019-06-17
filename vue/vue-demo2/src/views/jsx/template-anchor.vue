<template>
  <h5 v-if="level === 5">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
      <div>default: <slot></slot></div>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
    <!--<slot></slot>-->
  </h5>
  <h1 v-else-if="level === 2">
    <slot></slot>
  </h1>
  <h1 v-else-if="level === 3">
    <slot></slot>
  </h1>
</template>

<script>
export default {
  props: {
    level: {
      type: Number,
      default: 1
    }
  }
}
</script>
