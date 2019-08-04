// vue-router

import Vue from 'vue'
import Router from 'vue-router'
// const Vue = require('vue')
// const Router = require('router.js')

Vue.use(Router)

// module.exports = function createRouter () {
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./components/home.vue')
      },
      {
        path: '/about',
        component: () => import('./components/about.vue')
      }
    ]
  })
}