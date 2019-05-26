import router from '../router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import LocalStorage from 'local-storage'
import { getToken } from './auth'
// import { getSearchString } from './preset'
// import Axios from 'axios'

// const ROUTE_NO_AUTH = '/exception/403'

LocalStorage.clear()
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  // next()
})

// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   let hasToken = getSearchString('token') || ''
//   // let hasToken = getSearchString('token') || 'AGp78mKIVi48VJsfMtk5xb1gRGGOPy'
//   Axios.defaults.headers.common['Authorization'] = hasToken
//   let storeToken = LocalStorage.get('USER_TOKEN')
//
//   if (hasToken && to.path !== ROUTE_NO_AUTH) {
//     if (hasToken !== storeToken) {
//       await Axios.post('api/v1/permission').then(res => {
//         NProgress.done()
//         let resData = res.data
//         if (res.status === 200 && resData.data) {
//           LocalStorage.clear()
//           LocalStorage.set('USER_TOKEN', hasToken)
//           LocalStorage.set('USER_INFO', resData.data)
//         }
//         next()
//       }, res => {
//         NProgress.done()
//         next()
//       })
//     } else {
//       next()
//       NProgress.done()
//     }
//   } else if (to.path !== ROUTE_NO_AUTH) {
//     next(ROUTE_NO_AUTH)
//     NProgress.done()
//   } else {
//     next()
//     NProgress.done()
//   }
// })

// https://juejin.im/post/5c270b00f265da61542db3e6
router.afterEach((to, from, next) => {
  NProgress.done()
})
