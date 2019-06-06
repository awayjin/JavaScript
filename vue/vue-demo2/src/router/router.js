import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import routeUser from './route-user'
import routeVuex from './route-vuex'
import routeComponent from './route-component'

Vue.use(Router)

// https://blog.csdn.net/QingWaXieZi/article/details/85041224
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      homeHidden: 'define hidden',
      component: Home
    },
    {
      path: '/403',
      name: '403',
      hideInMenu: true,
      component: () => import('../views/403.vue')
    },
    {
      path: '/about',
      meta: { authority: ['user', 'admin'] },
      hidden: 'define hidden',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue')
    },
    {
      path: '/mixin',
      meta: { icon: 'form', title: '表单', authority: ['3admin'] },
      name: 'mixin',
      component: () => import('../views/mixin.vue')
    }
  ]
    .concat(routeUser) // user 用户模块
    .concat(routeVuex) // Vuex 模块
    .concat(routeComponent) // 组件 模块
})

// import { check, isLogin } from '../utils/auth'
// import findLast from 'lodash/findLast'
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  // const record = findLast(to.matched, record => record.meta.authority)
  // // const record = to.matched.find(item => item.meta.authority)
  // if (record && !check(record.meta.authority)) {
  //   if (!isLogin() && to.path !== '/user/login') {
  //     next({
  //       path: '/user/login'
  //     })
  //   } else if (to.path !== '/403') {
  //     next({
  //       path: '/403'
  //     })
  //   }
  //   NProgress.done()
  // }
  NProgress.done()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
