import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'

Vue.use(Router)

// routes
export const routesMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/about-index.vue')
  }
]

export default new Router({
  base: process.env.BASE_URL,
  // mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})
