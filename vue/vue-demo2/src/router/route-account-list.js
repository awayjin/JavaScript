// vuex
export default [
  {
    path: '/account',
    name: 'accountIndex',
    component () {
      return import('../views/account-list/account-index.vue')
    },
    children: [
      {
        path: 'list',
        component () {
          return import('../views/account-list/account-list.vue')
        }
      }
    ]
  }
]
