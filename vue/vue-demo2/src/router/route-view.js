// view--命名视图
// import Default from '../views/view/view-index.vue'
import Main from '../views/view/view-main'
import Sidebar from '../views/view/view-sidebar'
export default [
  {
    path: '/view',
    component () {
      return import('../views/view/view-index.vue')
    },
    children: [
      {
        path: 'mul',
        components: {
          // default: Default,
          main: Main,
          sidebar: Sidebar
        }
      }
    ]
  }
]
