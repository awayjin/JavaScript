<template>
  <div>
    <span @click="toggle = !toggle" :style="{ color: toggle ? 'red' : 'blue'}">
      Click On Me to change color
    </span>
    <button @click="count++">count++: {{ count }}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toggle: true,
      count: 1
    }
  }
}
</script>
