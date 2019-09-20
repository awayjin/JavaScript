<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>
      state:  {{ number }}--
      <button @click="$store.commit('addNumber')">number++</button>
      <br><button @click="toast">toast</button>
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    number () {
      return this.$store.state.userInfo.number
    }
  },
  created () {
    setTimeout(() => this.$toast.info(), 1000)
    console.log('About.vue this.$axios', this.$axios)
  },
  methods: {
    toast () {
      this.$toast.info('toast--pass--info!!!')
    }
  }
}
</script>
