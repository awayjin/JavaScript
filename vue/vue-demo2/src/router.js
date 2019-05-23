import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import findLast from 'lodash/findLast'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { check, isLogin } from './utils/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  console.log('to.matched: ', to.matched)
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/mixin') {
      next({
        path: '/403'
      })
    } else if (to.path !== '/403') {
      console.log(403)
      next({
        path: '/403'
      })
      // next()
    }
    NProgress.done()
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
