// vuex
export default [
  {
    path: '/vuex',
    // name: 'vuex',
    component () {
      return import('../views/vuex/vuex-index.vue')
    },
    // components: { my: import('../views/vuex/vuex-questions.vue') },
    // 嵌套路由
    children: [
      {
        path: 'questions',
        component: () => import('../views/vuex/vuex-questions.vue')
        // components: { vuexName: import('../views/vuex/vuex-questions.vue') }
      },
      // state
      {
        path: 'state',
        component: () => import('../views/vuex/vuex-state.vue')
        // components: { vuexName: import('../views/vuex/vuex-state.vue') }
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
