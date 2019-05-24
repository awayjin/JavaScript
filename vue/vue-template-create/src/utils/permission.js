import router from '../router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import LocalStorage from 'local-storage'
import { getSearchString } from './preset'
import Axios from 'axios'

const ROUTE_NO_AUTH = '/exception/403'

LocalStorage.clear()
router.beforeEach(async (to, from, next) => {
  console.log('to.query: ', to.query, ' to.path:', to.path)
  console.log('from.query: ', from.query, ', to.matched:', to.matched)
  NProgress.start()
  // if(to.matched.some(record => record.meta.requiresAuth)) return next()
  // 判断该页面有channel
  if (from.query.token && to.path !== ROUTE_NO_AUTH) {
    // 路由切换时，如果没有就添加，有就跳过执行，添加固定参数
    if (!to.query.token) {
      // 准备一个跳转的query对象
      let query = to.query
      query.channel = from.query.token
      next({
        path: to.path,
        query: query
      })
    } else {
      next()
    }
  } else {
    next()
  }
  let a = 22
  if (a === 22) return
  let hasToken = getSearchString('token') || ''
  // let hasToken = getSearchString('token') || 'AGp78mKIVi48VJsfMtk5xb1gRGGOPy'
  Axios.defaults.headers.common['Authorization'] = hasToken
  let storeToken = LocalStorage.get('USER_TOKEN')

  if (hasToken && to.path !== ROUTE_NO_AUTH) {
    if (hasToken !== storeToken) {
      await Axios.post('api/v1/permission').then(res => {
        NProgress.done()
        let resData = res.data
        if (res.status === 200 && resData.data) {
          LocalStorage.clear()
          LocalStorage.set('USER_TOKEN', hasToken)
          LocalStorage.set('USER_INFO', resData.data)
        }
        next()
      }, res => {
        NProgress.done()
        next()
      })
    } else {
      next()
      NProgress.done()
    }
  } else if (to.path !== ROUTE_NO_AUTH) {
    next(ROUTE_NO_AUTH)
    NProgress.done()
  } else {
    next()
    NProgress.done()
  }
})

// https://juejin.im/post/5c270b00f265da61542db3e6
router.afterEach((to, from, next) => {
  NProgress.done()
})
