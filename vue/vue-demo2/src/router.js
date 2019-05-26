import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import findLast from 'lodash/findLast'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { check, isLogin } from './utils/auth'

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
      component: () => import('./views/403.vue')
    },
    {
      path: '/about',
      meta: { authority: ['user', 'admin'] },
      hidden: 'define hidden',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'about' */ './views/About.vue')
    },
    {
      path: '/mixin',
      meta: { icon: 'form', title: '表单', authority: ['3admin'] },
      name: 'mixin',
      component: () => import('./views/mixin.vue')
    },
    // user 用户模块
    {
      // path: '/user/:id', // 动态路由
      path: '/user', // 动态路由
      component () {
        return import('./views/user/user-index.vue')
      },
      // 嵌套路由
      children: [
        {
          path: ':id/else',
          component: () => import('./views/user/user-else.vue')
        },
        {
          path: 'login',
          // redirect: '/login',
          component: () => import('./views/user/user-login.vue')
        },
        {
          path: ':id/profile',
          component: () => import('./views/user/user-profile.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  // const record = to.matched.find(item => item.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
