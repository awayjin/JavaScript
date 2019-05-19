import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    // hooks demo
    {
      path: '/hooks',
      name: 'hooks',
      component: () => {
        return import('../views/Hooks.vue')
      }
    },
    // vuex
    {
      path: '/vuex-demo',
      // name: 'hooks',
      component: () => {
        return import('../views/VuexDemo.vue')
      }
    },
    // event-hub
    {
      path: '/event-hub',
      name: 'event-hub index',
      component: () => import('../views/event-hub/index.vue')
    }
  ]
})
