<template>
  <div class="carts">
    <h1> shopping carts --33 </h1>
    <p>
      state 44:  {{ number }}
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
