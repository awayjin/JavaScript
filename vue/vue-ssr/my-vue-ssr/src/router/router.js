import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

const User = () => import('../views/User.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
        // 异步路由组件
        // component: () => import('./views/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/carts',
        name: 'carts',
        component: () => import('../views/cart-index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: User
      }
    ]
  })
}

// export default
