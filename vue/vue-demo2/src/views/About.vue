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
    <p>
      data {}: {{ tracked }}
      func: {{ func() }}
    </p>
    <button @click="goToNameCompoent">click</button>
  </div>
</template>
<script>
export default {
  name: 'About',
  beforeRouteEnter (to, from, next) {
    // console.log('about-to:', to)
    next()
  },
  data () {
    return {
      tracked: 11,
      func () {
        return this.tracked + '-func'
      }
    }
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
