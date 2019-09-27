<template>
  <div>
    toast
    -- <span v-text="message"></span>
    {{ test }}
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      default: '--def msg--'
    }
    // message: String
  }
}
</script>

<style scoped>

</style>
