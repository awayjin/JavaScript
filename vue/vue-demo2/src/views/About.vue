<style  lang="scss">
  :root {
    --main-color: gray;
    h1 {
      font-style: italic;
      color: var(--main-color);
      /*background-color: var(--main-color);*/
    }
  }
  .about {
    /*background-color: var(--main-color);*/
  }
</style>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="goToNameCompoent">click</button>
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    // console.log('about-to:', to)
    next()
  },
  methods: {
    goToNameCompoent () {
      this.$router.push({
        name: 'componentRoot'
      })
    }
  }
}
</script>
