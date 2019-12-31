<template>
  <div>
    <h2>深入了解组件</h2>
    <router-link to="/component">index</router-link>  |
    <router-link to="/component/slot">动态组件</router-link>  |
    <router-link to="/component/slot">slot</router-link>  |
    <!--<router-view name="componentName" />-->
    <router-view  />
    <button @click="goToNameAbout">命名路由 about</button>
    <hr>
    <br>
    <br>
    <button @click="showDemo = !showDemo ">动态组件切换</button>
    <br>
    <br>
    <keep-alive>
      <component :is="showDemo == true ? 'two': 'One' "></component>
    </keep-alive>
  </div>
</template>
<script>
import One from './one.vue'
import Two from './two.vue'
export default {
  components: {
    One,
    Two
  },
  data () {
    return {
      showDemo: true
    }
  },
  methods: {
    goToNameAbout () {
      this.$router.push({
        name: 'aboutRoot'
      })
    }
  }
}
</script>
