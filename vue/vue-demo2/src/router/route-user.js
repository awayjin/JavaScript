export default [
  {
    // path: '/user/:id', // 动态路由
    path: '/user', // 动态路由
    component () {
      return import('../views/user/user-index.vue')
    },
    // 嵌套路由
    children: [
      {
        path: ':id/else',
        component: () => import('../views/user/user-else.vue')
      },
      {
        path: 'login',
        // redirect: '/login',
        component: () => import('../views/user/user-login.vue')
      },
      {
        path: ':id/profile',
        component: () => import('../views/user/user-profile.vue')
      }
    ]
  }
]
