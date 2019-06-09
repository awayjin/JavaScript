import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Mixin from '../views/mixin.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import routeUser from './route-user'
import routeVuex from './route-vuex'
import routeComponent from './route-component'
import routeView from './route-view'

Vue.use(Router)

// https://blog.csdn.net/QingWaXieZi/article/details/85041224
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        mixin: Mixin
      }
    },
    {
      path: '/3',
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
    // 把组件按组分块
    // 把某个路由下的所有组件都打包在同个异步块 (chunk) 中
    // https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
    {
      path: '/about',
      meta: { authority: ['user', 'admin'] },
      hidden: 'define hidden',
      name: 'aboutRoot',
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
    .concat(routeView) // view 模块
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
