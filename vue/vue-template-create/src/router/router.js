import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 404
    {
      path: '*',
      component: () => import('../views/not-found.vue')
    },
    // 异常信息
    {
      path: '/exception/:type',
      name: 'exception',
      component: () => import('../views/exception.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about?demo=11',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
})
