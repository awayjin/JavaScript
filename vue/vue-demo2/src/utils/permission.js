import router from '../router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import LocalStorage from 'local-storage'
// import { getSearchString } from './preset'
import { getCookie } from './preset'
import Axios from 'axios'

const ROUTE_NO_AUTH = '/exception/403'
const whiteList = [ROUTE_NO_AUTH] // 白名单
// LocalStorage.clear()
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // let hasToken = getCookie('access_token') || ''
  let hasToken = getCookie('access_token') || 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU'
  let UID = getCookie('uid') || ''
  // let UID = getCookie('uid') || '0a3406ab5ebc51b578180ae6228f2337'
  // let hasToken = getSearchString('token') || 'Wpnz0wtYkZz85VN1z10KxjqQ4LA7NU'
  // 设置请求头
  Axios.defaults.headers.common['Authorization'] = hasToken
  if (hasToken) {
    let storeToken = LocalStorage.get('USER_TOKEN')
    if (!storeToken || storeToken !== hasToken) {
      LocalStorage.clear()
      LocalStorage.set('USER_TOKEN', hasToken) // token
      LocalStorage.set('USER_UID', UID) // uid
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`${ROUTE_NO_AUTH}?redirect=${to.path}`)
    }
  }
  NProgress.done()
})

router.afterEach((to, from, next) => {
  NProgress.done()
})
