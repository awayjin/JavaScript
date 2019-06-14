<template>
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
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
