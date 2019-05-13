import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // 404
    {
      path: '*',
      component: () => import('../views/not-found.vue')
    },
    // 异常信息
    {
      path: '/exception/:type',
      component: () => import('../views/exception.vue')
    },
    // 首页
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/about-us/about-index.vue')
    },
    // hooks demo
    {
      path: '/hooks',
      name: 'hooks',
      component: () => {
        return import('../views/hooks-module/hooks-index.vue')
      }
    }
  ]
})
