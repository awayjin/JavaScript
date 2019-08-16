<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      state:  {{ number }}33
      <button @click="$store.commit('addNumber')">number++</button>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    number () {
      return this.$store.state.number
    }
  }
}
</script>
