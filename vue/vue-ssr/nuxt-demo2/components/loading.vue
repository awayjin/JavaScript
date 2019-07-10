<template>
  <div class="loading" v-if="loading">
    <p> Loading... </p>
  </div>
</template>
<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>