// vuex
export default [
  {
    path: '/vuex',
    component () {
      return import('../views/vuex/vuex-index.vue')
    },
    // 嵌套路由
    children: [
      {
        path: 'questions',
        component: () => import('../views/vuex/vuex-questions.vue')
      },
      // state
      {
        path: 'state',
        component: () => import('../views/vuex/vuex-state.vue')
      },
      // getter
      {
        path: 'getter',
        component: () => import('../views/vuex/vuex-getter.vue')
      },
      // mutations
      {
        path: 'mutation',
        component: () => import('../views/vuex/vuex-mutation.vue')
      }
    ]
  }
]
