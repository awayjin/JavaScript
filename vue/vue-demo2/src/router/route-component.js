// component
export default [
  {
    // path: '/user/:id', // 动态路由
    path: '/component',
    // name: 'component',
    component () {
      return import('../views/component/component-index.vue')
    },
    children: [
      {
        path: 'slot',
        // name: 'component',
        component () {
          return import('../views/component/component-slot.vue')
        }
        // components: {
        //   componentName: import('../views/component/component-slot.vue')
        // }
      }
    ]
  }
]
