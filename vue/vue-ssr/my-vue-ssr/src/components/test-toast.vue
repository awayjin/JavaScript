<template>
  <div>
    test-toast <br>
    props msg: {{ msg }}
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'd-v'
    }
  },
  name: 'test-toast'
}
</script>
